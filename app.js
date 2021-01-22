const express = require("express");
const morgan = require('morgan');
const app = express();
const playApps = require('./playApps')


app.use(morgan('dev'));

app.get('/apps', (req, res) => {
   const { search = "", sort } = req.query;
   if (sort) {
     if (!["Rating", "App"].includes(sort)) {
       return res.status(400).send("Sort must be either rating or app");
     }
   }
    let results = playApps.filter((playApp) =>
      playApp.App.toLowerCase().includes(search.toLowerCase().trim())
    );

    if (sort) {
      results.sort((a, b) => {
        return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
      });
    }

    res.json(results);
}
)


app.listen(8080, () => {
  console.log("Google Play App is running on port http://localhost:8080");
});


/*The file playstore.js contains an array of Google Play apps. Build an Express server with a GET endpoint /apps. By default return the complete list of apps in the array. The endpoint accepts the following optional query parameters:

Parameter	Value	Description
sort	'rating' or 'app'	sort the list by either rating or app, any other value results in an error, if no value provided do not perform a sort.
genres	one of ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card']	If present the value must be one of the list otherwise an error is returned. Filter the list by the given value.
*/