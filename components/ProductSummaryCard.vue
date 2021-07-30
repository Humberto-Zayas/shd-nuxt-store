<template>
  <div>
    <v-card
      class="mx-auto my-12"
    >
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        />
      </template>

      <v-img
        height="250"
        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
      />

      <v-card-title> {{ product.name }}</v-card-title>

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
          />

          <div class="grey--text ms-4">
            4.5 (413)
          </div>
        </v-row>
        <v-row
          align="center"
          class="mx-0"
        >
          <div class="grey--text ">
            {{ product.category }}
          </div>
        </v-row>

        <div class="my-4 text-subtitle-1">
          {{ product.price.toFixed(2) }}
        </div>

        <div>{{ description }}</div>
      </v-card-text>

      <v-divider class="mx-4" />

      <v-card-actions>
        <v-btn
          color="deep-purple lighten-2"
          text
          @click.prevent="$emit('view-product', product)"
        >
          View
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>

  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: null
    }
  },
  computed: {
    description () {
      return this.product.description.substring(0, 150)
    }
  }
}
</script>
