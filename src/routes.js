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
    processNewProjectForm,
    projectValidation
} from './controllers/projects.js';

import {
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm
} from './controllers/categories.js';

import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

router.get('/', showHomePage);

router.get('/organizations', showOrganizationsPage);

router.get('/organization/:id', showOrganizationDetailsPage);

// Route for new organization page
router.get('/new-organization', showNewOrganizationForm);

// Route to display the edit organization form
router.get('/edit-organization/:id', showEditOrganizationForm);

// Routes to handle the assign categories to project form
router.get('/project/:projectId/assign-categories', showAssignCategoriesForm);

router.post('/project/:projectId/assign-categories', processAssignCategoriesForm);

// Route to handle new organization form submission
router.post(
    '/new-organization',
    organizationValidation,
    processNewOrganizationForm
);

router.post(
    '/edit-organization/:id',
    organizationValidation,
    processEditOrganizationForm
);

router.get('/projects', showProjectsPage);

router.get('/project/:id', showProjectDetailsPage);

// Route for new project page
router.get('/new-project', showNewProjectForm);

router.post(
    '/new-project',
    projectValidation,
    processNewProjectForm
);

router.get('/categories', showCategoriesPage);

router.get('/category/:id', showCategoryDetailsPage);

// Error-handling route
router.get('/test-error', testErrorPage);

export default router;