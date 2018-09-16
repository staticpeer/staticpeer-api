const fastify = require('fastify')
const level = require('level-party')
const createTownship = require('township')
// const createReset = require('township-reset-password-token')
// const createEmail = require('township-email')

const createArchiver = require('./archiver')
const Archives = require('./archives')

module.exports = function createServer (config) {
  if (!config) {
    config = {}
  }

  const db = level(config.databaseDirectory || './db')
  const app = fastify({ logger: true })
  const archives = new Archives({ db })
  const archiver = createArchiver({
    directory: config.archiverDirectory || './archiver',
    key: config.key
  })

  const township = createTownship(db, config)

  /**
  * list dat archives associated with an account
  **/
  app.get('/archives', function (request, reply) {
    var results = []
    var stream = archives.createReadStream({ keys: false })

    stream.on('data', (data) => {
      results.push(data)
    })

    stream.on('end', () => {
      reply.send(results)
    })
  })

  /**
  * add a dat archive
  **/
  app.post('/archives/add', function (request, reply) {
    archives.create(request.body, (err, model) => {
      if (err) return reply.send(err)

      archiver.add(model.key, (err) => {
        if (err) return reply.send(err)

        reply.send(model)
      })
    })
  })

  /**
  * remove a dat archive
  **/
  app.post('/archives/remove', function (request, reply) {
    const key = request.body.key

    archives.delete(key, (err, model) => {
      if (err) return reply.send(err)

      archiver.remove(key, (err) => {
        if (err) return reply.send(err)

        reply.status(201).send()
      })
    })
  })

  /**
  * get dat archive metadata
  **/
  app.get('/archives/item/:key', function (request, reply) {
    const key = request.params.key

    archives.get(key, (err, archive) => {
      if (err) return reply.send(err)

      archiver.get(key, (err, metadata, content) => {
        if (err) return reply.send(err)

        reply.send(archive)
      })
    })
  })

  /**
  * update dat archive metadata
  **/
  app.post('/archives/item/:key', function (request, reply) {
    archives.update(request.body, (err, archive) => {
      if (err) return reply.send(err)
      reply.send(archive)
    })
  })

  /* accounts */

  /**
  * get account data for logged in user
  **/
  app.get('/accounts/account', function (request, reply) {
    // TODO: implement township.get
    reply.status(500).send({ todo: 'implementation' })
  })

  /**
  * log in to user account
  **/
  app.post('/accounts/login', function (request, reply) {
    const body = request.body

    township.login(request, reply, { body }, function (err, code, data) {
      if (err) {
        return reply.status(400).send(err)
      }

      reply.status(code).send(data)
    })
  })

  /**
  * log out of user account
  **/
  app.post('/accounts/logout', function (request, reply) {
    const body = request.body

    township.logout(request, reply, { body }, function (err, code, data) {
      if (err) {
        return reply.status(400).send(err)
      }

      reply.status(code).send(data)
    })
  })

  /**
  * log out of user account
  **/
  app.post('/accounts/register', function (request, reply) {
    const body = request.body

    township.register(request, reply, { body }, function (err, code, data) {
      if (err) {
        return reply.status(400).send(err)
      }

      reply.status(code).send(data)
    })
  })

  return app
}
