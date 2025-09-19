<script>
/**
 * Componente Header dell'applicazione Boolflix
 * 
 * L'header contiene:
 * - Logo navigabile verso la homepage
 * - Menu di navigazione principale con Vue Router
 * - Barra di ricerca globale
 * - Design responsive con Bootstrap
 * 
 * È presente in tutte le pagine dell'applicazione e gestisce la navigazione
 * e la ricerca che influisce sul contenuto di tutte le pagine.
 */

// Import dello store globale per accesso al filtro di ricerca
import { store } from '../store';

export default {
    name: 'AppHeader', // Nome del componente

    // Dati reattivi del componente
    data() {
        return {
            store // Store globale per binding con il filtro di ricerca
        };
    },

    // Metodi del componente
    methods: {
        /**
         * Esegue la ricerca quando l'utente clicca sull'icona o preme Enter
         * 
         * Questo metodo può essere utilizzato per operazioni aggiuntive
         * quando viene eseguita una ricerca esplicita
         */
        performSearch() {
            // Emette evento per far sapere alle pagine che devono ricaricare i dati
            // (Attualmente non utilizzato poiché usiamo watchers nelle pagine)
            this.$emit('search');
        },

        /**
         * Gestisce l'input in tempo reale nella barra di ricerca
         * 
         * Viene chiamato ogni volta che l'utente digita qualcosa
         * nella barra di ricerca per fornire feedback immediato
         */
        onSearchInput() {
            // Se stiamo digitando nella ricerca, rimani sulla pagina corrente
            // ma emetti l'evento per aggiornare i risultati
            // (Attualmente non utilizzato poiché usiamo watchers nelle pagine)
            this.$emit('search');
        },

        /**
         * Chiude automaticamente il menu mobile quando si naviga
         * 
         * Trova l'elemento del menu collassabile e lo chiude
         * utilizzando Bootstrap Collapse API
         */
        closeNavbar() {
            const navbarCollapse = document.getElementById('navbarSupportedContent');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                // Trova il button toggler e simula un click per chiudere
                const toggler = document.querySelector('.navbar-toggler');
                if (toggler) {
                    toggler.click();
                }
            }
        }
    },

    /**
     * Lifecycle hook - componente montato
     * Aggiunge listener per il cambio di route
     */
    mounted() {
        // Ascolta i cambiamenti di route per chiudere il menu mobile
        this.$router.afterEach(() => {
            this.closeNavbar();
        });
    }
}
</script>

<template>
    <!-- Header principale dell'applicazione -->
    <header>
        <!-- Navbar Bootstrap responsiva -->
        <nav class="navbar navbar-expand-lg">
            <div class="container">
                <!-- 
                    Logo dell'applicazione con router-link alla homepage
                    Cliccando sul logo si torna sempre alla home
                -->
                <router-link class="navbar-brand" to="/">
                    <img src="../assets/img/logo.png" alt="BoolFlix" height="35">
                </router-link>

                <!-- 
                    Pulsante hamburger per menu mobile
                    Visibile solo su schermi piccoli (responsive)
                -->
                <button class="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <!-- Contenuto del menu (collassabile su mobile) -->
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Menu di navigazione principale -->
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <!-- Link Homepage -->
                        <li class="nav-item">
                            <router-link class="nav-link" to="/" active-class="active"
                                @click="closeNavbar">Home</router-link>
                        </li>
                        <!-- Link pagina Serie TV -->
                        <li class="nav-item">
                            <router-link class="nav-link" to="/tv-series" active-class="active"
                                @click="closeNavbar">Serie TV</router-link>
                        </li>
                        <!-- Link pagina Film -->
                        <li class="nav-item">
                            <router-link class="nav-link" to="/movies" active-class="active"
                                @click="closeNavbar">Film</router-link>
                        </li>
                        <!-- Link pagina Nuove Uscite -->
                        <li class="nav-item">
                            <router-link class="nav-link" to="/new-releases" active-class="active"
                                @click="closeNavbar">Nuove
                                uscite</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/my-list" active-class="active" @click="closeNavbar">
                                La mia lista
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/browse-by-language" active-class="active"
                                @click="closeNavbar">Sfoglia per
                                lingua</router-link>
                        </li>
                    </ul>

                    <!-- Sezione ricerca (lato destro dell'header) -->
                    <div>
                        <!-- Contenitore della barra di ricerca -->
                        <div class="search-bar-container d-flex">
                            <!-- 
                                Icona di ricerca cliccabile
                                Al clic esegue la ricerca
                            -->
                            <i class="bi bi-search d-flex align-items-center text-light fs-5 ms-2"
                                @click="performSearch"></i>

                            <!-- 
                                Input di ricerca con binding bidirezionale
                                - v-model: collegato a store.searchFilter per aggiornamenti in tempo reale
                                - @keyup.enter: esegue ricerca quando si preme Enter
                                - @input: gestisce input in tempo reale per feedback immediato
                            -->
                            <input class="search-bar form-control me-2" type="search" placeholder="Titoli"
                                v-model="store.searchFilter" @keyup.enter="performSearch" @input="onSearchInput">
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<style scoped lang="scss">
/* Import delle variabili SASS per i colori del tema */
@use '../style/partials/variables' as *;

/**
 * Stili per l'header principale dell'applicazione
 * 
 * L'header è sticky (rimane fisso in alto durante lo scroll)
 * e utilizza i colori del brand definiti nelle variabili SASS
 */
header {
    background-color: $brand-primary;
    /* Colore di sfondo del tema */
    position: sticky;
    /* Rimane fisso durante lo scroll */
    top: 0;
    /* Posizionato in cima alla pagina */
    z-index: 1;
    /* Sopra gli altri elementi */

    /**
     * Stili per la navbar Bootstrap
     */
    .navbar {

        /**
         * Stili per il logo/brand dell'applicazione
         */
        .navbar-brand {
            color: $brand-secondary;
            /* Colore del brand secondario */
            font-weight: 700;
            /* Grassetto per evidenziare */
            text-transform: uppercase;
            /* Tutto maiuscolo */
        }

        /**
         * Stili per il pulsante hamburger (menu mobile)
         */
        .navbar-toggler {
            border: 1px solid $brand-light;
            /* Bordo bianco per visibilità */
            padding: 4px 8px;
            /* Padding più compatto */

            /* Rimuove il box-shadow di default di Bootstrap al focus */
            &:focus {
                box-shadow: none;
            }

            /* Icona hamburger - SVG bianco esplicito senza filter */
            .navbar-toggler-icon {
                background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='m4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") !important;
                /* SVG bianco esplicito con !important per override Bootstrap */
                filter: none !important;
                /* Rimuove qualsiasi filter che potrebbe interferire */
            }
        }

        /**
         * Classe personalizzata per il toggler - override completo Bootstrap
         */
        .custom-toggler {
            .navbar-toggler-icon {
                background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='white' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E") !important;
                width: 1.5em !important;
                height: 1.5em !important;
            }
        }
    }

    /**
     * Stili per i link di navigazione
     */
    .navbar-nav {
        .nav-link {
            color: $brand-light;
            /* Colore testo link */
            font-size: .875rem;
            /* Dimensione font ridotta */

            /**
             * Stato attivo - link della pagina corrente
             * La classe "active" viene aggiunta automaticamente da Vue Router
             */
            &.active {
                color: $brand-secondary;
                /* Evidenzia con colore secondario */
            }

            /**
             * Stato hover - al passaggio del mouse
             */
            &:hover {
                color: $brand-secondary;
                /* Stesso colore dell'active per coerenza */
            }
        }
    }

    /**
     * Stili per il contenitore della barra di ricerca
     */
    .search-bar-container {
        border: 1px solid $brand-light;
        /* Bordo sottile chiaro */

        /**
         * Icona di ricerca cliccabile
         */
        .bi-search {
            cursor: pointer;
            /* Mostra che è cliccabile */
        }

        /**
         * Input field della ricerca
         */
        .search-bar {

            /* Override degli stili di Bootstrap per il form-control */
            &.form-control {
                border: 0;
                /* Rimuove bordo interno */
                background-color: transparent;
                /* Sfondo trasparente */
                color: $brand-light;
                /* Testo chiaro */

                /* Stato focus dell'input */
                &:focus {
                    color: $brand-light;
                    /* Mantiene colore chiaro */
                    box-shadow: none;
                    /* Rimuove box-shadow di Bootstrap */
                }

                /* Stili per il testo placeholder */
                &::placeholder {
                    color: #757575;
                    /* Grigio per il placeholder */
                    font-size: .875rem;
                    /* Dimensione font ridotta */
                }
            }
        }
    }
}
</style>