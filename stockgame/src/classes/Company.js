export default class Company {
    constructor(id, name, ticker, relatedIndustries, initialStockPrice) {
        this.id = id;
        this.name = name;
        this.ticker = ticker;
        this.relatedIndustries = relatedIndustries;
        this.stockPrice = [initialStockPrice];
    }

    getID() {
        return this.id;
    }

    stockFluctuate(stockChange) {
        if (arguments.length == 0) {
            this.stockPrice.push(this.randomFluctuate());
        }
        else {
            this.stockPrice.push(stockChange)
        }
    }

    randomFluctuate() {
        return Math.round(1 + Math.random() * (-10)); // algo for randomflux
    }


    
}