<script>
import axios from 'axios';
import { store } from './store';
import AppHeader from './components/AppHeader.vue';
import AppResults from './components/AppResults.vue';

export default {
    components: {
        AppHeader,
        AppResults
    },
    data() {
        return {
            store
        };
    },
    methods: {
        getCardFromApi() {
            // Movies
            let apiMoviesUrl = 'https://api.themoviedb.org/3/search/movie';
            if (store.searchFilter !== '') {
                store.queryParams.query = store.searchFilter;
            }
            axios.get(apiMoviesUrl, {
                params: store.queryParams
            })
            .then((rensponse) => {
                store.movies = rensponse.data.results;
            });
            // TV Series
            let apiSeriesTvUrl = 'https://api.themoviedb.org/3/search/tv';
            if (store.searchFilter !== '') {
                store.queryParams.query = store.searchFilter;
            }
            axios.get(apiSeriesTvUrl, {
                params: store.queryParams
            })
            .then((rensponse) => {
                store.tvSeries = rensponse.data.results;
            });
        }
    }
}
</script>

<template>
    <AppHeader @search="getCardFromApi"></AppHeader>
    <AppResults></AppResults>
</template>

<style lang="scss">
@use './style/general.scss';
</style>
