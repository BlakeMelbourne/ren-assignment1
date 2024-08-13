const Driver = require('./models/driver');
const Package = require('./models/package');

let drivers = [
    new Driver('Amy Adams','food','red',true),
    new Driver('Bill Burr','furniture','white',true),
    new Driver('Dale Dickey','electronic','green',true)
];

let packages = [
    new Package('Cow', 900, 'Warrnambool', 'Black Angus', true, drivers[0].id),
    new Package('Couch', 900, 'Melbourne', 'Black Sofa', true, drivers[1].id),
    new Package('Kettle', 900, 'Clayton', 'Black Retro', true, drivers[2].id)
];

const HANDLER_PREFIX = '/nahren/32507801';

module.exports = {
    listAllDrivers: (req, res) => {
        if (res) {
            res.render('driverindex.html', {drivers});
        }
    },

    listAllDriversByDepartment: (req, res) => {
        if (res) {
            let departments = ['food','furniture','electronic'];
            if (departments.includes(req.params.department)) {
                let results = drivers.filter(d => d.department === req.params.department);
                res.render('driverindex.html', {drivers: results});
                return;
            }
            res.redirect(HANDLER_PREFIX + '/invaliddata');
        }
    },

    addDriverForm: (req, res) => {
        if (res) {
            res.render('driveradd.html');
        }
    },

    deleteDriverForm: (req, res) => {
        if (res) {
            res.render('driverdelete.html', {drivers});
        }
    },

    addDriver: (req, res) => {
        if (res) {
            let driver = new Driver(req.body.name, req.body.department, req.body.license, req.body.isActive);
            drivers.push(driver);
            res.redirect(HANDLER_PREFIX + '/drivers');
        }
    },

    deleteDriver: (req, res) => {
        if (res) {
            let id = req.params.id ?? req.body.id ?? '';
            let index = drivers.findIndex(d => d.id === id);
            if (index > -1) {
                packages.map(p => {
                    if (p.driver_id === id) {
                        console.log(p);
                        p.driver_id = '';
                        p.isAllocated = false;
                    }
                    return;
                })
                drivers.splice(index, 1);
                res.redirect(HANDLER_PREFIX + '/drivers');
                return;
            }
            res.redirect(HANDLER_PREFIX + '/invaliddata');
        }
    },

    listAllPackages: (req, res) => {
        if (res) {
            res.render('packageindex.html', {packages});
        }
    },

    addPackageForm: (req, res) => {
        if (res) {
            res.render('packageadd.html', {drivers});
        }
    },

    deletePackageForm: (req, res) => {
        if (res) {
            res.render('packagedelete.html', {packages});
        }
    },

    addPackage: (req, res) => {
        if (res) {
            let query = req.body;
            query.isAllocated = false;
            if (query.driver_id && drivers.some(d => d.id === query.driver_id)) {
                query.isAllocated = true;
            }
            let package = new Package(query.title, query.weight, query.destination, query.description, query.isAllocated, query.driver_id);
            packages.push(package);
            res.redirect(HANDLER_PREFIX + '/packages');
        }
    },

    deletePackage: (req, res) => {
        if (res) {
            let id = req.params.id ?? req.body.id ?? '';
            let index = packages.findIndex(p => p.id === id);
            if (index > -1) {
                packages.splice(index, 1);
                res.redirect(HANDLER_PREFIX + '/packages');
                return;
            }
            res.redirect(HANDLER_PREFIX + '/invaliddata');
        }
    },

    //NOT REQUIRED
    updateDriverForm: (req, res) => {
        if (res) {
            let id = req.params.id;
            let index = drivers.findIndex(d => d.id === id);
            if (index > -1) {
                res.render('driverupdate.html', { driver: drivers[index] });
                return;
            }
            res.redirect(HANDLER_PREFIX + '/invaliddata');
        }
    },

    updatePackageForm: (req, res) => {
        if (res) {
            let id = req.params.id;
            let index = packages.findIndex(p => p.id === id);
            if (index > -1) {
                res.render('packageupdate.html', { package: packages[index], drivers });
                return;
            }
            res.redirect(HANDLER_PREFIX + '/invaliddata');
        }
    },

    updateDriver: (req, res) => {
        if (res) {
            let driver = req.body;
            let index = drivers.findIndex(d => d.id === driver.id);
            if (index > -1) {
                drivers[index] = driver;
                res.redirect(HANDLER_PREFIX + '/drivers');
                return;
            }
            res.redirect(HANDLER_PREFIX + '/invaliddata');
        }
    },

    updatePackage: (req, res) => {
        if (res) {
            let package = req.body;
            let index = packages.findIndex(p => p.id === package.id);
            if (index > -1) {
                packages[index] = package;
                res.redirect(HANDLER_PREFIX + '/packages');
                return;
            }
            res.redirect(HANDLER_PREFIX + '/invaliddata');
        }
    }
}