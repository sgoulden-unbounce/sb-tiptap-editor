const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8081;
const pkg = require('./package.json');

app.disable("x-powered-by");
app.use(cors());
app.use(express.static('dist'));

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

function startServer(port) {
  app
    .listen(port, () => console.log(`${pkg.description} Server listening on port: ${port}`))
    .on('error', (error) => {
      if (error.message.includes('listen EADDRINUSE: address already in use')) {
        startServer(port + 1);
      }
    });
}
startServer(PORT);
