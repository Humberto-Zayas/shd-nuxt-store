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
                <!-- Total Cost: ${{ (product.price * product.quantity).toFixed(2) }} -->
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

        <v-divider inset />

        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <v-icon
                class="'blue'"
                dark
                v-text="'mdi-clipboard-text'"
              />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="'Cart Total'" /></v-list-item-title>
            </v-list-item-content>
            <!-- <v-list-item-content>
              <v-list-item-title v-text="'$' + cartTotal.toFixed(2)" /></v-list-item-title>
            </v-list-item-content> -->
            <v-list-item-action>
              <v-form @submit.prevent="handleSubmit">
                <v-btn @click.prevent="handleSubmit">
                  Pay by Credit Cart
                </v-btn>
              </v-form>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-divider inset />
        <div class="blue-grey lighten-2">
          <v-row>
            <form @submit.prevent="handleSubmit">
              <fieldset :class="{ dis: loading }" class="fields">
                <div class="nes-field" />
                <div class="nes-field">
                  <label for="name_field">Name</label>
                  <input
                    id="name_field"
                    placeholder="Jane Doe"
                    type="text"
                    name="name"
                    class="nes-input"
                  >
                </div>
                <div class="nes-field">
                  <label for="email_field">Email</label>
                  <input
                    id="email_field"
                    placeholder="jane.doe@example.com "
                    type="email"
                    name="email"
                    class="nes-input"
                  >
                </div>
                <div class="nes-field">
                  <label for="address_field">Address</label>
                  <input
                    id="address_field"
                    placeholder="1234 Sycamore Street"
                    type="text"
                    name="address"
                    class="nes-input"
                  >
                </div>
                <div class="nes-field">
                  <label for="city_field">City</label>
                  <input
                    id="city_field"
                    placeholder="Reno"
                    type="text"
                    name="city"
                    class="nes-input"
                  >
                </div>
                <div class="nes-field">
                  <label for="state_field">State</label>
                  <input
                    id="state_field"
                    placeholder="Nevada"
                    type="text"
                    name="state"
                    class="nes-input"
                  >
                </div>
                <div class="nes-field">
                  <label for="zip_field">Zip</label>
                  <input
                    id="zip_field"
                    placeholder="89523"
                    type="text"
                    name="zip"
                    class="nes-input"
                  >
                </div>
                <v-row>
                  <v-col id="card-element" />
                </v-row>
              </fieldset>
              <div class="nes-field">
                <v-btn
                  type="submit"
                  class="nes-btn is-primary"
                  :class="{ dis: loading }"
                >
                  {{ loading ? "Loading..." : "Pay $19.99" }}
                </v-btn>
              </div>
            </form>
          </v-row>
        </div>
      </v-col>
    </v-row></v-list-item>
    </v-list>
    </v-col>
    </v-row>
  </v-container>
</template>

<script>

// const style = {
//   style: {
//     base: {
//       iconColor: '#000',
//       color: '#000',
//       fontWeight: '800',
//       fontFamily: 'Press Start 2P',
//       fontSize: '22px',
//       fontSmoothing: 'antialiased',
//       ':-webkit-autofill': {
//         color: '#fce883'
//       },
//       '::placeholder': {
//         color: 'green'
//       }
//     },
//     invalid: {
//       iconColor: '#FFC7EE',
//       color: 'red'
//     }
//   }
// }

export default {
  data () {
    return {
      elements: '',
      cardElement: '',
      valid: false,
      firstname: '',
      lastname: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      loading: false,
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
    },
    cartTotal () {
      const x = this.$store.getters.cartTotal.toString() + '00'
      return x
    }
    // productCost (product) {
    //   return product.price * product.quantity
    // }

  },
  mounted () {
    if (this.$stripe) {
      // const elements = this.$stripe.elements()

      // const cardElement = elements.create('card', {})
      this.elements = this.$stripe.elements()
      this.cardElement = this.elements.create('card', {})

      // Add an instance of the card Element into the `card-element` <div>
      // cardElement.mount('#card-element')
      this.cardElement.mount('#card-element')
      // this.loading = false
    }
  },
  methods: {
    async handleSubmit (event) {
      const { name, email, address, city, state, zip } = Object.fromEntries(
        new FormData(event.target)
      )
      console.log('here', name, email, address, city, state, zip)
      const billingDetails = {
        name,
        email,
        address: {
          city,
          line1: address,
          state,
          postal_code: zip
        }
      }
      // const elements = this.$stripe.elements()
      // const cardElement = elements.getElement('card')

      try {
        const response = await fetch('https://sharp-chicken-31.loca.lt/stripe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ amount: this.cartTotal })
        })
        const { secret } = await response.json()
        console.log('secret', secret)
        const paymentMethodReq = await this.$stripe.createPaymentMethod({
          type: 'card',
          card: this.cardElement,
          billing_details: billingDetails
        })
        console.log('error?', paymentMethodReq)

        const { error } = await this.$stripe.confirmCardPayment(secret, {
          payment_method: paymentMethodReq.paymentMethod.id
        })

        if (error) { return }
        this.$router.push('/')

        console.log('error?', error)
        // router.push('/success')
      } catch (error) {
        console.log('error', error)
      }
    }
  }
}

</script>
