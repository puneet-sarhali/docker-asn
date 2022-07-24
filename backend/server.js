const express = require("express");
const { Pool }= require("pg");
const cors = require("cors");


const connectionString = "postgres://postgres:postgrespw@postgres:5432";
const pool = new Pool({
    connectionString: connectionString
});

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

async function createTableDB(){
    try{
        const query = `CREATE TABLE IF NOT EXISTS Notes (
            id SERIAL PRIMARY KEY,
            title varchar(255),
            note_body varchar(4000),
            last_modified timestampTz
        )`
        const res = await pool.query(query);
        console.log(res.rows)
    }
    catch(err){
        console.log(err)
    }
}

createTableDB();

app.get("/notes", async (req, res) => {
    try{
        const query = await pool.query("SELECT * FROM notes");
        res.send(query.rows)
    }
    catch(err){
        res.send(err.message)
    }
})

app.post("/notes", async (req, res) => {
    const { title, note_body, last_modified } = req.body;
    const query = "INSERT INTO notes (title, note_body, last_modified) VALUES ($1, $2, $3) RETURNING *"
    try{
        const result = await pool.query(query, [title, note_body, last_modified]);
        res.send(result.rows[0])
    }
    catch(err){
        res.send(err.message)
    }
})

app.put("/notes/:id", async (req, res) => {
    const { id } = req.params;
    const { title, note_body, last_modified } = req.body;
    const query = "UPDATE notes SET title = $1, note_body = $2, last_modified = $3 WHERE id = $4 RETURNING *"
    try{
        const result = await pool.query(query, [title, note_body, last_modified, id]);
        res.send(result.rows[0])
    }
    catch(err){
        res.send(err.message)
    }
})

app.delete("/notes/:id", async (req, res) => {
    const { id } = req.params;
    try{
        const query = await pool.query("DELETE FROM notes WHERE id = $1", [id]);
        res.send(query.rows)
    }
    catch(err){
        res.send(err.message)
    }
})


app.listen(PORT, ()=>{
    console.log(`Running on port ${PORT}`);
})