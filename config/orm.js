const connection = require("../config/connection.js");

//push ? to arr, then returns each ? to a string of ?
let printQuestionMarks = num => {
    let arr = [];
    for (let i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
let objToSql = ob => {
    let arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (let key in ob) {
        let value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }

            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}

let orm = {
    selectAll: function(tableInput, cb) {
        let query = `SELECT * FROM ${tableInput};`;
        connection.query(query, (err, res) => {
            if (err) throw err;
            cb(res);
        });
    },
    insertOne: function(table, cols, vals, cb) {
        let query = `INSERT INTO ${table} (${cols.toString()}) `;
        query += `VALUES (${printQuestionMarks(vals.length)});`
        console.log(query);
        connection.query(query, vals, (err, res) => {
            if (err) throw err;
            cb(res);
        });
    },
    updateOne: function(table, objColVals, condition, cb) {
        let query = `UPDATE ${table} SET ${objToSql(objColVals)} `;
        query += `WHERE ${condition};`;
        console.log(query);
        connection.query(query, (err, res) => {
            if (err) throw err;
            cb(res);
        });
    }
}


module.exports = orm;