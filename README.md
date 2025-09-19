# 🎬 Boolflix

Una moderna applicazione web per la ricerca di film e serie TV, costruita con Vue 3 e Vite. L'app utilizza l'API di The Movie Database (TMDB) per fornire informazioni aggiornate su film e serie televisive.

## ✨ Caratteristiche

- 🔍 **Ricerca avanzata**: Cerca film e serie TV per titolo
- 🎭 **Contenuti trending**: Visualizza i film e le serie TV più popolari del momento
- 🏴 **Supporto multilingua**: Bandiere dei paesi per identificare la lingua originale
- ❤️ **Lista dei desideri**: Salva i tuoi film e serie TV preferiti con persistenza localStorage
- 🌍 **Sfoglia per lingua**: Esplora contenuti dalla tua lingua preferita
- 📱 **Design responsive**: Interfaccia ottimizzata per desktop e mobile
- ⚡ **Performance elevate**: Costruito con Vite per un caricamento rapido
- 🧩 **Architettura modulare**: Componenti riutilizzabili, composables Vue 3, API centralizzate

## 🛠️ Tecnologie utilizzate

- **Frontend**: Vue 3 (Composition API)
- **Build tool**: Vite
- **Styling**: Bootstrap 5 + SASS
- **Icons**: Bootstrap Icons
- **HTTP Client**: Axios
- **Containerization**: Docker & Docker Compose
- **Web Server (Prod)**: Nginx Alpine
- **Deployment**: Netlify / Docker

## 🚀 Installazione e avvio

### Opzione 1: Installazione tradizionale

#### Prerequisiti

- Node.js (versione 16 o superiore)
- npm o yarn

#### Installazione

```bash
# Clona il repository
git clone https://github.com/filippo-falcone/vite-boolflix.git

# Naviga nella cartella del progetto
cd vite-boolflix

# Installa le dipendenze
npm install
```

#### Sviluppo

```bash
# Avvia il server di sviluppo
npm run dev
```

L'applicazione sarà disponibile su `http://localhost:5173`

#### Build per produzione

```bash
# Crea la build di produzione
npm run build

# Anteprima della build
npm run preview
```

### Opzione 2: Docker (Consigliata) 🐳

Con Docker non hai bisogno di installare Node.js localmente!

#### Prerequisiti

- Docker
- Docker Compose

#### Sviluppo con Docker

```bash
# Clona il repository
git clone https://github.com/filippo-falcone/vite-boolflix.git

# Naviga nella cartella del progetto
cd vite-boolflix

# Avvia in modalità development (con hot reload)
docker-compose --profile dev up --build
```

L'applicazione sarà disponibile su `http://localhost:5173`

#### Produzione con Docker

```bash
# Avvia in modalità production
docker-compose --profile prod up --build
```

L'applicazione sarà disponibile su `http://localhost:8080`

#### Comandi Docker utili

```bash
# Ferma i container
docker-compose down

# Ricostruisci le immagini
docker-compose build --no-cache

# Visualizza i log
docker-compose logs -f

# Accedi al container per debugging
docker-compose exec vite-boolflix-dev sh
```

## 📁 Struttura del progetto

```
src/
├── components/           # Componenti Vue riutilizzabili
│   ├── AppCard.vue      # Card per singolo film/serie
│   ├── AppCardList.vue  # Lista di card
│   ├── AppHeader.vue    # Header con ricerca
│   ├── AppHero.vue      # Sezione hero
│   ├── AppPageHeader.vue # Header standardizzato pagine
│   ├── AppResults.vue   # Risultati di ricerca
│   └── AppTrending.vue  # Contenuti trending
├── composables/         # Composables Vue 3 (business logic)
│   ├── useMovies.js     # Logica gestione film
│   └── useTvSeries.js   # Logica gestione serie TV
├── services/            # Servizi API centralizzati
│   └── tmdbApi.js       # Servizio TMDB con interceptors
├── views/               # Pagine dell'applicazione
│   ├── Home.vue         # Homepage con trending
│   ├── Movies.vue       # Pagina film
│   ├── TvSeries.vue     # Pagina serie TV
│   ├── NewReleases.vue  # Nuove uscite
│   ├── BrowseByLanguage.vue # Sfoglia per lingua
│   └── MyList.vue       # Lista personale
├── router/              # Vue Router configuration
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

## 🐳 Architettura Docker

Il progetto utilizza un approccio multi-stage per ottimizzare sia lo sviluppo che la produzione:

### Development Stage

- **Base**: Node.js 18 Alpine
- **Port**: 5173 (Vite dev server)
- **Features**: Hot reload, bind mount dei sorgenti
- **Comando**: `npm run dev -- --host 0.0.0.0`

### Production Stage

- **Build**: Node.js 18 Alpine + build Vite
- **Runtime**: Nginx Alpine (molto leggero)
- **Port**: 80 (servito da Nginx)
- **Features**: Gzip compression, cache headers, SPA routing

### File Docker inclusi

- `Dockerfile`: Multi-stage build
- `docker-compose.yml`: Orchestrazione con profili dev/prod
- `nginx.conf`: Configurazione ottimizzata per SPA
- `.dockerignore`: Esclude file non necessari

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
