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
        getMovieFromApi() {
            let apiUrl = 'https://api.themoviedb.org/3/search/movie';
            if (store.filmsFilter !== '') {
                store.queryParams.query = store.filmsFilter;
            }
            axios.get(apiUrl, {
                params: store.queryParams
            })
            .then((rensponse) => {
                store.movies = rensponse.data.results;
            });
            console.log(apiUrl, store.queryParams)
            console.log(store.movies);
        }
    }
}
</script>

<template>
    <AppHeader @search="getMovieFromApi"></AppHeader>
    <AppResults></AppResults>
</template>

<style lang="scss">
@use './style/general.scss';
</style>
