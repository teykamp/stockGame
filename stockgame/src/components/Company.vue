<template>
	<div>
		<h1>
			{{company.name}} ({{company.abbreviation}})
		</h1>
		<!-- section here for +, -, even symbol -->
		<p>
			{{Company.stockPrice}}
		</p>
		<canvas id="graph" width="800" height="400"></canvas>
    </div>
</template>

<script>
export default {
    name: 'Company',
    props: {
		company,
    },
	data() {
		return {
			xAxisValues: [],
		}
	},
	methods: {
		updateChart() { // https://www.chartjs.org/docs/latest/getting-started/usage.html
			this.xAxisValues.push(this.xAxisValues.length)
			const ctx = document.getElementById("graph").getContext("2d");
			const graph = new Chart(ctx, {
				type: 'line',
				data: {
					labels: this.xAxis,
					datasets: [{
						label: "Stock Price",
						data: company.stockPrice,
						fill: true,
						borderColor: "rgb(75, 192, 192)",
						tension: 0.1
					}]
				},
			});
		},
	},
	mounted() {
		// update every x seconds
		this.updateChart();
	}
}
</script>

<style scoped>

</style>
