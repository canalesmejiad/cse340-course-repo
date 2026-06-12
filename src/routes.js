import express from 'express';

import { showHomePage } from './controllers/index.js';

import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    showEditOrganizationForm,
    processNewOrganizationForm,
    processEditOrganizationForm,
    organizationValidation
} from './controllers/organizations.js';

import {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    showEditProjectForm,
    processNewProjectForm,
    processEditProjectForm,
    projectValidation,
    volunteerForProject,
    removeVolunteerFromProject
} from './controllers/projects.js';

import {
    showCategoriesPage,
    showCategoryDetailsPage,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    categoryValidation
} from './controllers/categories.js';

import { testErrorPage } from './controllers/errors.js';

import {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout,
    requireLogin,
    requireRole,
    showDashboard,
    showUsersPage
} from './controllers/users.js';

const router = express.Router();

router.get('/', showHomePage);

// Public organization routes
router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);

// Admin organization routes
router.get(
    '/new-organization',
    requireRole('admin'),
    showNewOrganizationForm
);

router.get(
    '/edit-organization/:id',
    requireRole('admin'),
    showEditOrganizationForm
);

router.post(
    '/new-organization',
    requireRole('admin'),
    organizationValidation,
    processNewOrganizationForm
);

router.post(
    '/edit-organization/:id',
    requireRole('admin'),
    organizationValidation,
    processEditOrganizationForm
);

// Public project routes
router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);

router.post(
    '/project/:id/volunteer',
    requireLogin,
    volunteerForProject
);

router.post(
    '/project/:id/remove-volunteer',
    requireLogin,
    removeVolunteerFromProject
);

// Admin project routes
router.get(
    '/new-project',
    requireRole('admin'),
    showNewProjectForm
);

router.get(
    '/edit-project/:id',
    requireRole('admin'),
    showEditProjectForm
);

router.post(
    '/new-project',
    requireRole('admin'),
    projectValidation,
    processNewProjectForm
);

router.post(
    '/edit-project/:id',
    requireRole('admin'),
    processEditProjectForm
);

// Public category routes
router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);

// Admin category routes
router.get(
    '/new-category',
    requireRole('admin'),
    showNewCategoryForm
);

router.get(
    '/edit-category/:id',
    requireRole('admin'),
    showEditCategoryForm
);

router.post(
    '/new-category',
    requireRole('admin'),
    categoryValidation,
    processNewCategoryForm
);

router.post(
    '/edit-category/:id',
    requireRole('admin'),
    categoryValidation,
    processEditCategoryForm
);

// Admin assign categories routes
router.get(
    '/project/:projectId/assign-categories',
    requireRole('admin'),
    showAssignCategoriesForm
);

router.post(
    '/project/:projectId/assign-categories',
    requireRole('admin'),
    processAssignCategoriesForm
);

// User registration routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);

// User login routes
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);

// Dashboard route
router.get(
    '/dashboard',
    requireLogin,
    showDashboard
);

// Users page route - admin only
router.get(
    '/users',
    requireRole('admin'),
    showUsersPage
);

router.get('/test-error', testErrorPage);

export default router;