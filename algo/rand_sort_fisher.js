// Fisher Yates shuffle, 1938
function randomSortFisher(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * i);
        let valCurrent = arr[i];
        arr[i] = arr[j];
        arr[j] = valCurrent;
    }
    return arr;
}

console.log(randomSortFisher([23, 10, 4, 72, 9, 52, 108]));