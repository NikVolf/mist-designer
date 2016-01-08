define([], function() {

    var api = {};

    api.listDiagrams = function(callback) {

        callback && callback(["diagram1"]);

    };

    api.addDiagram = function(name, callback) {
    };

    api.overwriteDiagram = function (name, json, callback) {
        callback && callback();
    };

    api.loadDiagram = function(name, callback) {

        callback && callback("[]");

    };

    return api;



});