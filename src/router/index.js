/**
 * Configurazione del Router per l'applicazione Boolflix
 * 
 * Questo file definisce tutte le rotte dell'applicazione e configura Vue Router
 * per la navigazione tra le diverse pagine (Home, Movies, TV Series).
 */

// Import delle funzioni di Vue Router per creare il router
import { createRouter, createWebHistory } from 'vue-router'

// Import dei componenti di pagina (views)
import Home from '../views/Home.vue'        // Homepage con trending e ricerca globale
import Movies from '../views/Movies.vue'    // Pagina dedicata ai film
import TvSeries from '../views/TvSeries.vue' // Pagina dedicata alle serie TV
import NewReleases from '../views/NewReleases.vue' // Pagina nuove uscite
import BrowseByLanguage from '../views/BrowseByLanguage.vue' // Pagina sfoglia per lingua

/**
 * Definizione delle rotte dell'applicazione
 * 
 * Ogni rotta specifica:
 * - path: URL della pagina
 * - name: Nome univoco della rotta (usato per la navigazione programmatica)
 * - component: Componente Vue da renderizzare per quella rotta
 */
const routes = [
  {
    path: '/',           // Homepage - URL di base
    name: 'Home',
    component: Home      // Mostra trending di film e serie TV
  },
  {
    path: '/movies',     // Pagina Film - /movies
    name: 'Movies',
    component: Movies    // Mostra solo film (popolari o ricerca)
  },
  {
    path: '/tv-series',  // Pagina Serie TV - /tv-series
    name: 'TvSeries',
    component: TvSeries  // Mostra solo serie TV (popolari o ricerca)
  },
  {
    path: '/new-releases', // Pagina Nuove Uscite - /new-releases
    name: 'NewReleases',
    component: NewReleases // Mostra film al cinema e serie TV in onda
  },
  {
    path: '/browse-by-language', // Pagina Sfoglia per Lingua - /browse-by-language
    name: 'BrowseByLanguage',
    component: BrowseByLanguage // Mostra film e serie TV filtrati per lingua
  }
]

/**
 * Creazione dell'istanza del router
 * 
 * - createWebHistory(): Usa l'History API del browser per URL puliti (senza #)
 * - routes: Array delle rotte definite sopra
 */
const router = createRouter({
  history: createWebHistory(), // Modalità history per URL SEO-friendly
  routes
})

// Esportazione del router per l'uso in main.js
export default router