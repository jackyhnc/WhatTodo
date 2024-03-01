const PORT = process.env.PORT ?? 8000
const express = require("express")
const app = express()   
const pool = require('./db.js')
const cors = require("cors")

app.use(cors())
app.use(express.json())

//get todos 
app.get("/tasksModules/:userEmail", async (req, res) => {
    const { userEmail } = req.params
    try {
        const selectedTasksModules = await pool.query
            (`SELECT * FROM tasksModules WHERE user_email = $1;`, [userEmail])

        res.json(selectedTasksModules.rows)
        console.log('gotten')
    } catch (error) {
        console.error(error)
    }
})

//create todos
app.post("/tasksModules",(req,res) => {
    const tasksModules = req.body
    try {        
        tasksModules.map(taskModule => {
            const { id, user_email, title, todosCountLimit, color, todos } = taskModule
            pool.query(`
                INSERT INTO tasksModules(id, user_email, title, todos_count, color, todos) 
                VALUES ($1, $2, $3, $4, $5, $6)
                ON CONFLICT (id) DO UPDATE
                    SET user_email = EXCLUDED.user_email, 
                    title = EXCLUDED.title, 
                    todos_count = EXCLUDED.todos_count, 
                    color = EXCLUDED.color, 
                    todos = EXCLUDED.todos;
            `,[id, user_email, title, todosCountLimit, color, todos])
        })
        console.log(tasksModules)
        console.log('taskModules added')
    }
    catch(error) {
        console.error(error)
    }
})

//update todos
app.put("/UpdateTodos/", (req,res) => {
    const { id, name, date } = req.body
    try {
        console.log(req.body)
        pool.query(`UPDATE todos SET name = $1, date = $2 WHERE id = $3;`,[name,date,id])
        console.log('todo updated')
    } catch (err) {
        console.error(err)
    }
})

//delete todos
app.delete("/DeleteTodos/:id",(req,res) => {
    const { id } = req.params
    try {
        pool.query(`DELETE FROM todos WHERE id = $1;`,[id])
        console.log('todo deleted')
    }
    catch (err) {
        console.error(err)
    }
})


app.listen(PORT, ()=> console.log(`Server running on PORT ${PORT}`))