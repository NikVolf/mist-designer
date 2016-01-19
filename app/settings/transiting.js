/**
 * Created by nvolf on 19.01.2016.
 */

define([], function() {

    var calculationTypes = {
        property: "calculation.property",
        expression: "calculation.expression",
        value: "calculation.value"
    }

    var PropertyReferenceViewModel = function(model, context) {
        this.context = context;
        this.path = ko.observable(model.path);
        this.template = "calculation-property-type";
    };

    var ExpressionViewModel = function(model, context) {
        this.context = context;
        this.expression = ko.observable(model.expression);
        this.template = "calculation-expression-type";
    };

    var ValueViewModel = function(model, context) {
        this.context = context;
        this.value = ko.observable(model.value);
        this.template = "calculation-value-type";
    }

    function resolveViewModel(calcType) {
        if (calcType == calculationTypes.property)
            return PropertyReferenceViewModel;

        if (calcType == calculationTypes.expression)
            return ExpressionViewModel;

        if (calcType == calculationTypes.value)
            return ValueViewModel;

    }

    var CalculationViewModel = function(model, context) {
        this.targetType = ko.observable(model.targetType);

        this.context = _.extend({}, context,
            {
                globalTypes: ko.computed(function () {
                    var targetType = this.targetType();
                    return _.chain(context.globals())
                        .filter(function (g) {
                            return !targetType || g.type() == targetType
                        })
                        .map(function (g) {
                            return g.name;
                        });
                }, this)
            });

        this.type = ko.observable(model.type || calculationTypes.property);

        this.typeReference = ko.observableArray(_.toArray(calculationTypes));

        var viewModelType = resolveViewModel(this.type);
        this.definition = ko.observable(new viewModelType(model.definition, this.context));
        this.definitionTemplate = this.definition.template;

        this.type.subscribe(function(newType) {
            var viewModelType = resolveViewModel(this.type);
            var newDefinition = new viewModelType(model.definition, this.context);
            this.template = this.definition.template;
            this.definition(newDefinition);
        }, this);
    };

    var JunctionSettingViewModel = function(model, context) {

        this.context = context;

        this.path = ko.observable(model.path);

        this.condition = new CalculationViewModel(_.extend(model.condition, { targetType: "bool" }));

    };


    var JunctionSettingsViewModel = function(model, context) {

        this.context = context;

        this.members = ko.observableArray(_.map(model.junctions, function(j) {
            return new JunctionSettingViewModel(j, context);
        }));
    }

    return {
        calculation: {
            definitions: {
                ValueViewModel: ValueViewModel,
                PropertyReferenceViewModel: PropertyReferenceViewModel,
                ExpressionViewModel: ExpressionViewModel
            },

            types: _.clone(calculationTypes),

        },

        junctions: {
            JunctionSettingsViewModel: JunctionSettingsViewModel,
            JunctionSettingViewModel: JunctionSettingViewModel
        }
    }


});