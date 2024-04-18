<script>
import { store } from '../store';

export default {
    name: 'AppHeader',
    data() {
        return {
            store,
            isActive: true
        };
    },
    methods:{
        showSearchBar() {
            this.isActive = !this.isActive;
        }
    }
}
</script>

<template>
    <header>
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <a class="navbar-brand fs-3" href="#">Boolflix</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Serie TV</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Film</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Nuovi e popolari</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">La mia lista</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Sfoglia per lingua</a>
                        </li>
                    </ul>
                    <div class="d-flex">
                        <div class="search-bar-container d-flex">
                            <i class="bi bi-search text-light fs-4 ms-2" @click="$emit('search')"></i>
                            <input class="search-bar form-control me-2" type="search" placeholder="Titoli, persone, generi" v-model="store.searchFilter">
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<style scoped lang="scss">
@use '../style/partials/variables' as *;

header {
    background-color: $brand-primary;

    .navbar {
        .navbar-brand {
            color: $brand-secondary;
            font-weight: 700;
            text-transform: uppercase;
        }

        .navbar-toggler {
            &:focus {
                box-shadow: none;
            }
            
            .navbar-toggler-icon {
                filter: invert(
                    100%
                );
            }
        }
    }

    .navbar-nav {
        .nav-link {
            color: $brand-light;
            &.active {
                color: $brand-light;
            }
            &:hover {
                color: $brand-secondary;
            }
        }
    }

    .search-bar-container {
        border: 1px solid $brand-light;

        .bi-search {
            cursor: pointer;
        }

        .search-bar {
            color: $brand-light;
            border: 0;
            background-color: transparent;
            &:focus {
                color: $brand-light;
                box-shadow: none;
            }
            &::placeholder {
                color: #c0bebe;
            }
        }
    }
}
</style>