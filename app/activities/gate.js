/**
 * Created by nikky on 1/16/2016.
 */

define([
        'diagram-designer',
        './toolboxTemplates',
        'text!./tpl/gate.html',
        'text!./tpl/gate.settings.html'
    ],

function(designer, toolboxTemplates, gateTemplate, gateSettingsTemplate)
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
                width: 100,
                height: 100
            },

            signature: {
                parameters: []
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

            designer.activities.Activity.prototype.initialize.apply(this, [cfg]);
        },

        __infoWindowAfterShow: function() {
            ko.applyBindings(
                this.model.attributes,
                this.overlayInfoWindow.select(".md-gate-definition").node());
        }
    });

    GateDefinition.ToolboxElement = designer.toolbox.Element.extend({

        initialize: function() {
            designer.toolbox.Element.prototype.initialize.apply(this, arguments);
            this.tpl = Handlebars.compile(toolboxTemplates.gate);
            this.modelOptions = JSON.parse(JSON.stringify(GateDefinition.Activity.prototype.defaultModelAttributes));
        }
    });

    return GateDefinition;
});