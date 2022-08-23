const http = require("http");
const url = require("url");
const fs = require("fs");
const qs = require("qs");

const ErrorController = require("./controller/error-controller");
const HomeController = require("./controller/home-controller");
const EmployeeController = require("./controller/employee-controller");

let errorController = new ErrorController();
let homeController = new HomeController();
let employeeController = new EmployeeController();

const mimeTypes = {
  html: "text/html",
  js: "text/javascript",
  css: "text/css",
  "min.js": "text/javascript",
  "js.map": "text/javascript",
  "css.map": "text/css",
  "min.css": "text/css",
  jpg: "image/jpg",
  png: "image/png",
  gif: "image/gif",
  woff: "text/html",
  ttf: "text/html",
  woff2: "text/html",
  eot: "text/html",
};

let server = http.createServer((req, res) => {
  let path = url.parse(req.url);
  let pathUrl = path.pathname;
  let method = req.method;

  switch (pathUrl) {
    case "/": {
      homeController.showHomePage(req, res);
      break;
    }

    case "/employee": {
      employeeController.showEmployeeListPage(req, res);
      break;
    }

    case "/employee/create": {
      if (method === "GET") {
        employeeController.showEmployeeFormCreate(req, res);
      } else {
        employeeController.createEmployee(req, res);
      }
      break;
    }

    case "/employee/edit": {
      let query = qs.parse(path.query);
      let idUpdate = query.id;
      if (method === "GET") {
        employeeController.showEmployeeEditForm(req, res, idUpdate);
      } else {
        employeeController.editEmployee(req, res, idUpdate);
      }
      break;
    }

    case "/employee/delete": {
      let query = qs.parse(path.query);
      let idUpdate = query.id;
      if (method === "GET") {
        employeeController.deleteEmployee(req, res, idUpdate);
      } else {
        employeeController.showEmployeeListPage(req, res);
      }
      break;
    }

    default:
      const filesDefences = req.url.match(/\.js|\.css|\.png|\.jpg/);
      if (filesDefences) {
        const extension = mimeTypes[filesDefences[0].toString().split(".")[1]];
        res.writeHead(200, { "Content-Type": extension });
        fs.createReadStream(__dirname + "/" + req.url).pipe(res);
      } else {
        res.end();
      }

      // errorController.showError404Page(req,res);
      break;
  }
});

server.listen(8002, () => {
  console.log("Server is running http//:localhost:8002");
});
