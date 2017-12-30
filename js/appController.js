/**
 * Called when an item is to be added to the Todo list
 */
TodoListController.onAddItem = function() {
	// Make the view for adding items visible
	TodoListView.setAddTodoListContainerVisibility(true);

	// Add listener to the cancel button
	TodoListView.cancelCreateTodoListButton.onclick = function(){
		TodoListView.setAddTodoListContainerVisibility(false);		
	};

	// Add listener to the create button
	TodoListView.createTodoListButton.onclick = function() {
		if(TodoListView.todoListContent.value == '') {
			TodoListView.displayEnterContentMessage();
		}
		else {
			TodoListView.setAddTodoListContainerVisibility(false);
			TodoListController.addItemToTodoList(TodoListView.todoListContent.value);
		}
	};

	// If the user clicks on the transparent modal, close it
	window.onclick = function(event) {
		if(event.target == TodoListView.addTodoListContainer) {
			TodoListView.setAddTodoListContainerVisibility(false);
		}
	}
};

/**
 * Function to show the ui to add an item to the todo list
 */
TodoListView.addTodoListButton.onclick = function(){
	TodoListView.todoListContent.value = '';
	TodoListController.onAddItem();
};

/**
 * Add item to the todo list
 */
TodoListController.addItemToTodoList = function(item) {
	let id = uniqueString();

	// Display the item
	TodoListView.addItemToTodoListContainer(item, id, this.toggleTodoListIndicator, 
		this.deadlineListener, this.deleteTodoListItem);

	// Save the item to the local storage
	TodoList.load();
	TodoList.add(id, {content: item, deadline: 0, isCompleted: 0});
	TodoList.save();
};

/**
 * Mark the todo list item as completed or not
 */
TodoListController.toggleTodoListIndicator = function(elem) {
	TodoListView.toggleTodoListIndicator(elem);

	let todoListItemKey = elem.getAttribute('data-todo-item-id');
	let todoStatus = elem.getAttribute('data-todo-list-status');

	TodoList.update(todoListItemKey, {isCompleted: todoStatus});
	TodoList.save();
};

/**
 * Deletes an item from the todo list
 */
TodoListController.deleteTodoListItem = function(elem) {
	TodoListView.deleteTodoListItem(elem);

	TodoList.delete(elem.getAttribute('data-todo-item-id'));
	TodoList.save();
};

/**
 * Global variable to temporarily hold the
 * the item. The timer id will be set as an
 * attribute to this element so that it can be retrieved to
 * be cancelled when the todo list item completed
 */
let todoListItem;

/**
 * Shows the ui to select the time this todo list will
 * run for before alerting the user
 */
TodoListController.deadlineListener = function(item) {
	TodoListView.setTodoListDeadlineContainerVisibility(true);

  	// Temporarily hold the item to set the timer id attribute to it
  	todoListItem = item;

  	// If the user clicks on the transparent modal, close it
	window.onclick = function(event) {
		if(event.target == TodoListView.todoListDeadlineContainer) {
			TodoListView.setTodoListDeadlineContainerVisibility(false);
		}
	}
};

/**
 * Sets the value of the deadline the todo list should stop
 */
TodoListController.deadlineValueListener = function(type) {
	let counter = 0;

  	// 1 minute
  	if(type == 'm') {
  		counter = 60000;
  	}
  	// 1 hour
  	else if(type == 'h') {
  		counter = 3600000;
  	}
  	// 1 day
  	else {
  		counter = 86400000;
  	}

	let timerId = setTimeout(function() {
		// Play a sound when done to alert the user
		TodoListView.notification.play();
		alert("Deadline reached");
	}, counter);

	let todoListItemKey = todoListItem.getAttribute('data-todo-item-id');
	TodoList.update(todoListItemKey, {deadline: counter});
	TodoList.save();

	// Add the timer id here so that the timer can be stopped when
	// the todo list is checked or deleted
	todoListItem.setAttribute('data-todo-list-timer-id', timerId);

	// Hide when done
	TodoListView.setTodoListDeadlineContainerVisibility(false);
};

TodoListController.retrieveSavedTodoListItems = function() {
	TodoList.load();
	if(TodoList.items) {
		let keys = Object.keys(TodoList.items);

		for(let i = 0, j = keys.length; i < j; i++) {
			let tempKey = keys[i];
			let tempItem = TodoList.items[tempKey];

			let todoListItem = TodoListView.addItemToTodoListContainer(tempItem.content, 
				tempKey, TodoListController.toggleTodoListIndicator, 
				TodoListController.deadlineListener, TodoListController.deleteTodoListItem);

			// Set the timer to start running and add the timer id to the todoListItem div
			if(tempItem.deadline != 0) {
				let timerId = setTimeout(function() {
					// Play a sound when done to alert the user
					TodoListView.notification.play();
					alert("Deadline reached");
				}, tempItem.deadline);

				// Add the timer id here so that the timer can be stopped when
				// the todo list is checked or deleted
				todoListItem.setAttribute('data-todo-list-timer-id', timerId);
			}
			
			// Set if the tsk is completed or not
			todoListItem.setAttribute('data-todo-list-status', tempItem.isCompleted == '0' ? '1' : '0');
			TodoListView.toggleTodoListIndicator(todoListItem);
		}
	}
}();



/**
 * Function to handle voice recognition
 */
/*TodoListController.handleVoiceInput = function() {
	// Check if the browser supports speech recognition
    if (window.hasOwnProperty('webkitSpeechRecognition')) {

      var recognition = new webkitSpeechRecognition();

      recognition.lang = "en-US";
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.start();

      recognition.onresult = function(e) {
      	// Append the transcribed sound to the text area
      	TodoListView.todoListContent.value = e.results[0][0].transcript;
        recognition.stop();
      };

      recognition.onerror = function(e) {
        recognition.stop();
      }
    }
};*/


