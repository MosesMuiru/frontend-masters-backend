const http = require("http")
const server = http.createServer(async (req,res) => {
    if(req.request == "Get" && req.url =="/"){
      console.log("hello from the server")
        res.end()

    } 

})
server.listen(3101,() => {
    console.log("server on 3001")
})