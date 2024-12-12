import Books from "../models/booksModel.js";

export const getBooks = async(req,res) => {

   try {
    let query={};
    if(req.query.author){
      query.author={$regex : new RegExp(req.query.author,"i")};
      
    }
    if(req.query.publisher){
      query.publisher={$regex : new RegExp(req.query.publisher,"i")}
    }
    if(req.query.title){
      query.title={$regex : new RegExp(req.query.title,"i")}
    } 
    if(req.query.minPrice && req.query.maxPrice){
      query.price={$gte : req.query.minPrice, $lte:req.query.maxPrice}
    } 
    console.log(req.query);
    const allBooks=await Books.find(query);
    res.send(allBooks)
     
  } catch (error) {
    res.status(500).send({message:"error",error})
    
  }
}

