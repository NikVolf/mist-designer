/**
 * Created by nvolf on 28.12.2015.
 */
/**
 * Created by nvolf on 17.12.2015.
 */
define([
        'bower_components/diagram-designer-core/js/diagram/toolboxGroup',
        'bower_components/diagram-designer-core/js/diagram/toolboxElement',
        'bower_components/diagram-designer-core/js/activity/activity',
        'bower_components/diagram-designer-core/js/activity/flow',
        'bower_components/diagram-designer-core/js/behaviors/api'
    ],

    function(ToolboxGroup, ToolboxElement, Activity, FlowView, behaviors) {

        var StateDefinition = function() {
            this.offset = { left: 40, top: 0 };
            this.view = Rectangle.ToolboxElement;
            this.type = "StateDefinition";
        };

        StateDefinition.Activity = Activity.extend({
            initialize: function(cfg) {
                behaviors.rectangularResizers.setup(this);
                behaviors.rectangularShapedConnectorSet.setup(this);
                behaviors.centerAlignedTitleLayout.setup(this);
                _.extend(cfg, {
                    template: '<g transform="{{dimScale}}"  class="js-activity-resize-root">' +
                    '<rect class="diagram-activity-rectangle" vector-effect="non-scaling-stroke" x="0" y="0" width="100" height="100"></rect>' +
                    '</g>'
                });
                Activity.prototype.initialize.apply(this, [cfg]);
            }
        });

        StateDefinition.ToolboxElement = ToolboxElement.extend({

            initialize: function() {
                ToolboxElement.prototype.initialize.apply(this, arguments);
                this.tpl = Handlebars.compile("<rect class='js-toolbox toolbox-rectangle-primitive' x=0 y=0 width=25 height=15 />")
            }
        });

        var TransitionDefinition = function() {
            this.offset = { left: 0, top: 30 };
            this.view = TransitionDefinition.ToolboxElement;
            this.type = "Flow";
        };

        TransitionDefinition.ToolboxElement = ToolboxElement.extend({
            initialize: function() {
                ToolboxElement.prototype.initialize.apply(this, arguments);
                this.tpl = Handlebars.compile(
                    '<g transform="translate(13,-6) scale(0.75)"><path d="M0,12L0,47" stroke="#7f7f7f" stroke-width="2"></path>' +
                    '<polygon points="-5,27 0,11 5,27 -5,27" stroke-width="2" fill="#7f7f7f"></polygon></g>');
            }
        });


        var modelReference = {
            'Flow': FlowView,
            'StateDefinition': StateDefinition,

            matchModel: function(model) {
                return this[model.attributes.type]
            }
        };

        var StatesGroup = ToolboxGroup.extend({
            initialize: function(options) {
                ToolboxGroup.prototype.initialize.apply(this, arguments);

                this.entities = options.entities;
                this.position = { x: 0, y: 10};

                this.elements.push(new StateDefinition());

                this.id = "statesGroup";
                this.title = "States"
            }
        });

        var TransitionsGroup = ToolboxGroup.extend({
            initialize: function(options) {
                ToolboxGroup.prototype.initialize.apply(this, arguments);

                this.entities = options.entities;
                this.position = { x: 0, y: 10};

                this.elements.push(new TransitionDefinition());

                this.id = "transitionsGroup";
                this.title = "Transitions"
            }
        });

        return Marionette.Object.extend({

            initialize: function(options) {
                this.entities = options.entities;
            },

            install: function(diagram) {
                diagram.toolboxView.pushGroup(new StatesGroup({ container: diagram.toolboxView }));
                diagram.toolboxView.pushGroup(new TransitionsGroup({ container: diagram.toolboxView }));
                diagram.modelMapper.addMapper(modelReference);
            }
        });

    });