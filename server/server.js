const PORT = process.env.PORT ?? 8000
const express = require("express")
const app = express()   
const pool = require('./db.js')
const cors = require("cors")

app.use(cors())
app.use(express.json())

//get data from database 
app.get("/blocks/:userEmail", async (req, res) => {
    try {
        const { userEmail } = req.params

        const selectedBlocks = await pool.query(
            `SELECT * FROM blocks WHERE user_email = $1;`,[userEmail]
        )
        console.log(selectedBlocks)
        res.send(selectedBlocks.rows)

        console.log('gotten')
    } catch (error) {
        console.error(error)
    }
})

//send data to database
app.post("/blocks", async (req,res) => {
    try {
        const blocks = req.body
        const sendNewBlocks = await blocks.map(block => {
            const { block_id, spaces_id, block_type, content } = block
            pool.query(
                `INSERT INTO blocks(block_id, spaces_id, block_type, content) 
                VALUES ($1, $2, $3, $4)
                ON CONFLICT (blocks_id) DO UPDATE
                    SET
                        spaces_id = EXCLUDED.spaces_id
                        block_type = EXCLUDED.block_type
                        content = EXCLUDED.content;`
            ,[block_id, spaces_id, block_type, JSON.stringify(content)])
        })

        console.log('updated')
    }
    catch(error) {
        console.error(error)
    }
})

app.listen(PORT, ()=> console.log(`Server running on PORT ${PORT}`))