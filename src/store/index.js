import Vue from 'vue'
import Vuex from 'vuex'
import Teams from './Teams.js'
import Games from './Games.js'

Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
	Teams, Games
  }
})

