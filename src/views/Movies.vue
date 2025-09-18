<script>
/**
 * Componente pagina Film dell'applicazione Boolflix
 * 
 * Questa pagina è dedicata esclusivamente ai film e gestisce:
 * - Visualizzazione dei film popolari quando non c'è ricerca
 * - Ricerca specifica nei film quando l'utente usa la searchbar
 * - Pulizia automatica delle serie TV dallo store per mostrare solo film
 * - Reattività ai cambiamenti nel filtro di ricerca globale
 */

// Import di Axios per le chiamate HTTP alle API di TMDB
import axios from 'axios';
// Import dello store globale per accesso ai dati condivisi
import { store } from '../store';
// Import del componente per visualizzare i risultati
import AppResults from '../components/AppResults.vue';

export default {
    name: 'Movies', // Nome del componente

    // Registrazione dei componenti utilizzati in questa view
    components: {
        AppResults // Componente che mostra la griglia di film
    },

    // Dati reattivi del componente
    data() {
        return {
            store, // Store globale per accesso ai dati condivisi
        };
    },

    // Metodi del componente
    methods: {
        /**
         * Carica i film dall'API TMDB
         * 
         * Comportamento intelligente:
         * - Se c'è un filtro di ricerca: cerca nei film
         * - Se non c'è filtro: carica i film popolari
         * - Pulisce sempre le serie TV dallo store per mostrare solo film
         */
        getMoviesFromApi() {
            // Controlla se c'è un filtro di ricerca attivo
            if (store.searchFilter && store.searchFilter.trim() !== '') {
                // MODALITÀ RICERCA: Cerca film specifici
                store.queryParams.query = store.searchFilter;
                let apiSearchUrl = 'https://api.themoviedb.org/3/search/movie';

                axios.get(apiSearchUrl, {
                    params: store.queryParams // Include api_key, language, query
                })
                    .then((response) => {
                        // Salva i risultati della ricerca film
                        store.movies = response.data.results;
                        // Svuota le serie TV per mostrare solo film
                        store.tvSeries = [];
                    });
            } else {
                // MODALITÀ DEFAULT: Carica film popolari
                let apiPopularMoviesUrl = 'https://api.themoviedb.org/3/movie/popular';

                axios.get(apiPopularMoviesUrl, {
                    params: {
                        api_key: store.queryParams.api_key,   // Chiave API TMDB
                        language: store.queryParams.language  // Lingua per i metadati
                    }
                })
                    .then((response) => {
                        // Salva i film popolari
                        store.movies = response.data.results;
                        // Svuota le serie TV per mostrare solo film
                        store.tvSeries = [];
                    });
            }
        }
    },

    /**
     * Hook del ciclo di vita - Componente montato
     * 
     * Carica i film quando la pagina viene visitata per la prima volta
     */
    mounted() {
        this.getMoviesFromApi();
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
         * Quando l'utente digita nella searchbar, ricarica automaticamente
         * i film per mostrare i risultati di ricerca aggiornati
         */
        'store.searchFilter'() {
            this.getMoviesFromApi();
        }
    }
}
</script>

<template>
    <!-- Contenitore principale della pagina Film -->
    <main>
        <!-- Header della pagina con titolo -->
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <!-- Titolo della pagina con emoji per identificazione visiva -->
                    <h1 class="text-center my-4">🎬 Film</h1>
                </div>
            </div>
        </div>

        <!-- 
            Componente risultati che mostra:
            - Film popolari (se non c'è ricerca)
            - Risultati ricerca film (se c'è una query)
            
            Il componente AppResults legge automaticamente da store.movies
            e ignora store.tvSeries (che viene svuotato in getMoviesFromApi)
        -->
        <AppResults></AppResults>
    </main>
</template>