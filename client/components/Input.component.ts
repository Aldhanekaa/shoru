import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      formHasErrors: false,
      isCustom: false,
      select: 'random',
      items: ['random', 'custom'],
      input: {
        customGeneratedLink: '',
        url: '',
        hints: {
          customGeneratedLink: 'shoru.vercel.app/',
          url: '',
        },
        rules: {
          url: (value: string) => {
            const urlRegex =
              /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/

            // @ts-ignore
            this.setInput('url', value)
            // @ts-ignore
            // console.log(this.getUrl())

            if (!urlRegex.test(value)) {
              return 'Invalid URL'
            }

            if (!value) {
              return 'Please fill this field'
            }

            return true
          },
          customGeneratedLink: (value: string) => {
            // @ts-ignore
            this.setInput('customGeneratedLink', value)
            if (!/^[A-Za-z0-9_-]*$/.test(value)) {
              return 'Only letters, numbers, underscores, and dashes are allowed. '
            }

            // console.log(this.$data.input)
            if (!value) {
              return 'Please fill this field'
            } else {
              // @ts-ignore
              this.setHint('customGeneratedLink', `shoru.vercel.app/${value}`)
            }

            return true
          },
        },
      },
      invalidUrlName: ['api'],
    }
  },
  computed: {
    form() {
      return {
        // @ts-ignore
        customGeneratedLink: this.input.customGeneratedLink,
        // @ts-ignore
        url: this.input.url,
      }
    },
  },

  methods: {
    getUrl(): string {
      return this.input.url
    },
    setInput(key: 'url' | 'customGeneratedLink', value: string): void {
      // @ts-ignore
      this.input = Object.assign({}, this.input, {
        [key]: value,
      })

      console.log(this.input)
    },
    setHint(key: string, value: string): void {
      // @ts-ignore
      if (this.input.hints[key]) {
        // @ts-ignore
        this.input.hints[key] = value
      }
    },
    generatedLinkOnChange(e: string): void {
      if (e === 'custom') this.isCustom = true
      else {
        this.isCustom = false
        this.input.customGeneratedLink = ''
      }
    },
    customGeneratedLinkOnChange(e: string) {
      this.input.customGeneratedLink = e
    },

    async onSubmitForm(e: HTMLFormElement): Promise<void> {
      Object.keys(this.form).forEach((f) => {
        // @ts-ignore
        if (this.$refs[f]) {
          // @ts-ignore
          //   console.log(this.$refs[f])
          // @ts-ignore
          //   this.$refs[f].hint = 'sdf'
          // @ts-ignore
          //   if (this.$refs[f].hasError()) this.formHasErrors = true
        }
      })
      e.preventDefault()
      console.log(this.$config.http)

      try {
        interface ReqI {
          url: string
          name?: string
        }

        const Req: ReqI = {
          url: this.input.url,
        }
        console.log(this.getUrl())
        if (this.isCustom) {
          Req.name = this.input.customGeneratedLink
        }

        const res = await this.$axios.$post<{
          message: string
          url?: string
          name: string
        }>(
          `${
            this.$config.http.isDev ? '' : 'https://shoru.herokuapp.com'
          }/api/add`,
          Req
        )

        if (this.isCustom && res.message !== 'success!') {
          // @ts-ignore
          // console.log(this.$refs.customGeneratedLink)
          // @ts-ignore
          this.$refs.customGeneratedLink.error = true
          // @ts-ignore
          this.$refs.customGeneratedLink.errorMessages = res.message
        }

        if (res.message === 'success!') {
          // @ts-ignore
          window.location = `/view/${res.name}`
        }

        console.log('res', res)
      } catch (err) {
        window.alert('error accured')
      }
    },
  },
})
