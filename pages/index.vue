<template>
  <div>
    <v-row justify="center" align="center">
      <v-col
        v-for="product in kits"
        :key="product.id"
        cols="12"
        sm="4"
      >
        <product-summary-card
          :product="product"
          @view-product="viewProduct(product)"
        />
      </v-col>
    </v-row>
    <!-- <product-drawer v-show="sheet" :product="product" /></product-drawer> -->
    <div class="text-center">
      <v-bottom-sheet v-model="sheet">
        <v-sheet
          class="text-center"
        >
          <v-btn
            class="mt-6"
            text
            color="red"
            @click="sheet = !sheet"
          >
            close
          </v-btn>
          <div v-if="product" class="py-3">
            <v-row>
              <v-col>
                <v-card
                  class="mx-auto"
                  max-width="344"
                  outlined
                >
                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-title class="text-h5 mb-1">
                        {{ product.name }}
                      </v-list-item-title>
                      <v-list-item-subtitle>{{ product.description }}</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-avatar
                      tile
                      size="80"
                      color="grey"
                    />
                  </v-list-item>

                  <v-card-actions>
                    <v-btn
                      outlined
                      rounded
                      text
                      @click="addToCart()"
                    >
                      Add
                    </v-btn>
                    <v-btn
                      outlined
                      rounded
                      text
                      @click="removeFromCart()"
                    >
                      Remove
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
              <v-col>
                <h3>Total</h3>
                <div v-if="productTotal">
                  <h4>{{ productTotal }} </h4>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-sheet>
      </v-bottom-sheet>
    </div>
  </div>
</template>

<script>
import ProductSummaryCard from '~/components/ProductSummaryCard.vue'
// import ProductDrawer from '~/components/ProductDrawer.vue'

import items from '~/mixins/items.js'
export default {
  components: { ProductSummaryCard },
  mixins: [items],
  data () {
    return {
      product: null,
      sheet: false
    }
  },
  computed: {
    productTotal () {
      // return this.$store.getters.productQuantity(this.product)
      return this.$store.getters.productQuantity(this.product.id)
    }
  },
  methods: {
    viewProduct (product) {
      this.product = product
      this.sheet = !this.sheet
    },
    addToCart () {
      this.$store.commit('addToCart', this.product)
    },
    removeFromCart () {
      this.$store.commit('removeFromCart', this.product)
    }
  }
}

</script>

<style lang="scss">

body {
  p {
    color: intial
  }
}

</style>
