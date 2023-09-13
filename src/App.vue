<template>
	<main>
		<!-- heading -->
		<header>
			<img src="https://pinia.vuejs.org/logo.svg" alt="pinia logo" />
			<h1>Aprendendo Pinia</h1>
		</header>

		<!-- new task form -->
		<div class="new-task-form">
			<TaskForm />
		</div>

		<!-- filter -->
		<nav class="filter">
			<button @click="filter = 'all'">Todas as tarefas</button>
			<button @click="filter = 'favs'">Tarefas favoritas</button>
		</nav>

		<!-- task list -->
		<div class="task-list" v-if="filter === 'all'">
			<p>Voce tem {{ taskStore.totalCount }} tarefas que faltam fazer.</p>
			<div v-for="task in taskStore.tasks" :key="task.id">
				<TaskDetails :task="task" />
			</div>
		</div>
		<div class="task-list" v-if="filter === 'favs'">
			<p>Você tem {{ taskStore.favCount }} tarefas na sua lista de favoritos</p>
			<div v-for="task in taskStore.favs" :key="task.id">
				<TaskDetails :task="task" />
			</div>
		</div>
	</main>
</template>

<script>
import TaskDetails from "./components/TaskDetails.vue";
import TaskForm from "./components/TaskForm.vue";
import { useTaskStore } from "./stores/TaskStore";
import { ref } from "vue";

export default {
	components: { TaskDetails, TaskForm },
	setup() {
		const taskStore = useTaskStore();

		// fetch tasks
		taskStore.getTasks();

		const filter = ref("all");

		return { taskStore, filter };
	},
};
</script>
