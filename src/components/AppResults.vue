<script>
import { store } from '../store';

export default {
    name: 'AppResults',
    data() {
        return {
            store,
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
            thisLang : null
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
    <div class="d-flex">
        <ul>
            <li v-for="movie in store.movies">
                <h1>Titolo: {{ movie.title }}</h1>
                <h3>Titolo originale: {{ movie.original_title }}</h3>
                <div v-if="movie.original_language === flags[0].lang" class="d-flex align-items-center">Lingua: <div class="flag-container ms-2"><img :src="getImageUrl(flags[0].lang)" :alt="movie.original_language"></div></div>
                <div v-else-if="movie.original_language === flags[1].lang" class="d-flex align-items-center">Lingua: <div class="flag-container ms-2"><img :src="getImageUrl(flags[1].lang)" :alt="movie.original_language"></div></div>
                <div v-else-if="movie.original_language === flags[2].lang" class="d-flex align-items-center">Lingua: <div class="flag-container ms-2"><img :src="getImageUrl(flags[2].lang)" :alt="movie.original_language"></div></div>
                <div v-else-if="movie.original_language === flags[3].lang" class="d-flex align-items-center">Lingua: <div class="flag-container ms-2"><img :src="getImageUrl(flags[3].lang)" :alt="movie.original_language"></div></div>
                <div v-else-if="movie.original_language === flags[4].lang" class="d-flex align-items-center">Lingua: <div class="flag-container ms-2"><img :src="getImageUrl(flags[4].lang)" :alt="movie.original_language"></div></div>
                <div v-else-if="movie.original_language === flags[5].lang" class="d-flex align-items-center">Lingua: <div class="flag-container ms-2"><img :src="getImageUrl(flags[5].lang)" :alt="movie.original_language"></div></div>
                <div v-else-if="movie.original_language === flags[6].lang" class="d-flex align-items-center">Lingua: <div class="flag-container ms-2"><img :src="getImageUrl(flags[6].lang)" :alt="movie.original_language"></div></div>
                <div v-else-if="movie.original_language === flags[7].lang" class="d-flex align-items-center">Lingua: <div class="flag-container ms-2"><img :src="getImageUrl(flags[7].lang)" :alt="movie.original_language"></div></div>
                <div v-else>Lingua: {{ movie.original_language }}</div>
                <div>Voto Medio: {{ movie.vote_average }}</div>
            </li>
        </ul>
        <ul>
            <li v-for="tvSerie in store.tvSeries">
                <h1>Titolo: {{ tvSerie.name }}</h1>
                <h3>Titolo originale: {{ tvSerie.original_name }}</h3>
                <div v-if="tvSerie.original_language === flags[0].lang" class="d-flex align-items-center">Lingua: <div class="flag-container ms-2"><img :src="getImageUrl(flags[0].lang)" :alt="tvSerie.original_language"></div></div>
                <div v-else-if="tvSerie.original_language === flags[1].lang" class="d-flex align-items-center">Lingua: <div class="flag-container ms-2"><img :src="getImageUrl(flags[1].lang)" :alt="tvSerie.original_language"></div></div>
                <div v-else-if="tvSerie.original_language === flags[2].lang" class="d-flex align-items-center">Lingua: <div class="flag-container ms-2"><img :src="getImageUrl(flags[2].lang)" :alt="tvSerie.original_language"></div></div>
                <div v-else-if="tvSerie.original_language === flags[3].lang" class="d-flex align-items-center">Lingua: <div class="flag-container ms-2"><img :src="getImageUrl(flags[3].lang)" :alt="tvSerie.original_language"></div></div>
                <div v-else-if="tvSerie.original_language === flags[4].lang" class="d-flex align-items-center">Lingua: <div class="flag-container ms-2"><img :src="getImageUrl(flags[4].lang)" :alt="tvSerie.original_language"></div></div>
                <div v-else-if="tvSerie.original_language === flags[5].lang" class="d-flex align-items-center">Lingua: <div class="flag-container ms-2"><img :src="getImageUrl(flags[5].lang)" :alt="tvSerie.original_language"></div></div>
                <div v-else-if="tvSerie.original_language === flags[6].lang" class="d-flex align-items-center">Lingua: <div class="flag-container ms-2"><img :src="getImageUrl(flags[6].lang)" :alt="tvSerie.original_language"></div></div>
                <div v-else-if="tvSerie.original_language === flags[7].lang" class="d-flex align-items-center">Lingua: <div class="flag-container ms-2"><img :src="getImageUrl(flags[7].lang)" :alt="tvSerie.original_language"></div></div>
                <div v-else>Lingua: {{ tvSerie.original_language }}</div>
                <div>Voto Medio: {{ tvSerie.vote_average }}</div>
            </li>
        </ul>
    </div>

</template>

<style scoped lang="scss">
.flag-container {
    max-width: 21px;
}
</style>