require('@babel/register')({
  babelrc: true,
})

const { createServer } = require('./server')

async function startServer() {
  try {
    const server = await createServer()
    await server.start()
    console.log('server running at:', server.info.uri)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

startServer()
