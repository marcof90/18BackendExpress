const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const app = express()
//socket
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
    cors:{
        origin: 'http://localhost:3001',
        methods: ['GET', 'POST']
    }
})

//end socket
const authRoutes = require('./routes/auth.routes')
const incomeRoutes = require('./routes/income.routes')
const outcomeRoutes = require('./routes/outcome.routes')
require('dotenv').config()
//configuraciones
app.set('port', process.env.PORT || 3000)
mongoose.connect(process.env.DB_STRING)
.then(db => console.log('Connected to Mongo'))
.catch(err => console.log(err))
app.use('/documentation', express.static(path.join(__dirname, '../doc/')))

//middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({
    extended: false
}))

//rutas
app.use('/auth', authRoutes)
app.use('/incomes', incomeRoutes)
app.use('/outcomes', outcomeRoutes)

io.on('connection', (socket)=>{
    socket.on('conectado', ()=>{
        console.log('usuario conectado')
    })

    socket.on('message', (username, message)=>{
        io.emit('messages', {username, message})
    })

    socket.on('disconnect', ()=>{
        io.emit('messages', {username: 'server', message: "Un usuario abandonado la sala"})
    })
})

//inicio del servidor
// app.listen(app.get('port'), ()=>{
http.listen(app.get('port'), ()=>{
    console.log('Server Running')
})
