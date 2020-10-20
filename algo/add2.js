function addUpTo(n) {
    return n * (n + 1) / 2;
}

let timeStart = performance.now();
addUpTo(1_000_000_000);
let timeEnd = performance.now();
console.log(`exe time: ${timeEnd - timeStart}`);
