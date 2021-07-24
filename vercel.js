
const app = require('express')()
const port = process.env.PORT || 3000


  


// Listen on port 5000
app.listen(port, () => {
    console.log(`Server is booming on port 5000
Visit http://localhost:${port}`);
});


module.exports = app