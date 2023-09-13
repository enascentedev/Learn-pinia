import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
	state: () => ({
		tasks: [],
		loading: false,
	}),

	getters: {
		// Getter que retorna um array de tarefas favoritas
		favs() {
			return this.tasks.filter((element) => element.isFav);
		},

		favCount() {
			return this.tasks.reduce((acc, element) => {
				return element.isFav ? acc + 1 : acc;
			}, 0);
		},
		// Getter que retorna o número total de tarefas
		totalCount: (state) => {
			return state.tasks.length;
		},
	},
	actions: {
		async getTasks() {
			this.loading = true;

			// Obtém dados do JSON usando json server
			const res = await fetch("http://localhost:3000/tasks");
			const data = await res.json();

			this.tasks = data;
			this.loading = false;
		},
		async addTask(task) {
			this.tasks.push(task);
			const res = await fetch("http://localhost:3000/tasks", {
				method: "POST",
				body: JSON.stringify(task),
				headers: { "Content-Type": "application/json" },
			});

			if (res.error) {
				console.log(res.error);
			}
		},
		async deleteTask(id) {
			this.tasks = this.tasks.filter((t) => {
				return t.id !== id;
			});

			const res = await fetch("http://localhost:3000/tasks/" + id, {
				method: "DELETE",
			});

			if (res.error) {
				console.log(res.error);
			}
		},
		async toggleFav(id) {
			const task = this.tasks.find((t) => t.id === id);
			task.isFav = !task.isFav;

			const res = await fetch("http://localhost:3000/tasks/" + id, {
				method: "PATCH",
				body: JSON.stringify({ isFav: task.isFav }),
				headers: { "Content-Type": "application/json" },
			});

			if (res.error) {
				console.log(res.error);
			}
		},
	},
});
