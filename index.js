(function() {

    var designer = {};

    require.config({
        paths: {
            'd3': 'bower_components/d3/d3',
            'd3utils': 'bower_components/diagram-designer-core/js/helpers/d3utils',
            'jquery': 'bower_components/jquery/dist/jquery',
            'handlebars': 'bower_components/handlebars/handlebars',
            'backbone': 'bower_components/backbone/backbone',
            'marionette': 'bower_components/backbone.marionette/lib/backbone.marionette',
            'underscore': 'bower_components/underscore/underscore',
            'diagram-designer': 'bower_components/diagram-designer-core/lib/diagram-designer-core',
            'ko': 'bower_components/knockout/dist/knockout',
            'text': 'bower_components/text/text'
        }
    });

    require(["handlebars", "d3", "jquery", "underscore", "ko"], function (handlebars, d3, jquery, underscore, ko) {
        window.ko = ko;
        window.Handlebars = handlebars;
        window.d3 = d3;
        window.$ = jquery;
        window._ = underscore;
        require(["backbone"], function () {
            require(["marionette"], function () {
                require(['app/app', './db/diagrams'], function (DiagramApplication, diagramDB) {

                    designer.diagramDB = diagramDB;

                    designer.application = new DiagramApplication();
                    designer.application.start();

                    designer.refreshDiagrams();

                    if (designer.pendingLoad)
                        designer.reloadSelectedDiagram();
                });
            });
        });

        $(function () {

            designer.refreshDiagrams = function () {
                designer.diagramDB.listDiagrams(function (diagrams) {
                    var html = ["<select name='diagramSelector'>"];

                    for (var i = 0; i < diagrams.length; i++) {
                        html.push("<option value='" + diagrams[i] + "'>" + diagrams[i] + "</option>");
                    }

                    html.push("</select>");

                    $(".diagram-selector").html(html.join(""));

                    var $menuItem = $(".diagram-selector > select");

                    $menuItem.change(function () {
                        designer.changeSelectedDiagram($(this).val());
                    });

                    if (designer.selectedDiagram)
                        $menuItem.val(designer.selectedDiagram);
                    else if (diagrams.length > 0) {
                        designer.changeSelectedDiagram(diagrams[0]);
                    }

                })
            };

            designer.changeSelectedDiagram = function (diagram) {
                designer.selectedDiagram = diagram;
                designer.pendingLoad = true;

                if (!designer.application)
                    return;

                designer.reloadSelectedDiagram();
            };

            designer.reloadSelectedDiagram = function () {
                designer.pendingLoad = false;

                designer.diagramDB.loadDiagram(designer.selectedDiagram, function (json) {
                    designer.application.diagram.updateFromCollection();
                    designer.application.diagram.setCollection(JSON.parse(json));
                });

            };

            designer.saveDiagram = function () {
                var json = JSON.stringify(designer.application.diagram.collection.models);
                designer.diagramDB.overwriteDiagram(designer.selectedDiagram, json);
            };

            $(".add-diagram").on("click", function () {

                var diagramName = prompt("New diagram", "");

                if (diagramName) {
                    designer.diagramDB.addDiagram(diagramName, function () {
                        designer.refreshDiagrams();
                        designer.changeSelectedDiagram(diagramName);

                    })
                }
            });

            $(".save-diagram").on("click", designer.saveDiagram);
        })


    });
})();