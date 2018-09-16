# staticpeer-api

A work in progress implementation of the [dat pinning service api](https://www.datprotocol.com/deps/0003-http-pinning-service-api/).

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]
[![conduct][conduct]][conduct-url]

[npm-image]: https://img.shields.io/npm/v/staticpeer-api.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/staticpeer-api
[travis-image]: https://img.shields.io/travis/staticpeer/staticpeer-api.svg?style=flat-square
[travis-url]: https://travis-ci.org/staticpeer/staticpeer-api
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard
[conduct]: https://img.shields.io/badge/code%20of%20conduct-contributor%20covenant-green.svg?style=flat-square
[conduct-url]: CODE_OF_CONDUCT.md

## About

The goal is to create a kind of combination of [hypercored](https://github.com/mafintosh/hypercored) and [homebase](https://github.com/beakerbrowser/homebase/) that allows user registration via JSON API and provides additional useful API endpoints.

### Example

```js
var createServer = require('staticpeer-api')

var app = createServer({
  databaseDirectory: './tmp/db',
  archiverDirectory: './tmp/archiver'
})

app.listen(4040, (err, address) => {
  if (err) throw err
  app.log.info(`server listening on ${address}`)
})
```

## Install

```sh
npm install --save staticpeer-api
```

## Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## Code of conduct

Help keep this project open and inclusive. Read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## Change log

Read about the changes to this project in [CHANGELOG.md](CHANGELOG.md). The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## Contact

- **issues** – Please open issues in the [issues queue](https://github.com/staticpeer/staticpeer-api/issues)

## License

[ISC](LICENSE.md)
