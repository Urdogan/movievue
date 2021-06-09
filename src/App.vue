<template>
  <v-app>
    <v-app-bar app color="white mb-4">
      <div class="d-flex align-center ">
        <router-link to="/About">About</router-link>
        <router-link to="/Home">Home</router-link>
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-spacer></v-spacer>
    <v-content>
      <router-view> </router-view>
    </v-content>
  </v-app>
</template>
