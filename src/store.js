import { reactive } from "vue";

export const store = reactive({
    queryParams: {
        api_key: '625881f36f688a123e9d2bc2efd0fbfe',
        language: 'it-IT',
    },
    movies: [],
    tvSeries: [],
    videos: [],
    searchFilter: '',
});