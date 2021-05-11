<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>
      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <v-row class="mb-4">
          <div v-for="movie in Filmler" :key="movie.imdbID">
            <Card :movie="movie" />
          </div>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { db } from "./firebase/db";
import Card from "./components/Card";
import Filmler from "./assets/filmler.json";
export default {
  name: "App",
  components: { Card },
  data() {
    return {
      Movies: [],
      Filmler,
    };
  },
  firestore: {
    Movies: db.collection("movies"),
  },
  methods: {
    /*fetchSomeData() {
      fetch(
        "https://api.themoviedb.org/3/movie/tt8267604?api_key=d9247919665601a302fac23a05b3ab36",
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((json) => (this.message = json));
    },*/
  },
  created() {
    //this.fetchSomeData();
  },
};
</script>
