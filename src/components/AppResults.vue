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
    <section>
        <div  class="container py-4">
                <h2 v-if="store.movies.length > 0">Film</h2>
                <div class="row row-cols-2 row-cols-sm-3 row-cols-lg-4 row-cols-xl-6 g-3 mb-3">
                    <AppCard v-for="movie in store.movies" :key="movie.id" :cardInfo="movie"></AppCard>
                </div>
                <h2 v-if="store.tvSeries.length > 0">Serie TV</h2>
                <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-3">
                    <AppCard v-for="tvSerie in store.tvSeries" :key="tvSerie.id" :cardInfo="tvSerie"></AppCard>
                </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
</style>