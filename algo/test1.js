let t1, t2;
const loopCount = 10_000;
const args = ["foo", "bar", "baz", "car", "cat", "dog", "eel"];

// Time echoFor
t1 = performance.now();
for (let i = 0; i < loopCount; i++) {
    echoFor(args);
}
t2 = performance.now();
console.log("echoFor: ", t2-t1);

// Time echoJoin
t1 = performance.now();
for (let i = 0; i < loopCount; i++) {
    echoJoin(args);
}
t2 = performance.now();
console.log("echoJoin: ", t2-t1);

function echoFor(args) {
    let s = "";
    let sep = "";
    for (let i = 0; i < args.length; i++) {
        s += sep + args[i];
        sep = " "
    }
    //console.log(s);
}

function echoJoin(args) {
    let s = args.join(" ");
    //console.log(s);
}