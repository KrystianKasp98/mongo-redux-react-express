// chyba zeby dobrze testowac nie powinienem miec wlaczonego serwera
const {app} = require("./app.js");
const port = 8000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
