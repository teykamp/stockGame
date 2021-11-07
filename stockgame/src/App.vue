<template>
  	<div id="app">
		<div v-for="company in currentCompaniesList" :key="company.id">
    		<Company v-bind="company" />
		</div>
		<div v-for="event in currentEventsList" :key="event.id">
			<Event v-bind="events" />
		</div>
  	</div>
</template>

<script>
import CompanyObj from '../classes/Company.js'
import EventObj from '../classes/Event.js'
import Company from './components/Company.vue'
import Event from './components/Event.vue'

export default {
  	name: 'App',
  	components: {
    	Company,
		Event,
  	},
	data() {
		return {
			globID: 0,
			companyList: [],
			eventList: [],
			currentCompaniesList: [],
			currentEventsList: [],
			currentPositiveIndustries: [],
			currentNegativeIndustries: [],
		}
	},
	methods: {
		initCompanies() {
			// parse code
			this.globID++;
		},

		initEvents() {
			// parse code
			this.globID++;
		},

		updateGameState() {
			
			for (company in this.currentCompaniesList) {
				this.checkUpdateMarket(company); // adding/removing market
				// check if compnay added
				for (industry in this.company.relatedIndustries) {
					if (this.currentPositiveIndustries.includes(industry)) {
						company.stockFluctuate(/* get value from somewhere */);
					}
					if (this.currentNegativeIndustries.includes(industry)) {
						company.stockFluctuate(/* get value from somewhere */);
					}
				}
				company.stockFluctuate(); // normal random flux
			}
		},

		checkUpdateMarket(company) {
			this.currentCompaniesList.filter(company.stockPrice <= 0);
		},

	},
	mounted() {
		this.initCompanies();
		this.initEvents();
		// create timer here that runs this function every x seconds
		this.updateGameState();
	},
}
</script>

<style>

</style>
