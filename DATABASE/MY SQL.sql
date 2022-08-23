create table employee_list (
id int auto_increment primary key,
name varchar(50),
age int,
salary int,
department varchar(500)
);

insert into Employee_list (name, age, salary, department)
values 	("Nguyen Van Long", 30, 1000, "Security"),
		("Nguyen Van Linh", 30, 2000, "Marketing"),
		("Nguyen Duc Anh", 27, 3000, "Human-Resource"),
        ("Nguyen Thi Son", 27, 4000, "Accounting"),
        ("Nguyen Duy Anh", 24, 5000, "Marketing"),
        ("Le Van Luyen", 30, 1000, "Security"),
		("Le Thi Xoai", 30, 2000, "Marketing"),
		("Hoang Van Hai", 27, 3000, "Human-Resource"),
        ("Dinh Cong Phuong", 27, 4000, "Accounting"),
        ("Michael Jackson", 24, 5000, "Marketing");