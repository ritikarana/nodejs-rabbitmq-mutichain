const express = require('express');
const bodyParser = require('body-parser');
const user = require('./routes/user');

const PORT = process.env.PORT||4000;

let app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use('/user',user);

app.use((req, res, next) => {
    if (!res.data) {
        return res.status(404).send({
            status: false,
            error: {
                reason: "Invalid Endpoint", 
                code: 404
            }
        });
    }

    res.status(res.statusCode || 200).send({ status: true, response: res.data });
})

app.listen(PORT,()=>{
    console.log(' ********** : running on 30006');
})

process.on('exit', (code) => {
    console.log(`About to exit with code: ${code}`);
});


process.on('SIGINT', function() {
    console.log("Caught interrupt signal");
    process.exit();
});


module.exports = app;