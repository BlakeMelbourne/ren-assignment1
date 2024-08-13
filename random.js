module.exports = {
    getRandomDigits: (length) => {
        const digits = [...'0123456789'];
        let result = '';
        for (let i = 0; i < length; i++) {
            result += digits[Math.floor(Math.random()*10)];
        }
        return result;
    },

    getRandomLetters: (length) => {
        const letters = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
        let result = '';
        for (let i = 0; i < length; i++) {
            result += letters[Math.floor(Math.random()*26)];
        }
        return result;
    } 
}