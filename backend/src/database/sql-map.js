const insertUser = require("./query/auth/insert-user");
const selectUser = require("./query/auth/select-user");

module.exports = {
    auth: {
        selectUser : (param) => selectUser(param),
        insertUser : param => insertUser(param),
    }
}