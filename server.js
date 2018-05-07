const { createServer } = require('http')
const { parse } = require('url')
const express = require('express')
const next = require('next')
var multer = require('multer')
var upload = multer({ dest: __dirname + '/uploads/' })

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = express();
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const nextHandler = (req, res) => {
        const parsedUrl = parse(req.url, true)
        const { pathname, query } = parsedUrl
        console.log(req.url);
        app.render(req, res, pathname, query);
    };
    server.get('/_next/*', nextHandler)
    server.get('/', nextHandler)
    server.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
        // req.files is array of `photos` files
        // req.body will contain the text fields, if there were any
        console.log("Upload", req.files)
        res.send('Complete')
    })
    //handle(req, res, parsedUrl)
    server.listen(3000, err => {
        if (err) throw err
        console.log('> Ready on http://localhost:3000')
    })
})