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
        <div class="video-over d-flex flex-column justify-content-end px-5">
            <div class="img-container">
                <img src="https://lumiere-a.akamaihd.net/v1/images/logo_gotg3_2_8cd40975.png" alt="Guardiani della Galassia vol 3 logo">
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.hero {
    position: relative;

    .video-container {
        height: calc(100vh - 9.375rem);

        video {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .video-over {
        position: absolute;
        bottom: 0;
        left: 0;

        .img-container {
            width: 400px;
        }
    }
}
</style>