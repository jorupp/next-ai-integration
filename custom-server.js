// heavily based on https://nextjs.org/docs/pages/building-your-application/configuring/custom-server

global.__MAGIC_VALUE = 'custom-server';
console.log(`initial startup - process.title: ${process.title}.`);
console.log(`  global names: ${Object.entries(global).map(([k]) => k).sort()}.`);

const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
 
const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3010
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()
 
global.__MAGIC_VALUE_2 = 'custom-server-before-prepare';
console.log(`end of startup - process.title: ${process.title}.`);
console.log(`  global names: ${Object.entries(global).map(([k]) => k).sort()}.`);

app.prepare().then(() => {
    global.__MAGIC_VALUE_3 = 'custom-server-after-prepare';
    console.log(`after prepare - process.title: ${process.title}.`);
    console.log(`  global names: ${Object.entries(global).map(([k]) => k).sort()}.`);
    
    createServer(async (req, res) => {
      try {
        await handle(req, res)
      } catch (err) {
        console.error('Error occurred handling', req.url, err)
        res.statusCode = 500
        res.end('internal server error')
      }
    })
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`)
    })
})