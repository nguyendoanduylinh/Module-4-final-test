const mysql = require("mysql2");

class Connection {
  static createConnection() {
    let connect = {
      host: "localhost",
      user: "root",
      password: "123456",
      database: "employee",
    };
    return mysql.createConnection(connect);
  }
}
module.exports = Connection;
