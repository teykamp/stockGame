<template>
	<div>
        <div v-for="events in activeEvents" :key="events.id">
            <p> {{ events.headLine }} ({{ events.year }})</p>
        </div>
    </div>
</template>

<script>
import EventObj from '../classes/Event.js'
import industries from '../assets/industries.json'
import events from '../assets/events.json'
export default {
    name: 'EventParent',
    data() {
        return {
            eventID: 0,
            year: 2021,
            eventList: [],
            activeEvents: [],
            industries: industries
        }
    },
    methods: {
        initEvents() {
            
            for (let i = 0; i < events.length; i++) {
                
                let tempEvent = new EventObj(
                    this.eventID, events[i].title, 
                    events[i].effects[0].positiveIndustries, 
                    events[i].effects[0].negativeIndustries
                    );
                this.eventList.push(tempEvent)
                this.eventID++;
            }
        },
        triggerEvent() {

            if (this.eventList.length === 0) this.initEvents()
            this.eventList.sort(() => 0.5 - Math.random())
            this.addEvent()

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

                let eventInstancePos = eventObject.positiveAffectedIndustries[i].split(' ');

                for (let j = 0; j < this.industries.length; j++) {

                    if (eventInstancePos[0] === this.industries[j].name) {

                        for (let k = 0; k < parseInt(eventInstancePos[1]); k++) {

                            this.industries[j].val *= 1.001005 // .105% flux up
                            this.industries[j].instance++;
                        }
                    }
                }
            }
            for (let i = 0; i < eventObject.negativeAffectedIndustries.length; i++) {

                let eventInstanceNeg = eventObject.negativeAffectedIndustries[i].split(' ');

                for (let j = 0; j < this.industries.length; j++) {

                    if (eventInstanceNeg[0] === this.industries[j].name) {

                        for (let k = 0; k < parseInt(eventInstanceNeg[1]); k++) {

                            this.industries[j].val *= 0.999 // .1% flux down
                            this.industries[j].instance--;
                        }
                    }
                }
            }
        },
    }
}
</script>

<style scoped>

</style>
