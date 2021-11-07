<template>
	<div>
        <h1>
            Score: {{playerScore}}
            Money: {{playerDollars}}
        </h1>
    </div>
</template>

<script>
export default {
    name: 'PlayerControls',
    props: {
        playerScore,
        playerDollars,
    }
}
</script>

<style scoped>

</style>
