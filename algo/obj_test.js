/**
 * Not Ordered!
 *
 * Object Big O properties
 * Insert   O(1)
 * Remove   O(1)
 * Search   O(n)
 * Access   O(1)
 */

let instructor = {
    firstName: "Kelly",
    isInstructor: true,
    favoriteNumbers: [1, 2, 3, 4]
};
//console.log(instructor);

// O(n)
console.log(Object.keys(instructor));
console.log(Object.values(instructor));
console.log(Object.entries(instructor));

// O(1)
console.log(instructor.hasOwnProperty("firstName"));


