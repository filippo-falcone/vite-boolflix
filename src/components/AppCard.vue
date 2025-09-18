<script>
/**
 * Componente AppCard - Card per singolo film/serie TV
 * 
 * Questo componente rappresenta una singola card che mostra le informazioni
 * di un film o serie TV. Include:
 * - Poster con fallback per immagini mancanti
 * - Overlay con informazioni al hover
 * - Sistema di valutazione a stelle
 * - Bandiera per la lingua originale
 * - Gestione responsive del layout
 */

// Import dello store globale (se necessario per funzionalità future)
import { store } from '../store';

export default {
    name: 'AppCard', // Nome del componente

    /**
     * Props ricevute dal componente padre (AppCardList)
     * 
     * cardInfo: Oggetto contenente tutte le informazioni del media da TMDB
     */
    props: {
        cardInfo: {
            type: Object,   // Oggetto con dati da TMDB API
            required: true  // Obbligatorio per il funzionamento
        }
    },

    // Dati reattivi del componente
    data() {
        return {
            /**
             * Array delle lingue supportate per le bandiere
             * 
             * Include solo le lingue per cui abbiamo le immagini delle bandiere
             * nella cartella assets/img/
             */
            flags: ['it', 'en', 'fr', 'de', 'es', 'ja', 'cn', 'ko'],

            /**
             * Array per le stelle (approccio alternativo commentato)
             * 
             * Usato nell'implementazione commentata per pre-calcolare
             * quali stelle mostrare piene o vuote
             */
            starArray: []
        };
    },

    // Metodi del componente
    methods: {
        /**
         * Genera l'URL dell'immagine della bandiera
         * 
         * Costruisce dinamicamente il path per l'immagine della bandiera
         * basandosi sulla lingua originale del media
         * 
         * @returns {string} URL completo dell'immagine della bandiera
         */
        getFlagUrl() {
            // Costruisce il nome del file: es. "it-flag.png", "en-flag.png"
            let flagImgName = this.cardInfo.original_language + '-flag.png';

            // Usa la funzione URL con import.meta.url per risolvere il path dinamicamente
            // Questo è necessario con Vite per gestire correttamente gli asset
            return new URL(`../assets/img/${flagImgName}`, import.meta.url).href;
        }

        /**
         * METODO COMMENTATO - Prima implementazione delle stelle
         * 
         * Questo approccio pre-calcolava un array di classi CSS per le stelle
         * e lo salvava in starArray. Sostituito con computed property per
         * maggiore efficienza e reattività.
         */
        // getStars(){
        //     // Converte voto da 0-10 a 0-5 e arrotonda
        //     this.cardInfo.vote_average = Math.round(this.cardInfo.vote_average / 2);
        //     
        //     // Crea array di 5 elementi con classi per stelle piene/vuote
        //     for(let i = 0; i < 5; i++) {
        //         if(i < this.cardInfo.vote_average) {
        //             this.starArray.push('bi-star-fill'); // Stella piena
        //         } else {
        //             this.starArray.push('bi-star');      // Stella vuota
        //         }
        //     }
        // }
    },

    /**
     * Hook del ciclo di vita - Componente montato
     * 
     * Chiamato quando il componente viene montato nel DOM
     */
    mounted() {
        // Chiamata commentata al metodo getStars() non più utilizzato
        // this.getStars()
    },

    /**
     * Proprietà calcolate - Si aggiornano automaticamente al cambiare dei dati
     */
    computed: {
        /**
         * Converte il voto da TMDB (0-10) in voto a stelle (0-5)
         * 
         * TMDB fornisce voti da 0 a 10, noi vogliamo mostrarli come stelle
         * da 0 a 5, quindi dividiamo per 2 e arrotondiamo
         * 
         * @returns {number} Voto convertito in scala 0-5
         */
        getVoteIn5() {
            return Math.round(this.cardInfo.vote_average / 2);
        }
    }
}
</script>

<template>
    <!-- Colonna Bootstrap per il sistema di griglia -->
    <div class="col">
        <!-- Contenitore principale della card -->
        <div class="img-container">

            <!-- 
                CASO 1: Poster non disponibile
                Mostra placeholder quando TMDB non ha un poster per il media
            -->
            <div v-if="cardInfo.poster_path === null" class="poster-container not-found">
                <!-- Immagine di sfondo placeholder -->
                <img src="../assets/img/poster-place-holder.png" alt="poster-placeholder-background">
                <!-- Icona "immagine non trovata" di TMDB -->
                <img class="poster not-found"
                    src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                    alt="Image not found">
            </div>

            <!-- 
                CASO 2: Poster disponibile
                Mostra il poster ufficiale da TMDB
            -->
            <div v-else class="poster-container">
                <!-- Immagine di sfondo placeholder (carica mentre il poster viene scaricato) -->
                <img src="../assets/img/poster-place-holder.png" alt="poster-placeholder-background">
                <!-- 
                    Poster ufficiale da TMDB
                    - Usa l'endpoint w342 per poster di media qualità
                    - Alt text dinamico basato su titolo film o nome serie TV
                -->
                <img class="poster" :src="'https://image.tmdb.org/t/p/w342' + cardInfo.poster_path"
                    :alt="cardInfo.title || cardInfo.name">
            </div>

            <!-- 
                Overlay con informazioni del media
                Visibile solo al hover, sovrapposto al poster
            -->
            <div class="info-container p-3">

                <!-- Titolo (diverso per film vs serie TV) -->
                <div class="title">
                    Titolo:
                    <span>{{ cardInfo.title || cardInfo.name }}</span>
                </div>

                <!-- Titolo originale (diverso per film vs serie TV) -->
                <div class="original title">
                    Titolo originale:
                    <span>{{ cardInfo.original_title || cardInfo.original_name }}</span>
                </div>

                <!-- 
                    Lingua originale con bandiera
                    Mostra bandiera se disponibile, altrimenti codice lingua
                -->
                <div class="d-flex align-items-center">
                    Lingua:
                    <div class="flag-container ms-2">
                        <!-- Bandiera (se supportata) -->
                        <img v-if="flags.includes(cardInfo.original_language)" :src="getFlagUrl()"
                            :alt="cardInfo.original_language">
                        <!-- Codice lingua (se bandiera non disponibile) -->
                        <div v-else>{{ cardInfo.original_language }}</div>
                    </div>
                </div>

                <!-- 
                    Sistema di valutazione a stelle
                    Converte voto TMDB (0-10) in stelle (0-5)
                -->
                <div class="d-flex">
                    Voto:

                    <!-- 
                        IMPLEMENTAZIONE COMMENTATA - Prima soluzione
                        Usava array pre-calcolato di classi CSS
                    -->
                    <!-- <div class="d-flex align-items-center ms-2">
                        <i v-for="star in starArray" :key="star" :class="star" class="bi fs-6 text-warning"></i>
                    </div> -->

                    <!-- 
                        IMPLEMENTAZIONE ATTUALE - Seconda soluzione (migliore)
                        Usa computed property per calcolo dinamico delle stelle
                    -->
                    <div class="d-flex align-items-center ms-2">
                        <i v-for="n in 5" :class="{
                            'bi-star-fill': n <= getVoteIn5,
                            'bi-star': n > Math.round(cardInfo.vote_average / 2)
                        }" class="bi fs-6 text-warning">
                        </i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
/**
 * Stili per il componente AppCard
 * 
 * Il componente utilizza un approccio card-based con overlay hover
 * per mostrare le informazioni. Il design è pensato per essere responsive
 * e funzionare bene in griglie di diverse dimensioni.
 */

.col {

    /**
     * Contenitore principale dell'immagine
     * 
     * Position relative per permettere il posizionamento assoluto
     * dell'overlay di informazioni
     */
    .img-container {
        position: relative;

        /**
         * Contenitore del poster
         * 
         * Gestisce il posizionamento relativo per l'overlay dell'immagine
         */
        .poster-container {
            position: relative;

            /**
             * Stili per l'immagine del poster
             * 
             * Position absolute per sovrapporre il poster al placeholder
             * e creare un effetto di caricamento fluido
             */
            .poster {
                width: 100%;
                /* Occupa tutta la larghezza del contenitore */
                height: 100%;
                /* Occupa tutta l'altezza del contenitore */
                position: absolute;
                /* Posizionato sopra l'immagine placeholder */
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;

                /**
                 * Stili specifici per l'icona "immagine non trovata"
                 * 
                 * Quando il poster non è disponibile, mostra un'icona centrata
                 * di dimensioni ridotte per indicare l'assenza di immagine
                 */
                &.not-found {
                    width: 70%;
                    /* Dimensione ridotta */
                    top: 50%;
                    /* Centrato verticalmente */
                    left: 50%;
                    /* Centrato orizzontalmente */
                    transform: translate(-50%, -50%);
                    /* Correzione del centro */
                }
            }
        }
    }

    /**
     * Overlay con le informazioni del media
     * 
     * Posizionato sopra l'immagine e visibile solo al hover.
     * Contiene tutte le informazioni testuali del film/serie TV.
     */
    .info-container {
        font-size: .875rem;
        /* Font size ridotto per più informazioni */
        background-color: #000000af;
        /* Nero semi-trasparente per leggibilità */
        position: absolute;
        /* Posizionato sopra l'immagine */
        top: 0;
        /* Copre completamente l'immagine */
        right: 0;
        bottom: 0;
        left: 0;
        opacity: 0;
        /* Invisibile di default */

        /**
         * Effetto hover - Mostra l'overlay
         * 
         * Al passaggio del mouse, l'overlay diventa completamente visibile
         * creando un effetto di transizione fluido
         */
        &:hover {
            opacity: 1;
            /* Completamente visibile al hover */
        }

        /**
         * Stili per i titoli
         * 
         * I valori dei titoli hanno un colore più tenue per gerarchia visiva
         */
        .title {
            span {
                color: #999797;
                /* Grigio chiaro per i valori */
            }
        }

        /**
         * Contenitore della bandiera
         * 
         * Limita la dimensione massima della bandiera per mantenere
         * proporzioni coerenti nell'interfaccia
         */
        .flag-container {
            max-width: 21px;
            /* Larghezza massima fissa per tutte le bandiere */
        }
    }
}
</style>