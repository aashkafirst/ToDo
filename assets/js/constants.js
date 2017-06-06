var domain='http://localhost:1337/';
angular.module('ToDo.constants', [])

.constant('Constants',{
      'addTaskURL':domain+'add',
      'editTaskURL':domain+'edit',
      'deleteTaskURL':domain+'delete',
      'updateStatusURL':domain+'updateStatus',
      'getAllTasksURL':domain+'getAllTasks'
})