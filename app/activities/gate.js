/**
 * Created by nikky on 1/16/2016.
 */

define([
        'diagram-designer',
        './toolboxTemplates',
        '../settings/transiting',
        'text!./tpl/gate.html',
        'text!./tpl/gate.settings.html'
    ],

function(designer, toolboxTemplates, transitingSettings, gateTemplate, gateSettingsTemplate)
{

    var GateDefinition = function() {
        this.offset = { left: 0, top: 0 };
        this.view = GateDefinition.ToolboxElement;
        this.type = "Gate";
    };

    GateDefinition.Activity = designer.activities.Activity.extend({

        conditionSetTemplateHtml: function() {
            return gateSettingsTemplate;
        },

        defaultModelAttributes: {
            size: {
                width: 70,
                height: 70
            },

            junctions: [],

            cachedJunctions: {

            }
        },

        initialize: function(cfg) {

            _.bindAll(this, "conditionSetTemplateHtml");

            designer.behaviors.setupDeclarative(this,
                'rectangular-resizers',
                'rectangular-shaped-connector-set',
                'info-button');

            designer.behaviors.infoWindow.setup(this, {
                html: this.conditionSetTemplateHtml,
                width: "600px",
                height: "300px"
            });

            designer.behaviors.titled.setup(this, designer.behaviors.titled.undersideLayoutPreset);
            _.extend(cfg,
                {
                    template: gateTemplate
                });

            designer.behaviors.subActivitySpawnSequence.setup(this, { sequence: toolboxTemplates.createStandartSequence() });

            designer.activities.Activity.prototype.initialize.apply(this, [cfg]);
        },

        __infoWindowAfterShow: function() {
            var validFlows = _.filter(this.getLinkedActivities(), function(linkedFlow) {
                var flowTarget = linkedFlow.getLinkedTargetActivity();
                return flowTarget && flowTarget != this
            }, this);

            var junctions = _.map(validFlows, function(flow) {
                return {
                    id: flow.getId(),
                    path: " -> " + (flow.getLinkedTargetActivity().getTitle() || "No Title"),
                    description: flow.getTitle() || "",
                    condition: _.findWhere(this.model.attributes.junctions, { id: flow.getId() })
                        || this.model.attributes.cachedJunctions[flow.getId()]
                        || { type: transitingSettings.calculation.types.value, definition: { value: 'false' }}
                }
            }, this)

            var junctionsViewModel = new transitingSettings.junctions.JunctionSettingsViewModel(
                {
                    junctions: junctions
                },
                this.parent.settings);

            var gateSettingsViewModel = {
                junctions: junctionsViewModel
            };

            ko.applyBindings(
                gateSettingsViewModel,
                this.overlayInfoWindow.select(".md-gate-definition").node());
        }
    });

    GateDefinition.ToolboxElement = designer.toolbox.Element.extend({

        initialize: function() {
            designer.toolbox.Element.prototype.initialize.apply(this, arguments);
            this.tpl = Handlebars.compile(toolboxTemplates.gate);
        }
    });

    return GateDefinition;
});