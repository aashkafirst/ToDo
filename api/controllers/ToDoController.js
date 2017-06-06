/**
 * ToDoController
 *
 * @description :: Server-side logic for managing Todoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	add: function (req, res) {
  	//sails.log(req.body['name']);
  	ToDo.create(req.body).exec(function (err, task){
  	if (err) 
  	{ return res.serverError(err); }
	//sails.log(task);
  	return res.end('added');
	});
  },
  updateStatus: function (req, res) {
  	//sails.log(req.body['done']+req.body['tid']);
  	ToDo.update({name:req.body['name'], deadline:req.body['deadline']},{'done':req.body['done']}).exec(function (err, task){
  	if (err) 
  	{ return res.serverError(err); }
	//sails.log(task);
  	return res.end('added');
	});
  },
  edit:function(req, res){
  	sails.log(req.body['task']['deadline']+req.body['task']['name']);
  	ToDo.update({deadline:req.body['task']['deadline'], name:req.body['task']['name']},{name:req.body['newName']}).exec(function afterwards(err, updated){
	  if (err) {
	    // handle error here- e.g. `res.serverError(err);`
	    return;
	  }
  		//sails.log('Updated user to have name ' + updated[0].name);
  		return res.end('edited');
	});
  },
  delete: function(req, res){
  	sails.log(req.body['deadline']+req.body['name']);
  	ToDo.destroy({deadline:req.body['deadline'], name:req.body['name']}).exec(function (err){
  	if (err) 
  	{ 
  		return res.serverError(err);
  	}
  	return res.end('deleted');
	});
  },
  getAllTasks: function(req, res){
  	ToDo.find({}).exec(function (err, tasks){
  	//sails.log(tasks);
  	if (err) 
  	{ 
  		return res.serverError(err); 
  	}
  	var taskSet=[];
  	for(var i=0;i<tasks.length;i++){
  		taskSet.push({'deadline':tasks[i]['deadline'],'name':tasks[i]['name'],'done':tasks[i]['done']});
  	}
	//sails.log(taskSet);
	res.json({'tasks':taskSet});
  	return res.end('getAllTasks');
	});
  }
};

