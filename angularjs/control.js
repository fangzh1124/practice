// 	(function(){
// 		var app = angular.module('todoApp',[]);
// 		
// 		app.controller('TodoListController', function(){
// 			
// 		});
// 	})();
//
angular.module('todoApp',[])
	.controller('TodoListController', function() {
		var todoList = this;

		todoList.todoItems = [
			{ text:'learn angular js', done: false},
			{ text:'build an angular app', done: false},
		];

		todoList.addTodo = function(){
			todoList.todoItems.push({text:todoList.todoText, done: false});
			todoList.todoText='';
		};

		todoList.remaining = function(){
			var count = 0;
			angular.forEach(todoList.todoItems, function(todo){
				todo.done ? '' : count++;
			});
			return count;
		}

		todoList.remove = function(){
			for(var i = 0; i < todoList.todoItems.length-1; i++){
				if (todoList.todoItems[i].done == true) 
					todoList.todoItems.splice(i, 1);
			}
		}
	})