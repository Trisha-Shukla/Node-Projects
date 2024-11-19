
const fs=require("node:fs");
const readline=require("node:readline");
const greetUser=require("first_node_app_by_trisha")
greetUser("XYZ")

/*CRUD */
/*Read */

// fs.readFile("sample.txt",(err,data)=>{
//     if(err){
//         console.log("Error Reading File",err);
//         return;
        
//     }
//     console.log(data);
    
// })

/*Write */

// const str="Writing a demo file\nThis is new line"

// fs.writeFile("demo.txt",str,(err)=>{
//     if(err){
//         console.log("Error reading file",err);
//         return;
//     }
//     console.log("File Written Succesfully");
    
// })

/*Read & Write */

// const modifyFile=()=>{
//     try {
//         const data=fs.readFileSync("demo.txt",{encoding:'utf-8'});
//         // console.log(data);
//         const updatedData=data.replace("hi","hello")
//         console.log(updatedData);
//         fs.writeFile("demo.txt",updatedData,(err)=>{
//             if(err){
//                 console.log("Error writing file");
//                 return
//             }

//             console.log("File written succesfully");
            
//         })
        
        
        
//     } catch (error) {
//         console.log("Error reading file:",error);
        
//     }
// }

// modifyFile();

/*Update */
// const updateFile="\nhi"
// fs.appendFile("sample.txt",updateFile,(err)=>{
//     if(err){
//         console.log("Error updating",err);
//         return;
//     }
//     console.log("File Updated Succesfully");
    
// })

/*delete */

// fs.unlink("sample.txt",(err)=>{
//     if(err){
//         console.log("Error deleting file:",err);
        
//     }
//     console.log("File Deleted succesfully");
    
// })

//readline

// const rl=readline.createInterface({
//     input:process.stdin,
//     output:process.stdout
// })

// rl.question('what is your name ',(ans)=>{
//     console.log(`hello, ${ans}`);
//     rl.close();
    
// })

//useful
console.log('__dirname',__dirname);
console.log('__filename',__filename);

