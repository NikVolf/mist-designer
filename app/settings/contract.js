/**
 * Created by nikky on 1/16/2016.
 */

define(['text!./tpl/contract.html', 'text!./tpl/diagramSource.html', './messaging'],
    function(template, diagramSourceTemplate, messaging){



    return {
        hide: function(diagram) {
            this.__hideSettings();
        },

        show: function(diagram) {
            this.diagram = diagram;
            this.__showHtmlOverlay(template);

            this.ensureSettings(this.diagram);

            this.__showSettings();
        },

        __showHtmlOverlay: function(overlayTemplate) {
            if (this.__htmlRootElement)
            {
                this.__htmlRootElement.remove();
            }

            this.__htmlContainer = this.diagram.htmlContainer;
            this.__htmlContainer.style({ 'background-color': 'white' });
            this.__htmlRootElement = this.__htmlContainer.append("div").attr("class", "md-diagram-html-overlay")
                .html(overlayTemplate);
        },

        showSource: function(diagram) {
            this.ensureSettings(diagram);
            this.diagram = diagram;
            this.rawModel = {
                json: ko.observable(JSON.stringify(
                        {
                            contract: this.diagram.settings.toModel(),
                            activities: _.pluck(this.diagram.collection.models, "attributes")
                        },
                        null,
                        4)),
                jsonImport: function() {

                }
            }

            this.__showHtmlOverlay(Handlebars.compile(diagramSourceTemplate));

            this.__showSource();
        },

        __showSource: function() {
            ko.applyBindings(this.rawModel, this.__htmlRootElement.node());
        },

        ensureSettings: function(diagram) {
            if (!diagram.settings) {
                diagram.settings = new messaging.viewModels.ContractContext({})
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
            this.__htmlRootElement = null;
        }
    }

});