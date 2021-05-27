<template lang="">
  <div>
    <v-container>
      <router-link to="/Home">Back</router-link>
      <v-row>
        <v-col></v-col>
        <v-img
          max-height="500"
          max-width="300"
          :src="'https://image.tmdb.org/t/p/w300/' + $route.params.obj.poster"
        ></v-img>
        <v-col>
          <v-checkbox
            v-model="locked"
            :label="`${locked ? 'Kilitli' : 'Açık'}`"
          ></v-checkbox>

          <h3>{{ $route.params.obj.title }}</h3>
          <h3>{{ $route.params.obj.director }}</h3>
          <h3>{{ $route.params.obj.rating }}</h3>
          <h3>{{ $route.params.obj.runtime }}</h3>
          <h3>{{ $route.params.obj.vote }}</h3>
          <h3>{{ $route.params.obj.year }}</h3>
          <div>
            <div v-if="$route.params.obj.watched == 'OK'">
              <v-chip
                class="ma-2"
                color="green"
                outlined
                @click="updateProp($route.params.obj.imdbID, 'watched', 'OK')"
              >
                İzlendi
              </v-chip>
            </div>
            <div v-else>
              <v-chip
                v-if="$route.params.obj.watched != 'OK'"
                class="ma-2"
                color="red"
                outlined
                @click="updateProp($route.params.obj.imdbID, 'watched', 'KO')"
              >
                İzlenmedi
              </v-chip>
            </div>
          </div>
          <div>
            <div v-if="$route.params.obj.exist == 'OK'">
              <v-chip
                class="ma-2"
                color="green"
                outlined
                @click="updateProp($route.params.obj.imdbID, 'exist', 'OK')"
              >
                Var
              </v-chip>
            </div>
            <div v-else>
              <v-chip
                v-if="$route.params.obj.exist != 'OK'"
                class="ma-2"
                color="red"
                outlined
                @click="updateProp($route.params.obj.imdbID, 'exist', 'KO')"
              >
                Yok
              </v-chip>
            </div>
          </div>
          <div>
            <div v-if="$route.params.obj.fourCaptured == 'OK'">
              <v-chip
                class="ma-2"
                color="green"
                outlined
                @click="
                  updateProp($route.params.obj.imdbID, 'fourCaptured', 'OK')
                "
              >
                4lü Alındı
              </v-chip>
            </div>
            <div v-else>
              <v-chip
                v-if="$route.params.obj.fourCaptured != 'OK'"
                class="ma-2"
                color="red"
                outlined
                @click="
                  updateProp($route.params.obj.imdbID, 'fourCaptured', 'KO')
                "
              >
                4lü Alınmadı
              </v-chip>
            </div>
          </div>
          <div>
            <div v-if="$route.params.obj.gifCaptured == 'OK'">
              <v-chip
                class="ma-2"
                color="green"
                outlined
                @click="
                  updateProp($route.params.obj.imdbID, 'gifCaptured', 'OK')
                "
              >
                GIF Alındı
              </v-chip>
            </div>
            <div v-else>
              <v-chip
                v-if="$route.params.obj.gifCaptured != 'OK'"
                class="ma-2"
                color="red"
                outlined
                @click="
                  updateProp($route.params.obj.imdbID, 'gifCaptured', 'KO')
                "
              >
                GIF Alınmadı
              </v-chip>
            </div>
          </div>
          <div>
            <div v-if="$route.params.obj.singleCaptured == 'OK'">
              <v-chip
                class="ma-2"
                color="green"
                outlined
                @click="
                  updateProp($route.params.obj.imdbID, 'singleCaptured', 'OK')
                "
              >
                SS Alındı
              </v-chip>
            </div>
            <div v-else>
              <v-chip
                v-if="$route.params.obj.singleCaptured != 'OK'"
                class="ma-2"
                color="red"
                outlined
                @click="
                  updateProp($route.params.obj.imdbID, 'singleCaptured', 'KO')
                "
              >
                SS Alınmadı
              </v-chip>
            </div>
          </div>
        </v-col>
        <v-col></v-col>
      </v-row>
      <v-row>
        <div v-for="tw in $route.params.obj.tweets" :key="tw">
          <Tweet :id="'' + tw"></Tweet>
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { db } from "../firebase/db";
import { Tweet } from "vue-tweet-embed";
export default {
  data() {
    return { locked: true };
  },
  created() {},
  components: { Tweet },
  methods: {
    updateProp(imdbID, prop, status) {
      db.collection("movies")
        .where("imdbID", "==", imdbID)
        .get()
        .then((snaphots) => {
          snaphots.forEach((item) => {
            if (!this.locked) {
              if (prop == "singleCaptured" && status == "KO") {
                db.collection("movies")
                  .doc(item.id)
                  .update({ singleCaptured: "OK" });
              }
              if (prop == "gifCaptured" && status == "KO") {
                db.collection("movies")
                  .doc(item.id)
                  .update({ gifCaptured: "OK" });
              }
              if (prop == "fourCaptured" && status == "KO") {
                db.collection("movies")
                  .doc(item.id)
                  .update({ fourCaptured: "OK" });
              }
              if (prop == "watched" && status == "KO") {
                db.collection("movies")
                  .doc(item.id)
                  .update({ watched: "OK" });
              }
              if (prop == "exist" && status == "KO") {
                db.collection("movies")
                  .doc(item.id)
                  .update({ exist: "OK" });
              }
              if (prop == "singleCaptured" && status == "OK") {
                db.collection("movies")
                  .doc(item.id)
                  .update({ singleCaptured: "KO" });
              }
              if (prop == "gifCaptured" && status == "OK") {
                db.collection("movies")
                  .doc(item.id)
                  .update({ gifCaptured: "KO" });
              }
              if (prop == "fourCaptured" && status == "OK") {
                db.collection("movies")
                  .doc(item.id)
                  .update({ fourCaptured: "KO" });
              }
              if (prop == "watched" && status == "OK") {
                db.collection("movies")
                  .doc(item.id)
                  .update({ watched: "KO" });
              }
              if (prop == "exist" && status == "OK") {
                db.collection("movies")
                  .doc(item.id)
                  .update({ exist: "KO" });
              }
            }
          });
        });
    },
  },
};
</script>
