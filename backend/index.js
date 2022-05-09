

const express = require("express");
const mysql = require('mysql2/promise');
const cors = require('cors')

const app = express();
require('dotenv').config();

app.use(cors({origin: process.env.frontEndWebPage}))


// CONNECTION

const connectionConfig = {
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
}




// SET
app.post('/api/set', express.json(), async function (req, res) {
    let savedNames = [];
    let sqlArray = req.body.posts.reduce((arrays, postInArray) => {
        const name = postInArray.name;
        const description = postInArray.description;

        if (!savedNames.includes(name)) {
            savedNames.push(name);
            arrays.push([name, description])
        }

        return arrays;
    }, []);

    const connection = await mysql.createConnection(connectionConfig);
    try {
        await connection.beginTransaction();
        await connection.query('TRUNCATE tcitposts.posts;');
        if (sqlArray.length > 0) {
            await connection.query(`INSERT INTO ${connectionConfig.database}.posts (name, description) VALUES ?;`, [sqlArray]);
        }
        await connection.rollback();
        await connection.commit();
    }
    catch (error) {
        console.log(error)
        await connection.rollback();
    }    
    finally {
        await connection.end();
    }

    res.end();

});





// READ
app.post('/api/read', async function (req, res) {
    const connection = await mysql.createConnection(connectionConfig);
    try {
        let response = await connection.query(`(SELECT name, description FROM \`${process.env.database}\`.posts);`);
        res.json({
            posts: response[0]
        });
    }
    catch (error) {
        console.log(error)
        res.json({
            posts: []
        });
    }
    finally {
        await connection.end();
        res.end()
    }
});













app.set('port', process.env.PORT || 3001);
app.listen(app.get('port'), () => {
    console.log(`localhost:${app.get('port')}`);
});

