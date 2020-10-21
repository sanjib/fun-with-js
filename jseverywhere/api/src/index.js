const express = require('express');
const app = express();
const port = process.env.PORT || 4010;

app.get('/', (req, res) => res.send('Hello, World from Oak Notes API!!!'));
app.listen(port, () => console.log(`Listening on port ${port}...`));
