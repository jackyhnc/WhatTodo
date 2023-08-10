const PORT = process.env.PORT ?? 8000
const express = require("express")
const app = express()
const pool = require('./db.js')
const cors = require("cors")

app.use(cors())
app.use(express.json())

//get todos 
app.get("/todos/:userEmail", async (req, res) => {
    const {userEmail} = req.params

    try {
        const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1;',[userEmail])
        res.json(todos.rows)
    } catch (error) {
        console.error(error)
    }
})

//create todos
app.post("/todos",(req,res) => {
    const { id, name, date, user_email } = req.body
    try {
        pool.query(`INSERT INTO todos(id, name, date, user_email) VALUES ($1, $2, $3, $4);`,[id, name, date, user_email])
        console.log('todo added')
    }
    catch {
        console.error(err)
    }
})

//delete todos
app.delete("/todos/:id",(req,res) => {
    const { id } = req.params
    try {
        pool.query(`DELETE FROM todos WHERE id = $1;`,[id])
        console.log('todo deleted')
    }
    catch {
        console.error(err)
    }
})


app.listen(PORT, ()=> console.log(`Server running on PORT ${PORT}`))