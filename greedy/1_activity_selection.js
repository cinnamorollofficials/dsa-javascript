function maxActivities(intervals){
    intervals.sort((a, b)=> a[1] - b[1])

    let count = 1;
    let lastEnd = intervals[0][1];

    for(let i=1;i<intervals.length;i++){
        if(intervals[i][0] >= lastEnd){
            count++;
            lastEnd = intervals[i][1];
        }
    }

    return count;
}

console.log(maxActivities([[1, 3], [2, 4], [3, 5], [0, 6], [8, 9], [5, 7]])); // 4