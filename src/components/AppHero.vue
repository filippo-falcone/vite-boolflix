<script>
export default {
    name: 'AppHero'
}
</script>

<template>
    <section class="hero">
        <div class="video-container d-none d-lg-block">
            <video autoplay muted loop>
                <source src="../assets/videos/guardiani-della-galassia-vol-3.mp4" type="video/mp4">
            </video>
        </div>
    </section>
</template>

<style scoped lang="scss">
.hero {
    .video-container {
        video {
            width: 100%;
            height: calc(100vh - 4.4375rem);
            object-fit: cover;
        }
    }
}
</style>