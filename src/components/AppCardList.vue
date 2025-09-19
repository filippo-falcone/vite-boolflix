<script>
/**
 * Componente AppCardList - Lista responsiva di card
 * 
 * Questo componente crea una griglia responsiva di card per visualizzare
 * film e serie TV. Riceve un array di dati tramite props e utilizza v-for
 * per creare una AppCard per ogni elemento.
 * 
 * La griglia è completamente responsiva utilizzando Bootstrap:
 * - Mobile (xs): 2 colonne
 * - Small (sm): 3 colonne  
 * - Large (lg): 4 colonne
 * - Extra Large (xl): 6 colonne
 */

// Import dello store globale (se necessario per funzionalità future)
import { store } from '../store';
// Import del componente singola card
import AppCard from './AppCard.vue';

export default {
    name: 'AppCardList', // Nome del componente

    /**
     * Props ricevute dal componente padre
     * 
     * cardInfo: Array di oggetti contenenti i dati dei media (film/serie TV)
     * Ogni oggetto contiene le informazioni necessarie per renderizzare una card
     */
    props: {
        cardInfo: {
            type: Array,    // Tipo: array di oggetti
            required: true, // Obbligatorio per il funzionamento del componente
            default: () => [] // Valore di default per evitare errori
        }
    },

    // Registrazione dei componenti utilizzati
    components: {
        AppCard // Componente per renderizzare una singola card
    },

    // Computed properties per garantire dati stabili
    computed: {
        /**
         * Array filtrato e validato degli elementi da visualizzare
         * 
         * Filtra solo gli elementi validi con ID definito per evitare
         * errori durante il rendering e problemi con le key di Vue
         * 
         * @returns {Array} Array filtrato di media validi
         */
        validCardInfo() {
            if (!this.cardInfo || !Array.isArray(this.cardInfo)) {
                return [];
            }
            return this.cardInfo.filter(media =>
                media &&
                media.id &&
                (media.title || media.name)
            );
        }
    }
}
</script>

<template>
    <!-- 
        Griglia responsiva Bootstrap
        
        Classi utilizzate:
        - row: Crea una riga Bootstrap
        - row-cols-*: Definisce il numero di colonne per breakpoint
        - g-3: Gap di 3 tra le colonne (spacing)
        - mb-3: Margin bottom di 3 per separazione tra sezioni
        
        Breakpoints:
        - row-cols-2: 2 colonne su mobile (default)
        - row-cols-sm-3: 3 colonne da small in su (576px+)
        - row-cols-lg-4: 4 colonne da large in su (992px+)
        - row-cols-xl-6: 6 colonne da extra-large in su (1200px+)
    -->
    <div class="row row-cols-2 row-cols-sm-3 row-cols-lg-4 row-cols-xl-6 g-3 mb-3">
        <!-- 
            Loop v-for per creare una card per ogni elemento
            
            - v-for: Itera attraverso l'array validCardInfo (filtrato)
            - :key: Utilizzata una key composita per maggiore stabilità
            - :cardInfo: Passa i dati del singolo media alla AppCard
        -->
        <AppCard v-for="media in validCardInfo" :key="`card-${media.id}-${media.title || media.name}`"
            :cardInfo="media">
        </AppCard>
    </div>
</template>

<style scoped lang="scss">
/* 
 * Stili specifici per AppCardList
 * Attualmente non ci sono stili personalizzati,
 * il componente utilizza completamente il sistema di griglia Bootstrap
 */
</style>