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
        getMediaFromApi() {
            // Movies
            if (store.searchFilter === '') {
                store.queryParams.query = store.searchFilter;
            } else if (store.searchFilter !== '') {
                store.queryParams.query = store.searchFilter;
            }
            let apiMoviesUrl = 'https://api.themoviedb.org/3/search/movie';
            axios.get(apiMoviesUrl, {
                params: store.queryParams
            })
            .then((rensponse) => {
                store.movies = rensponse.data.results;
            });
            // TV Series
            let apiSeriesTvUrl = 'https://api.themoviedb.org/3/search/tv';
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
    <AppHeader @search="getMediaFromApi"></AppHeader>
    <AppResults></AppResults>
</template>

<style lang="scss">
@use './style/general.scss';
@use './style/partials/variables' as *;

body {
    background-color: $brand-primary;
    color: $brand-light;
}
</style>
