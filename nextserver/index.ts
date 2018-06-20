import * as express from 'express'
import * as next from 'next'
const routes = require('../src/routes')
const generate = require('../content-types/meta/generate')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handler = routes.getRequestHandler(app)

app.prepare().then(() => {
    const server = express();

    server.use('/uploads', express.static('uploads'))

    server.get('/generate', (_req, _res) => {
        generate()
    })

    server.use(handler)

    server.listen(3000, (err) => {
        if (err) throw err;
        console.log('Server ready on http://localhost:3000');
    });
})
