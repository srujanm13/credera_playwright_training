// 8. Rest Parameters
// Write a function that accepts any number of marks and returns the highest mark. 


const highestMarks = (...marks) => {
    if (marks.length === 0) return undefined;
    return Math.max(...marks);
};
console.log(highestMarks(15, 445, 2,8, 130, 744)); // 744
