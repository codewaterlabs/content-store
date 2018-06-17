const express = require('express')
const next = require('next')
const routes = require('./src/routes')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handler = routes.getRequestHandler(app)

app.prepare().then(() => {
    const server = express();

    server.use('/uploads', express.static('uploads'))

    server.use(handler)

    server.listen(3000, (err) => {
        if (err) throw err;
        console.log('Server ready on http://localhost:3000');
    });
})
