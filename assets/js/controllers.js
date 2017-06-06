angular.module('ToDo.controllers', []).
controller('ToDoCtrl', function($scope, $rootScope, ToDoService) {
    console.log(JSON.stringify($scope.toDos));

    ToDoService.getAllTasks().then(function (data) {
        $scope.toDos=data.data['tasks'];
        console.log(JSON.stringify($scope.toDos));
    }, function (err){
        alert("try again"+JSON.stringify(err));
    });

    function sameTaskExists(toDo){
    	for(var i=0;i<$scope.toDos.length;i++)
    		if(toDo.name==$scope.toDos[i]['name'] && toDo.deadline==$scope.toDos[i]['deadline'])
    			return 1;
    	return 0;
    }

	$scope.add = function(){
		console.log($scope.deadline);
		var task={"name":$scope.formTodoText,"deadline":$scope.deadline,"done":false};
		var sameTask=sameTaskExists(task);
		if($scope.formTodoText!='' && $scope.formTodoText!=undefined && $scope.deadline!='' && $scope.deadline!=undefined && !sameTask)
		{
			$scope.formTodoText = '';
			$scope.deadline = '';
			console.log(JSON.stringify($scope.toDos));
			ToDoService.add(task).then(function (data) {
				$scope.toDos.push(task);
				alert("added successfully"+JSON.stringify(task));
         	}, function (err) {
				alert("try again"+JSON.stringify(err));
		 	});	
		}
		if(sameTask)
		{
			$scope.formTodoText = '';
			$scope.deadline = '';
			alert("You already created that task");
		}
		
	};

	/*$scope.edit=function(toDo){
		var newName = prompt("Edit task name", toDo.name);
		if(newName!=toDo.name){
			var sameTask=sameTaskExists({"name":newName,"deadline":toDo.deadline,"done":toDo.done});
			console.log(sameTask);
			if(sameTask)
				alert("You already created that task");
			else
			{
				for(var i=0;i<$scope.toDos.length;i++){
					if($scope.toDos[i]['name']==toDo['name'] && $scope.toDos[i]['deadline']==toDo['deadline'])
					{
						console.log($scope.toDos[i]['name']+toDo['name']);
						ToDoService.edit(toDo,newName).then(function(data){
							$scope.toDos[i]['name']=newName;
							alert("edited successfully");
						},function(err){
							alert(JSON.stringify(err));
						});		
						break;
					}
				}	
			}
				
		}
	};*/

	$scope.editName=function(toDo){
		console.log("newName"+$rootScope.new);
		if($rootScope.new!=toDo.name){
			var sameTask=sameTaskExists({"name":$rootScope.new,"deadline":toDo.deadline,"done":toDo.done});
			console.log(sameTask);
			if(sameTask)
				alert("You already created that task");
			else
			{
				for(var i=0;i<$scope.toDos.length;i++){
					if($scope.toDos[i]['name']==toDo['name'] && $scope.toDos[i]['deadline']==toDo['deadline'])
					{
						console.log($scope.toDos[i]['name']+toDo['name']);
						ToDoService.edit(toDo,$rootScope.new).then(function(data){
							$scope.toDos[i]['name']=$rootScope.new;
							alert("edited successfully");
						},function(err){
							alert(JSON.stringify(err));
						});		
						break;
					}
				}	
			}
				
		}
	};

	$scope.editDeadline=function(toDo){
		console.log($rootScope.new);
	}

	$scope.done=function(toDo){
		console.log(JSON.stringify(toDo));
		ToDoService.updateStatus(toDo).then(function(){
			alert("updated status");
		},function(err){
			alert(JSON.stringify(err));
		})
	};

	$scope.delete=function(toDo){
		console.log(JSON.stringify(toDo));
		ToDoService.delete(toDo).then(function (data) {
			for(var i=0;i<$scope.toDos.length;i++){
				if($scope.toDos[i]['name']==toDo['name'] && $scope.toDos[i]['deadline']==toDo['deadline'])
					$scope.toDos.splice(i,1);
			}
			alert("deleted successfully");
        }, function (err) {
			alert("try again"+JSON.stringify(err));
		});		
	}
	
});