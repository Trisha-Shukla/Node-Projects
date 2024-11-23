const fs=require("node:fs");
const axios=require("axios");
const cheerio=require("cheerio")

const fetchData=async()=>{
    // try {
    //     const res=await axios("https://www.amazon.in/s?k=phone&crid=346Q2IP915EM4&sprefix=phon%2Caps%2C403&ref=nb_sb_noss_2");
    //     // console.log(res.data);
    //     fs.writeFile("amazondata.txt",res.data,(err)=>{
    //         if(err){
    //             console.log("Error writing file",err);
    //             return
    //         }
    //         console.log("File written succesfully");
            
    //     });
    //     const $=cheerio.load(res.data);
    //     const titles=$(".a-size-medium.a-color-base.a-text-normal");
    //     console.log(titles);
        
        
        
    // } catch (error) {
    //     console.log("Error during api fetching",error);
        
    // }
    
    const data=fs.readFileSync("amazondata.txt",{encoding:"utf-8"})
    // console.log(data);
    const $=cheerio.load(data);
    const productData=[];

        const titles=$(".a-size-medium.a-color-base.a-text-normal");
        // console.log(titles);
        titles.each((index,element)=>{
            const title=$(element).text();
            productData.push({ title: title }); // Properly push the title as an object
            // console.log(title);
            
        })
        const prices=$(".a-price-whole");
        // console.log(titles);
        prices.each((index,element)=>{
            const price=$(element).text();
            // console.log(price);
            productData[index]["price"] = price;
            
        })
        // console.log(productData);
        fs.writeFile("product.json",JSON.stringify(productData),(err)=>{
            if(err){
                console.log("Error writingdata ",err);
                return;
            }

            console.log("Successfully writtendata");
            
        })
        
    
}

fetchData();