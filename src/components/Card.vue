<template>
    <v-card
      class="mx-auto my-12"
      max-width="374"
    >  
      <v-img
        height="250"
        src="https://m.media-amazon.com/images/M/MV5BNzQxNTIyODAxMV5BMl5BanBnXkFtZTgwNzQyMDA3OTE@._V1_UY1200_CR90,0,630,1200_AL_.jpg    "
      ></v-img>
      <v-card-title>Moonlight</v-card-title>
      <v-card-text>
        <v-row
          align="center"
          class="mx-0"
        >
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
  
        <div class="my-4 subtitle-1">
          Barry Jenkins
        </div>
  
        <div>açıklama</div>
      </v-card-text>
  
      <v-divider class="mx-4"></v-divider>
  
      <v-card-title></v-card-title>
  
      <v-card-text>
        <v-chip-group
          v-model="selection"
          active-class="deep-purple accent-4 white--text"
        >
          <v-chip>1</v-chip>
          <v-chip>2</v-chip>
          <v-chip>3</v-chip>
          <v-chip>4</v-chip>
          <v-chip>5</v-chip>
        </v-chip-group>
      </v-card-text>
  
      <v-card-actions>

      </v-card-actions>
    </v-card>
</template>

<script>
  export default {
    name: 'Card'}
</script>
  
