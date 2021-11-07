export default class Event {
    constructor(id, headLine, positiveAffectedIndustries, negativeAffectedIndustries, timeRemaining) {
        this.id = id;
        this.headLine = headLine;
        this.positiveAffectedIndustries = positiveAffectedIndustries;
        this.negativeAffectedIndustries = negativeAffectedIndustries;
        this.timeRemaining = timeRemaining;
    }

    getID() {
        return this.id;
    }
}