const Employee = require("../model/employee");
const fs = require("fs");
const qs = require("qs");

class EmployeeController {
  constructor() {
    this.employee = new Employee();
  }

  showEmployeeListPage(req, res) {
    fs.readFile("views/employee/list.html", "utf-8", async (err, data) => {
      if (err) {
        console.log("File NotFound!");
      } else {
        let employees = await this.employee.getEmployees();
        let tbody = "";
        for (let index = 0; index < employees.length; index++) {
          tbody += `<tr>
                                            <td>HR${employees[index].id}</td>
                                            <td>${employees[index].name}</td>
                                            <td>${employees[index].age}</td>
                                            <td>${employees[index].salary}</td>
                                            <td>${employees[index].department}</td>
                                            <td>
                                                <a href="/employee/edit?id=${employees[index].id}" class="action-icon btn btn-primary text-white"> EDIT </a>
                                                <a href="/employee/delete?id=${employees[index].id}" class="action-icon btn btn-danger text-white"> DELETE </a>
                                            </td>
                                        </tr>`;
        }
        data = data.replace("{employee}", tbody);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      }
    });
  }

  showEmployeeFormCreate(req, res) {
    fs.readFile("views/employee/create.html", "utf-8", (err, data) => {
      if (err) {
        console.log("File NotFound!");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      }
    });
  }

  createEmployee(req, res) {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      let employee = qs.parse(data);
      this.employee.createEmployee(employee);
      res.writeHead(301, {
        location: "/employee",
      });
      return res.end();
    });
  }

  showEmployeeEditForm(req, res, idUpdate) {
    fs.readFile("views/employee/edit.html", "utf-8", async (err, data) => {
      if (err) {
        console.log("File NotFound!");
      } else {
        let employee = await this.employee.getEmployee(idUpdate);
        if (employee.length > 0) {
          data = data.replace("{id}", employee[0].id);
          data = data.replace("{name}", employee[0].name);
          data = data.replace("{age}", employee[0].age);
          data = data.replace("{salary}", employee[0].salary);
          data = data.replace("{department}", employee[0].population);
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      }
    });
  }

  editEmployee(req, res, id) {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      let employee = qs.parse(data);
      this.employee.updateEmployee(id, employee).then(() => {
        res.writeHead(301, {
          location: "/employee",
        });
        return res.end();
      });
    });
  }

  deleteEmployee(req, res, id) {
    this.employee.deleteEmployee(id).then(() => {
      res.writeHead(301, {
        location: "/employee",
      });
      return res.end();
    });
  }
}

module.exports = EmployeeController;
