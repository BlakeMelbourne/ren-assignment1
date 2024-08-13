const random = require('../random');

class Package {
    constructor(title, weight, destination, description, isAllocated, driver_id) {
        this.id = `P${random.getRandomLetters(2)}-NM-${random.getRandomDigits(3)}`,
        this.title = title,
        this.weight = weight,
        this.destination = destination,
        this.description = description,
        this.isAllocated = isAllocated,
        this.driver_id = driver_id,
        this.createdAt = Date.now()
    }
}

module.exports = Package;