<script>
import axios from 'axios';
import { store } from '../store';
import AppCardList from './AppCardList.vue';

export default {
    name: 'AppTrending',
    components: {
        AppCardList
    },
    data() {
        return {
            store
        }
    }
}
</script>

<template>
    <section>
        <div  class="container py-4">
            <h2 v-if="store.trendingMovies.length > 0">Top 20 Film</h2>
            <AppCardList :cardInfo="store.trendingMovies"></AppCardList>
            <h2 v-if="store.trendingTvSeries.length > 0">Top 20 Serie TV</h2>
            <AppCardList :cardInfo="store.trendingTvSeries"></AppCardList>
        </div>
    </section>
</template>

<style scoped lang="scss"></style>