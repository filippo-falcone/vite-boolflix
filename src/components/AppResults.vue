<script>
import { store } from '../store';
import AppCard from './AppCard.vue';

export default {
    name: 'AppResults',
    components: {
        AppCard
    },
    data() {
        return {
            store,
        };
    }
}
</script>

<template>
    <div class="d-flex">
        <ul>
            films
            <AppCard v-for="movie in store.movies" :key="movie.id" :cardInfo="movie"></AppCard>
        </ul>
        <ul>
            series
            <AppCard v-for="tvSerie in store.tvSeries" :key="tvSerie.id" :cardInfo="tvSerie"></AppCard>
        </ul>
    </div>

</template>

<style scoped lang="scss">
</style>