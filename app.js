import express from "express";
import ProductManager from "../productmanager.js";
const manager= new ProductManager("./files/Productos.json");
const app=express()
const PORT=8080;


app.get("/products", async(request, response)=>{
    const {limit}=request.query
    const product = await manager.getProducts()
    if(limit){
        const limitProds = product.slice(0, limit)
        response.json({status:"Success", limitProds})
    } else{
        response.json({status:"Success", product})
    }
}
 )

app.get("/products/:pid", async (request, response)=>{
    const pid = parseInt(request.params.pid) 
    const product = await manager.getProducts()
    const productFind = product.find(elemento=> elemento.id===pid)
    console.log(productFind);
    response.send({status:"Success", productFind}) 

})

app.listen(PORT, ()=>{
console.log("Port active");
})