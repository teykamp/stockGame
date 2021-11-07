export default class Event {
    constructor(id, headLine, affectedIndustries) {
        this.id = id;
        this.headLine = headLine;
        this.affectedIndustries = affectedIndustries;
    }

    getID() {
        return this.id;
    }
}