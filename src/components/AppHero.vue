<script>
export default {
    name: 'AppHero',
    data() {
            return {
                videos: [
                    {
                        video: 'YFbno_aPm0w',
                        img: 'occ-0-784-778.1.nflxso.net/dnm/api/v6/tx1O544a9T7n8Z_G12qaboulQQE/AAAABRyu-srP5sziC-IKbrb-wyzR-e0hrdgiJ8jTlH2hQiDxKsi6Kf6ZeZX52C2cgLiayA9CKe0WOKRuj5_gQ5EwEcBXY2ac8UKXRJbzP23fBNE.png?r=4a6'
                    },
                    {
                        video: 'x0y3vKmHC9s',
                        img: 'image.tmdb.org/t/p/w500/4JDOCXMbFv7blqAuDyUMzJEa8d.png'
                    },
                    {
                        video: '4Bug_PqnM90',
                        img: 'occ-0-784-778.1.nflxso.net/dnm/api/v6/tx1O544a9T7n8Z_G12qaboulQQE/AAAABai16sIKXucp1Bmkc5B7bW4uBiCXoGuZajooj5K-EuZyUiJlPhvaVc0kYaoumIyY_x61KsPd_39abi-uK1w2-XyT5bBPrTMbOw0C7uyLmiI0dXrb04TTxrzYro6Y8DL6TUOWMPyPuTjSL4NxOopzj1nz9eX11vPlkIBxu3Csyt-vrAgIZ2Fu.png?r=d1d'
                    },
                    {
                        video: 'jnxq_skL-wk',
                        img: 'occ-0-784-778.1.nflxso.net/dnm/api/v6/tx1O544a9T7n8Z_G12qaboulQQE/AAAABa2RFbqSUtoIe6SbGhmyRuDWKfgXkYLMW9XF-VKEgSz2L0y9UkkCN-LSJnFqkcz_vpNczDlPOJE5561sArqBq-x6187JDhgBRQ9ed9kVn6M.png?r=25c'
                    },
                    {
                        video: 'qdLtZRG8Pz4',
                        img: 'occ-0-784-778.1.nflxso.net/dnm/api/v6/tx1O544a9T7n8Z_G12qaboulQQE/AAAABSsfAVAa1w8alEKxbj2P-CJSzN8l-xG5Yc2FxK1utwsklBjutTz7u97cvfD_x_hJkeEqNaH3K5u8fES0tqk5rhRDONxCNbQF9JcQNz3WrkU.png?r=6da'
                    },
                    {
                        video: 'NXhrB7uZCV4',
                        img: 'disney.images.edge.bamgrid.com/ripcut-delivery/v1/variant/disney/19913593-815d-4e9c-80b8-2d0ba9391ec7/trim?format=webp&max=800%7C300'
                    },
                    {
                        video: 'Gv-1JGL58mI',
                        img: 'disney.images.edge.bamgrid.com/ripcut-delivery/v1/variant/disney/782c2cde-e7b4-44a3-8e1f-4e858345927e/trim?format=webp&max=800%7C300'
                    },
                    {
                        video: '1N-a6ZJqw94',
                        img: 'disney.images.edge.bamgrid.com/ripcut-delivery/v1/variant/disney/5287f754-9806-4eae-aa6a-59b15d47d09f/trim?format=webp&max=800%7C300'
                    }
                ],
                activeItem: 0,
                autoChange: null
            }
        },
    methods: {
        nextSlide() {
            this.activeItem < this.videos.length - 1 ? this.activeItem++ : this.activeItem = 0;
            console.log(this.activeItem);
        },
        autoplayStart() {
            this.autoChange = setInterval(this.nextSlide, 90000);
        }
    }
}
</script>

<template>
    <section class="hero">
        <div class="video-container d-none d-lg-block">
            <iframe id="player" :src="`https://www.youtube.com/embed/${videos[activeItem].video}?autoplay=1&mute=1&disablekb&controls=0&rel=0`" frameborder="0"></iframe>
        </div>
        <div class="video-over d-flex flex-column justify-content-end px-5">
            <div class="img-container">
                <img :src="`https://${videos[activeItem].img}`" alt="Guardiani della Galassia vol 3 logo">
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.hero {
    position: relative;

    .video-container {
        height: 550px;

        iframe {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .video-over {
        position: absolute;
        bottom: 10%;
        left: 0;

        .img-container {
            width: 400px;
        }
    }
}
</style>