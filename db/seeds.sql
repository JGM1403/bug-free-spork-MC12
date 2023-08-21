INSERT INTO department(department_name)
VALUES  ("Sales"), 
        ("Marketing"), 
        ("Financial"), 
        ("Engineering"), 
        ("Human Resources"),
        ("Training");

INSERT INTO role(title, salary, department_id)
VALUES  ("Business Sales", 85000, 1), 
        ("Consumer Sales", 65000, 1), 
        ("Business Marketing", 110000, 2),
        ("Consumer Marketing", 100000, 2),  
        ("Tax Specialist", 90000, 3),
        ("Book Keeper", 80000, 3),
        ("Product Engineer", 90000, 4),
        ("Employee HR Specialist", 70000, 5),
        ("Customer HR Specialist", 65000, 5),
        ("Product Trainer", 60000, 6),
        ("Sales Trainer", 65000, 6);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES  ('Thomas', 'Bumgardner', 1, null), 
        ('David', 'Smith', 2, 1), 
        ('John', 'Doe', 3, null), 
        ('Amanda', 'Turner', 4, 2), 
        ('John', 'Ramsey', 5, null),
        ('Carter', 'Webb', 6, 3), 
        ('Frank', 'Pierce', 7, null), 
        ('Andrew', 'Clay', 8, null), 
        ('Victoria', 'Jennings', 9, 5), 
        ('Katherine', 'Avery', 10, null),
        ('Michael', 'Franklin', 11, 6);