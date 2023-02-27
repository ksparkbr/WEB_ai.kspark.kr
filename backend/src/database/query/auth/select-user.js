const executeQuery = require("../../execute-query");
const safeParam = require("../../safe-param");
const mysql = require('mysql')

module.exports = async (param) => {
    try {
        param = safeParam(param);
        let query = mysql.format(`select * from user where ?`, param)
        return await executeQuery(query);
    }
    catch (e) {
        return { err_msg: e.sqlMessage}
    }
}