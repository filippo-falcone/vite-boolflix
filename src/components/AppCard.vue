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
    },
    computed: {
        getVoteIn5() {
           return Math.round(this.cardInfo.vote_average / 2)
        }
    }
}
</script>

<template>
    <div class="col">
        <div class="img-container">
            <div v-if="cardInfo.poster_path === null" class="poster-container not-found">
                <img src="../assets/img/poster-place-holder.png" alt="poster-placeholder-background">
                <img class="poster not-found" src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg" alt="Image not found">
            </div>
            <div v-else class="poster-container">
                <img src="../assets/img/poster-place-holder.png" alt="poster-placeholder-background">
                <img class="poster" :src="'https://image.tmdb.org/t/p/w342' + cardInfo.poster_path" :alt="cardInfo.title || cardInfo.name">
            </div>
            <div class="info-container p-3">
                <div class="title">
                    Titolo:
                    <span>{{ cardInfo.title || cardInfo.name}}</span>
                </div>
                <div class="original title">
                    Titolo originale:
                    <span>{{ cardInfo.original_title || cardInfo.original_name }}</span>
                </div>
                <div class="d-flex align-items-center">
                    Lingua: 
                    <div class="flag-container ms-2">
                        <img v-if="flags.includes(cardInfo.original_language)" :src="getFlagUrl()" :alt="cardInfo.original_language">
                        <div v-else>{{ cardInfo.original_language }}</div>
                    </div>
                </div>
                <div class="d-flex">
                    Voto:
                    <!-- Prima soluzione -->
                    <!-- <div class="d-flex align-items-center ms-2">
                        <i v-for="star in starArray" :key="star" :class="star" class="bi fs-6 text-warning"></i>
                    </div> -->
                    <!-- Seconda soluzione -->
                    <div class="d-flex align-items-center ms-2">
                        <i v-for="n in 5" :class="{ 'bi-star-fill': n <= getVoteIn5, 'bi-star': n > Math.round(cardInfo.vote_average / 2) }" class="bi fs-6 text-warning"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.col {
    .img-container {
        position: relative;

        .poster-container {
            position: relative;

            .poster {
                height: 100%;
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                
                &.not-found {
                    width: 70%;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
            }
        }
    }
    
    .info-container {
        font-size: .875rem;
        background-color: #000000af;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        opacity: 0;
        &:hover {
            opacity: 1;
        }

        .title {
            span {
                color: #999797;
            }
        }
        .flag-container {
            max-width: 21px;
        }
    }
}
    
</style>