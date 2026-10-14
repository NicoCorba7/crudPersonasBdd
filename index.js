import express from 'express'
const app = express()
const port = 3000
app.use(express.json())
app.get('/', (req, res)=>{
    res.send('API Rest mysql')
})

app.get('/personas', (req, res)=>{
    res.send('todas las personas')
})

app.get('/personas/:id', (req, res)=>{
    res.send('persona por id')
})

app.post('/personas', (req, res)=>{
    res.send('crea persona')
})

app.delete('/personas', (req, res)=>{
    res.send('borrar personas')
})

app.put('/personas', (req, res)=>{
    res.send('modifica personas')
})

app.use((req,res)=>{
    res.status(404).send('pagina inexistente')
})

app.listen (port,()=>{
    console.log(`servidor en http://localhost: ${port} `)
})