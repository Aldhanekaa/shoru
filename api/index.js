const app = require('express')()

app.all('/getJSON', (req, res) => {
  res.json({ data: 'data' })
})

app.get('/', (req, res) => {
    res.json({ data: 'data' })
  })

module.exports = app