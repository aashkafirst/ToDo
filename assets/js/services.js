angular.module('ToDo.services', [])

    .service('ToDoService', function($http, Constants) {
        this.add = function(task) { 
        	console.log(JSON.stringify(task));
            return $http.post(Constants.addTaskURL, task);
        };
        this.updateStatus = function(task) { 
        	console.log(JSON.stringify(task));
            return $http.post(Constants.updateStatusURL, task);
        };
        this.edit = function(task, newName) { 
        	console.log(task['name']+newName);
        	var json={"task":task,"newName":newName};
            return $http.post(Constants.editTaskURL, json);
        };
        this.delete = function(task) { 
        	console.log(JSON.stringify(task));
            return $http.post(Constants.deleteTaskURL, task);
        };
        this.getAllTasks=function(){
        	console.log("getAllTasks");
        	return $http.post(Constants.getAllTasksURL);
        }
        
    });