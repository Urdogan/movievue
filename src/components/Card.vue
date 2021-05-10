<template>
  <v-col>
    <v-card class="ma-4 text-center" max-height="145" max-width="200">
      <v-img
        v-bind:src="'https://image.tmdb.org/t/p/w500/' + message.poster_path"
      ></v-img>
      <v-card-title>{{ movie.title }}</v-card-title>
      <v-card-title>{{ message.imdb_id }}</v-card-title>
      <v-card-text>
        <v-row align="center" class="mx-0">
          <v-rating
            :value="4.5"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>
          <div class="grey--text ml-4">
            4.5 (413)
          </div>
        </v-row>
        <div class="my-1 subtitle-1">
          Barry Jenkins
        </div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title></v-card-title>

      <v-card-text>
        <v-chip-group
          v-model="selection"
          active-class="deep-purple accent-4 white--text"
        >
          <v-chip>{{ message.adult }}</v-chip>
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
  props: ["movie", "message"],
};
</script>
