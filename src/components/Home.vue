<template>
  <div>
    <v-container>
      <v-row class="search-wrapper justify-center ma-6">
        <input type="text" v-model="search" placeholder="Search title.." />
      </v-row>

      <v-row class="search-wrapper justify-center">
        <v-pagination :length="pages" v-model="page"></v-pagination>
      </v-row>
      <v-row class="search-wrapper justify-center">
        <v-checkbox v-model="izlenen" label="izlenen"></v-checkbox>
        <v-checkbox v-model="normalSS" label="normalSS"></v-checkbox>
        <v-checkbox v-model="gif" label="gif"></v-checkbox>
        <v-checkbox v-model="dörtlü" label="dörtlü"></v-checkbox>
        <v-checkbox v-model="exist" label="var mı?"></v-checkbox>
      </v-row>

      <v-row class="d-flex justify-space-between ma-6">
        <v-card class="col-3" v-for="movie in filteredList" :key="movie.imdbID">
          <v-layout>
            <v-flex xs5>
              <v-img
                max-height="500"
                max-width="300"
                v-bind:src="'https://image.tmdb.org/t/p/w300/' + movie.poster"
              ></v-img>
            </v-flex>
            <v-flex xs10>
              <v-card-title>
                <router-link
                  :to="{
                    name: 'Movie',
                    params: { id: movie.imdbID, obj: movie },
                  }"
                >
                  {{ movie.title }}</router-link
                >
              </v-card-title>
              <div class="ma-4 subtitle-1">
                {{ movie.director }}
              </div>
              <div class="ma-4 subtitle-2">
                {{ movie.rating }} ({{ movie.vote }})
              </div>
              <div class="ma-4 subtitle-2"></div>
            </v-flex>
          </v-layout>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { db } from "../firebase/db";
//import Detail from "./components/Detail";
//import Filmler from "./assets/filmler.json";
export default {
  name: "App",
  components: {},
  data() {
    return {
      Movies: [],
      detail: [],
      search: "",
      izlenen: true,
      gif: false,
      dörtlü: false,
      normalSS: false,
      exist: false,
      total: 0,
      pages: 0,
      perPage: 24,
      page: 1,
      //Filmler,
    };
  },
  firestore: {
    Movies: db.collection("movies").orderBy("title"),
    //.limit(300),
  },
  computed: {
    filteredList() {
      return this.Movies.filter((movie) => {
        return movie.title.toLowerCase().includes(this.search.toLowerCase());
      })
        .filter((filtered) => {
          return filtered.watched.includes(this.izlenen ? "OK" : "KO");
        })
        .filter((filtered) => {
          return filtered.fourCaptured.includes(this.dörtlü ? "OK" : "KO");
        })
        .filter((filtered) => {
          return filtered.singleCaptured.includes(this.normalSS ? "OK" : "KO");
        })
        .filter((filtered) => {
          return filtered.gifCaptured.includes(this.gif ? "OK" : "KO");
        })
        .filter((filtered) => {
          return filtered.exist.includes(this.exist ? "OK" : "");
        });
    },
  },
  methods: {
    postWithPoster(imdbID) {
      fetch(
        "https://api.themoviedb.org/3/movie/" +
          imdbID +
          "?api_key=d9247919665601a302fac23a05b3ab36"
      )
        .then((res) => res.json())
        .then((res2) => {
          this.detail = res2;
          const film = {
            title: res2.title,
            imdbID: imdbID,
            year: this.movie.year,
            vote: this.movie.vote,
            rating: this.movie.rating,
            director: this.movie.director,
            watched: this.movie.isWatched,
            exist: this.movie.isExist,
            posted: this.movie.isPosted,
            singleCaptured: this.movie.isCaptured,
            fourCaptured: "KO",
            gifCaptured: "KO",
            note: "",
            description: res2.overview,
            runtime: res2.runtime,
            poster: res2.poster_path,
          };
          db.collection("movies").add(film);
        });
    },
    list() {
      return this.Movies.filter((movie) => {
        return movie.title.toLowerCase().includes(this.search.toLowerCase());
      })
        .filter((filtered) => {
          return filtered.watched.includes(this.izlenen ? "OK" : "KO");
        })
        .filter((filtered) => {
          return filtered.fourCaptured.includes(this.dörtlü ? "OK" : "KO");
        })
        .filter((filtered) => {
          return filtered.singleCaptured.includes(this.normalSS ? "OK" : "KO");
        })
        .filter((filtered) => {
          return filtered.gifCaptured.includes(this.gif ? "OK" : "KO");
        })
        .filter((filtered) => {
          this.total = filtered.exist.includes(this.exist ? "OK" : "").size;
          this.pages = Math.ceil(this.total / this.perPage);
          return filtered.exist.includes(this.exist ? "OK" : "");
        });
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
  },
  created() {
    this.list();
    if (this.movie.poster == null) {
      this.postWithPoster(this.movie.imdbID);
    }
  },
};
</script>
