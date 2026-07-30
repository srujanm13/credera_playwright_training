function findHighestMark(marks){
    if (marks.length === 0) {
        return "No marks provided";
    }
    return Math.max(...marks);
}
console.log(findHighestMark([75, 80, 65, 90, 88]));
console.log(findHighestMark([]));