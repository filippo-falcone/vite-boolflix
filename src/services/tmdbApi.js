/**
 * Servizio API centralizzato per TMDB
 * 
 * Questo modulo centralizza tutte le chiamate API a The Movie Database (TMDB)
 * eliminando la duplicazione di codice e fornendo un'interfaccia coerente.
 * 
 * Vantaggi:
 * - Eliminazione duplicazione codice axios in ogni componente
 * - Gestione centralizzata degli errori
 * - Configurazione API unificata
 * - Facilità di manutenzione e testing
 * - Possibilità di aggiungere interceptors, cache, retry logic
 */

import axios from 'axios';
import { store } from '../store.js';

/**
 * Configurazione base per le API TMDB
 */
const TMDB_CONFIG = {
    baseURL: 'https://api.themoviedb.org/3',
    timeout: 10000, // 10 secondi timeout
    headers: {
        'Content-Type': 'application/json',
    }
};

/**
 * Istanza axios configurata per TMDB
 */
const tmdbApi = axios.create(TMDB_CONFIG);

/**
 * Interceptor per aggiungere automaticamente i parametri comuni
 */
tmdbApi.interceptors.request.use((config) => {
    // Aggiunge sempre api_key e language ai parametri
    config.params = {
        ...config.params,
        api_key: store.queryParams.api_key,
        language: store.queryParams.language
    };
    return config;
});

/**
 * Interceptor per gestione errori centralizzata
 */
tmdbApi.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('TMDB API Error:', error.message);
        
        // Qui si potrebbero aggiungere notifiche toast, tracking errori, ecc.
        if (error.response?.status === 401) {
            console.error('Errore di autenticazione API TMDB - Verifica la API key');
        } else if (error.response?.status === 429) {
            console.error('Rate limit TMDB superato - Riprova più tardi');
        }
        
        return Promise.reject(error);
    }
);

/**
 * Servizio API Movies
 */
export const moviesApi = {
    /**
     * Ottiene film popolari
     * @param {Object} options - Parametri aggiuntivi (page, region, etc.)
     * @returns {Promise} Risultati API TMDB
     */
    getPopular: (options = {}) => 
        tmdbApi.get('/movie/popular', { params: options }),

    /**
     * Cerca film per titolo
     * @param {string} query - Termine di ricerca
     * @param {Object} options - Parametri aggiuntivi
     * @returns {Promise} Risultati ricerca
     */
    search: (query, options = {}) => 
        tmdbApi.get('/search/movie', { params: { query, ...options } }),

    /**
     * Ottiene film attualmente al cinema
     * @param {Object} options - Parametri aggiuntivi (region, etc.)
     * @returns {Promise} Film now playing
     */
    getNowPlaying: (options = {}) => 
        tmdbApi.get('/movie/now_playing', { params: options }),

    /**
     * Ottiene film trending della settimana
     * @param {Object} options - Parametri aggiuntivi
     * @returns {Promise} Film trending
     */
    getTrending: (options = {}) => 
        tmdbApi.get('/trending/movie/week', { params: options }),

    /**
     * Discover film per lingua
     * @param {string} language - Codice lingua (es: 'it', 'en')
     * @param {Object} options - Parametri aggiuntivi
     * @returns {Promise} Film per lingua
     */
    discoverByLanguage: (language, options = {}) => 
        tmdbApi.get('/discover/movie', { 
            params: { 
                with_original_language: language, 
                sort_by: 'popularity.desc',
                ...options 
            } 
        })
};

/**
 * Servizio API Serie TV
 */
export const tvApi = {
    /**
     * Ottiene serie TV popolari
     * @param {Object} options - Parametri aggiuntivi
     * @returns {Promise} Serie TV popolari
     */
    getPopular: (options = {}) => 
        tmdbApi.get('/tv/popular', { params: options }),

    /**
     * Cerca serie TV per nome
     * @param {string} query - Termine di ricerca
     * @param {Object} options - Parametri aggiuntivi
     * @returns {Promise} Risultati ricerca
     */
    search: (query, options = {}) => 
        tmdbApi.get('/search/tv', { params: { query, ...options } }),

    /**
     * Ottiene serie TV attualmente in onda
     * @param {Object} options - Parametri aggiuntivi
     * @returns {Promise} Serie TV on the air
     */
    getOnTheAir: (options = {}) => 
        tmdbApi.get('/tv/on_the_air', { params: options }),

    /**
     * Ottiene serie TV trending della settimana
     * @param {Object} options - Parametri aggiuntivi
     * @returns {Promise} Serie TV trending
     */
    getTrending: (options = {}) => 
        tmdbApi.get('/trending/tv/week', { params: options }),

    /**
     * Discover serie TV per lingua
     * @param {string} language - Codice lingua (es: 'it', 'en')
     * @param {Object} options - Parametri aggiuntivi
     * @returns {Promise} Serie TV per lingua
     */
    discoverByLanguage: (language, options = {}) => 
        tmdbApi.get('/discover/tv', { 
            params: { 
                with_original_language: language, 
                sort_by: 'popularity.desc',
                ...options 
            } 
        })
};

/**
 * Funzioni di utilità per operazioni comuni
 */
export const apiUtils = {
    /**
     * Estrae solo i risultati dalle risposte API
     * @param {Object} response - Risposta axios
     * @returns {Array} Array di risultati
     */
    extractResults: (response) => response.data.results || [],

    /**
     * Gestisce errori API in modo uniforme
     * @param {Error} error - Errore catturato
     * @param {string} context - Contesto dell'errore per logging
     */
    handleError: (error, context = '') => {
        console.error(`Errore API${context ? ` in ${context}` : ''}:`, error);
        return [];
    },

    /**
     * Carica film e serie TV in parallelo (per homepage e nuove uscite)
     * @param {Function} moviesFn - Funzione per caricare film
     * @param {Function} tvFn - Funzione per caricare TV
     * @returns {Promise} Risultati combinati
     */
    loadBoth: async (moviesFn, tvFn) => {
        try {
            const [moviesResponse, tvResponse] = await Promise.all([
                moviesFn(),
                tvFn()
            ]);
            
            return {
                movies: apiUtils.extractResults(moviesResponse),
                tvSeries: apiUtils.extractResults(tvResponse)
            };
        } catch (error) {
            apiUtils.handleError(error, 'caricamento parallelo');
            return { movies: [], tvSeries: [] };
        }
    }
};

/**
 * Hook di utilità per aggiornare lo store
 * Centralizza la logica di aggiornamento dello store con i risultati API
 */
export const storeUpdaters = {
    /**
     * Aggiorna lo store con film
     * @param {Array} movies - Array di film
     * @param {boolean} clearTv - Se svuotare anche le serie TV
     */
    updateMovies: (movies, clearTv = false) => {
        store.movies = movies;
        if (clearTv) store.tvSeries = [];
    },

    /**
     * Aggiorna lo store con serie TV
     * @param {Array} tvSeries - Array di serie TV
     * @param {boolean} clearMovies - Se svuotare anche i film
     */
    updateTvSeries: (tvSeries, clearMovies = false) => {
        store.tvSeries = tvSeries;
        if (clearMovies) store.movies = [];
    },

    /**
     * Aggiorna lo store con contenuti trending
     * @param {Array} trendingMovies - Film trending
     * @param {Array} trendingTvSeries - Serie TV trending
     */
    updateTrending: (trendingMovies, trendingTvSeries) => {
        store.trendingMovies = trendingMovies;
        store.trendingTvSeries = trendingTvSeries;
    },

    /**
     * Aggiorna lo store con entrambi i tipi
     * @param {Array} movies - Film
     * @param {Array} tvSeries - Serie TV
     */
    updateBoth: (movies, tvSeries) => {
        store.movies = movies;
        store.tvSeries = tvSeries;
    }
};

export default tmdbApi;