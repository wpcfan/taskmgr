const path = require('path');
const fs = require('fs');
const express = require('express');
const compression = require('compression');
const ngExpressEngine = require('@nguniversal/express-engine').ngExpressEngine;

require('zone.js/dist/zone-node');
require('reflect-metadata');
require('rxjs/Rx');

let hash;
fs.readdirSync(__dirname+'/../dist').forEach(file => {
  if (file.startsWith('main')) {
    hash = file.split('.')[1];
  }
});

// Load zone.js for the server.

// Import renderModuleFactory from @angular/platform-server.
const renderModuleFactory = require('@angular/platform-server').renderModuleFactory;

// Import the AOT compiled factory for your AppServerModule.
// This import will change with the hash of your built server bundle.
const AppServerModuleNgFactory = require('../dist/main.' + hash + '.bundle').AppServerModuleNgFactory;

// Load the index.html file.
const index = require('fs').readFileSync('./src/index.html', 'utf8');

// Render to HTML and log it to the console.
renderModuleFactory(AppServerModuleNgFactory, {document: index, url: '/'}).then(html => console.log(html));
//
// const app = express();
// const port = Number(process.env.PORT || 8080);
//
// app.engine('html', ngExpressEngine({
//   baseUrl: 'http://localhost:' + port,
//   bootstrap: AppServerModuleNgFactory
// }));
//
//
// app.set('view engine', 'html');
// app.set('views', path.join(__dirname, '/../browser'));
//
// app.use(compression());
// app.use('/', express.static(path.join(__dirname, '/../browser'), {index: false}));
//
//
// app.get('/*', function (req, res) {
//   res.render('index', {
//     req: req,
//     // res: res
//   });
// });
//
// app.listen(port, function() {
//   console.log(`Listening at ${port}`);
// });
