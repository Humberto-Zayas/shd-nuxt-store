<template>
  <v-container>
    <v-row

      justify="center"
      align="center"
    >
      <v-col cols="12" lg="5">
        <!-- <div v-for="product in items" :key="product.id">
          {{ product.name }}
        </div> -->
        <v-list class="blue-grey darken-4">
          <v-list-item
            v-for="product in products"
            :key="product.id"
          >
            <v-list-item-avatar>
              <v-icon
                class="'blue'"
                dark
                v-text="'mdi-clipboard-text'"
              />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="product.name" />

              <v-list-item-subtitle>
                In Cart: {{ product.quantity }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title>
                Total Cost: {{ product.price * product.quantity }}
                </v-list-item-subtitle>
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon>
                <v-icon color="grey lighten-1">
                  mdi-information
                </v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  data () {
    return {
      files: [
        {
          color: 'blue',
          icon: 'mdi-clipboard-text',
          subtitle: 'Jan 20, 2014',
          title: 'Vacation itinerary'
        },
        {
          color: 'amber',
          icon: 'mdi-gesture-tap-button',
          subtitle: 'Jan 10, 2014',
          title: 'Kitchen remodel'
        }
      ]
    }
  },
  computed: {
    products () {
      return this.$store.getters.cartItems
    }
    // productCost (product) {
    //   return product.price * product.quantity
    // }

  }
}

</script>
