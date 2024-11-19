const readline=require("node:readline");
const fs=require("node:fs")
const path=require("node:path")

const filePath=path.join(__dirname,"tasks.json");
console.log(filePath);

if(!fs.existsSync(filePath)){
    fs.writeFile(filePath,JSON.stringify([]),(err)=>{
        if(err){
            console.log("Error writing file",err);
            return;
        }
    })
}
const getTasks=()=>{
    const data=fs.readFileSync(filePath,{encoding:"utf-8"});
    return JSON.parse(data);
}
const saveTasks=(tasks)=>{
    fs.writeFileSync(filePath,JSON.stringify(tasks,null,2));
    
}


const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

const addTask=()=>{
    const tasks=getTasks();
    rl.question("Write the task you want to add: ",(task)=>{
        tasks.push({task,completed:false})
        saveTasks(tasks);
        console.log("Task Added Succesfully!!");
        main();
        
    })

}

const viewTask=()=>{
    const tasks=getTasks();
    console.log("\nTasks");
    
    if(tasks.length===0){
        console.log("No tasks added");
        
    }
    else{
        tasks.forEach((t,i)=>{
            console.log(`${i+1}. [${t.completed ? "✔": " "}] ${t.task}`);
            
        })

    }


}
const viewTasks=()=>{
    const tasks=getTasks();
    console.log("\nTasks");
    
    if(tasks.length===0){
        console.log("No tasks added");
        
    }
    else{
        tasks.forEach((t,i)=>{
            console.log(`${i+1}. [${t.completed ? "✔": " "}] ${t.task}`);
            
        })

    }
    main();


}

const markTask=()=>{
    const tasks = getTasks();  
    viewTask();
    rl.question("Choose task to be marked as completed: ",(num)=>{
        const tasknum=parseInt(num)-1;
        if(tasks[tasknum]){

            tasks[tasknum].completed=true;
            saveTasks(tasks);
            console.log("Task Marked as completed");
            
        }
        else{
            console.log("Enter invalid num");
            
        }
        main();
    })
    
}
const removeTask=()=>{
    const tasks = getTasks();  
    viewTask();
    rl.question("Choose task to be removed: ",(num)=>{
        const tasknum=parseInt(num)-1;
        if(tasks[tasknum]){

            tasks.splice(tasknum,1);
            saveTasks(tasks);
            console.log("Task removed");
            
        }
        else{
            console.log("Enter invalid num");
            
        }
        main();
    })
    
}

const showMenu=()=>{
    console.log(`Task Manager:
1. Add a new task
2. View tasks
3. Mark a task as complete
4. Remove a task
5. Exit`);
    
}

const main=()=>{
    showMenu();
    rl.question("Choose an option ",(option)=>{

        switch (option) {
            case '1':
                addTask();
                break;
            case '2':
                viewTasks();
                break;
            case '3':
                markTask();
                break;
            case '4':
                removeTask();
                break;
            case '5':
                console.log("GoodBye!!");
                
                rl.close();
                break;
        
            default:
                console.log("Invalid option. Please try again.");
                break;
        }
    })
}

main();