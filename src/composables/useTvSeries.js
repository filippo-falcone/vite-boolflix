/**
 * Composable useTvSeries - Gestione logica serie TV
 * 
 * Composable Vue 3 che centralizza tutta la logica relativa alle serie TV,
 * separando la business logic dai componenti e rendendo il codice
 * più riutilizzabile e testabile.
 */

import { ref, computed } from 'vue';
import { store } from '../store.js';
import { tvApi, apiUtils, storeUpdaters } from '../services/tmdbApi.js';

export function useTvSeries() {
    // Stati reattivi locali
    const isLoading = ref(false);
    const error = ref(null);

    // Computed properties
    const hasTvSeries = computed(() => store.tvSeries.length > 0);
    const tvSeriesCount = computed(() => store.tvSeries.length);

    /**
     * Carica serie TV popolari
     */
    const loadPopularTvSeries = async () => {
        isLoading.value = true;
        error.value = null;

        try {
            const response = await tvApi.getPopular();
            const tvSeries = apiUtils.extractResults(response);
            
            storeUpdaters.updateTvSeries(tvSeries, true); // Svuota anche i film
            console.log('Serie TV popolari caricate:', tvSeries.length);
        } catch (err) {
            error.value = 'Errore nel caricamento delle serie TV popolari';
            apiUtils.handleError(err, 'serie TV popolari');
        } finally {
            isLoading.value = false;
        }
    };

    /**
     * Cerca serie TV per nome
     */
    const searchTvSeries = async (query) => {
        if (!query || query.trim() === '') {
            return loadPopularTvSeries();
        }

        isLoading.value = true;
        error.value = null;

        try {
            const response = await tvApi.search(query.trim());
            const tvSeries = apiUtils.extractResults(response);
            
            storeUpdaters.updateTvSeries(tvSeries, true); // Svuota anche i film
            console.log(`Ricerca serie TV "${query}":`, tvSeries.length, 'risultati');
        } catch (err) {
            error.value = 'Errore nella ricerca delle serie TV';
            apiUtils.handleError(err, 'ricerca serie TV');
        } finally {
            isLoading.value = false;
        }
    };

    /**
     * Carica serie TV o effettua ricerca basandosi sul filtro di ricerca
     */
    const loadTvSeriesOrSearch = async () => {
        const searchTerm = store.searchFilter?.trim();
        
        if (searchTerm) {
            await searchTvSeries(searchTerm);
        } else {
            await loadPopularTvSeries();
        }
    };

    /**
     * Carica serie TV attualmente in onda
     */
    const loadOnTheAirTvSeries = async () => {
        isLoading.value = true;
        error.value = null;

        try {
            const response = await tvApi.getOnTheAir();
            const tvSeries = apiUtils.extractResults(response);
            
            storeUpdaters.updateTvSeries(tvSeries, false); // Non svuotare film (per NewReleases)
            console.log('Serie TV in onda caricate:', tvSeries.length);
        } catch (err) {
            error.value = 'Errore nel caricamento delle serie TV in onda';
            apiUtils.handleError(err, 'serie TV in onda');
        } finally {
            isLoading.value = false;
        }
    };

    /**
     * Carica serie TV trending
     */
    const loadTrendingTvSeries = async () => {
        isLoading.value = true;
        error.value = null;

        try {
            const response = await tvApi.getTrending();
            const tvSeries = apiUtils.extractResults(response);
            
            store.trendingTvSeries = tvSeries;
            console.log('Serie TV trending caricate:', tvSeries.length);
        } catch (err) {
            error.value = 'Errore nel caricamento delle serie TV trending';
            apiUtils.handleError(err, 'serie TV trending');
        } finally {
            isLoading.value = false;
        }
    };

    /**
     * Carica serie TV per lingua specifica
     */
    const loadTvSeriesByLanguage = async (language) => {
        isLoading.value = true;
        error.value = null;

        try {
            const response = await tvApi.discoverByLanguage(language);
            const tvSeries = apiUtils.extractResults(response);
            
            storeUpdaters.updateTvSeries(tvSeries, false);
            console.log(`Serie TV in ${language} caricate:`, tvSeries.length);
        } catch (err) {
            error.value = `Errore nel caricamento delle serie TV in ${language}`;
            apiUtils.handleError(err, `serie TV ${language}`);
        } finally {
            isLoading.value = false;
        }
    };

    // Ritorna tutte le funzioni e stati
    return {
        // Stati
        isLoading,
        error,
        hasTvSeries,
        tvSeriesCount,
        
        // Azioni
        loadPopularTvSeries,
        searchTvSeries,
        loadTvSeriesOrSearch,
        loadOnTheAirTvSeries,
        loadTrendingTvSeries,
        loadTvSeriesByLanguage
    };
}