<script>
import { store } from '../store';

export default {
    name: 'AppResults',
    data() {
        return {
            store
        };
    },
}
</script>

<template>
    <ul>
        <li v-for="movie in store.movies">
            <h1>Titolo: {{ movie.title }}</h1>
            <h3>Titolo originale: {{ movie.original_title }}</h3>
            <div>Lingua: {{ movie.original_language }}</div>
            <div>Voto Medio: {{ movie.vote_average }}</div>
        </li>
    </ul>
</template>

<style lang="scss"></style>