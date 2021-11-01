const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const userRoute = require('./apis/user/index');
const itemRoute = require('./apis/item/index');
const storageRoute = require('./apis/storage/index');
const transactionRoute = require('./apis/transaction/index');
const batchRoute = require('./apis/batch/index');
const orderRoute = require('./apis/order/index');
const stockRoute = require('./apis/stock/index');


const cors = require('cors');
const { ENV, DB_LOCAL, DB_LOCAL_TEST, PORT } = require('./config/config');

const app = express();
if (ENV !== 'prod') {
	console.log(ENV)
}

const connectionString = ENV === 'test' ? DB_LOCAL_TEST : DB_LOCAL;
//connecting to db
mongoose.connect(connectionString)
	.then(db => console.log('Db connected'))
	.catch(err => console.log(err));

//settings
app.set('port', PORT || 3000);
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs'); 

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
	origin: "*",
	allowedHeaders: "*"
}));

//routes
app.use('/user', userRoute);
app.use('/item', itemRoute);
app.use('/storage', storageRoute);
app.use('/transaction', transactionRoute);
app.use('/stock', stockRoute);
app.use('/batch', batchRoute);
<<<<<<< HEAD
app.use('/order', orderRoute);
=======
>>>>>>> 2f5435bbd7c73204dbf74d42d8fe8d4419038707

//starting the server
const server = app.listen(app.get('port'), () => {
	console.log(`Server on port ${app.get('port')}`);
});

module.exports = { app, server };