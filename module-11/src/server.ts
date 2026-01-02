import http, { IncomingMessage, Server, ServerResponse } from "http";
import config from "./config";

const server : Server = http.createServer((req : IncomingMessage, res : ServerResponse) =>{
          console.log("server is running");
         
          //root route
          if(req.url == "/" && req.method == "GET"){
             res.writeHead(200, {"COntent-Type" : "application/json"});

             res.end(JSON.stringify({
                message : "hello from node js with typescript",
                path : req.url,

             }))
          }

          //Health Route

          if(req.url == "/api" && req.method == "GET"){
            res.writeHead(200, {"Content_Type" : "application/json"});

            res.end(JSON.stringify({
                message : "api response is done",
                path: req.url,
            }))
          }

          //HEALTH ROUTE USERS
          if(req.url == "/api/users" && req.method == "POST"){
            

           /* const user = {
                id : 1,
                name : "ali",
            };
            
            res.writeHead(200, {"Content-Type" : "application/json"});
            res.end(JSON.stringify(user)) */
            
            let body = '';

            //listen for data chunk

            req.on("data", chunk =>{
                body += chunk.toString();
            });

            req.on("end", () =>{
                try{
                  const parseBody = JSON.parse(body);
                //console.log(body);
                //res.end(body);

                console.log(parseBody);
                
                res.end(JSON.stringify(parseBody));
                }catch(err : any){
                    console.log(err?.message);
                }
            });

            

          }

          
})

server.listen(config.port, () =>{
    console.log(`server is running on port ${config.port}`);
});