/**
 * Composable useMovies - Gestione logica film
 * 
 * Composable Vue 3 che centralizza tutta la logica relativa ai film,
 * separando la business logic dai componenti e rendendo il codice
 * più riutilizzabile e testabile.
 */

import { ref, computed } from 'vue';
import { store } from '../store.js';
import { moviesApi, apiUtils, storeUpdaters } from '../services/tmdbApi.js';

export function useMovies() {
    // Stati reattivi locali
    const isLoading = ref(false);
    const error = ref(null);

    // Computed properties
    const hasMovies = computed(() => store.movies.length > 0);
    const moviesCount = computed(() => store.movies.length);

    /**
     * Carica film popolari
     */
    const loadPopularMovies = async () => {
        isLoading.value = true;
        error.value = null;

        try {
            const response = await moviesApi.getPopular();
            const movies = apiUtils.extractResults(response);
            
            storeUpdaters.updateMovies(movies, true); // Svuota anche le TV
            console.log('Film popolari caricati:', movies.length);
        } catch (err) {
            error.value = 'Errore nel caricamento dei film popolari';
            apiUtils.handleError(err, 'film popolari');
        } finally {
            isLoading.value = false;
        }
    };

    /**
     * Cerca film per titolo
     */
    const searchMovies = async (query) => {
        if (!query || query.trim() === '') {
            return loadPopularMovies();
        }

        isLoading.value = true;
        error.value = null;

        try {
            const response = await moviesApi.search(query.trim());
            const movies = apiUtils.extractResults(response);
            
            storeUpdaters.updateMovies(movies, true); // Svuota anche le TV
            console.log(`Ricerca film "${query}":`, movies.length, 'risultati');
        } catch (err) {
            error.value = 'Errore nella ricerca dei film';
            apiUtils.handleError(err, 'ricerca film');
        } finally {
            isLoading.value = false;
        }
    };

    /**
     * Carica film o effettua ricerca basandosi sul filtro di ricerca
     */
    const loadMoviesOrSearch = async () => {
        const searchTerm = store.searchFilter?.trim();
        
        if (searchTerm) {
            await searchMovies(searchTerm);
        } else {
            await loadPopularMovies();
        }
    };

    /**
     * Carica film attualmente al cinema
     */
    const loadNowPlayingMovies = async (region = 'IT') => {
        isLoading.value = true;
        error.value = null;

        try {
            const response = await moviesApi.getNowPlaying({ region });
            const movies = apiUtils.extractResults(response);
            
            storeUpdaters.updateMovies(movies, false); // Non svuotare TV (per NewReleases)
            console.log('Film al cinema caricati:', movies.length);
        } catch (err) {
            error.value = 'Errore nel caricamento dei film al cinema';
            apiUtils.handleError(err, 'film al cinema');
        } finally {
            isLoading.value = false;
        }
    };

    /**
     * Carica film trending
     */
    const loadTrendingMovies = async () => {
        isLoading.value = true;
        error.value = null;

        try {
            const response = await moviesApi.getTrending();
            const movies = apiUtils.extractResults(response);
            
            store.trendingMovies = movies;
            console.log('Film trending caricati:', movies.length);
        } catch (err) {
            error.value = 'Errore nel caricamento dei film trending';
            apiUtils.handleError(err, 'film trending');
        } finally {
            isLoading.value = false;
        }
    };

    /**
     * Carica film per lingua specifica
     */
    const loadMoviesByLanguage = async (language) => {
        isLoading.value = true;
        error.value = null;

        try {
            const response = await moviesApi.discoverByLanguage(language);
            const movies = apiUtils.extractResults(response);
            
            storeUpdaters.updateMovies(movies, false);
            console.log(`Film in ${language} caricati:`, movies.length);
        } catch (err) {
            error.value = `Errore nel caricamento dei film in ${language}`;
            apiUtils.handleError(err, `film ${language}`);
        } finally {
            isLoading.value = false;
        }
    };

    // Ritorna tutte le funzioni e stati
    return {
        // Stati
        isLoading,
        error,
        hasMovies,
        moviesCount,
        
        // Azioni
        loadPopularMovies,
        searchMovies,
        loadMoviesOrSearch,
        loadNowPlayingMovies,
        loadTrendingMovies,
        loadMoviesByLanguage
    };
}