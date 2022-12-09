const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')

// middleware
app.use(cors())
app.use(express.json())


// Routes

// create a todo
app.post('/todos', async (req, res) => {
    try {
        const { description } = req.body
        const newTodo = await pool.query(
            'INSERT INTO todo (description) values($1) RETURNING *',
            [description]

        );
        console.log(newTodo);
        res.json(newTodo.rows[0])
            .send({
                status: 200,
                Message: "Todo created siccessfully"
            })

    } catch (error) {
        console.log(error);
        res.send({
            status: 400,
            Message: "Bad Request"
        })
    }
})

// get all todos
app.get('/todos', async (req, res) => {
    try {
        const allTodo = await pool.query(
            'select * from todo')
        res.send({
            status: 200,
            Data: allTodo[rows]
        })
    } catch (error) {
        console.log(error);
        res.send({
            status: 400,
            Message : "Bad Request"
        })
    }
})

// get a todo

app.get('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params
        const todo = await pool.query('select *from todo where todo_id=$1', [id])
        res.send({
            status: 200,
            Data: todo[rows]
        })
    } catch (error) {
        console.log(error);
        res.send({
            status: 400,
            Message : "Bad Request"
        })
    }
})

// update a todo

app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { description } = req.body
        const updateTodo = await pool.query(
            "UPDATE todo SET description=$1 WHERE todo_id=$2",
            [description, id]
        )
        res.json('status updated')
        .send({
            status: 200,
            Message: "Todo Updated successfully"
        })
    } catch (error) {
        console.log(error);
        res.send({
            status: 400,
            Message : "Bad Request"
        })
    }
})

// delete a todo

app.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deleteTodo = await pool.query(
            'DELETE FROM todo WHERE todo_id= $1',
            [id]
        )
        res.send({
            status: 400,
            Messsage: "Todo deleted successfully"
        })
    } catch (error) {
        console.log(error);
        res.send({
            status: 400,
            Message : "Bad Request"
        })
    }
})



app.listen(5000, () => {
    console.log('server started on port no 5000');
})