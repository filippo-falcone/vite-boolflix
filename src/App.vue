<script>
import axios from 'axios';
import { store } from './store';
import AppHeader from './components/AppHeader.vue';
import AppHero from './components/AppHero.vue';
import AppResults from './components/AppResults.vue';
import AppTrending from './components/AppTrending.vue';

export default {
    components: {
        AppHeader,
        AppHero,
        AppResults,
        AppTrending
    },
    data() {
        return {
            store,
            isActive: false,
            isShow: '',
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
        getTrendingMediaFromApi() {
            // Movies
            let apiTrendingMoviesUrl = 'https://api.themoviedb.org/3/trending/movie/week';
            axios.get(apiTrendingMoviesUrl, {
                params: store.queryParams
            })
            .then((rensponse) => {
                store.trendingMovies = rensponse.data.results;
            });
            // TV Series
            let apiTrendingSeriesTvUrl = 'https://api.themoviedb.org/3/trending/tv/week';
            axios.get(apiTrendingSeriesTvUrl, {
                params: store.queryParams
            })
            .then((rensponse) => {
                store.trendingTvSeries = rensponse.data.results;
            });
        },
        showSearch() {
            if (this.isActive && store.searchFilter === '') {
                this.isActive = false
            } else if (!this.isActive && store.searchFilter !== '') {
                this.isActive = true
            }
        },
        showButtonToScroll() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
              this.isShow = 'active';
            } else {
              this.isShow = '';
            }
        },
        scrollTop() {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
    },
    mounted() {
        this.getTrendingMediaFromApi();
        window.onscroll = () => {
            this.showButtonToScroll();
        }
    }
}
</script>

<template>
    <AppHeader @search="getMediaFromApi" @show="showSearch"></AppHeader>
    <main>
        <AppHero v-if="!isActive"></AppHero>
        <AppTrending v-if="!isActive"></AppTrending>
        <AppResults v-else></AppResults>
    </main>
    <button class="scroll-up btn" :class="isShow" @click="scrollTop">
        <i class="bi bi-caret-up-fill"></i>
    </button>
</template>

<style lang="scss">
@use './style/general.scss';
@use './style/partials/variables' as *;

.scroll-up {
    display: none;
    position: fixed;
    bottom: 1rem;
    right: 2.5rem;
    z-index: 1;
    
    &:hover {
        border-color: $brand-secondary;
        
        i {
            color: $brand-secondary;
        }
    }
    
    &.active {
        background-color: $brand-primary;
        display: block;
    }
}
</style>
