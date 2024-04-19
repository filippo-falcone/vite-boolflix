<script>
export default {
    name: 'AppHero'
}
</script>

<template>
    <section class="hero">
        <div class="video-container d-none d-lg-block">
            <video autoplay muted>
                <source src="../assets/videos/movies.mp4" type="video/mp4">
            </video>
        </div>
    </section>
</template>

<style scoped lang="scss">
.hero {
    margin-top: -3.8125rem;
    
    .video-container {
        video {
            width: 100%;
            height: calc(100vh - .625rem);
            object-fit: cover;
        }
    }
}
</style>