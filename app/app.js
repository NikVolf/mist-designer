/**
 * Created by nvolf on 22.12.2015.
 */

define(['diagram-designer',
        'app/stateMachinePalette',
        'app/flowChartPalette',
        './settings/api'
    ],
function(designer, StateMachinePalette, FlowChartPalette, settings) {

    return Marionette.Object.extend({
        showDiagram: function() {
            this.diagram = new designer.Diagram({ toolboxWidth: 120, toolboxHeight: 1000, size: { width: "1900px", height: "700px" } });
            this.diagram.render();

            settings.contract.ensureSettings(this.diagram);

            //var stateMachinePalette = new StateMachinePalette();
            //stateMachinePalette.install(this.diagram);

            var flowChartPalette = new FlowChartPalette();
            flowChartPalette.install(this.diagram);

            $(window).on("resize", this.diagram.resize.bind(this.diagram));
            $(".settings-diagram").on("click", function() {
                if (this.contractSettingsActive) {
                    settings.contract.hide();
                    this.contractSettingsActive = false;
                    return;
                }
                this.contractSettingsActive = true;
                settings.contract.show(this.diagram);
            }.bind(this));
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
