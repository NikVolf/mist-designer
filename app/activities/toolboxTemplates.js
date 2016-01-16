/**
 * Created by nikky on 1/16/2016.
 */

define([
    'text!./tpl/event.toolbox.html',
    'text!./tpl/gate.toolbox.html',
    'text!./tpl/task.toolbox.html'
], function(eventToolboxTemplate, gateToolboxTemplate, taskToolboxTemplate){


    return {
        event: eventToolboxTemplate,
        gate: gateToolboxTemplate,
        task: taskToolboxTemplate
    };


});