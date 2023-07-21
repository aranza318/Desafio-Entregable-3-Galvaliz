import fs from "fs"

export default class ProductManager {
    constructor(path) {
        this.path= path;
        this.products = [];
    }
    
     //Muestra los objetos en el json 
     getProducts = async()=> {
        const productList= await fs.promises.readFile(this.path,"utf-8")
        const productListParse=JSON.parse(productList)
        return productListParse
    }
    //Consigue el id
    getId= async()=> {
        const cod = this.products.length
        if(cod == 0){
            return 1
        } else {
            return (this.products[cod-1].id)+1
        }
    }
    //Agrega el producto, validando ya sus campos y comprobando si su codigo esta en uso previamente
    addProduct = async(title,description,price,thumbnail,code,stock)=> {
        if(!title||!description||!price||!thumbnail||!code||!stock){
            console.error("Campos incompletos")
            return
        } else {
            const all = await this.getProducts() 
            const codigoEnUso = all.find(item => item.code === code)
            if(codigoEnUso){
                console.error("Codigo en uso")
            } else {
                const id =await this.getId()
                const producto = {id,title,description,price,thumbnail,code,stock};
                    this.products.push(producto);
                    await fs.promises.writeFile(this.path, JSON.stringify(this.products, null,2))
                }
        }
    }
    

    
    //Actualiza el producto segun su id comprobando si esta completo y si su codigo esta o no en uso
    updateProduct=async(id,title,description,price,thumbnail,code,stock)=>{
        if(!id|| !title || !description || !price || !thumbnail|| !code||!stock){
          console.error("INGRESE TODOS LOS DATOS DEL PRODUCTO PARA SU ACTUALIZACION")
          return 
        }
        else{
            const allP=await this.getProducts()
            const codigoEnUso=allP.find(elemento=>elemento.code===code)
            if(codigoEnUso){
                 console.error("EL CODIGO DEL PRODUCTO QUE DESEA ACTUALIZAR ES REPETIDO")
                 return
            }
            else{
                const currentProductsList=await this.getProducts()
                const newProductsList=currentProductsList.map(elemento=>{
                    if(elemento.id===id){
                      const updatedProduct={
                        ...elemento,
                        title,description,price,thumbnail,code,stock
                      }
                      return updatedProduct
                    }
                    else{
                        return elemento
                    }
                })
                await fs.promises.writeFile(this.path,JSON.stringify(newProductsList,null,2))
            }
            
        }
      }
 

    //Borra el producto segun el id
    deleteProduct= async(id)=>{
        const all=await this.getProducts()
        const productoAEliminar=all.filter(elemento=>elemento.id!==id)
       await fs.promises.writeFile(this.path,JSON.stringify(productoAEliminar,null,2))
    }
    
    //Busca el producto por el id
    getProductsById= async(id)=>{
        const allProducts = await this.getProducts();
        const findOne = allProducts.find(item => item.id === id);
        return findOne
       }



}

/*async function zonaP(){
const productmanager=new ProductManager("./files/Productos.json");
await productmanager.addProduct("jugo", "jugo de frutas", 100, "https://www.clarin.com/img/2018/11/19/1moJNpDSB_340x340__1.jpg","jugoF",50);
await productmanager.addProduct("trago","trago delicioso", 200, "https://www.clarin.com/img/2022/01/17/negroni-un-trago-clasico-que___QwCr1ph7M_2000x1500__1.jpg","tragoD", 40);
await productmanager.addProduct("chocolate", "chocolate caliente", 300, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcyPfb9m9WI9iwGijaOgxZA01PK0Lhyv-eyf0JOs-6Zy3TDaKvrdzgoJu0A74QQrvZwpY&usqp=CAU", "choco",30);
await productmanager.addProduct("chocolate","chocolate caliente", 300, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcyPfb9m9WI9iwGijaOgxZA01PK0Lhyv-eyf0JOs-6Zy3TDaKvrdzgoJu0A74QQrvZwpY&usqp=CAU", "chocolateN", 30);
await productmanager.addProduct("jugoF","jugo de frutas", 100, "https://www.clarin.com/img/2018/11/19/1moJNpDSB_340x340__1.jpg","juguito",50);
await productmanager.deleteProduct(2)
await productmanager.addProduct("jugoNuevo","jugo", "jugo de frutas", 100, "https://www.clarin.com/img/2018/11/19/1moJNpDSB_340x340__1.jpg","JugoN",50);
await productmanager.addProduct("jugoF","jugo de frutas", 100, "https://www.clarin.com/img/2018/11/19/1moJNpDSB_340x340__1.jpg","juguito",50);
await productmanager.updateProduct(1,"Jugo Rico","jugo frutal",1500,"https://www.clarin.com/img/2018/11/19/1moJNpDSB_340x340__1.jpg","jugo de frutas",500)
await productmanager.deleteProduct(2)
 const obtenerPorID=await productmanager.getProductsById(1)

 const listadoCompleto=await productmanager.getProducts()
console.log(obtenerPorID)
console.log(listadoCompleto);
 

}

zonaP();
*/




