const executeQuery = require("../../execute-query");
const safeParam = require("../../safe-param");
const mysql = require('mysql')

module.exports = async (param) => {
    try {
        param = safeParam(param);
        let query = mysql.format(`insert into user set ?`, param)
        console.log(query);
        return await executeQuery(query);
    }
    catch (e) {
        return { err_msg: e.sqlMessage}
    }
}