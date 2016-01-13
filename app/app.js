/**
 * Created by nvolf on 22.12.2015.
 */

define(['diagram-designer', 'app/stateMachinePalette'], function(designer, StateMachinePalette) {

    return Marionette.Object.extend({
        showDiagram: function() {
            this.diagram = new designer.Diagram({ toolboxWidth: 120, toolboxHeight: 1000, size: { width: "1900px", height: "700px" } });
            this.diagram.render();

            var stateMachinePalette = new StateMachinePalette();
            stateMachinePalette.install(this.diagram);

            $(window).on("resize", this.diagram.resize.bind(this.diagram));
        },

        start: function() {
            $(function() {
                this.showDiagram();

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
