<template>
  <form @submit="onSubmitForm">
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
            id="customGeneratedLink"
            ref="customGeneratedLink"
            label="customGeneratedLink"
            :hint="input.hints.customGeneratedLink"
            persistent-hint
            outlined
            :value="input.customGeneratedLink"
            :rules="[input.rules.customGeneratedLink]"
            required
            @change="customGeneratedLinkOnChange"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            id="url"
            ref="url"
            label="url"
            :hint="input.hints.url"
            persistent-hint
            outlined
            :value="input.url"
            :rules="[input.rules.url]"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-btn type="submit" tile style="width: 100%">
            <v-icon left> mdi-cloud-upload </v-icon>
            Shorten
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </form>
</template>

<script lang="ts">
import InputComponentScript from './Input.component'

export default InputComponentScript
</script>
