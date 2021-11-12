<template>
    <div id="app">
        <p><b>Year: {{ year }}, Time Elapsed: {{ clockTick }}</b></p>
        <p><b>TOTAL: ${{ (playerDollars + totalEquity).toFixed(2) }}</b></p>
        <p>Liquidity: ${{ playerDollars.toFixed(2) }}</p>
        <p>Equity: ${{ totalEquity.toFixed(2) }}</p>
        <div v-for="company in currentCompaniesList" :key="company.id">
            <p>
                {{ company.ticker }} ${{ company.stockPrice.toFixed(2) }}
                <button v-if="playerDollars >= company.stockPrice" @click="stockSale(company, true)">Buy</button>
                <button v-if="company.stocksOwned > 0" @click="stockSale(company, false)">Sell</button>
            </p>
            <p>Shares: {{ company.stocksOwned }}, Equity: ${{ (company.stocksOwned * company.stockPrice).toFixed(2) }}</p>
            
        </div>
        <div v-for="events in activeEvents" :key="events.id">
            <p> {{ events.headLine }} ({{ events.year }})</p>
        </div>
    </div>
</template>

<script>
import CompanyObj from './classes/Company.js'
import EventObj from './classes/Event.js'
import companies from './assets/companies.json'
import events from './assets/events.json'
// import Company from './components/Company.vue'
// import Event from './components/Event.vue'
// import PlayerControls from './components/PlayerControls.vue'

export default {
      name: 'App',
    //   components: {
    //     Company,
    //     Event,
    //     PlayerControls,
    //   },
    data() {
        return {
            globID: 0,
            year: 2021,
            clockTick: 0,
            companyList: [],
            eventList: [],
            activeEvents: [],
            currentCompaniesList: [],
            currentPositiveIndustries: [],
            currentNegativeIndustries: [],
            totalEquity: 0,
            playerDollars: 100,
            industries: [
                {"name": "entertainment", "val": 1}, 
                {"name": "mining", "val": 1}, 
                {"name": "tech", "val": 1}, 
                {"name": "energy", "val": 1},
                {"name": "garments", "val": 1}, 
                {"name": "chemicals", "val": 1}, 
                {"name": "pharma", "val": 1},
                {"name": "agriculture", "val": 1}, 
                {"name": "healthcare", "val": 1}, 
                {"name": "legal", "val": 1},
                {"name": "insurance", "val": 1}, 
                {"name": "finance", "val": 1}, 
                {"name": "transport", "val": 1},
                {"name": "construction", "val": 1}, 
                {"name": "restaurant", "val": 1}, 
                {"name": "defense", "val": 1}]
        }
    },
    methods: {
        stockSale(company, buySell) {
            // true = buy, false = sell
            if (buySell) {
                company.stocksOwned++
                this.playerDollars -= company.stockPrice
            }
            else {
                company.stocksOwned--;
                this.playerDollars += company.stockPrice;
            }

            this.playerBalance()
        },
        playerBalance() {

            this.totalEquity = 0;
            for (let i = 0; i < this.currentCompaniesList.length; i++) {
                let equity = this.currentCompaniesList[i].stocksOwned * this.currentCompaniesList[i].stockPrice;
                this.totalEquity += equity;
            }
        },
        stockFluctuate(company, flux) {
            company.stockPrice *= flux;
        },
        addEvent() {

            let currentEvent = this.eventList[0];
            currentEvent.year = this.year;
            this.eventList.splice(0, 1);
            this.activeEvents.splice(0, 0, currentEvent);
            this.computeEffects(currentEvent);
          
        },
        computeEffects(eventObject) {

            for (let i = 0; i < eventObject.positiveAffectedIndustries.length; i++) {
                for (let j = 0; j < this.industries.length; j++) {
                    if (eventObject.positiveAffectedIndustries[i] === this.industries[j].name) this.industries[j].val *= 1.002 // .2% flux
                }
            }
            for (let i = 0; i < eventObject.negativeAffectedIndustries.length; i++) {
                for (let j = 0; j < this.industries.length; j++) {
                    if (eventObject.negativeAffectedIndustries[i] === this.industries[j].name) this.industries[j].val *= 0.998
                }
            }
        },
        clock() { // central game clock
            
            if (this.eventList.length === 0) this.initEvents()
            
            this.eventList.sort(() => 0.5 - Math.random())

            if (this.clockTick % 10 === 0) this.year++;
            if (this.clockTick % 5 === 0) this.addEvent();
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
                    Math.floor((Math.random() * 100)+1)
                    );
                this.companyList.push(tempCompany)
                this.currentCompaniesList.push(tempCompany)     
                this.globID++;
            }
        },

        initEvents() {
            
            for (let i = 0; i < events.length; i++) {
                
                let tempEvent = new EventObj(
                    this.globID, events[i].title, 
                    events[i].effects[0].positiveIndustries, 
                    events[i].effects[0].negativeIndustries
                    );
                this.eventList.push(tempEvent)
                this.globID++;
            }
        },

        updateGameState() {
            
            for (let i = 0; i < this.currentCompaniesList.length; i++) {
                let company = this.currentCompaniesList[i];
                // this.checkUpdateMarket(company); // adding/removing market
                // check if company added
                for (let i = 0; i < company.relatedIndustries.length; i++) {
                    for (let j = 0; j < this.industries.length; j++) {
                        if (company.relatedIndustries[i] === this.industries[j].name) {
                            this.stockFluctuate(company, this.industries[j].val)
                        }
                    }
                }
                this.stockFluctuate(company, 1); // normal random flux TODO: ADD RANDOM FLUX
                
            }
        },

        checkUpdateMarket(company) {
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
