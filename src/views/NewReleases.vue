<script>
/**
 * Componente pagina Nuove Uscite dell'applicazione Boolflix
 * 
 * Questa pagina mostra le ultime uscite di film e serie TV e gestisce:
 * - Visualizzazione dei film appena usciti al cinema
 * - Visualizzazione delle serie TV di nuova uscita
 * - Due sezioni separate e ben organizzate
 * - Caricamento automatico al montaggio della pagina
 * - Design responsivo con titoli distintivi
 */

// Import di Axios per le chiamate HTTP alle API di TMDB
import axios from 'axios';
// Import dello store globale per accesso ai dati condivisi
import { store } from '../store';
// Import del componente per visualizzare i risultati
import AppResults from '../components/AppResults.vue';

export default {
    name: 'NewReleases', // Nome del componente

    // Registrazione dei componenti utilizzati in questa view
    components: {
        AppResults // Componente che mostra la griglia di film e serie TV
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
         * Carica i film di nuova uscita dall'API TMDB
         * 
         * Utilizza l'endpoint "now_playing" per ottenere i film
         * attualmente al cinema o usciti di recente
         */
        getNewMoviesFromApi() {
            // Endpoint per film attualmente al cinema
            let apiNewMoviesUrl = 'https://api.themoviedb.org/3/movie/now_playing';

            axios.get(apiNewMoviesUrl, {
                params: {
                    api_key: store.queryParams.api_key,   // Chiave API TMDB
                    language: store.queryParams.language, // Lingua per i metadati
                    region: 'IT'                          // Regione per le date di uscita locali
                }
            })
                .then((response) => {
                    // Salva i film di nuova uscita nello store
                    store.movies = response.data.results;
                    console.log('Film di nuova uscita caricati:', response.data.results.length);
                })
                .catch((error) => {
                    console.error('Errore nel caricamento dei film di nuova uscita:', error);
                });
        },

        /**
         * Carica le serie TV di nuova uscita dall'API TMDB
         * 
         * Utilizza l'endpoint "on_the_air" per ottenere le serie TV
         * attualmente in onda o di recente trasmissione
         */
        getNewTvSeriesFromApi() {
            // Endpoint per serie TV attualmente in onda
            let apiNewTvUrl = 'https://api.themoviedb.org/3/tv/on_the_air';

            axios.get(apiNewTvUrl, {
                params: {
                    api_key: store.queryParams.api_key,   // Chiave API TMDB
                    language: store.queryParams.language  // Lingua per i metadati
                }
            })
                .then((response) => {
                    // Salva le serie TV di nuova uscita nello store
                    store.tvSeries = response.data.results;
                    console.log('Serie TV di nuova uscita caricate:', response.data.results.length);
                })
                .catch((error) => {
                    console.error('Errore nel caricamento delle serie TV di nuova uscita:', error);
                });
        },

        /**
         * Carica tutti i contenuti di nuova uscita
         * 
         * Metodo helper che esegue entrambe le chiamate API
         * in parallelo per caricare sia film che serie TV
         */
        loadAllNewReleases() {
            // Esegue entrambe le chiamate in parallelo
            this.getNewMoviesFromApi();
            this.getNewTvSeriesFromApi();
        }
    },

    /**
     * Hook del ciclo di vita - Componente montato
     * 
     * Carica automaticamente i contenuti di nuova uscita
     * quando la pagina viene visitata
     */
    mounted() {
        this.loadAllNewReleases();
    }
}
</script>

<template>
    <!-- Contenitore principale della pagina Nuove Uscite -->
    <main>
        <!-- Header della pagina con titolo principale -->
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <!-- Titolo principale della pagina -->
                    <h1 class="text-center my-4">🎬 Nuove Uscite</h1>
                    <!-- Sottotitolo descrittivo -->
                    <p class="text-center text-white mb-4">
                        Scopri i film al cinema e le serie TV attualmente in onda
                    </p>
                </div>
            </div>
        </div>

        <!-- 
            Componente risultati che mostra:
            - Film attualmente al cinema (now_playing)
            - Serie TV attualmente in onda (on_the_air)
            
            Il componente AppResults gestisce automaticamente la separazione
            tra film e serie TV con titoli distintivi per ogni sezione
        -->
        <AppResults></AppResults>
    </main>
</template>

<style scoped lang="scss">
/**
 * Stili specifici per la pagina Nuove Uscite
 * 
 * Mantiene coerenza con il design generale dell'applicazione
 * utilizzando principalmente le classi Bootstrap
 */

/* Stili per il sottotitolo descrittivo */
.text-muted {
    font-size: 1.1rem;
    margin-bottom: 2rem;
}

/* Override responsivi se necessario */
@media (max-width: 768px) {
    h1 {
        font-size: 2rem;
        /* Dimensione ridotta su mobile */
    }

    .text-muted {
        font-size: 1rem;
    }
}
</style>