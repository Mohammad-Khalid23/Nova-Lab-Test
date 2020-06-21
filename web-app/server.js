// ------------ EXPRESS -------------
const path = require("path");
const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 80));
//app.set('env', (process.env.NODE_ENV || "local"));
app.set('env', ("production"));

// * For Load Environment Variables
require('dotenv').config();

console.log("Enviournment Variables", process.env.REACT_APP_ENVIRONMENT);

if (app.get('env') === 'production') {

    // the relative path from src/server/server.js
    
    
    const staticRoot = path.resolve(__dirname, './dist');
    app.use(express.static(staticRoot));
    app.get('*', function (req, res) {
        res.sendFile('index.html', { root: staticRoot });
    });
}

app.listen(app.get('port'), function () {
    console.log('Magic Happen', app.get('port'));
});