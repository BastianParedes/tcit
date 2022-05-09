

const express = require("express");
const pg = require ('pg');
const format = require('pg-format');
const cors = require('cors')
require('dotenv').config();


const app = express();
app.use(cors({origin: process.env.frontEndWebPage}))


// CONNECTION
const connectionConfig = {
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
}
const pool = new pg.Pool(connectionConfig);





// SET
app.post('/api/set', express.json(), async function (req, res) {
    let savedNames = [];
    let sqlArray = req.body.posts.reduce((arrays, postInArray) => {
        const name = postInArray.name || '';
        const description = postInArray.description || '';
        if (!savedNames.includes(name)) {
            savedNames.push(name);
            arrays.push([name, description])
        }
        return arrays;
    }, []);


    try {
        await pool.query(`BEGIN`);
        await pool.query('TRUNCATE posts');
        if (sqlArray.length > 0) {
            await pool.query(format(`INSERT INTO posts (name, description) VALUES %L;`, sqlArray));
        }
        await pool.query(`COMMIT`);
    }
    catch (error) {
        await pool.query(`ROLLBACK`);
        console.log(error)
    }    
    finally {
        res.end();
    }
});





// READ
app.post('/api/read', async function (req, res) {
    try {
        let response = await pool.query('SELECT name, description FROM posts;');
        res.json({posts: response.rows});
    } catch (error ){
        console.log(error);
        res.json({posts: []});
    }
});













app.set('port', process.env.PORT || 3001);
app.listen(app.get('port'), () => {
    console.log(`localhost:${app.get('port')}`);
});

