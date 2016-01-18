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
        };

        this.isEmpty = ko.computed(function() {
            return this.members().length == 0;
        }, this);
    };


    var MappingItemViewModel = function(
        model,
        sourceParameters,
        targetParameters)
    {

        this.sourceParameters = sourceParameters;

        this.targetParameters = targetParameters;

        this.source = {
            name: ko.observable(model.source ? model.source.name : ""),
            type: ko.observable(model.source ? model.source.type : ""),
            isAssigned: ko.computed(function() {
                return !!this.source.name() && !!this.source.type();
            }, this)
        };

        if (model.source && model.source.name && model.source.name.isObservable()) {
            model.source.name.subscribe(function(newSourceName) {
                this.source.name(newSourceName);
            }, this);
        }

        if (model.source && model.source.type && model.source.type.isObservable()) {
            model.source.type.subscribe(function(newSourceType) {
                this.source.type(newSourceType);
            }, this);
        }

        this.target = {
            name: ko.observable(model.target ? model.target.name : ""),
            type: ko.observable(model.target ? model.target.name : ""),
            isAssigned: ko.computed(function() {
                return !!this.target.name() && !!this.target.type();
            }, this),
            isValid: ko.computed(function(){
                return this.target.type() == this.source.type();
            }, this)
        };

        this.selectedTarget = ko.observable(model.target ? model.target.name : null);

        this.selectedTarget.subscribe(function(newSelectedTargetValue){
            var newSelectedParameter = _.findWhere(
                ko.unwrapObservable(this.targetParameters),
                {
                    name : newSelectedTargetValue
                });

            this.target.name(newSelectedParameter.name);
            this.target.type(newSelectedParameter.type);
        }.bind(this));

        this.isOfSource = function(parameterName) {
            return this.source.name() == ko.unwrapObservable(parameterName);
        };
    };

    var ParamToContextMappingViewModel = function(model){

        this.context = model.context;

        this.sourceParameters = ko.isObservable(model.sourceParameters)
            ? model.sourceParameters
            : ko.observableArray(model.sourceParameters);

        this.pushMap = function(source, target) {
            this.map.push(new MappingItemViewModel(
                {
                    source: source,
                    target: target
                },
                this.sourceParameters,
                this.targetParameters,
                this.targetParamReference));
        };

        this.allowAdd = ko.observable(false);

        this.addMapping = function() {

        };

        this.isEditMode = ko.observable(false);

        this.sourceParameters.subscribe(function(changes){

            changes.forEach(function(change) {
                if (change.status === 'added') {
                    this.pushMap(change.value);
                }
                else if (change.status === 'deleted') {
                    var mapEntry = this.map.find(function(mappingItem) {
                        return mappingItem.isOfSource(change.value.name)
                    });
                    if (mapEntry)
                        this.map.remove(mapEntry);
                }
            }, this);

            _.each(this.sourceParameters, function(sourceParameter) {

                if (!map) {

                }
            }, this);
        }, this);

        this.targetParameters = ko.isObservable(model.targetParameters)
            ? model.targetParameters
            : ko.observableArray(model.targetParameters);

        this.targetParamReference = ko.observableArray(_.map(this.targetParameters(), function(p) { return p.name; }));

        this.targetParameters.subscribe(function(){
            this.targetParamReference.removeAll();
            _.each(this.targetParameters(), function(p) { this.targetParamReference.push(p.name); }.bind(this));
        }.bind(this));

        this.map = ko.observableArray(_.map(model.map,
            function(m) {
                return new MappingItemViewModel(
                    m,
                    this.sourceParameters,
                    this.targetParameters);
            }.bind(this)
        ));

    };

    var SignatureViewModel = function(model) {
        this.declaringParameters = new EditableParameterSetViewModel(model.parameters);
        this.returnType = ko.observable(model.returnType);
        this.hasReturnType = ko.observable(model.hasReturnType);
        this.parameterTypes = ko.observableArray(parameterTypes);

    };

    var MethodDefinitionViewModel = function(signature, map, context) {
        this.context = context;

        this.signature = new SignatureViewModel(signature);

        this.parameterTypes = ko.observableArray(parameterTypes);

        this.mappings = new ParamToContextMappingViewModel({
            sourceParameters: this.signature.declaringParameters.members,
            targetParameters: this.context.globals,
            map: map,
            context: this.context
        });
    };

    var MessageTypeViewModel = function(model, context) {
        this.context = context;
        this.name = ko.observable(model.name);
        this.parameters = new EditableParameterSetViewModel(model.properties, this.context);
        this.hasFocus = ko.observable(model.hasFocus);
        this.isEditMode = ko.observable(model.isEditMode || model.hasFocus);
        this.edit = function() {
            this.isEditMode(true);
        }
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

    var editMethod = function(element, options) {
        var viewModel = new MethodDefinitionViewModel(
            _.result(options, "signature"),
            _.result(options, "mapping") || [],
            _.result(options, "context") || []
        );
        ko.applyBindings(
            {
                method: viewModel
            },
            element);
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