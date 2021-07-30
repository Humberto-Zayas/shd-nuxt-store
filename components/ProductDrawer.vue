<template>
  <div class="text-center">
    <v-bottom-sheet>
      <v-sheet
        class="text-center"
        height="800px"
      >
        <v-btn
          class="mt-6"
          text
          color="red"
          @click="$emit('sheetFalse')"
        >
          close
        </v-btn>
        <div class="py-3">
          This is a bottom sheet using the controlled by v-model instead of activator
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
  prop: {
    sheet: Boolean
  }
}

</script>
