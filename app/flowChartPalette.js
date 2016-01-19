/**
 * Created by nvolf on 28.12.2015.
 */
/**
 * Created by nvolf on 17.12.2015.
 */
define([
        'diagram-designer',
        './activities/event',
        './activities/task',
        './activities/script',
        './activities/gate',
        './activities/toolboxTemplates'
    ],

    function(designer, EventDefinition, TaskDefinition, ScriptDefinition, GateDefinition, toolboxTemplates) {


        var FlowDefinition = function() {
            this.offset = { left: 0, top: 0 };
            this.view = FlowDefinition.ToolboxElement;
            this.type = "Flow";
        };

        FlowDefinition.ToolboxElement = designer.toolbox.Element.extend({
            initialize: function() {
                designer.toolbox.Element.prototype.initialize.apply(this, arguments);
                this.tpl = Handlebars.compile(toolboxTemplates.flow)
            }
        });


        var modelReference = {
            'Flow': designer.activities.Flow,
            'Task': TaskDefinition.Activity,
            'Script': ScriptDefinition.Activity,
            'Event': EventDefinition.Activity,
            'Gate': GateDefinition.Activity,

            matchModel: function(model) {
                return this[model.attributes.type]
            }
        };

        var TasksGroup = designer.toolbox.Group.extend({
            initialize: function(options) {
                designer.toolbox.Group.prototype.initialize.apply(this, arguments);

                this.position = { x: 0, y: 10};
                this.height = 50;

                this.elements.push(new TaskDefinition());
                this.elements.push(new ScriptDefinition());

                this.id = "tasksGroup";
                this.title = "Tasks"
            }
        });

        var EventsGroup = designer.toolbox.Group.extend({
            initialize: function(options) {
                designer.toolbox.Group.prototype.initialize.apply(this, arguments);

                this.position = { x: 0, y: 60};
                this.height = 50;


                this.elements.push(new EventDefinition());

                this.id = "eventsGroup";
                this.title = "Events"
            }
        });

        var GatesGroup = designer.toolbox.Group.extend({
            initialize: function(options) {
                designer.toolbox.Group.prototype.initialize.apply(this, arguments);

                this.position = { x: 0, y: 110};
                this.height = 50;


                this.elements.push(new GateDefinition());

                this.id = "gatesGroup";
                this.title = "Gates"
            }
        });

        var FlowsGroup = designer.toolbox.Group.extend({
            initialize: function(options) {
                designer.toolbox.Group.prototype.initialize.apply(this, arguments);

                this.position = { x: 0, y: 160};
                this.height = 50;


                this.elements.push(new FlowDefinition());

                this.id = "flowsGroup";
                this.title = "Control Flow"
            }
        });

        return Marionette.Object.extend({
            install: function(diagram) {
                diagram.toolboxView.pushGroup(new TasksGroup({ container: diagram.toolboxView }));
                diagram.toolboxView.pushGroup(new EventsGroup({ container: diagram.toolboxView }));
                diagram.toolboxView.pushGroup(new FlowsGroup({ container: diagram.toolboxView }));
                diagram.toolboxView.pushGroup(new GatesGroup({ container: diagram.toolboxView }));
                diagram.modelMapper.addMapper(modelReference);
            }
        });

    });