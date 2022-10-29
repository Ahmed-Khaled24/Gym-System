import dotenv from 'dotenv'
dotenv.config();

import {createServer} from 'http'
import {api} from './api.js'

const server = createServer(api);

(async function () {
    // Set up database and any other service 

    server.listen(process.env.PORT, ()=>{
        console.log(`server is listening on port ${process.env.PORT}`);
    })
})();