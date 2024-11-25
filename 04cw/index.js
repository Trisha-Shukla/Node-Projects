const fs=require("node:fs");
const axios=require("axios");
const cheerio=require("cheerio")
const xlsx = require("xlsx");

const scrapData=()=>{
    const data=fs.readFileSync("amazonData.txt",{encoding:"utf-8"})
    // console.log(data);
    const $=cheerio.load(data);
    const productData=[];

        const titles=$(".a-size-medium.a-color-base.a-text-normal");
        // console.log(titles);
        titles.each((index,element)=>{
            const title=$(element).text();
            productData.push({ title: title }); // Properly push the title as an object
            productData[index]["inStock"]="In stock"
            // console.log(title);
            
        })
        const prices=$(".a-price-whole");
        // console.log(titles);
        prices.each((index,element)=>{
            const price=$(element).text();
            // console.log(price);
            if (productData[index]) {
                productData[index]["price"] = price;
              }
            
            
        })

        const ratings=$(".a-icon-alt");
        ratings.each((index,element)=>{
            const ratingText = $(element).text().trim();
  const rating = ratingText.match(/[\d.]+/); // Extracts the numeric part (e.g., 4.0)
//   console.log(rating[0]);
  
  if (rating && productData[index]) {
    productData[index]["rating"] = rating[0]; // Add only the numeric part
  }
        })
        // console.log(productData);
        fs.writeFile("product.json",JSON.stringify(productData),(err)=>{
            if(err){
                console.log("Error writingdata ",err);
                return;
            }

            console.log("Successfully writtendata");
            
        })

        // writing in excel
        
  const workbook = xlsx.utils.book_new();
  const sheet = xlsx.utils.json_to_sheet(productData);
  xlsx.utils.book_append_sheet(workbook, sheet, "Products");
  xlsx.writeFile(workbook,"Products.xlsx");
  
  console.log("Data saved in excel successfully");
        
}

scrapData();