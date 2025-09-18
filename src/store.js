/**
 * Store globale dell'applicazione Boolflix
 * 
 * Utilizza la funzione reactive() di Vue 3 per creare uno store globale
 * condiviso tra tutti i componenti dell'applicazione. Questo approccio
 * semplice è ideale per applicazioni di piccole-medie dimensioni.
 * 
 * Lo store contiene:
 * - Parametri di configurazione per le API TMDB
 * - Arrays per i diversi tipi di contenuti (film, serie TV, trending)
 * - Filtro di ricerca globale
 */

// Import della funzione reactive da Vue 3 per la reattività
import { reactive } from "vue";

/**
 * Store reattivo esportato per l'uso in tutta l'applicazione
 * 
 * Tutti i componenti che importano questo store condivideranno
 * gli stessi dati e reagiranno automaticamente ai cambiamenti
 */
export const store = reactive({
    /**
     * Parametri di query per le chiamate API a TMDB
     * 
     * Questi parametri vengono utilizzati in tutte le chiamate alle API
     * di The Movie Database per garantire coerenza
     */
    queryParams: {
        api_key: '625881f36f688a123e9d2bc2efd0fbfe', // Chiave API per autenticazione TMDB
        language: 'it-IT',                           // Lingua italiana per metadati
    },

    /**
     * Array dei film
     * 
     * Contiene i risultati di:
     * - Ricerca film (quando si cerca dalla searchbar)
     * - Film popolari (pagina Movies senza ricerca)
     * - Viene svuotato quando si naviga nella pagina Serie TV
     */
    movies: [],

    /**
     * Array delle serie TV
     * 
     * Contiene i risultati di:
     * - Ricerca serie TV (quando si cerca dalla searchbar)
     * - Serie TV popolari (pagina TvSeries senza ricerca)
     * - Viene svuotato quando si naviga nella pagina Film
     */
    tvSeries: [],

    /**
     * Array dei film trending
     * 
     * Contiene i film più popolari della settimana da TMDB.
     * Utilizzato nella homepage per la sezione trending,
     * separato da 'movies' per non sovrascrivere i risultati di ricerca
     */
    trendingMovies: [],

    /**
     * Array delle serie TV trending
     * 
     * Contiene le serie TV più popolari della settimana da TMDB.
     * Utilizzato nella homepage per la sezione trending,
     * separato da 'tvSeries' per non sovrascrivere i risultati di ricerca
     */
    trendingTvSeries: [],

    /**
     * Filtro di ricerca globale
     * 
     * Stringa che contiene il termine di ricerca inserito dall'utente
     * nella searchbar dell'header. Questo valore è:
     * - Collegato bidirezionalmente all'input di ricerca (v-model)
     * - Osservato da tutte le pagine tramite watchers
     * - Utilizzato per determinare se mostrare contenuti di default o risultati di ricerca
     */
    searchFilter: ''
});