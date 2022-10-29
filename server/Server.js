import dotenv from 'dotenv'
dotenv.config();
import './services/passport.js'
import './models/client/client.schema.js'
import './models/admin/admin.schema.js'
import './models/log/log.schema.js'

import {createServer} from 'http'
import {api} from './api.js'
import {connectMongo} from './services/mongo.js'

const server = createServer(api);

(async function () {
    await connectMongo();
    server.listen(process.env.PORT, ()=>{
        console.log(`Server is listening on port ${process.env.PORT}...`);
    })
})();