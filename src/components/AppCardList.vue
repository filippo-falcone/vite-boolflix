<script>
import { store } from '../store';
import AppCard from './AppCard.vue';

export default {
    name: 'AppCardList',
    props: {
        cardInfo: Array
    },
    components: {
        AppCard
    }
}
</script>

<template>
    <div class="row row-cols-2 row-cols-sm-3 row-cols-lg-4 row-cols-xl-6 g-3 mb-3">
        <AppCard v-for="media in cardInfo" :key="media.id" :cardInfo="media"></AppCard>
    </div>
</template>

<style scoped lang="scss">
</style>