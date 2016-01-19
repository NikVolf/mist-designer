/**
 * Created by nikky on 1/16/2016.
 */


define([
    'text!./tpl/editableParameterSet.html',
    'text!./tpl/paramContextMapping.html',
    'text!./tpl/methodSignature.html',
    'text!./tpl/methodMapping.html',
    'text!./tpl/messageTypes.html',
    './stringTemplateEngine',
    './parameterTypes'],
function(
    editableParameterSetTemplate,
    paramContextMappingTemplate,
    methodSignatureTemplate,
    methodMappingTemplate,
    messageTypesTemplate,
    stringTemplateEngine,
    parameterTypes){

    var EditableParameterViewModel = function(model, context) {
        _.extend(this, {
            context: context,
            name : ko.observable(model.name),
            type : ko.observable(model.type),
            isEditMode: ko.observable(false),
            isDeleted: ko.observable(false),
            doneEdit: function() {
                this.isEditMode(false);
            },
            startEdit: function() {
                this.isEditMode(true)
            },
            remove: function() {
                this.isDeleted(true);
            }
        });
    };

    var EditableParameterSetViewModel = function(parameters, context) {
        this.context = context;

        this.parameterIsDeletedChanged = function(parameterViewModel, newValue) {
            if (newValue)
            {
                this.members.remove(parameterViewModel)
            }
        };

        this.isDirty = ko.observable(false);

        this.saveSignature = function() {
            this.isDirty(true);
        };


        this.createParameterViewModel = function(model) {
            var viewModel = new EditableParameterViewModel(model, this.context);
            viewModel.isDeleted.subscribe(this.parameterIsDeletedChanged.bind(this, viewModel));
            viewModel.name.subscribe(this.saveSignature, this);
            viewModel.type.subscribe(this.saveSignature, this);

            return viewModel;
        };

        this.members = ko.observableArray(_.map(parameters, this.createParameterViewModel, this));

        this.members.subscribe(this.saveSignature, this);

        this.addParameter = function() {
            var viewModel = this.createParameterViewModel({
                name: 'new_param',
                type: this.context.typeReference()[0]
            });
            this.members.push(viewModel)
        }.bind(this);

        this.isEmpty = ko.computed(function() {
            return this.members().length == 0;
        }, this);

        this.toModel = function() {
            return _.map(this.members(), function(member) {
                return {
                    name: ko.utils.unwrapObservable(member.name),
                    type:  ko.utils.unwrapObservable(member.type)
                }
            });
        }.bind(this);
    };


    var MappingItemViewModel = function(model, context, methodContext)
    {
        this.context = context;

        this.methodContext = methodContext;

        this.sourceParameters = this.methodContext.sourceParameters;

        this.isEditMode = ko.observable(false);

        this.doneEdit = function() {
            this.isEditMode(false)
        };

        this.source = ko.observable(model.source);

        var __sourceExplained = _.find(this.sourceParameters(), function(sourceMember) { return sourceMember.name() == this.source() }, this);
        if (!__sourceExplained)
            throw "no " + model.source + " in source parameters";

        this.sourceExplained = __sourceExplained;
        this.sourceExplained.name.subscribe(function() {
            this.source(this.sourceExplained.name());
        }, this);


        this.target = ko.observable(model.target);

        this.target.subscribe(function(newSelectedTargetValue){
            var newSelectedParameter = _.findWhere(
                ko.utils.unwrapObservable(this.targetParameters),
                {
                    name : newSelectedTargetValue
                });

            if (newSelectedParameter) {
                this.target(newSelectedParameter.name);
            }
        }, this);

        this.targetTypedReference = ko.computed(function() {
            var type = this.sourceExplained.type();
            if (type) {
                var result = _.chain(this.methodContext.targetParameters())
                    .filter(function(targetMember) {
                        return ko.utils.unwrapObservable(targetMember.type) == type;
                    }, this)
            }
            else result = _.chain(this.methodContext.targetParameters());

            return result.pluck("name").value();

        }, this);

        this.isOfSource = function(parameterName) {
            return this.source() == ko.utils.unwrapObservable(parameterName);
        };
    };

    var ParamToContextMappingViewModel = function(model, context){

        this.context = context;

        this.methodContext = {
            sourceParameters: _.isArray(model.sourceParameters)
                ? ko.observableArray(model.sourceParameters)
                : model.sourceParameters
        };

        this.pushMap = function(source, target) {
            this.map.push(new MappingItemViewModel(
                {
                    source: source,
                    target: target
                },
                this.context,
                this.methodContext));
        };

        this.allowAdd = ko.observable(false);

        this.allowRemove = ko.observable(false);

        this.addMapping = function() {

        };

        this.remove = function(mapItem) {
            this.map.remove(mapItem);
        };

        this.isEditMode = ko.observable(false);

        this.methodContext.sourceParameters.subscribe(function(changes){

            changes.forEach(function(change) {
                if (change.status === 'added') {
                    this.pushMap(change.value.name());
                }
                else if (change.status === 'deleted') {
                    var mapEntry = this.map().find(function(mappingItem) {
                        return mappingItem.isOfSource(change.value.name)
                    });
                    if (mapEntry)
                        this.map.remove(mapEntry);
                }
            }, this);
        }, this, "arrayChange");

        this.methodContext.targetParameters = ko.isObservable(model.targetParameters)
            ? model.targetParameters
            : ko.observableArray(model.targetParameters);

        this.map = ko.observableArray(_.map(model.map,
            function(m) {
                return new MappingItemViewModel(
                    m,
                    this.context,
                    this.methodContext);
            }.bind(this)
        ));

        this.toModel = function() {
            return _.map(this.map(), function(mapEntry) {
                return {
                    source: ko.utils.unwrapObservable(mapEntry.source),
                    target: ko.utils.unwrapObservable(mapEntry.target)
                }
            })
        }

    };

    var SignatureViewModel = function(model, context) {
        this.context = context;
        this.declaringParameters = new EditableParameterSetViewModel(model.declaringParameters, this.context);
        this.returnType = ko.observable(model.returnType);
        this.hasReturnType = ko.observable(model.hasReturnType);
        this.parameterTypes = ko.observableArray(parameterTypes);

    };

    var MethodDefinitionViewModel = function(model, context) {
        this.context = context;

        this.signature = new SignatureViewModel(model.signature, this.context);

        this.mappings = new ParamToContextMappingViewModel(
            {
                sourceParameters: this.signature.declaringParameters.members,
                targetParameters: this.context.globals.members,
                map: model.map
            },
            this.context
        );

        this.save = function() {
            model.save && model.save({
                signature: {
                    declaringParameters: this.signature.declaringParameters.toModel()
                },
                map: this.mappings.toModel()
            });
        }.bind(this);
    };

    var MessageTypeViewModel = function(model, context) {
        this.context = context;
        this.name = ko.observable(model.name);
        this.parameters = new EditableParameterSetViewModel(model.properties, this.context);
        this.hasFocus = ko.observable(model.hasFocus);
        this.isEditMode = ko.observable(model.isEditMode || model.hasFocus);
        this.edit = function() {
            this.isEditMode(true);
        };
        this.doneEdit = function() {
            this.isEditMode(false);
        }
    };

    var ContractContextViewModel = function(model) {

        this.messageTypes = new MessageTypesCollectionViewModel(model.messageTypes || [], this);

        this.typeReference = ko.computed(function() {
            return [].concat(
                parameterTypes,
                _.map(this.messageTypes.members(),
                    function(m) {
                        return m.name();
                    }, this)
            );
        }, this);

        this.globals = new EditableParameterSetViewModel(model.globals || [], this)
    };

    var MessageTypesCollectionViewModel = function(models, context) {

        this.context = context;

        this.members = ko.isObservable(models) ? models : ko.observableArray(_.map(models, function(m) {
            return new MessageTypeViewModel(m, this.context)
        }, this));

        this.allowAdd = ko.observable(true);

        this.add = function() {
            this.members.push(new MessageTypeViewModel(
                {
                    name: "new_type",
                    hasFocus: true
                },
                this.context));
        };

    };


    ko.components.register('ko-editable-parameter-set', {
        viewModel: EditableParameterSetViewModel,
        template: editableParameterSetTemplate
    });

    ko.components.register('ko-param-context-mapping', {
        viewModel: ParamToContextMappingViewModel,
        template: paramContextMappingTemplate
    });

    ko.components.register('ko-method-signature', {
        viewModel: SignatureViewModel,
        template: methodSignatureTemplate
    });

    ko.components.register("ko-method-mapping", {
        viewModel: MethodDefinitionViewModel,
        template: methodMappingTemplate
    });

    ko.templates['editable-parameter-set'] = editableParameterSetTemplate;
    ko.templates['param-context-mapping'] = paramContextMappingTemplate;
    ko.templates['method-signature'] = methodSignatureTemplate;
    ko.templates['method-mapping'] = methodMappingTemplate;
    ko.templates['message-types-collection'] = messageTypesTemplate;

    var editMethod = function(definition, options) {
        var viewModel = new MethodDefinitionViewModel(
            definition,
            options.context
        );
        ko.applyBindings(
            {
                method: viewModel
            },
            options.element);
    };

    return {
        viewModels: {
            MessageHandling: MethodDefinitionViewModel,
            ParamToContextMapping: ParamToContextMappingViewModel,
            EditableParameterSet: EditableParameterSetViewModel,
            MethodDefinition: MethodDefinitionViewModel,
            MessageTypes: MessageTypesCollectionViewModel,
            ContractContext: ContractContextViewModel
        },

        editMethod: editMethod

    }


});