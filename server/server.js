// app.js
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors =require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

// const session = require('express-session');

const { Server } = require('socket.io');
const http = require('http');


const loginapiData =  require('./routes/loginController')
// const userData =  require('./routes/userController')
const createUserController = require('./routes/userController');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
  path: '/socket.io', 
});


mongoose.connect('mongodb://127.0.0.1:27017/chatapp', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors());

// app.use(session({
//   secret:'893d64c310bcfdc2bd00e8a723b7c2b097f7d11d4963aae24dcefb3aac2dc9e081d87128e5761960b500cc0f1c02b97b89fb297184976c41b62c04ae60e1dc5c',
//   resave:false,
//   saveUninitialized: true
// }));

app.use(express.json());
const userData = createUserController(io);

app.use('/auth',loginapiData);
app.use('/',userData);



server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});





// new coded





// const express = require('express');
// const app = express();
// const http = require('http');
// const { Server } = require('socket.io');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// require('dotenv').config();

// const loginapiData = require('./routes/loginController');
// const createUserController = require('./routes/userController');

// const port = process.env.PORT || 5000;

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST'],
//   },
//   path: '/socket.io',
// });

// mongoose.connect('mongodb://127.0.0.1:27017/chatapp', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
// app.use(cors());
// app.use(express.json());

// const userData = createUserController(io);
// app.use('/auth', loginapiData);
// app.use('/', userData);

// server.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// io.on('connection', (socket) => {
//   console.log(`A user connected to userController socket1 ${socket.id}`);

//   socket.on('sendmsg', (data) => {
//     console.log('Received message:', data);
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected from userController socket1');
//   });
// });
