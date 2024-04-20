<script>
export default {
    name: 'AppHero',
    data() {
            return {
                videos: [
                    'guardiani-della-galassia-vol-3',
                    'avatar-la-leggenda-di-aang',

                ],
                activeItem: 0,
                autoChange: null
            }
        },
        methods: {
            getVideoUrl(name) {
                return new URL(`../assets/videos/${name}.mp4`, import.meta.url).href
            },
            nextSlide() {
                this.activeItem < this.videos.length - 1 ? this.activeItem++ : this.activeItem = 0;
                console.log(this.activeItem);
            },
            autoplayStart() {
                this.autoChange = setInterval(this.nextSlide, 144000);
            }
        },
        mounted() {
            this.autoplayStart();
        }
}
</script>

<template>
    <section class="hero">
        <div class="video-container d-none d-lg-block">
            <video :src="getVideoUrl(videos[activeItem])" autoplay muted>
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
        height: calc(100vh - 108px);

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