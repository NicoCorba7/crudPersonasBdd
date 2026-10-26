import express from 'express'
import pool from './config/conexion.js'
const app = express()
const port = 3000
app.use(express.json())
//test de conexion 
pool.getConnection()
app.get('/', (req, res)=>{
    res.send('API Rest mysql')
})

app.get('/personas', async(req, res)=>{
    const sql = "SELECT * FROM personas"
    try{
        const connection = await pool.getConnection()//invoco a la conexion
        const [rows] = await connection.query(sql)//ejecuto la consulta
        connection.release()//libero conexion
        res.json(rows)
    }
    catch(error){
        res.status(500).send("Error, no se pudo realizar la consulta")
    }
})

app.get('/personas/:id', async(req, res)=>{
    const id = parseInt(req.params.id)
    const sql = "SELECT * FROM personas WHERE id=?"
    try{
        const connection = await pool.getConnection()
        const [rows] = await connection.query(sql, [id])
        connection.release()
        rows[0] ? res.json(rows[0]) : res.status(404).send('no existe')
    } catch(error){
        res.status(500).send("Error, no se puede realizar la consulta")
    }
})

//crear nuevo registro
app.post('/personas', async(req, res)=>{
    const values = req.body
    const sql = 'INSERT INTO personas SET ?'
    try{
        const connection = await pool.getConnection()
        const [rows] = await connection.query(sql, [values])
        connection.release()
        res.status(201).send('Registro creado')
    }
    catch (error){
        res.status(500).send('error en la ejecucion')
    }
})

app.delete('/personas/:id', async(req, res)=>{
    const id = parseInt(req.params.id)
    const sql = "DELETE FROM personas WHERE id=?"
    try{
        const connection = await pool.getConnection()
        const [rows] = await connection.query(sql, [id])
        connection.release()
        rows.affectedRows == 0 ? res.send('no existe') : res.status(204).send()
    } catch(error){
        res.status(500).send("Error, no se puede realizar la consulta")
    }
})

app.put('/personas/:id', async(req, res)=>{
    const id = parseInt(req.params.id)
    const values = req.body
    const sql = "UPDATE personas SET ? WHERE id=?"
    try{
        const connection = await pool.getConnection()
        const [rows] = await connection.query(sql, [values, id])
        connection.release()
         rows.affectedRows == 0 ? res.send('no existe') : res.status(200).send('registro actualizado')
    } catch(error){
        res.status(500).send("Error, no se puede realizar la consulta")
    }
})

app.use((req,res)=>{
    res.status(404).send('pagina inexistente')
})

app.listen (port,()=>{
    console.log(`servidor en http://localhost: ${port} `)
})