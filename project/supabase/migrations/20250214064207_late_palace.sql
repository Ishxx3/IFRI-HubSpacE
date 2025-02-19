/*
  # Add new test student data

  1. New Data
    - Add a test student with a new matricule "20240315"
    - Add basic student information for testing
*/

INSERT INTO students (matricule, first_name, last_name, email, phone, program, year, parent_name, parent_phone)
VALUES (
  '20240315',
  'Jane',
  'Smith',
  'jane.smith@example.com',
  '+229 97000001',
  'Génie Logiciel',
  1,
  'Parent Smith',
  '+229 97111112'
);