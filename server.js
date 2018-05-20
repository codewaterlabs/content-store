const { createServer } = require('http')
const { parse } = require('url')
const express = require('express')
const next = require('next')
var multer = require('multer')
const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

var upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + '/uploads/')
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname);
        }
    })
});

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const typeDefs = `
type Query {
  description: String
}
`

const resolvers = {
    Query: {
        description: () => `This is the API for a simple blogging application`
    }
}

app.prepare().then(() => {
    const graphqlServer = new GraphQLServer({
        typeDefs,
        resolvers,
        context: req => ({
            ...req,
            db: new Prisma({
                typeDefs: 'src/'
            })
        })
    });
    const options = {
        endpoint: '/graphql',
        playground: '/playground'
    };
    const server = graphqlServer.express;
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const nextHandler = (req, res) => {
        const parsedUrl = parse(req.url, true)
        const { pathname, query } = parsedUrl
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
    graphqlServer.start(options, () => {
        console.log('> Ready on http://localhost:4000')
    })
})
