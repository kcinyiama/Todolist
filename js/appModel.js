// Model class for the Todo List

function TodoList(object) {
  this.content = object.content;
  this.deadline = object.deadline;
  this.isCompleted = object.isCompleted;
 };

/**
 * Holds the todo list items in memory
 */
TodoList.items = {};

 /**
  * Function to retrieve the todo lists from the localstorage
  */
  TodoList.load = function(){
  	try {
  		let todoListString = localStorage.getItem('todoList');

  		if(todoListString) {
  			let todoList = JSON.parse(todoListString);
  			let keys = Object.keys(todoList);
  			for(let i = 0, j = keys.length; i < j; i++) {
          let tempKey = keys[i];
  				TodoList.items[tempKey] = new TodoList(todoList[tempKey]);
  			}
  		}
  	}
  	catch(e) {
  		// alert('Error while fetching saved todo lists');
      alert(e);
  	}
  };

/**
 * Function to save the todo lists to the local storage
 */
 TodoList.save = function() {
 	try {
 		let todoListString = JSON.stringify(TodoList.items);
 		localStorage.setItem('todoList', todoListString);
 	}
 	catch(e) {
 		alert('Error while saving to the local storage');
 	}
 };

/**
 * Add a newly created todo list item to the list of items in memory
 */
TodoList.add = function(id, item) {
	TodoList.items[id] = new TodoList(item);
};

/**
 * Update the exisiting todo list item
 */
TodoList.update = function(key, item) {
  let todoListItem = TodoList.items[key];

  if (item.hasOwnProperty('deadline') && item['deadline']) {
    todoListItem.deadline = item.deadline;
  }
  if (item.hasOwnProperty('isCompleted') && item['isCompleted']) {
    todoListItem.isCompleted = item.isCompleted;
  }
};

/**
 * Deletes a todo list item
 */
TodoList.delete = function(key) {
	if(TodoList.items[key]) {
		delete TodoList.items[key];
	}
};

/**
 * Empty the local storage
 */
 TodoList.destroy = function() {
 	if (confirm('Are you sure?')) {
    	TodoList.items = {};
    	localStorage.setItem('todoList', TodoList.items);
  	}
 };











