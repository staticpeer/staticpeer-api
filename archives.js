const createModel = require('level-model')
const datDns = require('dat-dns')()

module.exports = class Archives {
  constructor (config) {
    this.db = createModel(config.db, {
      modelName: 'archives',
      indexKeys: ['url', 'name', 'title'],
      properties: {
        url: { type: 'string' },
        name: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string' },
        additionalUrls: { type: 'array' }
      },
      required: ['url']
    })
  }

  resolve (domainOrKey, callback) {
    datDns.resolveName(domainOrKey, callback)
  }

  create (data, options, callback) {
    if (typeof options === 'function') {
      callback = options
      options = {}
    }

    this.resolve(data.url, (err, key) => {
      if (err) return callback(err)

      data.key = key

      this.db.get(data.key, (err, res) => {
        if (!err && res) {
          return callback(new Error(`archive ${data.key} already created`))
        }

        this.db.create(data, (err, result) => {
          if (err) return callback(err)
          callback(null, result)
        })
      })
    })
  }

  get (domainOrKey, callback) {
    this.resolve(domainOrKey, (err, key) => {
      if (err) return callback(err)
      this.db.get(key, callback)
    })
  }

  update (domainOrKey, data, callback) {
    this.resolve(domainOrKey, (err, key) => {
      if (err) return callback(err)
      this.db.update(key, data, callback)
    })
  }

  delete (domainOrKey, callback) {
    this.resolve(domainOrKey, (err, key) => {
      if (err) return callback(err)
      this.db.delete(key, callback)
    })
  }

  createReadStream (options) {
    return this.db.createReadStream(options)
  }
}
