import { IncomingMessage, ServerResponse } from "http";
import { productController } from "../controller/products.controller";

export const productRoute = (req:IncomingMessage, res:ServerResponse) =>{
   // console.log(req.url);
   // console.log(req.method);

   const url = req.url;
   const method = req.method;

   if(method === "GET" && url === "/"){
      res.writeHead(200, {"content-type" : "application/json"});
      res.end(JSON.stringify({message : "eita sir root url"}));
   }
   else if(url?.startsWith("/products")){
      //console.log(req);
      productController(req, res);
   }

   else{
    res.writeHead(200, {"content-type" : "application/json"});
    res.end(JSON.stringify({message : "eita sir xyz url"}));
   }
}