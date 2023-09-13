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

		<!-- loading -->
		<div class="loading" v-if="loading">Carregando tarefas...</div>

		<!-- task list -->
		<div class="task-list" v-if="filter === 'all'">
			<p>Voce tem {{ totalCount }} tarefas que faltam fazer.</p>
			<div v-for="task in tasks" :key="task.id">
				<TaskDetails :task="task" />
			</div>
		</div>
		<div class="task-list" v-if="filter === 'favs'">
			<p>Você tem {{ favCount }} tarefas na sua lista de favoritos</p>
			<div v-for="task in favs" :key="task.id">
				<TaskDetails :task="task" />
			</div>
		</div>

		<button @click="taskStore.$reset">resetar a store</button>
	</main>
</template>

<script>
import TaskDetails from "./components/TaskDetails.vue";
import TaskForm from "./components/TaskForm.vue";

import { useTaskStore } from "./stores/TaskStore";
import { ref } from "vue";
import { storeToRefs } from "pinia";

export default {
	components: { TaskDetails, TaskForm },
	setup() {
		const taskStore = useTaskStore();

		const { tasks, loading, favs, totalCount, favCount } =
			storeToRefs(taskStore);

		// fetch tasks
		taskStore.getTasks();

		const filter = ref("all");

		return { taskStore, filter, tasks, loading, favs, totalCount, favCount };
	},
};
</script>
