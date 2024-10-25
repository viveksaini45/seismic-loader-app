const {Server: TusUploadServer} = require('@tus/server')
const {FileStore} = require('@tus/file-store')

const host = '127.0.0.1'
const port = 1080
const server = new TusUploadServer({
    path: '/files',
    datastore: new FileStore({directory: './files'}),
})

server.listen({host, port})