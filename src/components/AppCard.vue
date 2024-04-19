<script>
import { store } from '../store';

export default {
    name: 'AppCard',
    props: {
        cardInfo: Object
    },
    data() {
        return {
            flags: [ 'it', 'en', 'fr', 'de', 'es', 'ja', 'cn', 'ko' ],
            starArray : []
        };
    },
    methods: {
        getFlagUrl() {
            let flagImgName = this.cardInfo.original_language + '-flag.png';
            return new URL(`../assets/img/${flagImgName}`, import.meta.url).href
        }
        /* Prima soluzione */
        // getStars(){
        //     this.cardInfo.vote_average = Math.round(this.cardInfo.vote_average / 2);
        //     for(let i = 0; i < 5; i++) {
        //         if(i < this.cardInfo.vote_average) {
        //             this.starArray.push('bi-star-fill');
        //         } else {
        //             this.starArray.push('bi-star');
        //         }
        //     }
        // }
    },
    mounted() {
        // this.getStars()
    }
}
</script>

<template>
    <li>
        <div v-if="cardInfo.poster_path === null" class="img-container"><img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg" alt="Image not found"></div>
        <div v-else class="img-container"><img :src="'https://image.tmdb.org/t/p/w342' + cardInfo.poster_path" :alt="cardInfo.title || cardInfo.name"></div>
        <h1>Titolo: {{ cardInfo.title || cardInfo.name}}</h1>
        <h3>Titolo originale: {{ cardInfo.original_title || cardInfo.original_name }}</h3>
        <div class="d-flex align-items-center">Lingua: 
            <div class="flag-container ms-2">
                <img v-if="flags.includes(cardInfo.original_language)" :src="getFlagUrl()" :alt="cardInfo.original_language">
                <div v-else>{{ cardInfo.original_language }}</div>
            </div>
        </div>
        <div class="d-flex">
            Voto Medio:
            <!-- Prima soluzione -->
            <!-- <div class="d-flex align-items-center ms-2">
                <i v-for="star in starArray" :key="star" :class="star" class="bi fs-6 text-warning"></i>
            </div> -->
            <!-- Seconda soluzione -->
            <div class="d-flex align-items-center ms-2">
                <i v-for="i in 5" :class="{ 'bi-star-fill': i <= Math.round(cardInfo.vote_average / 2), 'bi-star': i > Math.round(cardInfo.vote_average / 2) }" class="bi fs-6 text-warning"></i>
            </div>
        </div>
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