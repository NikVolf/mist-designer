/**
 * Created by nikky on 1/16/2016.
 */

define([
    'diagram-designer',
    './toolboxTemplates',
    '../settings/messaging',
    'text!./tpl/event.html',
    'text!./tpl/event.settings.html'
],

function(designer, toolboxTemplates, messaging, eventTemplate, eventSettingsTemplate)
{

    var EventDefinition = function() {
        this.offset = { left: 0, top: 0 };
        this.view = EventDefinition.ToolboxElement;
        this.type = "Event";
    };

    EventDefinition.Activity = designer.activities.Activity.extend({

        signatureTemplateHtml: function() {
            return eventSettingsTemplate;
        },

        defaultModelAttributes: {
            size: {
                width: 70,
                height: 70
            },

            definition: {
                signature: {
                    declaringParameters: [],
                    hasReturnType: false
                },
                contextMapping: []
            }
        },

        initialize: function(cfg) {

            _.bindAll(this, "signatureTemplateHtml");

            designer.behaviors.setupDeclarative(this,
                'rectangular-resizers',
                'rectangular-shaped-connector-set',
                'info-button');

            designer.behaviors.infoWindow.setup(this, {
                html: this.signatureTemplateHtml,
                width: "600px",
                height: "300px"
            });

            designer.behaviors.titled.setup(this, designer.behaviors.titled.undersideLayoutPreset);
            _.extend(cfg,
                {
                    template: eventTemplate
                });

            designer.behaviors.subActivitySpawnSequence.setup(this, { sequence: toolboxTemplates.createStandartSequence() });


            designer.activities.Activity.prototype.initialize.apply(this, [cfg]);
        },

        __infoWindowAfterShow: function() {

            var definition = this.model.get("definition");

            messaging.editMethod(
                {
                    signature: definition.signature,
                    map: definition.contextMapping,
                    save: function(updates) {
                        definition.signature = JSON.parse(JSON.stringify(updates.signature));
                        definition.contextMapping = JSON.parse(JSON.stringify(updates.map))
                    }
                },
                {
                    context: this.parent.settings,
                    element: this.overlayInfoWindow.select(".md-event-definition").node()
                }
            );
        }
    });

    EventDefinition.ToolboxElement = designer.toolbox.Element.extend({

        initialize: function() {
            designer.toolbox.Element.prototype.initialize.apply(this, arguments);
            this.tpl = Handlebars.compile(toolboxTemplates.event);
        }
    });

    return EventDefinition;
});