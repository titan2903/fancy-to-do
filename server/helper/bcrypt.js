// const bcrypt = require('bcrypt');
// const saltRounds = 8

// const hashPassword = (password) => {

//     try {
//         const salt = bcrypt.genSaltSync(saltRounds);
//         const hash = bcrypt.hashSync(password, salt);
//         return hash
//     } catch (err) {
//         console.log(err)
//     }
// }

// const checkPassword = (password, hashedPassword) => {
//     try {
//         const valid = bcrypt.compareSync(password, hashedPassword);
//         return valid
//     } catch (error) {
//         console.log(error);
//     }
// }

// module.exports = {
//     hashedPassword
// };
