<template>
  <v-col sm="12">
    <v-card class="ma-4 text-center" max-width="200px" max-height="400px">
      <v-img
        height="300"
        width="200px"
        v-bind:src="'https://image.tmdb.org/t/p/w200/' + detail.poster_path"
      ></v-img>
      <v-card-title>{{ movie.title }}</v-card-title>
      <v-card-title>{{ detail.poster_path }}</v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-card-title></v-card-title>
      <v-card-text>
        <v-chip-group active-class="deep-purple accent-4 white--text">
          <v-chip>1</v-chip>
          <v-chip>2</v-chip>
          <v-chip>3</v-chip>
          <v-chip>4</v-chip>
          <v-chip>5</v-chip>
        </v-chip-group>
      </v-card-text>
    </v-card>
  </v-col>
</template>
<script>
export default {
  name: "Card",
  props: ["movie"],
  data() {
    return { detail: "" };
  },
  methods: {
    fetchSomeData(imdbID) {
      fetch(
        "https://api.themoviedb.org/3/movie/" +
          imdbID +
          "?api_key=d9247919665601a302fac23a05b3ab36"
      )
        .then((res) => res.json())
        .then((res2) => {
          this.detail = res2;
        });
    },
  },

  created() {
    this.fetchSomeData(this.movie.imdbID);
  },
};
</script>
