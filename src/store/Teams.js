import axios from 'axios'
import Vue from 'vue'


const Teams = {
	namespaced: true,

	state: () => ({
		activeItems: [],
		countOfActiveItems: 0,
	}),

	mutations: {
		setActiveItems(state, activeItems) {
			state.activeItems = activeItems
		},

		setCountOfActiveItems(state, countOfActiveItems) {
			state.countOfActiveItems = countOfActiveItems
		},
	},

	actions: {
		async fetchTeams({ commit, state }, payload) {
			try {
				const { offsetQuery, orderingQuery } = payload

				const res = await axios(
					`/api/team?limit=5&offset=${offsetQuery}&ordering=${orderingQuery}`,
				)

				commit('setActiveItems', res.data.results)
				commit('setCountOfActiveItems', res.data.count)
			} catch (e) {
				console.log(e)
			}
		},

		async createTeam({ commit, state }, payload) {
			try {
				await axios.post(
					'/api/team/',
					{
						...payload
					},
				)
			} catch (e) {
				console.log(e)
			}
		},
	},

	getters: {
		getActiveItems: state => state.activeItems,
		getCountOfActiveItems: state => state.countOfActiveItems,
	},
}

export default Teams
