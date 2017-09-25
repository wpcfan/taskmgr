require('zone.js/dist/zone-node');
require('reflect-metadata');

const express = require('express');
const fs = require('fs');

const { platformServer, renderModuleFactory } = require('@angular/platform-server');
const { ngExpressEngine } = require('@nguniversal/express-engine');
// Import module map for lazy loading
const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');
// Import the AOT compiled factory for your AppServerModule.
// This import will change with the hash of your built server bundle.		  // This import will change with the hash of your built server bundle
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require(`./dist-server/main.bundle`);

const app = express();
const port = Number(process.env.PORT || 8080);
const baseUrl = `http://localhost:${port}`;

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));


app.set('view engine', 'html');
app.set('views', './dist');
app.use('/', express.static('./dist', {index: false}));

app.get('/*', function (req, res) {
  res.render('index', {
    req: req,
    res: res
  });
});

app.listen(port, function() {
  console.log(`Listening at ${baseUrl}`);
});
