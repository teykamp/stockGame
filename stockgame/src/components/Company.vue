<template>
    <div>
        <p>
            {{ company.ticker }} ${{ company.stockPrice.toFixed(2) }}
            <button v-if="playerDollars >= company.stockPrice" @click="stockSale(true)">Buy</button>
            <button v-if="company.stocksOwned > 0" @click="stockSale(false)">Sell</button>
        </p>
        <p>Shares: {{ company.stocksOwned }}, Equity: ${{ (company.stocksOwned * company.stockPrice).toFixed(2) }}</p>
        <!-- <canvas id="graph" width="800" height="400"></canvas> -->
    </div>
</template>

<script>
export default {
    name: 'Company',
    props: [
        'company',
        'playerDollars',
    ],

    data() {
        return {
            // xAxisValues: [],
        }
    },
    methods: {
        
        stockSale(buySell) {
            // true = buy, false = sell
            if (buySell) {
                this.company.stocksOwned++;
                this.$emit("boughtStock", this.company.stockPrice);
            }
            else {
                this.company.stocksOwned--;
                this.$emit("soldStock", this.company.stockPrice);
            }
        },

        // updateChart() { // https://www.chartjs.org/docs/latest/getting-started/usage.html
        //     // broken
        //     this.xAxisValues.push(this.xAxisValues.length)
        //     const ctx = document.getElementById("graph").getContext("2d");
        //     const graph = new Chart(ctx, {
        //         type: 'line',
        //         data: {
        //             labels: this.xAxis,
        //             datasets: [{
        //                 label: "Stock Price",
        //                 data: company.stockPrice,
        //                 fill: true,
        //                 borderColor: "rgb(75, 192, 192)",
        //                 tension: 0.1
        //             }]
        //         },
        //     });
        // },
    },
    
    mounted() {
        // update every x seconds
        // this.updateChart();
    }
}
</script>

<style scoped>

</style>
