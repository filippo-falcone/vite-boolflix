<script>
/**
 * Vista MyList - La mia lista dei desideri
 * 
 * Questa pagina mostra tutti i film e serie TV che l'utente ha salvato
 * nella sua wishlist personale. La lista è persistente grazie al localStorage
 * e permette di visualizzare rapidamente tutti i contenuti preferiti.
 * 
 * Funzionalità:
 * - Visualizzazione di tutti i media salvati nella wishlist
 * - Rimozione diretta dalla lista tramite pulsante cuore su ogni card
 * - Separazione tra film e serie TV se sono presenti entrambi
 * - Messaggio informativo quando la lista è vuota
 */

// Import dello store globale per accesso alla wishlist
import { store } from '../store';
// Import del componente che renderizza la lista di card
import AppCardList from '../components/AppCardList.vue';
// Import del componente header riutilizzabile
import AppPageHeader from '../components/AppPageHeader.vue';

export default {
    name: 'MyList', // Nome della vista

    // Registrazione dei componenti utilizzati
    components: {
        AppCardList, // Componente che crea la griglia di card per i media
        AppPageHeader // Componente header riutilizzabile
    },

    // Dati reattivi del componente
    data() {
        return {
            store // Store globale per accesso alla myList
        }
    },

    // Computed properties per organizzare i dati
    computed: {
        /**
         * Filtra solo i film dalla wishlist
         * 
         * @returns {Array} Array di film presenti nella wishlist
         */
        moviesInList() {
            return store.myList.filter(item => item.title); // I film hanno la proprietà 'title'
        },

        /**
         * Filtra solo le serie TV dalla wishlist
         * 
         * @returns {Array} Array di serie TV presenti nella wishlist
         */
        tvSeriesInList() {
            return store.myList.filter(item => item.name); // Le serie TV hanno la proprietà 'name'
        },

        /**
         * Verifica se la wishlist è vuota
         * 
         * @returns {boolean} True se non ci sono elementi nella lista
         */
        isListEmpty() {
            return store.myList.length === 0;
        }
    }
}
</script>

<template>
    <!-- 
        Pagina principale della wishlist
        Mostra contenuti diversi basandosi sui dati presenti nella lista
    -->
    <main>
        <!-- Header della pagina standardizzato -->
        <AppPageHeader title="La Mia Lista" icon="❤️" />

        <div class="container-fluid">
            <!-- 
                Stato lista vuota
                Mostrato quando non ci sono elementi salvati
            -->
            <div v-if="isListEmpty" class="row">
                <div class="col text-center py-5">
                    <i class="bi bi-heart display-1 text-muted mb-4"></i>
                    <h3 class="text-white mb-3">La tua lista è vuota</h3>
                    <p class="text-white mb-4">
                        Inizia ad aggiungere i tuoi film e serie TV preferiti cliccando sul cuore nelle card
                    </p>
                    <router-link to="/" class="btn btn-danger">
                        <i class="bi bi-search me-2"></i>
                        Scopri contenuti
                    </router-link>
                </div>
            </div>

            <!-- 
                Contenuto della wishlist
                Mostrato quando ci sono elementi salvati
            -->
            <div v-else>
                <!-- 
                    Statistiche della lista
                    Mostra il numero totale di elementi salvati
                -->
                <div class="row mb-4">
                    <div class="col">
                        <div class="alert alert-dark border-0" role="alert">
                            Hai salvato <strong>{{ store.myList.length }}</strong>
                            {{ store.myList.length === 1 ? 'elemento' : 'elementi' }} nella tua lista
                        </div>
                    </div>
                </div>

                <!-- 
                    Sezione Film 
                    Mostrata solo se ci sono film nella wishlist
                -->
                <div v-if="moviesInList.length > 0" class="mb-5">
                    <h2 class="section-title">
                        Film ({{ moviesInList.length }})
                    </h2>
                    <AppCardList :cardInfo="moviesInList"></AppCardList>
                </div>

                <!-- 
                    Sezione Serie TV
                    Mostrata solo se ci sono serie TV nella wishlist
                -->
                <div v-if="tvSeriesInList.length > 0" class="mb-5">
                    <h2 class="section-title">
                        <i class="bi bi-tv me-2"></i>
                        Serie TV ({{ tvSeriesInList.length }})
                    </h2>
                    <AppCardList :cardInfo="tvSeriesInList"></AppCardList>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped lang="scss">
/**
 * Stili specifici per la pagina MyList
 * 
 * Utilizza principalmente Bootstrap ma aggiunge alcuni accenti
 * per rendere la pagina più accogliente e coerente con il design globale
 */

main {
    min-height: 100vh;
    background: linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 100%);

    h1 {
        font-weight: 300;
        font-size: 2.5rem;
    }

    .alert {
        background-color: rgba(255, 255, 255, 0.05) !important;
        color: #ffffff;
        border-left: 4px solid #e00a12 !important;
    }

    .btn-danger {
        background-color: #e00a12;
        border-color: #e00a12;
        padding: 0.75rem 2rem;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        transition: all 0.3s ease;

        &:hover {
            background-color: #c7090f;
            border-color: #b1080e;
            transform: translateY(-2px);
        }
    }
}
</style>