/**
 * Created by nvolf on 19.01.2016.
 */

define([
    './stringTemplateEngine',
    'text!./tpl/junctions.html'
],

function(stringTemplateEngine,
         junctionsTemplate
    )
{

    var calculationTypes = {
        property: "calculation.property",
        expression: "calculation.expression",
        value: "calculation.value"
    };

    var calculationTypeNames = {
        "calculation.property": "property",
        "calculation.expression": "expression",
        "calculation.value": "value"
    };

    var PropertyReferenceViewModel = function(model, context) {
        this.context = context;
        this.path = ko.observable(model.path);

        this.isEditMode = ko.observable(false);
    };

    var ExpressionViewModel = function(model, context) {
        this.context = context;
        this.expression = ko.observable(model.expression);

        this.isEditMode = ko.observable(false);
    };

    var ValueViewModel = function(model, context) {
        this.context = context;
        this.value = ko.observable(model.value);

        this.isEditMode = ko.observable(false);
    };

    ko.templates['junctions'] = junctionsTemplate;

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
                globalNames: ko.computed(function () {
                    var targetType = this.targetType();
                    return _.chain(context.globals.members())
                        .filter(function (g) {
                            return !targetType || g.type() == targetType
                        })
                        .map(function (g) {
                            return g.name();
                        })
                        .value();
                }, this)
            });

        this.type = ko.observable(model.type || calculationTypes.property);

        this.definitions = {
            value: new ValueViewModel({ value: model.type == calculationTypes.value ? model.value : "" }, this.context),
            expression:  new ExpressionViewModel({ expression: model.type == calculationTypes.expression ? model.expression : "" }, this.context),
            property:  new PropertyReferenceViewModel({ path: model.type == calculationTypes.property ? model.path : "" }, this.context)
        }

        this.typeReference = ko.observableArray(_.toArray(calculationTypes));

        this.isEditMode = ko.observable(false);

        this.edit = function() { this.isEditMode(true); }
    };

    var JunctionSettingViewModel = function(model, context) {

        this.context = context;

        this.path = ko.observable(model.path);

        this.condition = new CalculationViewModel(_.extend(model.condition, { targetType: "bool" }), context);

        this.description = ko.observable(model.description);

        this.isEditMode = ko.observable(false);

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