<template>
    <div id="app">
        <EventParent ref="CallEvent" />
        <p><b>Year: {{ year }}, Time Elapsed: {{ clockTick }}</b></p>
        <p><b>TOTAL: ${{ (playerDollars + totalEquity).toFixed(2) }}</b></p>
        <p>Liquidity: ${{ playerDollars.toFixed(2) }}</p>
        <p>Equity: ${{ totalEquity.toFixed(2) }}</p>
        
        <div v-for="company in currentCompaniesList" :key="company.id">
            <Company 
                v-bind:company="company"
                v-bind:playerDollars="playerDollars"
                v-on:boughtStock="companiesBoughtStock($event)"
                v-on:soldStock="companiesSoldStock($event)"
            />
        </div>

        <!-- <div v-for="industry in industries" :key="industry.id">
            <p>
               {{ industry.instance }} {{ industry.name }} {{ (industry.val * 100 - 100).toFixed(2) }}%
            </p>
        </div> -->

        
    </div>
</template>

<script>
import CompanyObj from './classes/Company.js'
import companies from './assets/companies.json'
import industries from './assets/industries.json'
import Company from './components/Company.vue'
import EventParent from './components/EventParent.vue'
// import PlayerControls from './components/PlayerControls.vue'

export default {
      name: 'App',
      components: {
        Company,
        EventParent,
    //     PlayerControls,
      },
    data() {
        return {
            globID: 0,
            year: 2021,
            clockTick: 0,
            companyList: [],
            currentCompaniesList: [],
            totalEquity: 0,
            playerDollars: 100, // initial starting balance
            industries: industries // assigns content of industries.json to the key 'industries'
            
        }
    },
    methods: {
        companiesBoughtStock(stockPrice) {
            this.playerDollars -= stockPrice;
            this.playerBalance()
        },

        companiesSoldStock(stockPrice) {
            this.playerDollars += stockPrice;
            this.playerBalance()
        },

        playerBalance() {
            // called from companies.vue
            this.totalEquity = 0;
            for (let i = 0; i < this.currentCompaniesList.length; i++) {
                let equity = this.currentCompaniesList[i].stocksOwned * this.currentCompaniesList[i].stockPrice;
                this.totalEquity += equity;
            }
        },

        stockFluctuate(company, flux) {
            // use company obj methods
            company.stockPrice *= flux;
        },
        
        clock() { // central game clock
            
            if (this.clockTick % 10 === 0) {
                this.year++;
                this.$refs.CallEvent.year++;
            }
            if (this.clockTick % 5 === 0) this.$refs.CallEvent.triggerEvent();
            if (this.clockTick % 1 === 0) {
                this.updateGameState();
                this.playerBalance();
            }

            this.clockTick++

            setTimeout(this.clock, 1000) // sets game tick to 1 second or 1000ms
        },
        initCompanies() {
            
            for (let i = 0; i < companies.length; i++) {
                
                let tempCompany = new CompanyObj(
                    this.globID,
                    companies[i].name, 
                    companies[i].ticker, 
                    companies[i].industry, 
                    // Math.floor((Math.random() * 100)+1)
                    10
                    );
                this.companyList.push(tempCompany)
                this.currentCompaniesList.push(tempCompany)     
                this.globID++;
            }
        },
        updateGameState() {
            
            for (let i = 0; i < this.currentCompaniesList.length; i++) {
                let company = this.currentCompaniesList[i];
                // this.checkUpdateMarket(company); // adding/removing market
                // check if company added
                for (let j = 0; j < company.relatedIndustries.length; j++) {

                    let companyInstance = company.relatedIndustries[j].split(' ');

                    for (let k = 0; k < this.industries.length; k++) {

                        if (companyInstance[0] === this.industries[k].name) {

                            for (let l = 0; l < parseInt(companyInstance[1]); l++) {

                                this.stockFluctuate(company, this.industries[k].val)
                            }
                        }
                    }
                }

                let maxRandomFlux = 1.02; // 2% random flux positive
                let minRandomFlux = 0.98; // 2% random flux negative
                this.stockFluctuate(company, (Math.random() * (maxRandomFlux - minRandomFlux) + minRandomFlux));
                
            }
        },

        checkUpdateMarket(company) {
            // broken
            this.currentCompaniesList.filter(company.stockPrice <= 0);
        },

    },
    mounted() {
        this.initCompanies();
        this.clock()
    },
}
</script>

<style>

</style>
