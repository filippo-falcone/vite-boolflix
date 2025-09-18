<script>
/**
 * Componente Homepage dell'applicazione Boolflix
 * 
 * La homepage rappresenta la landing page dell'applicazione e gestisce:
 * - Visualizzazione dell'hero section con il banner principale
 * - Contenuti trending (film e serie TV più popolari)
 * - Ricerca globale che cerca sia in film che in serie TV
 * - Switching tra vista trending e risultati di ricerca
 */

// Import di Axios per le chiamate HTTP alle API di TMDB
import axios from 'axios';
// Import dello store globale per accesso ai dati condivisi
import { store } from '../store';
// Import dei componenti necessari per la homepage
import AppHero from '../components/AppHero.vue';       // Banner principale della home
import AppResults from '../components/AppResults.vue'; // Risultati di ricerca
import AppTrending from '../components/AppTrending.vue'; // Contenuti trending

export default {
    name: 'Home', // Nome del componente

    // Registrazione dei componenti utilizzati in questa view
    components: {
        AppHero,     // Sezione hero con banner principale
        AppResults,  // Griglia dei risultati di ricerca
        AppTrending  // Sezioni con contenuti trending
    },

    // Dati reattivi del componente
    data() {
        return {
            store,         // Store globale per accesso ai dati condivisi
            isActive: false, // Flag per determinare se mostrare ricerca o trending
        };
    },

    // Metodi del componente
    methods: {
        /**
         * Cerca film e serie TV tramite API TMDB
         * 
         * Effettua due chiamate parallele:
         * 1. Ricerca nei film
         * 2. Ricerca nelle serie TV
         * I risultati vengono salvati nello store globale
         */
        getMediaFromApi() {
            // Preparazione dei parametri di ricerca
            if (store.searchFilter === '') {
                store.queryParams.query = store.searchFilter;
            } else if (store.searchFilter !== '') {
                store.queryParams.query = store.searchFilter;
            }

            // Ricerca nei FILM
            let apiMoviesUrl = 'https://api.themoviedb.org/3/search/movie';
            axios.get(apiMoviesUrl, {
                params: store.queryParams // Include api_key, language e query
            })
                .then((response) => {
                    // Salva i risultati dei film nello store
                    store.movies = response.data.results;
                });

            // Ricerca nelle SERIE TV
            let apiSeriesTvUrl = 'https://api.themoviedb.org/3/search/tv';
            axios.get(apiSeriesTvUrl, {
                params: store.queryParams // Include api_key, language e query
            })
                .then((response) => {
                    // Salva i risultati delle serie TV nello store
                    store.tvSeries = response.data.results;
                });
        },

        /**
         * Carica i contenuti trending della settimana
         * 
         * Effettua due chiamate per ottenere:
         * 1. Film trending della settimana
         * 2. Serie TV trending della settimana
         * Questi dati vengono mostrati nella homepage quando non c'è ricerca attiva
         */
        getTrendingMediaFromApi() {
            // Caricamento FILM TRENDING
            let apiTrendingMoviesUrl = 'https://api.themoviedb.org/3/trending/movie/week';
            axios.get(apiTrendingMoviesUrl, {
                params: store.queryParams // Include api_key e language
            })
                .then((response) => {
                    // Salva i film trending nello store
                    store.trendingMovies = response.data.results;
                });

            // Caricamento SERIE TV TRENDING
            let apiTrendingSeriesTvUrl = 'https://api.themoviedb.org/3/trending/tv/week';
            axios.get(apiTrendingSeriesTvUrl, {
                params: store.queryParams // Include api_key e language
            })
                .then((response) => {
                    // Salva le serie TV trending nello store
                    store.trendingTvSeries = response.data.results;
                });
        },

        /**
         * Aggiorna lo stato della ricerca
         * 
         * Determina se mostrare la vista trending o i risultati di ricerca
         * basandosi sulla presenza o meno di un filtro di ricerca
         */
        updateSearchState() {
            if (this.isActive && store.searchFilter === '') {
                // Se la ricerca era attiva ma ora il filtro è vuoto, torna al trending
                this.isActive = false;
            } else if (!this.isActive && store.searchFilter !== '') {
                // Se il filtro non è vuoto, attiva la vista ricerca
                this.isActive = true;
            }
        }
    },

    /**
     * Hook del ciclo di vita - Componente montato
     * 
     * Carica i contenuti trending quando la homepage viene caricata
     */
    mounted() {
        this.getTrendingMediaFromApi();
    },

    /**
     * Watchers - Osservatori di cambiamenti
     * 
     * Reagisce ai cambiamenti nel filtro di ricerca globale
     */
    watch: {
        /**
         * Osserva i cambiamenti nel filtro di ricerca
         * 
         * Quando l'utente digita nella searchbar:
         * 1. Aggiorna lo stato della vista (trending vs ricerca)
         * 2. Effettua la ricerca se c'è un filtro attivo
         */
        'store.searchFilter'() {
            this.updateSearchState();
            if (store.searchFilter) {
                this.getMediaFromApi();
            }
        }
    }
}
</script>

<template>
    <!-- Contenitore principale della homepage -->
    <main>
        <!-- 
            Hero Section - Mostrata solo quando non c'è ricerca attiva
            Contiene il banner principale con Call-to-Action
        -->
        <AppHero v-if="!isActive"></AppHero>

        <!-- 
            Sezione Trending - Mostrata solo quando non c'è ricerca attiva
            Contiene i film e serie TV più popolari della settimana
        -->
        <AppTrending v-if="!isActive"></AppTrending>

        <!-- 
            Risultati di Ricerca - Mostrati solo quando c'è una ricerca attiva
            Visualizza i risultati della ricerca in film e serie TV
        -->
        <AppResults v-else></AppResults>
    </main>
</template>