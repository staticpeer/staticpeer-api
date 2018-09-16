var createServer = require('./index')

var app = createServer({
  databaseDirectory: './tmp/db',
  archiverDirectory: './tmp/archiver'
})

app.listen(4040, (err, address) => {
  if (err) throw err
  app.log.info(`server listening on ${address}`)
})
