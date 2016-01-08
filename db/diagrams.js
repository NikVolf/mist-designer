var exports = module.exports = {};
var glob = require("glob");
var fs = require("fs");

exports.listDiagrams = function(callback) {

    glob(__dirname + "/**/*.n3d", {}, function (er, files) {

        var diagramNames = [];

        for (var i = 0; i < files.length; i++) {
            var diagramName = files[i].replace(__dirname.replace(/\\/g, "/") + "/", "");
            diagramName = diagramName.replace(".n3d", "");
            diagramNames.push(diagramName);
        }

        callback(diagramNames);

    })
};

exports.addDiagram = function(name, callback) {

    var json = JSON.stringify([]);

    exports.overwriteDiagram(name, json, callback);

};

function getFileName(diagramName) {
    return __dirname + "/" + diagramName + ".n3d";
}

exports.overwriteDiagram = function (name, json, callback) {

    fs.writeFile(getFileName(name), json);

    callback && callback();

};

exports.loadDiagram = function(name, callback) {

    fs.readFile(getFileName(name), "utf-8", function(err, data) {
        callback(data);
    });

};