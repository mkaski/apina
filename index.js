#!/usr/bin/env
const axios = require('axios');
const express = require('express');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const stat = promisify(fs.stat);

const URLToFilename = url => url.replace(/[^a-z0-9]/gi, '_').toLowerCase();

const PORT = 5454;
const URL = process.argv.slice(2)[0];

const baseDir = path.join(__dirname, `apina_cache/`);
const server = express();

(async () => {
  const strippedUrl = URLToFilename(URL);
  let data;
  try {
    // If cache dir ain't exist, create it.
    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir);
    }
    // Read from cache.
    const file = await readFile(`${baseDir}${strippedUrl}`, 'utf8');
    data = file;
  } catch (err) {
    console.log('Local version not found. Saving in cache: ', err.path);
    try {
      // Fetch and save file if it doesn't exist.
      const response = await axios.get(URL, { responseType: 'arraybuffer' });
      data = response.data;
      await writeFile(`${baseDir}${strippedUrl}`, data, 'utf8');
    } catch (e) {
      console.log('Error saving file: ', e);
    }
  } finally {
    server.get('*', (req, res) => res.end(data));
    server.listen(PORT);
    console.log(`Apina mocking on port ${PORT}`);
  }
})();
