var path = require('path');
var webpack = require('webpack');
var express = require('express');
var config = require('./webpack.config');
var app = express();
var compiler = webpack(config);
var cache = require('./data/data.json');

function getMatch(name, item) {
  return item.name.toLowerCase().match(name.toLowerCase()) !== null;
}

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/hello', function(req, res) {
  res.status(200).send({title: 'Hello from Player Search'});
});

app.get('/getBody/:name', function (req, res) {
    const name = req.params.name;
    res.status(200).send(cache.filter(getMatch.bind(undefined, name)));
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.listen(3000, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:3000/');
});
