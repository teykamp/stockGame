export default class Event {
    constructor(id, headLine, positiveAffectedIndustries, negativeAffectedIndustries) {
        this.id = id;
        this.headLine = headLine;
        this.positiveAffectedIndustries = positiveAffectedIndustries;
        this.negativeAffectedIndustries = negativeAffectedIndustries;
        
    }

    getID() {
        return this.id;
    }
}