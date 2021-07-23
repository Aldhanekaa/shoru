<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-row align="center">
            <v-col cols="6">
              <v-subheader> Generated URL </v-subheader>
            </v-col>

            <v-col cols="6">
              <v-select
                v-model="select"
                :items="items"
                item-text="state"
                item-value="abbr"
                label="Select"
                persistent-hint
                return-object
                single-line
                @change="generatedLinkOnChange"
              ></v-select>
            </v-col>
          </v-row>
        </v-col>
        <v-col v-if="isCustom" cols="12">
          <v-text-field
            label="Name"
            hint="shoru.vercel.app/page"
            persistent-hint
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field label="Url Here" outlined></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-btn tile style="width: 100%">
            <v-icon left> mdi-cloud-upload </v-icon>
            Shorten
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      isCustom: false,
      select: 'random',
      items: ['random', 'custom'],
    }
  },

  computed: {},

  methods: {
    generatedLinkOnChange(e: string): void {
      if (e === 'custom') this.isCustom = true
      else this.isCustom = false
    },
  },
})
</script>
