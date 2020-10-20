function same(i1, i2) {
    // 1. False if length doesn't match
    if (i1.length !== i2.length) {
        return false;
    }

    for (let i of i1) {
        let squared = i * i;
        let index = i2.indexOf(squared);
        
        // 2. Break if not found in i2
        if (index == -1) {
            return false;
        }

        // Did Find
        // 3. Remove the value from i2
        i2.splice(index, 1)                
    }
    // 4. Passed through all checks
    // so must be true
    return true;
}

console.log(true, same([1, 2, 3], [4, 1, 9]));
console.log(false, same([1, 2, 3], [1, 9]));
console.log(false, same([1, 2, 1], [4, 4, 1]));
console.log(true, same([1, 2, 1], [1, 4, 1]));
console.log(true, same([1, 2, 1], [4, 1, 1]));
console.log(true, same([1, 2, 3, 2], [9, 1, 4, 4]));