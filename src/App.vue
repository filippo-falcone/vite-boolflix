<script>
/**
 * Componente principale dell'applicazione Boolflix
 * 
 * App.vue è il componente root che:
 * - Gestisce la struttura generale dell'applicazione
 * - Include l'header comune a tutte le pagine
 * - Fornisce il punto di montaggio per le rotte (router-view)
 * - Gestisce il pulsante "scroll to top" globale
 */

// Import dello store globale per accedere ai dati condivisi
import { store } from './store';
// Import del componente header che sarà presente in tutte le pagine
import AppHeader from './components/AppHeader.vue';

export default {
    name: 'App', // Nome del componente

    // Registrazione dei componenti utilizzati in questo componente
    components: {
        AppHeader // Header di navigazione globale
    },

    // Dati reattivi del componente
    data() {
        return {
            store,     // Store globale per accesso ai dati condivisi
            isShow: '', // Classe CSS per mostrare/nascondere il pulsante scroll-up
        };
    },

    // Metodi del componente
    methods: {
        /**
         * Gestisce la visibilità del pulsante "scroll to top"
         * 
         * Controlla la posizione di scroll della pagina e mostra il pulsante
         * quando l'utente ha scrollato più di 20px verso il basso
         */
        showButtonToScroll() {
            // Controlla sia document.body che document.documentElement per compatibilità browser
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                this.isShow = 'active'; // Mostra il pulsante
            } else {
                this.isShow = '';       // Nasconde il pulsante
            }
        },

        /**
         * Porta la pagina all'inizio (scroll to top)
         * 
         * Resetta la posizione di scroll a 0 per entrambi gli elementi
         * per garantire compatibilità con tutti i browser
         */
        scrollTop() {
            document.body.scrollTop = 0;             // Per Safari
            document.documentElement.scrollTop = 0;  // Per Chrome, Firefox, IE, Opera
        }
    },

    /**
     * Hook del ciclo di vita - Componente montato
     * 
     * Configura il listener per l'evento scroll globale della finestra
     */
    mounted() {
        // Assegna la funzione all'evento onscroll globale
        // Ogni volta che l'utente scrolla, viene chiamata showButtonToScroll()
        onscroll = () => {
            this.showButtonToScroll();
        }
    }
}
</script>

<template>
    <!-- Header di navigazione presente in tutte le pagine -->
    <AppHeader></AppHeader>

    <!-- 
        router-view: Punto di montaggio per le rotte
        Qui vengono renderizzati i componenti delle diverse pagine:
        - Home.vue per la rotta "/"
        - Movies.vue per la rotta "/movies"  
        - TvSeries.vue per la rotta "/tv-series"
    -->
    <router-view></router-view>

    <!-- 
        Pulsante "Scroll to Top" 
        - Posizionato fisso in basso a destra
        - Visibile solo quando l'utente ha scrollato (classe :class="isShow")
        - Al clic chiama scrollTop() per tornare all'inizio della pagina
    -->
    <button class="scroll-up btn" :class="isShow" @click="scrollTop">
        <i class="bi bi-caret-up-fill"></i>
    </button>
</template>

<style lang="scss">
/* Import degli stili globali dell'applicazione */
@use './style/general.scss';
@use './style/partials/variables' as *;

/**
 * Stili per il pulsante "Scroll to Top"
 * 
 * Pulsante floating posizionato fisso in basso a destra
 * che permette di tornare rapidamente all'inizio della pagina
 */
.scroll-up {
    display: none;
    /* Nascosto di default */
    position: fixed;
    /* Posizione fissa rispetto al viewport */
    bottom: 1rem;
    /* 16px dal fondo della pagina */
    right: 2.5rem;
    /* 40px dal lato destro */
    z-index: 1;
    /* Sopra gli altri elementi */

    /**
     * Effetto hover - Cambia colore del bordo e dell'icona
     * al passaggio del mouse per feedback visivo
     */
    &:hover {
        border-color: $brand-secondary;
        /* Colore bordo al hover */

        i {
            color: $brand-secondary;
            /* Colore icona al hover */
        }
    }

    /**
     * Stato attivo - Viene applicato quando l'utente ha scrollato
     * più di 20px verso il basso (classe aggiunta dinamicamente da JS)
     */
    &.active {
        background-color: $brand-primary;
        /* Colore di sfondo del tema */
        display: block;
        /* Mostra il pulsante */
    }
}
</style>
