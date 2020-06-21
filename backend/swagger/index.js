const user = require('./user');


let apis = { 
  ...user
};
let configurations = {
    "swagger": "2.0",
    "info": {
      "title": "Tazweed Api Documentation",
      "description": "",
      "version": "1.0"
    },
    produces: [
      "application/json"
    ],
    basePath: "/api/v1/",
    securityDefinitions: {
      "auth-token": {
        "type": "apiKey",
        "in": "header",
        "name": "Authorization"
      }
    },
    "security": [{
      "auth-token": []
    }],
    schemes:['http', 'https'],
    paths: apis
  };  
module.exports =  configurations;
  