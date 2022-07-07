<template>
	<div class="grey lighten-3">
		<v-data-table
			:headers="headers"
			:items="getActiveItems"
			:options.sync="options"
			:server-items-length="getCountOfActiveItems"
			:loading="loading"
			class="elevation-1"
			:footer-props="{
				'items-per-page-options': [5],
			}"
			:items-per-page="5"
		>
			<template v-slot:top>
				<v-toolbar flat>
					<v-toolbar-title>Матчи</v-toolbar-title>
				</v-toolbar>
			</template>

			<template v-slot:item.teamName1="{ item }">
				<v-chip class="ma-2" :color="getColorTeam(item.teamName1)" outlined>
					{{ item.teamName1 }}
				</v-chip>
			</template>

			<template v-slot:item.teamName2="{ item }">
				<v-chip class="ma-2" :color="getColorTeam(item.teamName2)" outlined>
					{{ item.teamName2 }}
				</v-chip>
			</template>

			<template v-slot:item.score1="{ item }">
				<v-avatar :color="colorMatchResult(item.score1, item.score2)" size="24">
					<span class="white--text">{{ item.score1 }}</span>
				</v-avatar>
			</template>

			<template v-slot:item.score2="{ item }">
				<v-avatar :color="colorMatchResult(item.score2, item.score1)" size="24">
					<span class="white--text">{{ item.score2 }}</span>
				</v-avatar>
			</template>
		</v-data-table>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'Games',

	data() {
		return {
			loading: true,
			options: {},
			headers: [
				{ text: 'Название матча', value: 'title', sortable: false },
				{
					text: 'Счет 1 команды',
					value: 'score1',
					align: 'center',
					width: '10%',
					sortable: false,
				},
				{
					text: 'Счет 2 команды',
					value: 'score2',
					align: 'center',
					width: '10%',
					sortable: false,
				},
				{ text: 'Команда 1', value: 'teamName1', width: '10%', sortable: false },
				{ text: 'Команда 2', value: 'teamName2', width: '10%', sortable: false },
			],
		}
	},
	watch: {
		options: {
			handler() {
				this.getDataFromApi()
			},
			deep: true,
		},
	},
	methods: {
		async getDataFromApi() {
			this.loading = true

			const { sortBy, sortDesc, page } = this.options

			const payload = {
				offsetQuery: (page - 1) * 5,
			}

			await this.$store.dispatch('Games/fetchGames', payload)

			this.loading = false
		},

		getColorTeam(str) {
			let hash = 0
			for (let i = 0; i < str.length; i++)
				hash = str.charCodeAt(i) + ((hash << 5) - hash)

			let color = '#'
			for (let i = 0; i < 3; i++) {
				let value = (hash >> (i * 8)) & 0xff
				color += ('00' + value.toString(16)).substr(-2)
			}

			return color
		},

		colorMatchResult(score1, score2) {
			if (score1 > score2 )
				return 'green lighten-1'

			if (score1 < score2 )
				return 'red darken-3'

			if (score1 === score2)
				return 'orange lighten-1'
		},
	},

	computed: {
		...mapGetters({
			getActiveItems: 'Games/getActiveItems',
			getCountOfActiveItems: 'Games/getCountOfActiveItems',
		}),
	},
}
</script>

<style>
.v-data-footer {
	justify-content: flex-end;
	padding: 5px 0 !important;
}
</style>
