const express = require('express'),
  path = require("path"),
  open = require('open'),
  app = express(),
  DIST_DIR = __dirname,
  HTML_FILE = path.join(DIST_DIR, 'index.html'),
  port = 7063;

app.use(express.static(DIST_DIR))

app.get('*', (req, res) => {
  res.sendFile(HTML_FILE)
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}/`);
  open(`http://localhost:${port}/`);
  console.log('Press Ctrl+C to quit.')
})