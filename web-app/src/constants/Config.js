let ENVIRONMENT = {
    REACT_APP_API_URL: process.env.REACT_APP_API_URL
};
if (process.env.REACT_APP_ENVIRONMENT) { ENVIRONMENT=process.env }

const APPCONFIG = {
    API_URL: 'http://localhost:3000/api/v1/',
};

module.exports = APPCONFIG;
