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
					<v-toolbar-title>Команды</v-toolbar-title>
				</v-toolbar>
			</template>
		</v-data-table>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'Teams',

	data() {
		return {
			loading: true,
			options: {},
			headers: [
				{ text: 'Имя', value: 'name', sortable: false },
				{ text: 'Вид спорта', value: 'type_of_sport', sortable: true },
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

			const prefixDirectionSort = sortDesc[0] ? '' : '-'

			const payload = {
				offsetQuery: (page - 1) * 5,
				orderingQuery: prefixDirectionSort + sortBy,
			}

			await this.$store.dispatch('Teams/fetchTeams', payload)

			this.loading = false
		},
	},

	computed: {
		...mapGetters({
			getActiveItems: 'Teams/getActiveItems',
			getCountOfActiveItems: 'Teams/getCountOfActiveItems',
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
