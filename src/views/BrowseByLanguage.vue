<template>
    <!-- Contenitore principale della pagina Sfoglia per Lingua -->
    <main>
        <!-- Header della pagina standardizzato -->
        <AppPageHeader title="Sfoglia per Lingua" icon="🌍"
            description="Esplora film e serie TV dalla tua lingua preferita" />

        <!-- Selezione delle lingue -->
        <div class="container-fluid mb-4">
            <div class="row justify-content-center">
                <div class="col-lg-10 col-xl-8">
                    <div class="language-selector p-4 rounded">
                        <h3 class="text-center mb-4">Seleziona una lingua:</h3>
                        <div class="row g-3">
                            <div v-for="language in availableLanguages" :key="language.code"
                                class="col-6 col-md-4 col-lg-3">
                                <div class="language-card text-center p-3 rounded"
                                    :class="{ active: selectedLanguage === language.code }"
                                    @click="selectLanguage(language.code)">
                                    <div class="flag-container mb-2">
                                        <img :src="getFlagUrl(language.flag)" :alt="language.name"
                                            class="flag-image rounded">
                                    </div>
                                    <h6 class="language-name mb-1">{{ language.name }}</h6>
                                    <small class="language-code">{{ language.code.toUpperCase() }}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 
      Risultati - usa il componente AppResults esistente
      Mostra il contenuto solo se è stata selezionata una lingua
    -->
        <div v-if="selectedLanguage">
            <!-- Loading state -->
            <div v-if="isLoading" class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Caricamento...</span>
                </div>
                <p class="mt-3">Caricamento contenuti in {{ getLanguageName(selectedLanguage) }}...</p>
            </div>

            <!-- Risultati usando il componente esistente -->
            <div v-else>
                <AppResults></AppResults>
            </div>
        </div>

        <!-- Stato iniziale -->
        <div v-else class="text-center py-5">
            <div class="container">
                <i class="bi bi-translate display-1 text-muted mb-3"></i>
                <h4>Inizia la tua scoperta</h4>
                <p class="text-muted">Seleziona una lingua per vedere film e serie TV da tutto il mondo</p>
            </div>
        </div>
    </main>
</template>

<script>
/**
 * Componente pagina Sfoglia per Lingua dell'applicazione Boolflix
 * 
 * Questa pagina permette di:
 * - Selezionare una lingua/paese tramite bandiere
 * - Visualizzare film e serie TV filtrati per lingua di origine
 * - Utilizzare i componenti esistenti per mantenere coerenza visiva
 * - Salvare i risultati nello store globale come le altre pagine
 */

import axios from 'axios';
import { store } from '../store';
import AppResults from '../components/AppResults.vue';
import AppPageHeader from '../components/AppPageHeader.vue';

export default {
    name: 'BrowseByLanguage',

    components: {
        AppResults, // Utilizza il componente esistente per mantenere coerenza
        AppPageHeader // Componente header riutilizzabile
    },

    data() {
        return {
            store,
            selectedLanguage: '',
            isLoading: false,

            // Lingue disponibili basate sulle bandiere che hai
            availableLanguages: [
                { code: 'it', name: 'Italiano', flag: 'it-flag.png' },
                { code: 'en', name: 'Inglese', flag: 'en-flag.png' },
                { code: 'es', name: 'Spagnolo', flag: 'es-flag.png' },
                { code: 'fr', name: 'Francese', flag: 'fr-flag.png' },
                { code: 'de', name: 'Tedesco', flag: 'de-flag.png' },
                { code: 'ja', name: 'Giapponese', flag: 'ja-flag.png' },
                { code: 'ko', name: 'Coreano', flag: 'ko-flag.png' },
                { code: 'zh', name: 'Cinese', flag: 'cn-flag.png' }
            ]
        };
    },

    methods: {
        /**
         * Seleziona una lingua e carica i contenuti
         * Simile al pattern usato nelle altre pagine
         */
        selectLanguage(languageCode) {
            this.selectedLanguage = languageCode;
            this.loadContentByLanguage(languageCode);
        },

        /**
         * Carica film e serie TV per la lingua selezionata
         * Usa lo store globale come le altre pagine
         */
        async loadContentByLanguage(languageCode) {
            this.isLoading = true;

            // Pulisce i dati esistenti nello store
            store.movies = [];
            store.tvSeries = [];

            try {
                // Carica film per la lingua selezionata
                const moviesResponse = await axios.get('https://api.themoviedb.org/3/discover/movie', {
                    params: {
                        ...store.queryParams,
                        with_original_language: languageCode,
                        sort_by: 'popularity.desc',
                        page: 1
                    }
                });

                // Carica serie TV per la lingua selezionata
                const tvResponse = await axios.get('https://api.themoviedb.org/3/discover/tv', {
                    params: {
                        ...store.queryParams,
                        with_original_language: languageCode,
                        sort_by: 'popularity.desc',
                        page: 1
                    }
                });

                // Salva i risultati nello store globale
                store.movies = moviesResponse.data.results || [];
                store.tvSeries = tvResponse.data.results || [];

            } catch (error) {
                console.error('Errore nel caricamento dei contenuti per lingua:', error);
            } finally {
                this.isLoading = false;
            }
        },

        /**
         * Ottiene l'URL della bandiera
         */
        getFlagUrl(flagName) {
            return new URL(`../assets/img/${flagName}`, import.meta.url).href;
        },

        /**
         * Ottiene il nome della lingua dal codice
         */
        getLanguageName(languageCode) {
            const language = this.availableLanguages.find(lang => lang.code === languageCode);
            return language ? language.name : languageCode;
        }
    },

    /**
     * Cleanup quando si lascia la pagina
     * Pulisce il filtro di ricerca per non interferire con altre pagine
     */
    beforeUnmount() {
        store.searchFilter = '';
    }
};
</script>

<style scoped lang="scss">
/**
 * Stili per la pagina Sfoglia per Lingua
 * Mantiene coerenza con il design esistente
 */

// Import delle variabili del tema
@use '../style/partials/variables' as *;

.language-selector {
    background-color: rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.language-card {
    background-color: rgba(0, 0, 0, 0.2);
    border: 2px solid transparent;
    cursor: pointer;
    transition: all 0.3s ease;
}

.language-card:hover {
    background-color: rgba(0, 0, 0, 0.4);
    border-color: rgba(224, 10, 18, 0.5); // Leggero accento rosso al hover
    transform: translateY(-2px);
}

.language-card.active {
    background-color: rgba(224, 10, 18, 0.2);
    border-color: $brand-secondary; // Usa la variabile del tema Netflix
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(224, 10, 18, 0.3); // Ombra rossa per evidenziare la selezione
}

.flag-image {
    width: 48px;
    height: 32px;
    object-fit: cover;
}

.language-name {
    color: $brand-light; // Usa la variabile per il testo bianco
    font-weight: 600;
}

.language-code {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.7); // Testo leggermente più grigio
}

@media (max-width: 768px) {
    .flag-image {
        width: 40px;
        height: 27px;
    }

    .language-name {
        font-size: 0.9rem;
    }
}
</style>