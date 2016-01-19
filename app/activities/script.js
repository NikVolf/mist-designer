/**
 * Created by nikky on 1/16/2016.
 */

define([
    'diagram-designer',
    './toolboxTemplates',
    'text!./tpl/script.html',
    'text!./tpl/script.settings.html',
], function(designer, toolboxTemplates, scriptTemplate, scriptSettingsTemplate){

    var ScriptDefinition = function() {
        this.offset = { left: 30, top: 0 };
        this.view = ScriptDefinition.ToolboxElement;
        this.type = "Script";
    };

    ScriptDefinition.Activity = designer.activities.Activity.extend({


        paramsMappingTemplateHtml: function() {
            return scriptSettingsTemplate;
        },


        initialize: function(cfg) {

            _.bindAll(this, "paramsMappingTemplateHtml");

            designer.behaviors.setupDeclarative(this,
                'rectangular-resizers',
                'rectangular-shaped-connector-set',
                'info-button',
                'titled');

            designer.behaviors.infoWindow.setup(this, {
                html: this.paramsMappingTemplateHtml,
                width: "600px",
                height: "300px"
            });

            designer.behaviors.subActivitySpawnSequence.setup(this, { sequence: toolboxTemplates.createStandartSequence() });

            _.extend(cfg, {
                template: scriptTemplate
            });
            designer.activities.Activity.prototype.initialize.apply(this, [cfg]);
        }
    });

    ScriptDefinition.ToolboxElement = designer.toolbox.Element.extend({

        initialize: function() {
            designer.toolbox.Element.prototype.initialize.apply(this, arguments);
            this.tpl = Handlebars.compile(toolboxTemplates.script)
        }
    });


    return ScriptDefinition;

});