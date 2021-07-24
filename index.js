// const { loadNuxt, build } = require('nuxt')

const app = require('express')()
// const isDev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000

async function start() {
    // We get Nuxt instance
    const nuxt = await loadNuxt(isDev ? 'dev' : 'start')


    // Render every route with Nuxt.js
    app.use(nuxt.render)

    app.get('/api', (req, res) => {
        res.send('hesyoo!!')
    })
    

    // Build only in dev mode with hot-reloading
    if (isDev) {
        build(nuxt)
    }
    // Listen on port 5000
    app.listen(port, () => {
        console.log(`Server is booming on port 5000
    Visit http://localhost:${port}`);
    });

    return app
}


  
module.exports = start()