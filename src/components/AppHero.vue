<script>
export default {
    name: 'AppHero'
}
</script>

<template>
    <div class="video-container">
        <video autoplay muted>
        <source src="../assets/videos/movies.mp4" type="video/mp4">
        <!-- <source src="movie.ogg" type="video/ogg"> -->
</video>
    </div>
</template>

<style scoped lang="scss">

.video-container {
    video {
        width: 100%;
    }
}
</style>