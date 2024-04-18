<script>
import { store } from '../store';

export default {
    name: 'AppCard',
    props: {
        cardInfo: Object
    },
    data() {
        return {
            flags: [
                    {lang: 'it'},
                    {lang: 'en'},
                    {lang: 'fr'},
                    {lang: 'de'},
                    {lang: 'es'},
                    {lang: 'ja'},
                    {lang: 'cn'},
                    {lang: 'ko'}
                ],
        };
    },
    methods: {
        getImageUrl(name) {
            return new URL(`../assets/img/${name}-flag.png`, import.meta.url).href
        }
    }
}
</script>

<template>
    <li>
        <div v-if="cardInfo.poster_path === null" class="img-container"><img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg" alt="Image not found"></div>
        <div v-else class="img-container"><img :src="'https://image.tmdb.org/t/p/w342' + cardInfo.poster_path" :alt="cardInfo.title || cardInfo.name"></div>
        <h1>Titolo: {{ cardInfo.title || cardInfo.name}}</h1>
        <h3>Titolo originale: {{ cardInfo.original_title || cardInfo.original_name }}</h3>
        <div v-if="cardInfo.original_language === flags[0].lang" class="d-flex align-items-center">Lingua: <div class="flag-container ms-2"><img :src="getImageUrl(flags[0].lang)" :alt="cardInfo.original_language"></div></div>
        <div v-else-if="cardInfo.original_language === flags[1].lang" class="d-flex align-items-center">Lingua: <div class="flag-container ms-2"><img :src="getImageUrl(flags[1].lang)" :alt="cardInfo.original_language"></div></div>
        <div v-else-if="cardInfo.original_language === flags[2].lang" class="d-flex align-items-center">Lingua: <div class="flag-container ms-2"><img :src="getImageUrl(flags[2].lang)" :alt="cardInfo.original_language"></div></div>
        <div v-else-if="cardInfo.original_language === flags[3].lang" class="d-flex align-items-center">Lingua: <div class="flag-container ms-2"><img :src="getImageUrl(flags[3].lang)" :alt="cardInfo.original_language"></div></div>
        <div v-else-if="cardInfo.original_language === flags[4].lang" class="d-flex align-items-center">Lingua: <div class="flag-container ms-2"><img :src="getImageUrl(flags[4].lang)" :alt="cardInfo.original_language"></div></div>
        <div v-else-if="cardInfo.original_language === flags[5].lang" class="d-flex align-items-center">Lingua: <div class="flag-container ms-2"><img :src="getImageUrl(flags[5].lang)" :alt="cardInfo.original_language"></div></div>
        <div v-else-if="cardInfo.original_language === flags[6].lang" class="d-flex align-items-center">Lingua: <div class="flag-container ms-2"><img :src="getImageUrl(flags[6].lang)" :alt="cardInfo.original_language"></div></div>
        <div v-else-if="cardInfo.original_language === flags[7].lang" class="d-flex align-items-center">Lingua: <div class="flag-container ms-2"><img :src="getImageUrl(flags[7].lang)" :alt="cardInfo.original_language"></div></div>
        <div v-else>Lingua: {{ cardInfo.original_language }}</div>
        <div>Voto Medio: {{ cardInfo.vote_average }}</div>
    </li>
</template>

<style scoped lang="scss">
.img-container {
    width: 200px;
}
.flag-container {
    max-width: 21px;
}
</style>