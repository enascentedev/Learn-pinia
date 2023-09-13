import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
	state: () => ({
		tasks: [],
		loading: false,
	}),

	getters: {
		//  getter que retorna um array de tarefas favoritas
		favs() {
			return this.tasks.filter((element) => element.isFav);
		},

		favCount() {
			return this.tasks.reduce((acc, element) => {
				return element.isFav ? acc + 1 : acc;
			}, 0);
		},
		//  getter que retorna o número total de tarefas
		totalCount: (state) => {
			return state.tasks.length;
		},
	},
	actions: {
		async getTasks() {
			this.loading = true;

			// get data do json usando json server
			const res = await fetch("http://localhost:3000/tasks");
			const data = await res.json();

			this.tasks = data;
			this.loading = false;
		},
		addTask(task) {
			this.tasks.push(task);
		},
		deleteTask(id) {
			this.tasks = this.tasks.filter((t) => {
				return t.id !== id;
			});
		},
		toggleFav(id) {
			const task = this.tasks.find((t) => t.id === id);
			task.isFav = !task.isFav;
		},
	},
});
