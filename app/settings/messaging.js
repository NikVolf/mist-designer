/**
 * Created by nikky on 1/16/2016.
 */


define([
    'text!./tpl/editableParameterSet.html',
    'text!./tpl/paramContextMapping.html',
    'text!./tpl/methodSignature.html',
    'text!./tpl/methodMapping.html',
    './stringTemplateEngine',
    './parameterTypes'],
function(
    editableParameterSetTemplate,
    paramContextMappingTemplate,
    methodSignatureTemplate,
    methodMappingTemplate,
    stringTemplateEngine,
    parameterTypes){

    var EditableParameterViewModel = function(model) {
        _.extend(this, {
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

    var EditableParameterSetViewModel = function(parameters) {
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
            var viewModel = new EditableParameterViewModel(model);
            viewModel.isDeleted.subscribe(this.parameterIsDeletedChanged.bind(this, viewModel));
            viewModel.name.subscribe(this.saveSignature, this);
            viewModel.type.subscribe(this.saveSignature, this);

            return viewModel;
        };



        this.members = ko.observableArray(_.map(parameters, this.createParameterViewModel, this));

        this.parameterTypes = ko.observableArray(parameterTypes);

        this.members.subscribe(this.saveSignature, this);

        this.addParameter = function() {
            var viewModel = this.createParameterViewModel({
                name: 'new parameter',
                type: this.parameterTypes()[0]
            });
            this.members.push(viewModel)
        };
    };


    var MappingItemViewModel = function(
        model,
        sourceParameters,
        targetParameters)
    {

        this.sourceParameters = sourceParameters;

        this.targetParameters = targetParameters;

        this.isEditMode = ko.observable(false);

        this.doneEdit = function() {
            this.isEditMode(false)
        };

        this.source = {
            name: ko.observable(model.source ? ko.utils.unwrapObservable(model.source.name) : ""),
            type: ko.observable(model.source ? ko.utils.unwrapObservable(model.source.type) : ""),
            //isAssigned: ko.computed(function() {
            //    return !!this.source.name() && !!this.source.type();
            //}, this)
        };

        if (model.source && model.source.name && ko.isObservable(model.source.name)) {
            model.source.name.subscribe(function(newSourceName) {
                this.source.name(newSourceName);
            }, this);
        }

        if (model.source && model.source.type && ko.isObservable(model.source.type)) {
            model.source.type.subscribe(function(newSourceType) {
                this.source.type(newSourceType);
            }, this);
        }

        this.target = {
            name: ko.observable(model.target ? ko.utils.unwrapObservable(model.target.name) : ""),
            type: ko.observable(model.target ? ko.utils.unwrapObservable(model.target.name) : ""),
            //isAssigned: ko.computed(function() {
            //    return !!this.target.name() && !!this.target.type();
            //}, this),
            //isValid: ko.computed(function(){
            //    return this.target.type() == this.source.type();
            //}, this)
        };

        this.selectedTarget = ko.observable(model.target ? model.target.name : null);

        this.selectedTarget.subscribe(function(newSelectedTargetValue){
            var newSelectedParameter = _.findWhere(
                ko.utils.unwrapObservable(this.targetParameters),
                {
                    name : newSelectedTargetValue
                });

            this.target.name(newSelectedParameter.name);
            this.target.type(newSelectedParameter.type);
        }, this);

        this.isOfSource = function(parameterName) {
            return this.source.name() == ko.utils.unwrapObservable(parameterName);
        };
    };

    var ParamToContextMappingViewModel = function(model){

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

        this.allowRemove = ko.observable(false);

        this.addMapping = function() {

        };

        this.remove = function(mapItem) {
            this.map.remove(mapItem);
        };

        this.isEditMode = ko.observable(false);

        this.sourceParameters.subscribe(function(changes){

            changes.forEach(function(change) {
                if (change.status === 'added') {
                    this.pushMap(change.value);
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

        this.signature = new SignatureViewModel(signature);

        this.parameterTypes = ko.observableArray(parameterTypes);
        this.context = context;

        this.mappings = new ParamToContextMappingViewModel({
            sourceParameters: this.signature.declaringParameters.members,
            targetParameters: this.context,
            map: map
        });
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

    var editMethod = function(element, options) {
        var viewModel = new MethodDefinitionViewModel(options);
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
            MethodDefinition: MethodDefinitionViewModel
        },

        editMethod: editMethod

    }


});