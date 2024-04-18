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
            <h1>{{ movie.title }}</h1>
            <h3>{{ movie.original_title }}</h3>
            <div>{{ movie.original_language }}</div>
            <div>{{ movie.vote_average }}</div>
        </li>
    </ul>
</template>

<style lang="scss"></style>