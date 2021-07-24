/* eslint-disable */

const { application } = require('express')
const Url = require('../models/url.model')
/* eslint-enable */

/**
 * @param {application} app
 */
module.exports = (app) => {
  app.post('/api/add', async (req, res) => {
    const regexForUrl =
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/

    if (req.body.url) {
      let { url } = req.body
      url = url.trim()

      if (url.match(regexForUrl)) {
        if (req.body.name) {
          let { name } = req.body
          name = name.trim()

          const isThere = await Url.findOne({
            name: {
              $regex: new RegExp('^' + name.toLowerCase() + '$', 'i'),
            },
          })

          if (isThere) {
            res.json({ message: 'name already in used' })
            return
          } else {
            const isThere = await Url.findOne({
              name: {
                $regex: new RegExp('^' + name.toLowerCase() + '$', 'i'),
              },
            })

            if (isThere) {
              res.json({ message: 'name already in used' })
              return
            }

            if (!/^[A-Za-z0-9_-]*$/.test(name)) {
              res.json({
                message:
                  'Only letters, numbers, underscores, and dashes are allowed. ',
              })
              return
            }
            const newUrl = new Url({ name: req.body.name, url })
            try {
              await newUrl.save()
              res.json({
                url: `https://shoru.vercel.app/${name}`,
                message: 'success!',
              })
              return
            } catch (error) {
              res.json({ message: 'something went wrong when saving to db' })
              return
            }
          }
        } else {
          const newUrl = new Url({ url })
          try {
            await newUrl.save()
            await newUrl.updateOne({ name: newUrl._id })
            res.json({
              url: `https://shoru.vercel.app/${newUrl.id}`,
              message: 'success!',
            })
            return
          } catch (error) {
            res.json({ message: 'something went wrong when saving to db' })
            return
          }
        }
      } else {
        res.json({ message: 'Invalid URL!' })
        return
      }
    }

    res.json({ message: 'please fill the url' })
  })

  app.get('/api', (req, res) => {
    res.send('he')
  })
}
