const Connection = require("./connection");

class Employee {
  constructor() {
    this.connection = Connection.createConnection();
    this.connection.connect((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Connect success!");
      }
    });
  }

  getEmployees() {
    return new Promise((resolve, reject) => {
      this.connection.query(
        "SELECT * FROM employee_list ORDER BY department",
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  }

  createEmployee(employee) {
    let insertQuery = `insert into employee_list(name, age, salary, department)
                           VALUES ('${employee.name}', ${employee.age}, ${employee.salary},'${employee.department}')`;
    this.connection.query(insertQuery, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Insert success");
      }
    });
  }

  getEmployee(id) {
    return new Promise((resolve, reject) => {
      let query = `select * from employee_list where id = ${id}`;
      this.connection.query(query, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  updateEmployee(id, employee) {
    return new Promise((resolve, reject) => {
      let query = `update employee_list set name = '${employee.name}', age = ${employee.age}, salary = ${employee.salary},department = '${employee.department}'  where id = ${employee.id}`;
      this.connection.query(query, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }

  deleteEmployee(id) {
    return new Promise((resolve, reject) => {
      let query = `delete from employee_list where id = ${id}`;
      this.connection.query(query, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
          console.log("Delete success");
        }
      });
    });
  }
}

module.exports = Employee;
