const bcrypt = require('bcryptjs');
const saltRounds = 10;

module.exports = {
    hashPw: (input) => {
        let hash = bcrypt.hashSync(input, saltRounds)
        return hash
    },
    comparePw: (input, hash) => {
        let compare = bcrypt.compareSync(input, hash)
        return compare
    }
}