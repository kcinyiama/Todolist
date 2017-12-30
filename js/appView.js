/**
 * Creates an manages the views
 */
 TodoListView.renderComponentsView = function(){
 	// Create a header for the title
 	let header = document.createElement('header');
 	header.className = "header";

 	let h3 = document.createElement('h3');
 	h3.innerHTML = 'Todo List';

 	header.appendChild(h3);

 	// Add the audio tag
 	let audio = document.createElement('audio');
 	audio.id = 'todo-list-audio';

 	let source = document.createElement('source');
 	source.src = 'raw/pling.mp3';
 	source.type = 'audio/mpeg';

 	audio.appendChild(source);

 	// Add the button to create a new todo list item
  	let button = document.createElement('div');
  	button.id = 'fab';

  	let icon = document.createElement('p');
  	icon.innerHTML = '+';
  	icon.className = 'cross';

  	button.appendChild(icon);

  	// Add the button to the object for use by the controller
  	// when items are to be added
  	TodoListView.addTodoListButton = button;
  	TodoListView.notification = audio;

 	TodoListView.container.appendChild(header);
 	TodoListView.container.appendChild(audio);
 	TodoListView.container.appendChild(button);
 };

 TodoListView.renderAddTodoListView = function(){
	let addTodoListButton = document.createElement('button');
	addTodoListButton.innerHTML = 'ADD';
	addTodoListButton.className = 'modal-button';

	let dividerLine = document.createElement('div');
    dividerLine.style.marginTop = '20px';
    dividerLine.style.marginBottom = '20px';
    dividerLine.className = 'todo-list-divider';

    // let voiceRecognition = document.createElement('img');
    // voiceRecognition.src = 'img/ic_keyboard_voice.png';

	let cancelButton = document.createElement('span');
    cancelButton.innerHTML = '&times;';
    cancelButton.className = 'modal-cancel';

	let textarea = document.createElement('textarea');
    textarea.focus();
    textarea.rows = '10';
    textarea.cols = '30';
    textarea.id = 'todo-list-content';
    textarea.placeholder = 'What do you want to do?';

	let addTodoListContent = document.createElement('div');
	addTodoListContent.className = 'modal-content';
	addTodoListContent.appendChild(cancelButton);
	addTodoListContent.appendChild(textarea);
	// addTodoListContent.appendChild(voiceRecognition);
	addTodoListContent.appendChild(dividerLine);
	addTodoListContent.appendChild(addTodoListButton);

	let addTodoListContainer = document.createElement('div');
    addTodoListContainer.id = 'modal';
    addTodoListContainer.className = 'modal-box';
    addTodoListContainer.appendChild(addTodoListContent);

    TodoListView.todoListContent = textarea;
    TodoListView.createTodoListButton = addTodoListButton; 
    TodoListView.cancelCreateTodoListButton = cancelButton;
    TodoListView.addTodoListContainer = addTodoListContainer;

    TodoListView.container.appendChild(TodoListView.addTodoListContainer);
 };

 TodoListView.renderConfigureDeadlineView = function() {
	let dayDeadline = document.createElement('div');
 	dayDeadline.innerHTML = 'Day';
 	dayDeadline.className = 'modal-time-remainder';
 	dayDeadline.onclick = function() {
 		TodoListController.deadlineValueListener('d');
 	};

 	let hourDeadline = document.createElement('div');
 	hourDeadline.innerHTML = 'Hour';
 	hourDeadline.className = 'modal-time-remainder';
 	hourDeadline.onclick = function() {
 		TodoListController.deadlineValueListener('h');
 	};

 	let minuteDeadline = document.createElement('div');
 	minuteDeadline.innerHTML = 'Minute';
 	minuteDeadline.className = 'modal-time-remainder';
 	minuteDeadline.onclick = function() {
 		TodoListController.deadlineValueListener('m');
 	};

 	let timeDeadlineContainer = document.createElement('div');
 	timeDeadlineContainer.style.margin = '10px';
 	timeDeadlineContainer.appendChild(minuteDeadline);
 	timeDeadlineContainer.appendChild(hourDeadline);
 	timeDeadlineContainer.appendChild(dayDeadline);

 	let timeContainerContentTitle = document.createElement('div');
 	timeContainerContentTitle.innerHTML = 'Remind me in the next';

 	let timeContainerContent = document.createElement('div');
 	timeContainerContent.className = 'modal-time-content';
 	timeContainerContent.appendChild(timeContainerContentTitle);
 	timeContainerContent.appendChild(timeDeadlineContainer);

 	let timeContainer = document.createElement('div');
 	timeContainer.id = 'modal-time';
 	timeContainer.className = 'modal-box';
 	timeContainer.appendChild(timeContainerContent);

 	TodoListView.todoListDeadlineContainer = timeContainer;
 	TodoListView.container.appendChild(timeContainer);
 };

 TodoListView.renderTodoListContainerView = function() {
 	let todoListContainer = document.createElement('div');
 	todoListContainer.id = 'todo-list-container';

 	TodoListView.todoListContainer = todoListContainer;
 	TodoListView.container.appendChild(TodoListView.todoListContainer);
 };

 TodoListView.renderComponentsView();
 TodoListView.renderAddTodoListView();
 TodoListView.renderConfigureDeadlineView();
 TodoListView.renderTodoListContainerView();
 TodoListView.invalidate();

 /**
  * Fuction to make the container visible to allow todo list items to be created
  */
 TodoListView.setAddTodoListContainerVisibility = function(isVisible){
 	TodoListView.addTodoListContainer.style.display = isVisible ? 'block' : 'none';
 };

 TodoListView.setTodoListDeadlineContainerVisibility = function(isVisible) {
 	TodoListView.todoListDeadlineContainer.style.display = isVisible ? 'block' : 'none';
 };

  /**
   * Function to alert the user to input something
   */
  TodoListView.displayEnterContentMessage = function() {
  	alert('Write something to do');
  };

  TodoListView.addItemToTodoListContainer = function(item, todoItemId, indicatorListener, 
  	deadlineListener, deleteListener) {
  	// Holds one todo list item
	let todoListItem = document.createElement("div");
	todoListItem.className = "todo-list-item";
	todoListItem.setAttribute('data-todo-item-id', todoItemId);

	let todoIndicator = document.createElement("div");
	todoIndicator.className = "todo-list-indicator";

	let divBlock = document.createElement("div");
	divBlock.style.display = "inline-block";

	let todoDetail = document.createElement("div");
	todoDetail.className = "todo-list-item-detail";

	let todoTextNode = document.createTextNode(item);
	todoDetail.appendChild(todoTextNode);

	let todoDuration = document.createElement("div");
	todoDuration.className = "todo-list-item-time";

	let date = new Date();
	let todoTimeElem = document.createTextNode("Created on " + 	date.toLocaleString('en-GB'));
	todoTimeElem.className = "todo-list-item-time";
	todoDuration.appendChild(todoTimeElem);

	let utilDivBlock = document.createElement("div");
	utilDivBlock.style.float = "right";
	utilDivBlock.style.clear = "right";
	utilDivBlock.style.marginTop = "10";
	utilDivBlock.style.display = "inline-block";

	let todoImg = document.createElement("img");
	todoImg.src = "img/ic_timer.png";

	let todoDelete = document.createElement("img");
	todoDelete.src = "img/ic_delete.png";

	utilDivBlock.appendChild(todoImg);
	utilDivBlock.appendChild(todoDelete);

	divBlock.appendChild(todoDetail);
	divBlock.appendChild(todoDuration);

	todoListItem.appendChild(todoIndicator);
	todoListItem.appendChild(divBlock);
	todoListItem.appendChild(utilDivBlock);

	// Add the click listener here so that it will be visible
	// to the controller
	todoImg.onclick = function() {
		deadlineListener(todoListItem);
	};
	todoDelete.onclick = function() {
		deleteListener(todoListItem);
	};
	todoIndicator.onclick = function() {
		indicatorListener(todoListItem);
	};

	let divider = document.createElement("div");
	divider.className = "todo-list-divider";

	TodoListView.todoListContainer.appendChild(divider);
	TodoListView.todoListContainer.appendChild(todoListItem);

	return todoListItem;
  };

  TodoListView.toggleTodoListIndicator = function(todoListItem) {
	let date = todoListItem.getElementsByClassName('todo-list-item-time')[0];
	let detail = todoListItem.getElementsByClassName('todo-list-item-detail')[0];
	let indicator = todoListItem.getElementsByClassName('todo-list-indicator')[0];

	// If the item is clicked twice, toggle between completed
	// and uncompleted
	let todoStatus = todoListItem.getAttribute('data-todo-list-status');

	if(todoStatus == '1') {
		date.style.textDecoration = "none";	
		detail.style.textDecoration = "none";
		indicator.style.backgroundColor = "white";
		todoListItem.setAttribute('data-todo-list-status', '0');
	}
	else {
		indicator.style.backgroundColor = "#66BB6A";
		date.style.textDecoration = "line-through";
		detail.style.textDecoration = "line-through";
		todoListItem.setAttribute('data-todo-list-status', '1');
		
		let timerId = todoListItem.getAttribute('data-todo-list-timer-id');
		if(timerId) {
			clearTimeout(timerId);
			todoListItem.setAttribute('data-todo-list-timer-id', "");
		}
	}
  };

  TodoListView.deleteTodoListItem = function(todoItem) {
	todoItem.style.display = 'none';

	let parent = todoItem.parentElement;
	parent.children[1].style.display = 'none';

	// Delete the todo list divider
	todoItem.previousElementSibling.style.display = 'none';

	// Stop the timer if the item is to be deleted
	var timerId = todoItem.getAttribute('data-todo-list-timer-id');
	if(timerId) {
		clearTimeout(timerId);
		todoItem.setAttribute('data-todo-list-timer-id', "");
	}
  };








