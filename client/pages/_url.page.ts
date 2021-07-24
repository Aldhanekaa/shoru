import Vue from 'vue'
// import mongoose from 'mongoose'

export default Vue.extend({
  async asyncData({ redirect, $axios, isDev, params }) {
    const APIRoute = `${
      isDev ? 'http://localhost:3000' : 'https://shoru.herokuapp.com'
    }/api/${params.url}`
    try {
      const APIResponse = await $axios.get<{
        status: 'success' | 'error' | 'server-error'
        url?: string
        message: string
      }>(APIRoute)

      if (APIResponse.data.status === 'server-error') {
        throw new Error('Error ')
      } else if (APIResponse.data.status === 'success') {
        // @ts-ignore
        redirect(APIResponse.data.url)
      } else {
        return {
          message: APIResponse.data.message,
        }
      }

      return
    } catch (err) {
      return {
        message: 'Error Occured From Server',
        error: true,
      }
    }
  },
  data() {
    return {
      error: false,
    }
  },

  computed: {},
})
