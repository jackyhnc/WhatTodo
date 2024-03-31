const PORT = process.env.PORT ?? 8000
const express = require("express")
const app = express()   
const pool = require('./db.js')
const cors = require("cors")

app.use(cors())
app.use(express.json())

//get data from database 
app.get("/tasksModules/:userEmail", async (req, res) => {
    const { userEmail } = req.params
    try {
        const selectedTasksModules = await pool.query(
            `SELECT * FROM tasksModules WHERE user_email = $1;`,[userEmail])
        res.send(selectedTasksModules.rows)

        console.log('gotten')
    } catch (error) {
        console.error(error)
    }
})

//send data to database
app.post("/tasksModules", async (req,res) => {
    try {
        console.log('trigger')
        const tasksModules = req.body
        const newTasksModules = await tasksModules.map(taskModule => {
            const { id, user_email, title, todos_count_limit, color, todos } = taskModule
            pool.query(
                `INSERT INTO tasksModules(id, user_email, title, todos_count_limit, color, todos) 
                VALUES ($1, $2, $3, $4, $5, $6)
                ON CONFLICT (id) DO UPDATE
                    SET 
                        user_email = EXCLUDED.user_email, 
                        title = EXCLUDED.title, 
                        todos_count_limit = EXCLUDED.todos_count_limit, 
                        color = EXCLUDED.color, 
                        todos = EXCLUDED.todos;`
            ,[id, user_email, title, todos_count_limit, color, JSON.stringify(todos)])
        })

        console.log('added')
    }
    catch(error) {
        console.error(error)
    }
})
//shit is not accepting the JSON im passing into the db idk why check errors
app.listen(PORT, ()=> console.log(`Server running on PORT ${PORT}`))