<template>
  <v-col sm="12">
    <v-card class="ma-4 text-center" max-width="200px" max-height="400px">
      <v-img
        height="300"
        width="200px"
        v-bind:src="'https://image.tmdb.org/t/p/w200/' + movie.poster"
      ></v-img>
      <v-card-title>{{ movie.title }}</v-card-title>
      <v-card-title></v-card-title>

      <v-divider class="mx-4"></v-divider>
      <v-card-title></v-card-title>
      <v-card-text>
        <div>{{ movie.runtime }}</div>
      </v-card-text>
    </v-card>
  </v-col>
</template>
<script>
import { db } from "../firebase/db";
export default {
  name: "Card",
  props: ["movie"],
  data() {
    return { detail: [], dbMovie: [] };
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
  },
  created() {
    if (this.movie.poster == null) {
      this.postWithPoster(this.movie.imdbID);
    }
  },
};
</script>
