function addUpTo(n) {
    let total = 0;
    for (let i = 1; i <= n; i++) {
        total += i;
    }
    return total;
}

let timeStart = performance.now();
addUpTo(1_000_000_000);
let timeEnd = performance.now();
console.log(`exe time: ${timeEnd - timeStart}`);
