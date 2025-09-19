<script>
/**
 * Componente AppPageHeader - Header standard per le pagine
 * 
 * Componente riutilizzabile che standardizza l'header di tutte le pagine
 * eliminando la duplicazione di codice e garantendo coerenza visiva.
 * 
 * Props:
 * - title: Titolo della pagina (required)
 * - icon: Emoji o icona da mostrare prima del titolo (optional)
 * - description: Descrizione sotto il titolo (optional)
 */

export default {
    name: 'AppPageHeader',

    props: {
        /**
         * Titolo principale della pagina
         * Es: "Film", "Serie TV", "La Mia Lista"
         */
        title: {
            type: String,
            required: true,
            validator: (value) => value && value.trim().length > 0
        },

        /**
         * Icona o emoji da mostrare prima del titolo
         * Es: "🎬", "📺", "❤️"
         */
        icon: {
            type: String,
            default: ''
        },

        /**
         * Descrizione opzionale sotto il titolo
         * Utile per pagine che necessitano di spiegazioni aggiuntive
         */
        description: {
            type: String,
            default: ''
        }
    }
}
</script>

<template>
    <!-- Header standardizzato per tutte le pagine -->
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <!-- Titolo con icona opzionale -->
                <h1 class="text-center my-4">
                    <span v-if="icon" class="me-2">{{ icon }}</span>{{ title }}
                </h1>

                <!-- Descrizione opzionale -->
                <p v-if="description" class="text-center text-white mb-4">
                    {{ description }}
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
/**
 * Stili per l'header delle pagine
 * Mantiene coerenza con il design esistente
 */
h1 {
    font-weight: 300;
    font-size: 2.5rem;
    color: white;
}

p {
    font-size: 1.1rem;
    max-width: 600px;
    margin: 0 auto;
}
</style>