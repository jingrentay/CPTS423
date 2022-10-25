
// eslint-disable-next-line
export default (projects = [], action) => {
    switch (action.type) {
        case 'GET_ALL_PROJECTS':
            return action.payload;
        case 'CREATE_PROJECT':
            return [...projects, action.payload];
        default:
            return projects;
    }
};