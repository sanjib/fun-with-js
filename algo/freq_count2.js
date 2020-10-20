function same(i1, i2) {
    if (i1.length !== i2.length) {
        return false;
    }

    i2_obj = {};
    for (let i of i2) {
        if (i2_obj[i]) {
            i2_obj[i]++;
        } else {
            i2_obj[i] = 1;    
        }    
    }

    for (let i of i1) {
        i = i * i;
        
        if (!i2_obj[i] || i2_obj[i] == 0) {
            return false;
        }
        i2_obj[i]--;
    }
    
    return true;
}

console.log('[1, 2, 3], [4, 1, 9]: true', same([1, 2, 3], [4, 1, 9]));
console.log('[1, 2, 3], [1, 9]: false', same([1, 2, 3], [1, 9]));
console.log('[1, 2, 1], [4, 4, 1]: false', same([1, 2, 1], [4, 4, 1]));
console.log('[1, 2, 1], [1, 4, 1]: true', same([1, 2, 1], [1, 4, 1]));
console.log('[1, 2, 1], [4, 1, 1]: true', same([1, 2, 1], [4, 1, 1]));
console.log('[1, 2, 3, 2], [9, 1, 4, 4]: true', same([1, 2, 3, 2], [9, 1, 4, 4]));