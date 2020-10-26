# fun-with-js
Experiments, code snippets, apps and overall fun with JavaScript.

## List of methods & vars
- DOMHighResTimeStamp                   // type double in milliseconds
- length                                // length of array or string
  - "hello".length;                     // => 5
  - [1, 2, 3, 4, 5].length;             // => 5
- performance.now();                    // returns DOMHighResTimeStamp
- sort                                  // sorts by value as string
  - ['a', 'c', 'b'].sort();             // => ["a", "b", "c"]
  - [10, 2, 1].sort()                   // => [1, 10, 2]
  - [10, 2, 1].sort((a, b) => a - b);   // => [1, 2, 10]
  - [10, 2, 1].sort((a, b) => b - a);   // => [10, 2, 1]

## Type comparison

JavaScript | GraphQL
---------- | -------
-          | ID
String     | String
Numbers    | Int, Float
Boolean    | Boolean
null       | -
undefined  | -

