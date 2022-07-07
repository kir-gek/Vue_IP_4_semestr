<template>
	<v-app id="inspire">
		<v-system-bar app dark>
			<div class="mr-5">Кирилл Гекман 201-322</div>
			<v-divider />
			<div class="ml-5">Курсовая работа | Django + Vue</div>
		</v-system-bar>

		<v-navigation-drawer v-model="drawer" app mini-variant expand-on-hover>
			<v-list>
				<v-list-item
					v-for="[icon, text, link] in links"
					:key="icon"
					link
					:to="link"
					class="mb-3"
				>
					<v-list-item-icon>
						<v-icon>{{ icon }}</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>{{ text }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>

				<v-divider></v-divider>

				<v-list-item class="mt-3" link>
					<v-dialog
						transition="dialog-bottom-transition"
						max-width="600"
						v-model="dialog"
					>
						<template v-slot:activator="{ on, attrs }">
							<div
								class="d-flex align-center"
								color="primary"
								v-bind="attrs"
								v-on="on"
								hover
							>
								<v-list-item-icon>
									<v-icon>mdi-plus</v-icon>
								</v-list-item-icon>

								<v-list-item-content>
									<v-list-item-title>Создать команду</v-list-item-title>
								</v-list-item-content>
							</div>
						</template>
						<template v-slot:default>
							<v-card>
								<v-toolbar color="primary" dark>Создать команду</v-toolbar>
								<v-card-text>
									<v-form
										ref="form"
										class="pa-5"
										v-model="valid"
										lazy-validation
									>
										<h6 class="text-h6">Создать команду</h6>

										<v-text-field
											v-model="name"
											:counter="15"
											:rules="nameRules"
											label="Название команды"
											required
										></v-text-field>

										<v-text-field
											v-model="sport"
											:rules="sportRules"
											:counter="15"
											label="Вид спорта"
											required
										></v-text-field>

										<v-btn
											color="primary"
											class="mt-5"
											style="width: 100%"
											:disabled="!valid"
											@click="formHandler"
											>Создать команду</v-btn
										>
									</v-form>
								</v-card-text>
							</v-card>
						</template>
					</v-dialog>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-main>
			<router-view></router-view>
		</v-main>
	</v-app>
</template>

<script>
export default {
	name: 'App',

	data: () => ({
		drawer: null,
		links: [
			['mdi-account-group', 'Команды', '/'],
			['mdi-alpha-g-circle', 'Игры', '/games'],
		],

		valid: false,
		dialog: false,

		name: '',
		nameRules: [
			v => !!v || 'Название команды обязательно!',
			v =>
				(v && v.length <= 15) ||
				'Название команды не может быть больше 15 символов!',
		],

		sport: '',
		sportRules: [
			v => !!v || 'Вид спорта обязателен!',
			v =>
				(v && v.length <= 15) || 'Вид спорта не может быть больше 15 символов!',
		],
	}),

	methods: {
		async formHandler() {
			if (this.$refs.form.validate()) {
				try {
					await this.$store.dispatch('Teams/createTeam', {
						name: this.name,
						type_of_sport: this.sport,
					})
				} catch (e) {
					console.log(e)
				}

				this.$refs.form.reset()
				this.dialog = false
			}
		},
	},
}
</script>

<style>
.v-main__wrap {
	height: 100%;
}
</style>
