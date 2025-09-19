/**
 * Store globale dell'applicazione Boolflix
 * 
 * Utilizza la funzione reactive() di Vue 3 per creare uno store globale
 * condiviso tra tutti i componenti dell'applicazione. Questo approccio
 * semplice è ideale per applicazioni di piccole-medie dimensioni.
 * 
 * Lo store contiene:
 * - Parametri di configurazione per le API TMDB
 * - Arrays per i diversi tipi di contenuti (film, serie TV, trending)
 * - Filtro di ricerca globale
 */

// Import della funzione reactive da Vue 3 per la reattività
import { reactive } from "vue";

/**
 * Store reattivo esportato per l'uso in tutta l'applicazione
 * 
 * Tutti i componenti che importano questo store condivideranno
 * gli stessi dati e reagiranno automaticamente ai cambiamenti
 */
export const store = reactive({
    /**
     * Parametri di query per le chiamate API a TMDB
     * 
     * Questi parametri vengono utilizzati in tutte le chiamate alle API
     * di The Movie Database per garantire coerenza
     */
    queryParams: {
        api_key: '625881f36f688a123e9d2bc2efd0fbfe', // Chiave API per autenticazione TMDB
        language: 'it-IT',                           // Lingua italiana per metadati
    },

    /**
     * Array dei film
     * 
     * Contiene i risultati di:
     * - Ricerca film (quando si cerca dalla searchbar)
     * - Film popolari (pagina Movies senza ricerca)
     * - Viene svuotato quando si naviga nella pagina Serie TV
     */
    movies: [],

    /**
     * Array delle serie TV
     * 
     * Contiene i risultati di:
     * - Ricerca serie TV (quando si cerca dalla searchbar)
     * - Serie TV popolari (pagina TvSeries senza ricerca)
     * - Viene svuotato quando si naviga nella pagina Film
     */
    tvSeries: [],

    /**
     * Array dei film trending
     * 
     * Contiene i film più popolari della settimana da TMDB.
     * Utilizzato nella homepage per la sezione trending,
     * separato da 'movies' per non sovrascrivere i risultati di ricerca
     */
    trendingMovies: [],

    /**
     * Array delle serie TV trending
     * 
     * Contiene le serie TV più popolari della settimana da TMDB.
     * Utilizzato nella homepage per la sezione trending,
     * separato da 'tvSeries' per non sovrascrivere i risultati di ricerca
     */
    trendingTvSeries: [],

    /**
     * Filtro di ricerca globale
     * 
     * Stringa che contiene il termine di ricerca inserito dall'utente
     * nella searchbar dell'header. Questo valore è:
     * - Collegato bidirezionalmente all'input di ricerca (v-model)
     * - Osservato da tutte le pagine tramite watchers
     * - Utilizzato per determinare se mostrare contenuti di default o risultati di ricerca
     */
    searchFilter: '',

    /**
     * Array della lista personale dell'utente
     * 
     * Contiene i film e serie TV aggiunti dall'utente alla sua lista personale.
     * Viene salvato in localStorage per persistenza tra le sessioni.
     * Ogni elemento contiene l'oggetto completo da TMDB API.
     */
    myList: []
});

/**
 * Funzioni per gestire la lista personale dell'utente
 * 
 * Queste funzioni permettono di aggiungere, rimuovere e verificare
 * la presenza di elementi nella lista personale, con persistenza
 * automatica in localStorage.
 */

/**
 * Carica la lista dall'localStorage
 * 
 * Viene chiamata all'inizializzazione per ripristinare
 * la lista dell'utente dalle sessioni precedenti
 */
export function loadMyListFromStorage() {
    try {
        const savedList = localStorage.getItem('boolflix-my-list');
        if (savedList) {
            store.myList = JSON.parse(savedList);
        }
    } catch (error) {
        console.error('Errore nel caricamento della lista da localStorage:', error);
        store.myList = [];
    }
}

/**
 * Salva la lista corrente in localStorage
 * 
 * Viene chiamata automaticamente ogni volta che
 * la lista viene modificata
 */
export function saveMyListToStorage() {
    try {
        localStorage.setItem('boolflix-my-list', JSON.stringify(store.myList));
    } catch (error) {
        console.error('Errore nel salvataggio della lista in localStorage:', error);
    }
}

/**
 * Aggiunge un elemento alla lista personale
 * 
 * @param {Object} item - Film o serie TV da aggiungere (oggetto TMDB)
 * @returns {boolean} - true se aggiunto, false se già presente
 */
export function addToMyList(item) {
    // Verifica se l'elemento è già presente (confronta per ID)
    const isAlreadyInList = store.myList.some(listItem => 
        listItem.id === item.id && 
        (listItem.title || listItem.name) === (item.title || item.name)
    );
    
    if (!isAlreadyInList) {
        // Aggiunge timestamp per ordinamento
        const itemWithTimestamp = {
            ...item,
            addedAt: new Date().toISOString()
        };
        
        store.myList.unshift(itemWithTimestamp); // Aggiunge in cima
        saveMyListToStorage();
        return true;
    }
    
    return false;
}

/**
 * Rimuove un elemento dalla lista personale
 * 
 * @param {Object} item - Film o serie TV da rimuovere
 * @returns {boolean} - true se rimosso, false se non presente
 */
export function removeFromMyList(item) {
    const initialLength = store.myList.length;
    
    store.myList = store.myList.filter(listItem => 
        !(listItem.id === item.id && 
          (listItem.title || listItem.name) === (item.title || item.name))
    );
    
    if (store.myList.length < initialLength) {
        saveMyListToStorage();
        return true;
    }
    
    return false;
}

/**
 * Verifica se un elemento è presente nella lista
 * 
 * @param {Object} item - Film o serie TV da verificare
 * @returns {boolean} - true se presente, false altrimenti
 */
export function isInMyList(item) {
    return store.myList.some(listItem => 
        listItem.id === item.id && 
        (listItem.title || listItem.name) === (item.title || item.name)
    );
}

/**
 * Ottiene il numero di elementi nella lista
 * 
 * @returns {number} - Numero di elementi nella lista
 */
export function getMyListCount() {
    return store.myList.length;
}

// Carica la lista all'inizializzazione
loadMyListFromStorage();