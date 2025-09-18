# 🎬 Boolflix

Una moderna applicazione web per la ricerca di film e serie TV, costruita con Vue 3 e Vite. L'app utilizza l'API di The Movie Database (TMDB) per fornire informazioni aggiornate su film e serie televisive.

## ✨ Caratteristiche

- 🔍 **Ricerca avanzata**: Cerca film e serie TV per titolo
- 🎭 **Contenuti trending**: Visualizza i film e le serie TV più popolari del momento
- 🏴 **Supporto multilingua**: Bandiere dei paesi per identificare la lingua originale
- 📱 **Design responsive**: Interfaccia ottimizzata per desktop e mobile
- ⚡ **Performance elevate**: Costruito con Vite per un caricamento rapido

## 🛠️ Tecnologie utilizzate

- **Frontend**: Vue 3 (Composition API)
- **Build tool**: Vite
- **Styling**: Bootstrap 5 + SASS
- **Icons**: Bootstrap Icons
- **HTTP Client**: Axios
- **Deployment**: Netlify

## 🚀 Installazione e avvio

### Prerequisiti

- Node.js (versione 16 o superiore)
- npm o yarn

### Installazione

```bash
# Clona il repository
git clone https://github.com/filippo-falcone/vite-boolflix.git

# Naviga nella cartella del progetto
cd vite-boolflix

# Installa le dipendenze
npm install
```

### Sviluppo

```bash
# Avvia il server di sviluppo
npm run dev
```

L'applicazione sarà disponibile su `http://localhost:5173`

### Build per produzione

```bash
# Crea la build di produzione
npm run build

# Anteprima della build
npm run preview
```

## 📁 Struttura del progetto

```
src/
├── components/           # Componenti Vue riutilizzabili
│   ├── AppCard.vue      # Card per singolo film/serie
│   ├── AppCardList.vue  # Lista di card
│   ├── AppHeader.vue    # Header con ricerca
│   ├── AppHero.vue      # Sezione hero
│   ├── AppResults.vue   # Risultati di ricerca
│   └── AppTrending.vue  # Contenuti trending
├── style/               # Stili SASS
│   ├── general.scss     # Stili globali
│   └── partials/        # Partial SASS
├── assets/              # Risorse statiche
│   └── img/             # Immagini (loghi, bandiere)
├── App.vue              # Componente principale
├── main.js              # Entry point
└── store.js             # Store reattivo per lo stato globale
```

## 🔧 Configurazione API

L'applicazione utilizza l'API di The Movie Database (TMDB). La chiave API è configurata nel file `store.js`. Per utilizzare la tua chiave API:

1. Registrati su [TMDB](https://www.themoviedb.org/)
2. Ottieni la tua API key
3. Sostituisci la chiave nel file `src/store.js`

> ⚠️ **Importante**: Rispetta sempre i [Terms of Service di TMDB](https://www.themoviedb.org/terms-of-use) quando utilizzi la loro API.

## 🌐 Deploy

L'applicazione è configurata per il deploy automatico su Netlify tramite il file `netlify.toml`.

### Deploy manuale

```bash
npm run build
# Carica il contenuto della cartella 'dist' su Netlify
```

## 📝 Funzionalità principali

- **Ricerca**: Digita il nome di un film o serie TV nella barra di ricerca
- **Trending**: Visualizza i contenuti più popolari del momento
- **Dettagli**: Ogni card mostra titolo, titolo originale, lingua, voto e poster
- **Bandiere**: Le bandiere indicano la lingua originale del contenuto

## 🤝 Contribuire

1. Fai un fork del progetto
2. Crea un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Committa i tuoi cambiamenti (`git commit -m 'Add some AmazingFeature'`)
4. Pusha sul branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📄 Copyright

© 2025 Filippo Falcone. Tutti i diritti riservati.

Questo progetto è fornito esclusivamente a scopo dimostrativo e di portfolio. Nessuna licenza viene concessa per l'uso, la modifica o la distribuzione di questo software senza autorizzazione esplicita dell'autore.

### Note legali

- 🎬 **API TMDB**: Questo progetto utilizza l'API di The Movie Database. Consulta i [Terms of Service di TMDB](https://www.themoviedb.org/terms-of-use)
- 🖼️ **Contenuti multimediali**: Poster, immagini e metadati dei film sono di proprietà dei rispettivi titolari dei diritti
- 📦 **Dipendenze**: Le librerie utilizzate (Vue.js, Bootstrap, ecc.) mantengono le proprie licenze open source

## 👨‍💻 Autore

**Filippo Falcone** - [GitHub](https://github.com/filippo-falcone)

## 🙏 Ringraziamenti

- [The Movie Database (TMDB)](https://www.themoviedb.org/) per l'API gratuita
- [Vue.js](https://vuejs.org/) per il framework
- [Vite](https://vitejs.dev/) per il build tool velocissimo
- [Bootstrap](https://getbootstrap.com/) per i componenti UI

---

## 🛠️ Setup IDE raccomandato

- [VS Code](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (precedentemente Volar)
