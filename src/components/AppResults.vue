<script>
import { store } from '../store';
import AppCardList from './AppCardList.vue';

export default {
    name: 'AppResults',
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
            <h2 v-if="store.movies.length > 0">Film</h2>
            <AppCardList :cardInfo="store.movies"></AppCardList>
            <h2 v-if="store.tvSeries.length > 0">Serie TV</h2>
            <AppCardList :cardInfo="store.tvSeries"></AppCardList>
        </div>
    </section>
</template>

<style scoped lang="scss"></style>