//classes to change badge color
let priorityClasses = { 'Low': 'badge-primary', 'Medium': 'badge-warning', 'High': 'badge-danger', 'Completed': 'badge-success' };
let taskListClasses = { 'Low': '', 'Medium': 'list-task-medium', 'High': 'list-task-high', 'Completed': 'list-task-completed' };

//method to render a task
let renderTask = function(position, previous = -1) {

    //check if no task is shown currently, and add task form is open

    const task = todoApp.tasks[position];
    if ($('#todo_add_form').css('display') != 'none') {
        $('#todo_add_form').addClass(' hide-section');
        $('#todo_holder_single').attr('class', 'col-12 col-md-8');
    }

    //reseting previous selection by assigning the status classes
    if (previous != -1) {
        let previousItem = $("#" + previous);
        previousItem.attr('class', 'list-group-item ');
        let itemBg = taskListClasses[todoApp.tasks[previous].priority];
        if (todoApp.tasks[previous].status == 'Completed') {
            itemBg = taskListClasses['Completed'];
        }
        previousItem.addClass(itemBg);
    }


    //updating current selection
    $("#" + position).addClass('active');
    $('#todo_task_title').html(task.title);
    $('#todo_task_desc').html(task.description);

    let badge = $('#todo_task_priority');
    badge.html(task.priority);
    badge.attr('class', 'badge ' + priorityClasses[task.priority]);

    let updateStatusBtn = $('#todo_update_task_status');
    let updateBtn = $('#todo_update_task');
    if (task.status == 'Completed') {
        badge.attr('class', 'badge ' + priorityClasses.Completed);

        updateStatusBtn.html('Revise this task');
        updateStatusBtn.attr('class', 'btn btn-primary');

        updateBtn.html('Delete Task');
        updateBtn.attr('class', 'btn btn-danger');
    } else {
        updateStatusBtn.html('Mark as Completed');
        updateStatusBtn.attr('class', 'btn btn-success');
        updateBtn.html('Update Task');
        updateBtn.attr('class', 'btn btn-primary');
    }
    console.log("rendering item");
}


let renderTasksList = function() {

    let list = '';
    let idx = 0;

    todoApp.tasks.map(task => {
        let itemBg = taskListClasses[task.priority];
        if (task.status == 'Completed') {
            itemBg = taskListClasses['Completed'];
        }
        list += '<li class="list-group-item ' + itemBg + '" style="width: 100%" id="' + idx + '">' + task.title + '</li>';
        idx += 1;
    });

    $('#todo_task_list').html(list);
}


//Class to hold all tasks
function TodoApp(tasks) {
    this.tasks = tasks;
    this.addTask = function(task) {
        this.tasks.push(task);
    };
    this.render = renderTask;
    this.renderList = renderTasksList;
}

let todoApp = new TodoApp([]);
//number to maintain current selected task index in array
let taskNo = 0;
let lastSelection = -1;

//class to hold a task obj
function Task(title, description, priority, status) {
    this.title = title,
        this.description = description,
        this.priority = priority,
        this.status = status,
        this.toggle = new function() {
            this.status = this.status == 'Not Completed' ? 'Completed' : 'Not Completed';
        }
}


//function to add a new task or update a existing task
let addOrUpdateTask = function(title, description, priority, status, position = -1) {
    let task = new Task(title, description, priority, status);

    if (position == -1) {
        console.log(task);
        postTasks("http://mvcapi.local.sahusoft.info/todos/add_task.php", task, position);
    } else {
        task['task_id'] = todoApp.tasks[position]['task_id'];
        postTasks("http://mvcapi.local.sahusoft.info/todos/update_task.php", task, position);
    }


}

//function to update tasks fetched from server
let updateTasks = function(tasksResponse) {

    if (tasksResponse['status'] == 'successful') {
        console.log(tasksResponse);
        todoApp.tasks = tasksResponse['data'];
        console.log(todoApp.tasks);
        todoApp.renderList();
        if (todoApp.tasks.length == 0 && typeof todoApp.task != 'string') {
            $('#todo_holder_parent').addClass('hide-section');
            $('#todo_empty').attr('class', 'container-fluid');
        } else {
            //  $('todo_holder_parent').className = 'container';
            // $('todo_empty').className = "container-fluid  hide-section";
            todoApp.render(0);
            taskNo = 0;
        }

    } else {
        alert('error updating task');
    }
}

//function to update status of a task
let updateTaskStatus = (position) => {
    if ($('#todo_update_task_status').html() == 'Mark as Completed')
        todoApp.tasks[position].status = 'Completed';
    else
        todoApp.tasks[position].status = 'Not Completed';
}



let getEventTarget = function(e) {
    e = e || window.event;
    return e.target || e.srcElement;
}

let loadForm = function(position) {
    console.log('i am being called');
    $('#todo_holder_single').addClass('hide-section');
    $('#todo_add_form').attr('class', "col-12 col-md-8");
    if (todoApp.tasks[position] != null) {
        $('#add_task_title').val(todoApp.tasks[position].title);
        $('#add_task_description').val(todoApp.tasks[position].description);
        let priority = todoApp.tasks[position].priority;

        $('#priority_' + priority.toLowerCase()+":checked").val(true);
    }
}

let fetchFormDataAndUpdate = function(position) {
    let title = $('#add_task_title').val();
    let desc = $('#add_task_description').val();
    let priority = "Low";
    if ($('#priority_low:checked').val())
        priority = "Low";
    else if ($('#priority_medium:checked').val())
        priority = "Medium";
    else if ($('#priority_high:checked').val())
        priority = "High";

    addOrUpdateTask(title, desc, priority, "Not Completed", position);

}

let postTasks = (url, task, position) => {

    jQuery.post(url, task, function(data) {
        console.log(data);
        if (data['status'] == 'successful') {
            
            if (position == -1) {
                task['task_id'] = data['data'];
                todoApp.addTask(task);
                taskNo = todoApp.tasks.length - 1;

            } else {
                todoApp.tasks[position] = task;
                taskNo = position;

            }
            todoApp.renderList();
            todoApp.render(taskNo, lastSelection);
            console.log(todoApp.tasks);
        } else {
            alert("Something went wrong.");
        }
    });
}


let getTasks = (url) => {


    jQuery.get(url, function(data) {
        console.log(data);
        updateTasks(data);
    });
}

let deleteTaskFromServer = (url) => {
    jQuery.get(url, function(data) {
        console.log(data);

        if (data['status'] == 'successful') {
            todoApp.tasks.splice(taskNo, 1);
            taskNo = todoApp.tasks.length > 0 ? 0 : -1;
            lastSelection = taskNo;
            todoApp.renderList();
            if (taskNo != -1)
                todoApp.render(taskNo);
            else {
                $('#todo_holder_parent').attr('class', 'container hide-section');
                $('#todo_empty').attr('class', "container-fluid");

            }
        }
    });
}

$(document).ready(function() {
    let updateFlag = false;

    getTasks("http://mvcapi.local.sahusoft.info/todos/read_task.php");

    $("#add_todo_item").click(function() {
        loadForm();
        console.log("add item called");
    });

    $("#add_initial_item").click(function() {

        $('#todo_holder_parent').attr('class', 'container');
        $('#todo_empty').attr('class', 'container-fluid  hide-section');
        loadForm();
        console.log("im dsa");
    });


    $('#todo_task_list').click(function(event) {
        let target = getEventTarget(event);
        let idx = target.id;
        if (taskNo == idx)
            return;
        else {
            lastSelection = taskNo;
            taskNo = target.id;
            console.log(taskNo + " " + lastSelection);
            console.log("item clicked: " + taskNo);
            todoApp.render(taskNo, lastSelection);
        }
    });



    $('#submit_task').click(function() {

        if (updateFlag) {
            fetchFormDataAndUpdate(taskNo);
            updateFlag = false;
        } else {
            fetchFormDataAndUpdate();

        }

    });

    $('#todo_update_task').click(function() {

        if ($('#todo_update_task').html() == 'Delete Task') {
            deleteTaskFromServer("http://mvcapi.local.sahusoft.info/todos/delete_task.php?task_id=" + todoApp.tasks[taskNo]['task_id']);
        } else {
            loadForm(taskNo);
            updateFlag = true;
        }


    });

    $('#todo_update_task_status').click(function() {
        console.log(taskNo);
        updateTaskStatus(taskNo);
        todoApp.render(taskNo);
    });


});