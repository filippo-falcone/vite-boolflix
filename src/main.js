/**
 * Entry point dell'applicazione Boolflix
 * 
 * Questo file è il punto di partenza dell'applicazione Vue.js.
 * Configura l'istanza principale di Vue con tutti i plugin necessari.
 */

// Import delle dipendenze principali di Vue
import { createApp } from 'vue'

// Import di Bootstrap per i componenti UI e JavaScript interattivo
import * as bootstrap from 'bootstrap'

// Import del router per la gestione della navigazione multi-page
import router from './router'

// Import del componente principale dell'applicazione
import App from './App.vue'

/**
 * Creazione e configurazione dell'applicazione Vue
 * 
 * - createApp(App): Crea l'istanza principale di Vue con il componente App
 * - .use(router): Aggiunge Vue Router per la gestione delle rotte
 * - .mount('#app'): Monta l'applicazione sull'elemento HTML con id="app"
 */
createApp(App).use(router).mount('#app')
