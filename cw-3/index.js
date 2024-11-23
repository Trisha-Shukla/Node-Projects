const binarySearch=(arr,target)=>{
    let i=0,j=arr.length-1;

    while(i<=j){
        let m=Math.floor((i+j)/2);
        if(arr[m]===target){
            return m;
        }
        else if(arr[m]>target){
            j=m-1;
        }
        else{
            i=m+1;
        }

    }

    return -1;

}
const binarySearchMethod=(arr,target)=>{
    
    const result=binarySearch(arr,target);
    if(result !== -1){
        console.log(`Element found at index ${result}`);

    }
    else{
        console.log(`Element not found `);
    }

}

module.exports=binarySearchMethod;