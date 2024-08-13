//CREATE EXPRESS APP
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//USE PUBLIC DIRECTORIES
app.use(express.static('images'));

//SETUP PORT
const PORT = 8080;
app.listen(PORT);

const HANDLER_PREFIX = '/nahren/32507801';

//IMPORT ROUTER
const router = require('./router');

//APP ROUTES
app.get('/', (req, res) => { if (res) res.render('index.html')});

app.get(HANDLER_PREFIX + '/drivers', router.listAllDrivers);

app.get(HANDLER_PREFIX + '/drivers/:department', router.listAllDriversByDepartment);

app.get(HANDLER_PREFIX + '/adddriver', router.addDriverForm);

app.get(HANDLER_PREFIX + '/deletedriver', router.deleteDriverForm);

app.post(HANDLER_PREFIX + '/adddriver', router.addDriver);

app.post(HANDLER_PREFIX + '/deletedriver', router.deleteDriver);

app.get(HANDLER_PREFIX + '/deldriver/:id', router.deleteDriver);

app.get(HANDLER_PREFIX + '/packages', router.listAllPackages);

app.get(HANDLER_PREFIX + '/addpackage', router.addPackageForm);

app.get(HANDLER_PREFIX + '/deletepackage', router.deletePackageForm);

app.post(HANDLER_PREFIX + '/addpackage', router.addPackage);

app.post(HANDLER_PREFIX + '/deletepackage', router.deletePackage);

app.get(HANDLER_PREFIX + '/delpackage/:id', router.deletePackage);

app.get(HANDLER_PREFIX + '/invaliddata', (req, res) => { if (res) res.status(400).render('invaliddata.html')});

app.get(HANDLER_PREFIX + '/updatedriver/:id', router.updateDriverForm);

app.get(HANDLER_PREFIX + '/updatepackage/:id', router.updatePackageForm);

app.post(HANDLER_PREFIX + '/updatedriver', router.updateDriver);

app.post(HANDLER_PREFIX + '/updatepackage', router.updatePackage);

app.get('*', (req, res) => { if (res) res.status(404).render('error404.html')});
