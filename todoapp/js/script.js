//classes to change badge color
let priorityClasses = { 'Low': 'badge-primary', 'Medium': 'badge-warning', 'High': 'badge-danger', 'Completed': 'badge-success' };
let taskListClasses = { 'Low': '', 'Medium': 'list-task-medium', 'High': 'list-task-high', 'Completed': 'list-task-completed' };
//object to hold single task

//Array to hold all tasks
var tasks = [];

//number to maintain current selected task index in array
var taskNo = 0;
var lastSelection = -1;

//function to add a new task or update a existing task
var addOrUpdateTask = function(title, description, priority, status, position = -1) {
    var task = {
        'title': title,
        'description': description,
        'priority': priority,
        'status': status
    }
    if (position == -1) {
        tasks.push(task);
        taskNo = tasks.length - 1;
    } else {
        tasks[position] = task;
    }


}


//function to update status of a task
var updateTaskStatus = (position) => {
    if (document.getElementById('todo_update_task_status').innerHTML == 'Mark as Completed')
        tasks[position].status = 'Completed';
    else
        tasks[position].status = 'Not Completed';
}


var renderTask = function(position, previous = -1) {

    //check if no task is shown currently, and add task form is open

    const task = tasks[position];
    if (document.getElementById('todo_add_form').style.display != 'none') {
        document.getElementById('todo_add_form').className += ' hide-section';
        document.getElementById('todo_holder_single').className = 'col-12 col-md-8';
    }

    //reseting previous selection by assigning the status classes
    if (previous != -1) {
        let previousItem = document.getElementById(previous);
        previousItem.className = 'list-group-item ';
        let itemBg = taskListClasses[tasks[previous].priority];
        if (tasks[previous].status == 'Completed') {
            itemBg = taskListClasses['Completed'];
        }
        previousItem.className += itemBg;
        console.log("previous: " + previousItem.id + " " + previousItem.className);
    }


    //updating current selection
    document.getElementById(position).className += ' active';
    console.log("Current: " + document.getElementById(position).className);
    document.getElementById('todo_task_title').innerHTML = task.title;
    document.getElementById('todo_task_desc').innerHTML = task.description;

    let badge = document.getElementById('todo_task_priority');
    badge.innerHTML = task.priority;
    badge.className = 'badge ' + priorityClasses[task.priority];

    let updateStatusBtn = document.getElementById('todo_update_task_status');
    let updateBtn = document.getElementById('todo_update_task');
    if (task.status == 'Completed') {
        badge.className = 'badge ' + priorityClasses.Completed;

        updateStatusBtn.innerHTML = 'Revise this task';
        updateStatusBtn.className = 'btn btn-primary';

        updateBtn.innerHTML = 'Delete Task';
        updateBtn.className = 'btn btn-danger';
    } else {
        updateStatusBtn.innerHTML = 'Mark as Completed';
        updateStatusBtn.className = 'btn btn-success';
        updateBtn.innerHTML = 'Update Task';
        updateBtn.className = 'btn btn-primary';
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
        list += '<li class="list-group-item ' + itemBg + '" style="width: 100%" id="' + idx + '">' + task.title + '</li>';
        idx += 1;
    });

    document.getElementById('todo_task_list').innerHTML = list;
}

var getEventTarget = function(e) {
    e = e || window.event;
    return e.target || e.srcElement;
}

var loadForm = function(position) {
    console.log('i am being called');
    document.getElementById('todo_holder_single').className += ' hide-section';
    document.getElementById('todo_add_form').className = "col-12 col-md-8";
    if (tasks[position] != null) {
        document.getElementById('add_task_title').value = tasks[position].title;
        document.getElementById('add_task_description').value = tasks[position].description;
        let priority = tasks[position].priority;

        document.getElementById('priority_' + priority.toLowerCase()).checked = 'checked';
    }
}

var fetchFormDataAndUpdate = function(position) {
    let title = document.getElementById('add_task_title').value;
    let desc = document.getElementById('add_task_description').value;
    let priority = "Low";
    if (document.getElementById('priority_low').checked)
        priority = "Low";
    else if (document.getElementById('priority_medium').checked)
        priority = "Medium";
    else if (document.getElementById('priority_high').checked)
        priority = "High";

    addOrUpdateTask(title, desc, priority, "Not Completed", position);
    renderTaskslist();

}


document.onreadystatechange = () => {

    let updateFlag = false;
    if (document.readyState === 'complete') {
        renderTaskslist();
        if (tasks.length == 0) {
            document.getElementById('todo_holder_parent').className += ' hide-section';
            document.getElementById('todo_empty').className = "container-fluid";
        } else {
            // document.getElementById('todo_holder_parent').className = 'container';
            // document.getElementById('todo_empty').className = "container-fluid  hide-section";
            renderTask(0);
            taskNo = 0;
        }

        document.getElementById('add_todo_item').addEventListener('click', function() {
            loadForm();
            console.log("add item called");

        });

        document.getElementById('add_initial_item').addEventListener('click', function() {
            document.getElementById('todo_holder_parent').className = 'container';
            document.getElementById('todo_empty').className = "container-fluid  hide-section";
            loadForm();
            console.log("im dsa");
        })
        document.getElementById('todo_task_list').addEventListener('click', function(event) {
            var target = getEventTarget(event);
            let idx = target.id;
            if (taskNo == idx)
                return;
            else {
                lastSelection = taskNo;
                taskNo = target.id;
                console.log(taskNo + " " + lastSelection);
                console.log("item clicked: " + taskNo);
                renderTask(taskNo, lastSelection);
            }
        });



        document.getElementById('submit_task').addEventListener('click', function() {
            if (updateFlag) {
                fetchFormDataAndUpdate(taskNo);
                renderTask(taskNo, lastSelection);
                updateFlag = false;
            } else {
                fetchFormDataAndUpdate();
                renderTask(tasks.length - 1);
            }

        });

        document.getElementById('todo_update_task').addEventListener('click', function() {
            console.log(document.getElementById('todo_update_task').innerHTML);
            if (document.getElementById('todo_update_task').innerHTML == 'Delete Task') {
                tasks.splice(taskNo, 1);
                taskNo = tasks.length > 0 ? 0 : -1;
                lastSelection = taskNo;
                renderTaskslist();
                if (taskNo != -1)
                    renderTask(taskNo);
                else {
                    document.getElementById('todo_holder_parent').className = 'container hide-section';
                    document.getElementById('todo_empty').className = "container-fluid";

                }
            } else {
                loadForm(taskNo);
                updateFlag = true;
            }


        });

        document.getElementById('todo_update_task_status').addEventListener('click', function() {
            console.log(taskNo);
            updateTaskStatus(taskNo);
            renderTask(taskNo);
        })
    }
}