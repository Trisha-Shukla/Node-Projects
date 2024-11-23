const {removeDuplicates,sum,average,max,sortDesc,median,filterEven,filterOdd,clear,min}=require("array-methods-by-trisha")
const arr = [1, 2, 2, 3, 3, 4, 4];

// Removing duplicates
console.log(removeDuplicates(arr)); // [1, 2, 3, 4]

// Getting the sum of the array
console.log(sum(arr)); // 19

// Getting the average of the array
console.log(average(arr)); // 2.14

// Getting the max value of the array
console.log(max(arr)); // 4

// Getting the min value of the array
console.log(min(arr)); // 1

// Sorting the array in descending order
console.log(sortDesc(arr)); // [4, 4, 3, 3, 2, 2, 1]

// Getting the median of the array
console.log(median(arr)); // 2.5

// Filtering out even numbers
console.log(filterEven(arr)); // [2, 2, 4, 4]

// Filtering out odd numbers
console.log(filterOdd(arr)); // [1, 3, 3, 1]

// Clearing the array
clear(arr);
console.log(arr); // []
