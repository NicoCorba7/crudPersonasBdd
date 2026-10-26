import mysql from 'mysql2/promise'
const pool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'crud',
    connectionlimit : 5
})
//test de conexion
pool.getConnection()
.then(connection=>{
    console.log('conectados')
    connection.release()
})
.catch(error=>{
    console.log('error de conexion', error)
})
export default pool 