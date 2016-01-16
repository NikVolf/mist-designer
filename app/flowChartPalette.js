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
        './activities/gate'
    ],

    function(designer, EventDefinition, TaskDefinition, GateDefinition) {


        var FlowDefinition = function() {
            this.offset = { left: 0, top: 0 };
            this.view = FlowDefinition.ToolboxElement;
            this.type = "Flow";
        };

        FlowDefinition.ToolboxElement = designer.toolbox.Element.extend({
            initialize: function() {
                designer.toolbox.Element.prototype.initialize.apply(this, arguments);
                this.tpl = Handlebars.compile(
                    '<g transform="translate(13,-6) scale(0.75)"><path d="M0,12L0,47" stroke="#7f7f7f" stroke-width="2"></path>' +
                    '<polygon points="-5,27 0,11 5,27 -5,27" stroke-width="2" fill="#7f7f7f"></polygon></g>');
            }
        });


        var modelReference = {
            'Flow': designer.activities.Flow,
            'Task': TaskDefinition.Activity,
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