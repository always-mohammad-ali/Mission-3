import { IncomingMessage, ServerResponse } from "http";
import { readProduct, writeProduct } from "../services/product.service";
import { IProduct } from "../types/product.interface";
import { parseBody } from "../utility/parseBody";

export const productController =async (req : IncomingMessage, res : ServerResponse) =>{

    const url = req.url;
    //console.log(url);
    const method = req.method;

    const urlPart = url?.split('/') // 'products/151' => ['', 'products', '151'];
    const id = urlPart && urlPart[1] === "products" ? Number(urlPart[2]) : null;
    console.log(id);

    if(method === "GET" && url === "/products"){
        const products =  readProduct();
        res.writeHead(200, {"content-type" : "application/json"});
        res.end(JSON.stringify({message : "eita /products route", data : products}));
        return;
    }
    

    else if(method === "GET" && id !== null){
        const products =  readProduct();

        const product = products.find((p :IProduct) => p.id === id);


        res.writeHead(200, {"content-type" : "application/json"});
        res.end(JSON.stringify({message : "eita /products route", data : product}))
        return;
    }


    else if(method === "POST" && url === "/products"){
           const body = await parseBody(req);
          // console.log(body);
          const products = readProduct();

          const newProduct = {
            id: Date.now(),
            ...body,
          }
          products.push(newProduct);
         // console.log(products)
         writeProduct(products);

        res.writeHead(201, {"content-type" : "application/json"});
        res.end(JSON.stringify({message : "products created successfully", data : newProduct}))


         return;
    }

    else if(method === "PUT" &&  id !== null){
        const body = await parseBody(req);
        console.log(body);
        const products = readProduct();


        const index = products.findIndex((p : IProduct) => p.id === id);
        console.log(index);

        if(index < 0){
            res.writeHead(201, {"content-type" : "application/json"});

            res.end(JSON.stringify({ message : "products not found"}))
        }
        return;
    }
}