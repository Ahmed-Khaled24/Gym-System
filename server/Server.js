import './models/client/client.schema.js'
import './models/admin/admin.schema.js'
import './models/log/log.schema.js'
import {createServer} from 'http'
import api from './api.js'
import {connectMongo} from './services/mongo.js'

async function startServer() {
    const server = createServer(api);
    await connectMongo();
    server.listen(process.env.PORT, ()=>{
        console.log(`Server is listening on port ${process.env.PORT}...`);
    })
};
startServer();