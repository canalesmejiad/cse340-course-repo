import db from './db.js'

const getAllOrganizations = async () => {
    const query = `
        SELECT organization_id, name, description, contact_email, logo_filename
        FROM public.organization;
    `;

    const result = await db.query(query);

    return result.rows;
}
const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT
            project_id,
            organization_id,
            title,
            description,
            location,
            date
        FROM project
        WHERE organization_id = $1
        ORDER BY date;
    `;

    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

export { getAllProjects, getProjectsByOrganizationId };