var path = require('path')

var hypercoreArchiver = require('hypercore-archiver')
var createSwarm = require('hypercore-archiver/swarm')

module.exports = function createArchiver (config) {
  var directory = config.directory
  var key = config.key

  var archiver = hypercoreArchiver(path.join(directory), key)
  var swarm = createSwarm(archiver, { live: true })

  swarm.on('listening', function () {
    console.log('Swarm listening on port %d', this.address().port)
  })

  archiver.on('sync', function (feed) {
    console.log('Fully synced', feed.key.toString('hex'), feed)
  })

  archiver.on('add-archive', (metadataFeed, contentFeed) => {
    console.log('add-archive', metadataFeed, contentFeed)
  })

  archiver.on('add', function (feed) {
    console.log('Adding', feed.key.toString('hex'))
  })

  archiver.on('remove', function (feed) {
    console.log('Removing', feed.key.toString('hex'))
  })

  archiver.on('changes', function (feed) {
    console.log('Archiver key is ' + feed.key.toString('hex'))
  })

  return archiver
}
