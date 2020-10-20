// Takes input string and returns a map[string]int where 
// string is the character and int is the count.
// Ignores spaces, punctuations.
function charCount(input) {
    let output = {};

    // 1. loop
    for (let i = 0; i < input.length; i++) {
        // 2. lowercase
        let c = input[i].toLowerCase();

        // 3. if c is not special char, then proceed
        if (!c.match(/[\s\*\.,\///\-_\+=\$\^!]/)) {

            // 4. increment count
            if (output[c]) {
                output[c]++;
            } else {
                output[c] = 1;
            }
        }
    }
    return output;
}

console.log(charCount("hell *** $ xxx .. o"));
console.log(charCount("Hi, there!"));
console.log(charCount("Hö, Öäéë"));

