import axios from 'axios'
import Vue from 'vue'


const Groups = {
	namespaced: true,

	state: () => ({
		activeItems: [],
		countOfActiveItems: 0,
		page: 1
	}),

	mutations: {
		setActiveItems(state, activeItems) {
			state.activeItems = activeItems
		},

		setCountOfActiveItems(state, countOfActiveItems) {
			state.countOfActiveItems = countOfActiveItems
		},

		setPage(state, page) {
			state.setPage = page
		},
	},

	actions: {
		async fetchGames({ commit, state }, payload) {
			try {
				const { offsetQuery } = payload

				console.log(offsetQuery);

				const res = await axios(
					`/api/game?offset=${offsetQuery}`,
				)

				const games = []
				for (const game of res.data.results) {
					const team1 = await axios(`/api/team/${game.team1}`)
					const team2 = await axios(`/api/team/${game.team2}`)

					games.push({...game, teamName1: team1.data.name, teamName2: team2.data.name })
				}

				commit('setActiveItems', games)
				commit('setCountOfActiveItems', res.data.count)
			} catch (e) {
				console.log(e)
			}
		},

		async addGame({ commit, state }, payload) {
			try {
				const res = await axios.post(
					`/api/game/`,
					{
						...payload
					}
				)

				console.log(res)
			} catch (e) {
				console.log(e)
			}
		}
	},

	getters: {
		getActiveItems: state => state.activeItems,
		getCountOfActiveItems: state => state.countOfActiveItems,
	},
}

export default Groups
