/**
 * Initialise the necessary objects
 */

 /**
 * A todo list object which represents a todo list
 */
var TodoList = {};

/**
 * Object for managing the views
 */
 var TodoListView = {
 	container: document.createElement('div'),
 	
 	invalidate: function() {
 		document.body.appendChild(this.container);
 	}
 };

/**
 * Object for controlling the interactions
 */
 var TodoListController = {};




