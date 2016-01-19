/**
 * Created by nikky on 1/16/2016.
 */

define([
    'diagram-designer',
    'text!./tpl/event.toolbox.html',
    'text!./tpl/gate.toolbox.html',
    'text!./tpl/task.toolbox.html',
    'text!./tpl/script.toolbox.html',
    'text!./tpl/flow.toolbox.html'

], function(designer, eventToolboxTemplate, gateToolboxTemplate, taskToolboxTemplate, scriptToolboxTemplate, flowToolboxTemplate){


    return {
        event: eventToolboxTemplate,
        gate: gateToolboxTemplate,
        task: taskToolboxTemplate,
        script: scriptToolboxTemplate,
        flow: flowToolboxTemplate,

        createStandartSequence: function() {
            return designer.activities.Sequence.create({},
                [{
                    type: 'Gate',
                    tpl: Handlebars.compile(gateToolboxTemplate)
                },
                {
                    type: 'Task',
                    tpl: Handlebars.compile(taskToolboxTemplate)
                },
                {
                    type: 'Flow',
                    tpl: Handlebars.compile(flowToolboxTemplate)
                }]);
        }
    }


});