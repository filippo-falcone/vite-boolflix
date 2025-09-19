<script>
/**
 * Componente AppResults - Visualizzazione dei risultati
 * 
 * Questo componente è responsabile di mostrare i risultati di ricerca
 * o i contenuti popolari in forma organizzata. Gestisce sia film che serie TV
 * e determina automaticamente cosa visualizzare basandosi sui dati presenti nello store.
 * 
 * Utilizzato in:
 * - Homepage (per risultati di ricerca)
 * - Pagina Film (per film popolari o risultati ricerca film)
 * - Pagina Serie TV (per serie TV popolari o risultati ricerca serie TV)
 */

// Import dello store globale per accesso ai dati
import { store } from '../store';
// Import del componente che renderizza la lista di card
import AppCardList from './AppCardList.vue';

export default {
    name: 'AppResults', // Nome del componente

    // Props ricevute dal componente genitore
    props: {
        hideTitle: {
            type: Boolean,
            default: false
        }
    },

    // Registrazione dei componenti utilizzati
    components: {
        AppCardList // Componente che crea la griglia di card per i media
    },

    // Dati reattivi del componente
    data() {
        return {
            store // Store globale per accesso a movies, tvSeries, ecc.
        }
    }
}
</script>

<template>
    <!-- 
        Sezione principale dei risultati
        Mostra contenuti diversi basandosi sui dati presenti nello store
    -->
    <section>
        <div class="container py-4">
            <!-- 
                Sezione Film 
                Mostrata solo se ci sono film da visualizzare nello store
            -->
            <div v-if="store.movies.length > 0">
                <h2 v-if="!hideTitle" class="section-title">Film</h2>
                <AppCardList :cardInfo="store.movies"></AppCardList>
            </div>

            <!-- 
                Sezione Serie TV
                Mostrata solo se ci sono serie TV da visualizzare nello store
            -->
            <div v-if="store.tvSeries.length > 0">
                <h2 v-if="!hideTitle" class="section-title">Serie TV</h2>
                <AppCardList :cardInfo="store.tvSeries"></AppCardList>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
/* 
 * Stili specifici per AppResults
 * Attualmente non ci sono stili personalizzati,
 * il componente utilizza le classi Bootstrap di default
 */
</style>