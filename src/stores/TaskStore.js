import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
	state: () => ({
		tasks: [
			{ id: 1, title: "Livro x", isFav: false },
			{ id: 2, title: "Livro y", isFav: true },
		],

		name: "Mario",
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
});
