const routes = module.exports = require('next-routes')()

routes
    .add('index')
    .add('editor', '/editor/:id')
    .add('editorNew', '/editor', 'editor')
    .add('content-list')
    .add('create-user')