/**
 * Created by nvolf on 28.12.2015.
 */
/**
 * Created by nvolf on 17.12.2015.
 */
define([
        'diagram-designer'
    ],

    function(designer) {

        var StateDefinition = function() {
            this.offset = { left: 0, top: 0 };
            this.view = StateDefinition.ToolboxElement;
            this.type = "StateDefinition";
        };

        StateDefinition.Activity = designer.activities.Activity.extend({
            initialize: function(cfg) {

                designer.behaviors.setupDeclarative(this,
                    'rectangular-resizers',
                    'rectangular-shaped-connector-set',
                    'info-button',
                    'info-window',
                    'titled');

                _.extend(cfg, {
                    template: '<g transform="{{dimScale}}"  class="js-activity-resize-root">' +
                    '<rect class="diagram-activity-rectangle js-activity-shape" vector-effect="non-scaling-stroke" x="0" y="0" width="100" height="100"></rect>' +
                    '</g>'
                });
                designer.activities.Activity.prototype.initialize.apply(this, [cfg]);
            }
        });

        StateDefinition.ToolboxElement = designer.toolbox.Element.extend({

            initialize: function() {
                designer.toolbox.Element.prototype.initialize.apply(this, arguments);
                this.tpl = Handlebars.compile("<rect class='js-toolbox toolbox-rectangle-primitive' x=0 y=0 width=25 height=15 />")
            }
        });

        var TransitionDefinition = function() {
            this.offset = { left: 0, top: 0 };
            this.view = TransitionDefinition.ToolboxElement;
            this.type = "Flow";
        };

        TransitionDefinition.ToolboxElement = designer.toolbox.Element.extend({
            initialize: function() {
                designer.toolbox.Element.prototype.initialize.apply(this, arguments);
                this.tpl = Handlebars.compile(
                    '<g transform="translate(13,-6) scale(0.75)"><path d="M0,12L0,47" stroke="#7f7f7f" stroke-width="2"></path>' +
                    '<polygon points="-5,27 0,11 5,27 -5,27" stroke-width="2" fill="#7f7f7f"></polygon></g>');
            }
        });


        var modelReference = {
            'Flow': designer.activities.Flow,
            'StateDefinition': StateDefinition.Activity,
            'TransitionDefinition': TransitionDefinition.Activity,

            matchModel: function(model) {
                return this[model.attributes.type]
            }
        };

        var StatesGroup = designer.toolbox.Group.extend({
            initialize: function(options) {
                designer.toolbox.Group.prototype.initialize.apply(this, arguments);

                this.position = { x: 0, y: 10};

                this.elements.push(new StateDefinition());

                this.id = "statesGroup";
                this.title = "States"
            }
        });

        var TransitionsGroup = designer.toolbox.Group.extend({
            initialize: function(options) {
                designer.toolbox.Group.prototype.initialize.apply(this, arguments);

                this.position = { x: 0, y: 60};

                this.elements.push(new TransitionDefinition());

                this.id = "transitionsGroup";
                this.title = "Transitions"
            }
        });

        return Marionette.Object.extend({
            install: function(diagram) {
                diagram.toolboxView.pushGroup(new StatesGroup({ container: diagram.toolboxView }));
                diagram.toolboxView.pushGroup(new TransitionsGroup({ container: diagram.toolboxView }));
                diagram.modelMapper.addMapper(modelReference);
            }
        });

    });