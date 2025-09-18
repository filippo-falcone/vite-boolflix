<script>
/**
 * Componente pagina Serie TV dell'applicazione Boolflix
 * 
 * Questa pagina è dedicata esclusivamente alle serie TV e gestisce:
 * - Visualizzazione delle serie TV popolari quando non c'è ricerca
 * - Ricerca specifica nelle serie TV quando l'utente usa la searchbar
 * - Pulizia automatica dei film dallo store per mostrare solo serie TV
 * - Reattività ai cambiamenti nel filtro di ricerca globale
 */

// Import di Axios per le chiamate HTTP alle API di TMDB
import axios from 'axios';
// Import dello store globale per accesso ai dati condivisi
import { store } from '../store';
// Import del componente per visualizzare i risultati
import AppResults from '../components/AppResults.vue';

export default {
    name: 'TvSeries', // Nome del componente

    // Registrazione dei componenti utilizzati in questa view
    components: {
        AppResults // Componente che mostra la griglia di serie TV
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
         * Carica le serie TV dall'API TMDB
         * 
         * Comportamento intelligente:
         * - Se c'è un filtro di ricerca: cerca nelle serie TV
         * - Se non c'è filtro: carica le serie TV popolari
         * - Pulisce sempre i film dallo store per mostrare solo serie TV
         */
        getTvSeriesFromApi() {
            // Controlla se c'è un filtro di ricerca attivo
            if (store.searchFilter && store.searchFilter.trim() !== '') {
                // MODALITÀ RICERCA: Cerca serie TV specifiche
                store.queryParams.query = store.searchFilter;
                let apiSearchUrl = 'https://api.themoviedb.org/3/search/tv';

                axios.get(apiSearchUrl, {
                    params: store.queryParams // Include api_key, language, query
                })
                    .then((response) => {
                        // Salva i risultati della ricerca serie TV
                        store.tvSeries = response.data.results;
                        // Svuota i film per mostrare solo serie TV
                        store.movies = [];
                    });
            } else {
                // MODALITÀ DEFAULT: Carica serie TV popolari
                let apiPopularTvUrl = 'https://api.themoviedb.org/3/tv/popular';

                axios.get(apiPopularTvUrl, {
                    params: {
                        api_key: store.queryParams.api_key,   // Chiave API TMDB
                        language: store.queryParams.language  // Lingua per i metadati
                    }
                })
                    .then((response) => {
                        // Salva le serie TV popolari
                        store.tvSeries = response.data.results;
                        // Svuota i film per mostrare solo serie TV
                        store.movies = [];
                    });
            }
        }
    },

    /**
     * Hook del ciclo di vita - Componente montato
     * 
     * Carica le serie TV quando la pagina viene visitata per la prima volta
     */
    mounted() {
        this.getTvSeriesFromApi();
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
         * le serie TV per mostrare i risultati di ricerca aggiornati
         */
        'store.searchFilter'() {
            this.getTvSeriesFromApi();
        }
    }
}
</script>

<template>
    <!-- Contenitore principale della pagina Serie TV -->
    <main>
        <!-- Header della pagina con titolo -->
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <!-- Titolo della pagina con emoji per identificazione visiva -->
                    <h1 class="text-center my-4">📺 Serie TV</h1>
                </div>
            </div>
        </div>

        <!-- 
            Componente risultati che mostra:
            - Serie TV popolari (se non c'è ricerca)
            - Risultati ricerca serie TV (se c'è una query)
            
            Il componente AppResults legge automaticamente da store.tvSeries
            e ignora store.movies (che viene svuotato in getTvSeriesFromApi)
        -->
        <AppResults></AppResults>
    </main>
</template>