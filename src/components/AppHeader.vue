<script>
import { store } from '../store';

export default {
    name: 'AppHeader',
    data() {
        return {
            store
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
            <div class="container">
                <a class="navbar-brand" href="#">
                    <img src="../assets/img/logo.png" alt="BoolFlix" height="35">
                </a>
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
                    <div>
                        <div class="search-bar-container d-flex">
                            <i class="bi bi-search d-flex align-items-center text-light fs-5 ms-2" @click="$emit('search'); $emit('show')"></i>
                            <input class="search-bar form-control me-2" type="search" placeholder="Titoli" v-model="store.searchFilter" @keyup.enter="$emit('show')">
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
    position: sticky;
    top: 0;
    z-index: 1;

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
            font-size: .875rem;

            &.active {
                color: $brand-secondary;
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
            &.form-control {
                border: 0;
                background-color: transparent;
                color: $brand-light;
                &:focus {
                    color: $brand-light;
                    box-shadow: none;
                }
                
                &::placeholder {
                    color: #757575;
                    font-size: .875rem;
                }
            }
        }
    }
}
</style>