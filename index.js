const express = require("express");
const app = express();

require("./startup/db")();
require("./startup/routes")(app);
require("./startup/prod")(app);
require("./startup/config");


const port = process.env.PORT || 5001;

app.listen(port, () => {
    console.log(`Server is running in port ${port}`);
});