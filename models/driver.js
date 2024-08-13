const random = require('../random');

class Driver {
    constructor(name, department, license, active) {
        this.id = `D${random.getRandomDigits(2)}-32-${random.getRandomLetters(3)}`,
        this.name = name,
        this.department = department,
        this.license = license,
        this.isActive = active,
        this.createdAt = Date.now()
    }
}

module.exports = Driver;