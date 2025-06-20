import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'

//inicializar server
//fazer um print algo de teste no get

const server = http.createServer(async (req, res) => {
    const { method, url } = req
    
    await json(req, res)

    const route = routes.find(r => {
        return r.method === method && r.path.test(url)
    })

    if (route) {
        const routeParams = req.url.match(route.path)

        const { query, ...params} = routeParams.groups
   
        req.params = params
        req.query = query ? extractQueryParams(query) : {}

        return route.handler(req, res)    
    }

    return response.writeHead(404).end("Not found!")
})

server.listen(3333)