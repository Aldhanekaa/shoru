/* eslint-disable */

const { application } = require('express')
const Url = require('../models/url.model')
/* eslint-enable */

const invalidNames = ['api', 'apis', 'view', 'views']

function checkUrlStatus (url) {
  fetch(url).then(
    function (response) {
      return response.status;
    }
  )
}

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
      let urlStatus = checkUrlStatus(url);

      if (url.match(regexForUrl && urlStatus == 200)) {
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

            if (invalidNames.includes(name)) {
              res.json({
                message: 'Invalid name, please refer to other name.',
              })
              return
            }

            const newUrl = new Url({ name: req.body.name, url })
            try {
              await newUrl.save()
              res.json({
                yourUrl: url,
                newUrl: `https://shoru.vercel.app/${name}`,
                status: 'success!',
                name,
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
              Url: `https://shoru.vercel.app/${newUrl.id}`,
              message: 'success!',
              name: newUrl.id,
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

  /* eslint-disable */
  app.get('/api/:name', async (req, res) => {
    const { name } = req.params

    if (name) {
      try {
        const url = await Url.findOne({ name: name })
        console.log(url)

        if (url) {
          res.json({ status: 'success', url: url.url })
          return
        } else {
          res.send({ status: 'error', message: 'not found' })
          return
        }
      } catch (err) {
        res.send({ status: 'server-error', message: 'error occured' })
        return
      }
    }

    res.send({ status: 'error', message: 'not found' })
  })
}
