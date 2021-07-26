import Vue from 'vue'
// import mongoose from 'mongoose'

export default Vue.extend({
  async asyncData({ $axios, isDev, params }) {
    const APIRoute = `${
      isDev ? 'http://localhost:3000' : 'https://shoru.herokuapp.com'
    }/api/${params.name}`
    try {
      const APIResponse = await $axios.get<{
        status: 'success' | 'error' | 'server-error'
        url?: string
        message: string
      }>(APIRoute)

      if (APIResponse.data.status === 'server-error') {
        throw new Error('Error ')
      } else if (APIResponse.data.status === 'success') {
        console.log(APIResponse.data.status)

        // @ts-ignore
        // redirect(APIResponse.data.url)
        return {
          found: true,
          url_name: params.name,
          url: APIResponse.data.url,
        }
      } else {
        return {
          message: APIResponse.data.message,
          found: false,
        }
      }
    } catch (err) {
      return {
        message: 'Error Occured From Server',
        error: true,
        found: false,
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
