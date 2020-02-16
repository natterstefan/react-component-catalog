/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
require('@babel/register')({
  babelrc: true,
})

const { createServer } = require('./server')

async function startServer() {
  try {
    const server = await createServer()
    await server.start()
    console.log(
      `Server running at: ${server.info.uri}`,
      '\n- Open base: http://localhost:8000/base',
      '\n- Open client: http://localhost:8000/client1',
    )
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

startServer()
