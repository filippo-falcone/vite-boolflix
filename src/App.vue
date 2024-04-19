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
            store,
            isActive: false
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
        },
        showSearch() {
            if (this.isActive && store.searchFilter === '') {
                this.isActive = false
            } else if (!this.isActive && store.searchFilter !== '') {
                this.isActive = true
            }
        }
    }
}
</script>

<template>
    <AppHeader @search="getMediaFromApi" @show="showSearch"></AppHeader>
    <AppResults :active="isActive"></AppResults>
</template>

<style lang="scss">
@use './style/general.scss';
@use './style/partials/variables' as *;

body {
    background-color: $brand-primary;
    color: $brand-light;
}
</style>
