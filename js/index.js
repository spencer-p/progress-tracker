/*
 * index.js
 * manages tasks n whatever w/ vue
 */

var task = {
	STORAGE_KEY: 'tasks',

	get_stored: function() {
		var tasks;
		
		// Get tasks from local storage
		if (localStorage.getItem(task.STORAGE_KEY)) {
			tasks = JSON.parse(localStorage.getItem(task.STORAGE_KEY));
		}

		// Generate new tasks and store them
		else {
			tasks = generate_tasks();
			task.store(tasks);
		}

		return tasks;
	},

	// Store the tasks in local storage
	store: function(tasks) {
		localStorage.setItem(task.STORAGE_KEY, JSON.stringify(tasks));
	},

	// Generate a new task with name
	new: function(name) {
		return {
			name: name,
			days: [],
			color: 'pink'
		}
	},

	// Mark a task's day as completed (& store)
	complete: function(day, complete = true) {
		day.complete = complete;
		task.store(vue.tasks);
	}
};

function add_new_task() {
	// Skip if no task name
	if (vue.new_task_name == undefined || vue.new_task_name.length == 0) {
		return;
	}

	// Create new task
	var new_task = task.new(vue.new_task_name);

	// Append to the task list
	vue.tasks.splice(vue.tasks.length, 0, new_task);

	// Reset the task name
	vue.new_task_name = undefined;

	// Store the data
	task.store(vue.tasks);
}

// Temp function to create dummy tasks
// FIXME delet this
function generate_tasks() {
	var list = [];
	for (var name of ["practice", "exercise", "homework"]) {
		var t = task.new(name);
		list.splice(list.length, 0, t);
		var days = Math.floor(10*Math.random());
		for (var i = 0; i < days; i++) {
			t.days.splice(t.days.length, 0, {complete: Math.random()>0.5});
		}
	}
	return list;
}

// Vue obj
var vue = new Vue({
	el: '#tasks',
	data: {
		tasks: task.get_stored(),
		new_task_name: undefined,
		editing: false,
	},
	methods: {
		complete: task.complete,
		append: add_new_task,
	}
});

// Show the tasks div once all that JS is loaded
document.getElementById("tasks").style.display = "flex";
