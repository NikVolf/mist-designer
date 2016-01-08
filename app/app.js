/**
 * Created by nvolf on 22.12.2015.
 */

define(['bower_components/diagram-designer-core/js/diagram/diagram', 'app/entitiesPalette', './keypress'], function(Diagram, EntitiesPalette, keypress) {

    return Marionette.Object.extend({
        showDiagram: function(entites) {
            this.diagram = new Diagram({ toolboxWidth: 320, toolboxHeight: 2000, size: { width: "1900px", height: "900px" } });
            this.diagram.render();

            var entitiesPalette = new EntitiesPalette({ entities: entites });
            entitiesPalette.install(this.diagram);

            $(window).on("resize", this.diagram.resize.bind(this.diagram));
        },

        start: function(entities) {
            $(function() {
                this.showDiagram(entities);

                this.setupKeyListener();

            }.bind(this));

        },

        setupKeyListener: function() {
            var self = this;

            $(window.document).keydown(function(event) {
                if (event.keyCode == 46 ) {
                    this.diagram.deleteSelected();
                }
            }.bind(this));

        }
    });

});
