//classes to change badge color
let priorityClasses = { 'Low': 'badge-primary', 'Medium': 'badge-warning', 'High': 'badge-danger', 'Completed': 'badge-success' };
let taskListClasses = { 'Low': '', 'Medium': 'list-task-medium', 'High': 'list-task-high', 'Completed': 'list-task-completed' };
//object to hold single task
var task = {
    'title': 'test',
    'description': 'testtest',
    'priority': 'Low',
    'status': 'Not Completed'
};

var task1 = {
    'title': 'test 1',
    'description': 'testtest',
    'priority': 'Medium',
    'status': 'Not Completed'
}

var task2 = {
    'title': 'test 2',
    'description': 'testtest',
    'priority': 'High',
    'status': 'Not Completed'
}
//Array to hold all tasks
var tasks = [task, task1, task1, task, task2];

//number to maintain current selected task index in array
var taskNo = 0;
var lastSelection = -1;

var addOrUpdateTask = function(title, description, priority, status, position = -1) {
    var task = {
        'title': title,
        'description': description,
        'priority': priority,
        'status': status
    }
    if (position == -1) {
        tasks.push(task);
        console.log("task added");
    } else {
        tasks[position] = task;
        console.log("task updated");
        if (document.getElementById('todo_update_task').innerHTML == 'Delete Task') {
            tasks.splice(position, 1);
            console.log("task deleted");
        }
    }

}

var updateTaskStatus = function(position) {
    if (document.getElementById('todo_update_task_status').innerHTML == 'Mark as Completed')
        tasks[position].status = 'Completed';
    else
        tasks[position].status = 'Not Completed';
}


var renderTask = function(position, previous = -1) {

	//check if no task is shown currently, and add task form is open

    const task = tasks[position];
    if(document.getElementById('todo_add_form').style.display != 'none'){
    	document.getElementById('todo_add_form').className += ' hide-section';
    	document.getElementById('todo_holder_single').className = 'col-12 col-md-8';
    }

    //reseting previous selection by assigning the status classes
    if (previous != -1) {
        let previousItem = document.getElementById(previous);
        previousItem.className = 'list-group-item ';
        let itemBg = taskListClasses[tasks[previous].priority];
        if (task.status == 'Completed') {
            itemBg = taskListClasses['Completed'];
        }
        previousItem.className += itemBg;
    }


    //updating current selection
    document.getElementById(taskNo).className += ' active';

    document.getElementById('todo_task_title').innerHTML = task.title;
    document.getElementById('todo_task_desc').innerHTML = task.description;

    let badge = document.getElementById('todo_task_priority');
    badge.innerHTML = task.priority;
    badge.className = 'badge ' + priorityClasses[task.priority];


    if (task.status == 'Not Completed') {
        document.getElementById('todo_update_task_status').innerHTML = 'Mark as Completed';
    } else {
        badge.className += priorityClasses.Completed;
        let updateStatusBtn = document.getElementById('todo_update_task_status');
        updateStatusBtn.innerHTML = 'Revise this task';
        updateStatusBtn.className += 'btn-primary';
        let updateBtn = document.getElementById('todo_update_task');
        updateBtn.innerHTML = 'Delete Task';
        updateBtn.className += 'btn-danger';
    }
}

var renderTaskslist = function() {

    let list = '';
    let idx = 0;

    tasks.map(task => {
        let itemBg = taskListClasses[task.priority];
        if (task.status == 'Completed') {
            itemBg = taskListClasses['Completed'];
        }
        list += '<li class="list-group-item ' + itemBg + '" style="width: 100%" id="' + idx + '">' + task.title + '&ensp;&ensp;' + idx + '</li>';
        idx += 1;
    });

    document.getElementById('todo_task_list').innerHTML = list;
}

var getEventTarget = function(e) {
    e = e || window.event;
    return e.target || e.srcElement;
}


document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        renderTaskslist();
        renderTask(0);
    }

    document.getElementById('todo_task_list').addEventListener('click', function(event) {
        var target = getEventTarget(event);
        let idx = target.id;
        if (taskNo == idx)
            return;
        else {
            lastSelection = taskNo;
            taskNo = target.id;
            console.log(taskNo + " " + lastSelection);
            renderTask(taskNo, lastSelection);
        }
	});

    document.getElementById('add_todo_item').addEventListener('click', function(){
    	console.log("add item called");
    	document.getElementById('todo_holder_single').className += ' hide-section';
    	document.getElementById('todo_add_form').className = "col-12 col-md-8";
    });
}