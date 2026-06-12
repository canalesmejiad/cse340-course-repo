DROP TABLE IF EXISTS project_volunteer;
DROP TABLE IF EXISTS project_category;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS project;
DROP TABLE IF EXISTS organization;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;

CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    role_description TEXT
);

INSERT INTO roles (role_name, role_description)
VALUES
('user', 'Standard user with basic access'),
('admin', 'Administrator with full system access');

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role_id INTEGER REFERENCES roles(role_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

INSERT INTO organization
(name, description, contact_email, logo_filename)
VALUES
(
    'BrightFuture Builders',
    'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
    'info@brightfuturebuilders.org',
    'brightfuture-logo.png'
),
(
    'GreenHarvest Growers',
    'An urban farming collective promoting food sustainability and education in local neighborhoods.',
    'contact@greenharvest.org',
    'greenharvest-logo.png'
),
(
    'UnityServe Volunteers',
    'A volunteer coordination group supporting local charities and service initiatives.',
    'hello@unityserve.org',
    'unityserve-logo.png'
);

CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(150) NOT NULL,
    date DATE NOT NULL,

    CONSTRAINT fk_project_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
        ON DELETE CASCADE
);

INSERT INTO project
(organization_id, title, description, location, date)
VALUES
(1, 'Community Playground Build', 'Build a new playground for local families.', 'Portland, Oregon', '2026-06-15'),
(1, 'Neighborhood Cleanup', 'Clean streets and public areas in the community.', 'Salem, Oregon', '2026-07-10'),
(1, 'Senior Home Repairs', 'Repair homes for senior citizens.', 'Eugene, Oregon', '2026-08-05'),
(1, 'School Renovation', 'Renovate classrooms in an elementary school.', 'Gresham, Oregon', '2026-09-12'),
(1, 'Park Improvement Project', 'Improve trails and picnic areas at the city park.', 'Hillsboro, Oregon', '2026-10-20'),

(2, 'Urban Garden Project', 'Create community food gardens.', 'Seattle, Washington', '2026-06-18'),
(2, 'Food Sustainability Workshop', 'Teach sustainable farming techniques.', 'Tacoma, Washington', '2026-07-22'),
(2, 'Tree Planting Event', 'Plant trees in urban neighborhoods.', 'Spokane, Washington', '2026-08-14'),
(2, 'Farmers Market Support', 'Help organize local farmers markets.', 'Vancouver, Washington', '2026-09-09'),
(2, 'Community Compost Program', 'Build compost stations for neighborhoods.', 'Olympia, Washington', '2026-10-30'),

(3, 'Homeless Shelter Support', 'Provide meals and supplies to shelters.', 'Boise, Idaho', '2026-06-25'),
(3, 'Youth Mentoring Program', 'Mentor teens in after-school programs.', 'Nampa, Idaho', '2026-07-17'),
(3, 'Charity Fundraiser', 'Organize fundraising events for families in need.', 'Meridian, Idaho', '2026-08-11'),
(3, 'Volunteer Training Day', 'Train new volunteers for service projects.', 'Idaho Falls, Idaho', '2026-09-16'),
(3, 'Community Health Fair', 'Host free health screenings and wellness education.', 'Pocatello, Idaho', '2026-10-28');

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

INSERT INTO category (name)
VALUES
('Construction'),
('Environment'),
('Community Service'),
('Education'),
('Health');

CREATE TABLE project_category (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,

    PRIMARY KEY (project_id, category_id),

    CONSTRAINT fk_project_category_project
        FOREIGN KEY (project_id)
        REFERENCES project(project_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_project_category_category
        FOREIGN KEY (category_id)
        REFERENCES category(category_id)
        ON DELETE CASCADE
);

INSERT INTO project_category (project_id, category_id)
VALUES
(1, 1),
(2, 3),
(3, 1),
(4, 4),
(5, 2),
(6, 2),
(7, 4),
(8, 2),
(9, 3),
(10, 2),
(11, 3),
(12, 4),
(13, 3),
(14, 4),
(15, 5);

CREATE TABLE project_volunteer (
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    project_id INTEGER NOT NULL REFERENCES project(project_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, project_id)
);

SELECT * FROM roles;
SELECT * FROM organization;
SELECT * FROM project;
SELECT * FROM category;
SELECT * FROM project_category;
SELECT * FROM project_volunteer;

Email: test@example.com
Password: password123

Name: David
Email: david@test.com
Password: Password123