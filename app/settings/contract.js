/**
 * Created by nikky on 1/16/2016.
 */

define(['text!./tpl/contract.html', './messaging'], function(template){


    return {
        hide: function(diagram) {
            this.__hideSettings();
        },

        show: function(diagram) {
            this.diagram = diagram;
            this.__htmlContainer = diagram.htmlContainer;
            this.__htmlContainer.style({ 'background-color': 'white' });
            this.__htmlRootElement = this.__htmlContainer.append("div").attr("class", "md-diagram-settings")
                .html(template);

            if (!diagram.settings) {
                diagram.settings = {
                    context: []
                }
            }

            this.__showSettings();
        },

        ensureSettings: function(diagram) {
            if (!diagram.settings)
            {
                diagram.settings = {
                    context: []
                }
            }
        },

        getSettings: function(diagram) {
            this.ensureSettings(diagram);
            return diagram.settings;
        },

        __showSettings: function() {
            ko.applyBindings(this.diagram.settings, this.__htmlRootElement.node());
        },

        __hideSettings: function() {
            this.__htmlContainer.style({ 'background-color': 'rgba(255, 255, 255, 0)' });
            this.__htmlRootElement.remove();
        }
    }

});