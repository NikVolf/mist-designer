/**
 * Created by nikky on 1/16/2016.
 */

define([
    'diagram-designer',
    './toolboxTemplates',
    'text!./tpl/task.html',
    'text!./tpl/task.settings.html',
], function(designer, toolboxTemplates, taskTemplate, taskSettingsTemplate){

    var TaskDefinition = function() {
        this.offset = { left: 0, top: 0 };
        this.view = TaskDefinition.ToolboxElement;
        this.type = "Task";
    };

    TaskDefinition.Activity = designer.activities.Activity.extend({


        paramsMappingTemplateHtml: function() {
            return taskSettingsTemplate;
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
                template: taskTemplate
            });
            designer.activities.Activity.prototype.initialize.apply(this, [cfg]);
        }
    });

    TaskDefinition.ToolboxElement = designer.toolbox.Element.extend({

        initialize: function() {
            designer.toolbox.Element.prototype.initialize.apply(this, arguments);
            this.tpl = Handlebars.compile(toolboxTemplates.task)
        }
    });


    return TaskDefinition;

});