<template>
  <div>
    <v-container>
      <v-row class="search-wrapper justify-center">
        <input type="text" v-model="search" placeholder="Search title.." />
      </v-row>
      <v-row>
        <Tweet id="1393534501419200514"></Tweet>
      </v-row>
      <v-row class="search-wrapper justify-center">
        <v-pagination :length="pageLength" v-model="page"></v-pagination>
      </v-row>

      <v-row class="d-flex justify-space-between ma-6">
        <v-card class="col-3" v-for="movie in filteredList" :key="movie.imdbID">
          <v-layout>
            <v-flex xs5>
              <v-img
                max-height="500"
                width="350"
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
import { Tweet } from "vue-tweet-embed";
//import Detail from "./components/Detail";
//import Filmler from "./assets/filmler.json";
export default {
  name: "App",
  components: { Tweet },
  data() {
    return {
      Movies: [],
      page: 1,
      pageLength: 5,
      detail: [],
      search: "",
      //Filmler,
    };
  },
  firestore: {
    Movies: db
      .collection("movies")
      .orderBy("title")
      .limit(130),
  },
  computed: {
    filteredList() {
      return this.Movies.filter((movie) => {
        return movie.title.toLowerCase().includes(this.search.toLowerCase());
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
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
  },
  created() {
    if (this.movie.poster == null) {
      this.postWithPoster(this.movie.imdbID);
    }
  },
};
</script>
