var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

var expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

var multer = require('multer');
var upload =multer({dest: './public/image/uploads'});
var flash = require('connect-flash');
var index = require('./routes/index');
var system_structure = require('./routes/system_structure');
var comment = require('./routes/comment');
var control_system = require('./routes/control_system');
var manual = require('./routes/manual');
var cors =require('cors');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.set('ejs', path.join(__dirname, 'ejs'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(cors())
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret:'secret',
  saveUninitialized:true,
  resave:true
}));

app.use(expressValidator({
  errorFormatter:function(param,msg,value){
    var namespace = param.split('.'),
    root = namespace.shift(),
    formParam = root;
    while(namespace.length){
     fromParam += '[' + namespace.shift() + ']'; 
    }
    return {
      param : formParam,
      msg : msg,
      value :value     
    };
  }
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());
app.use(function(req,res,next){
  res.locals.message = require('express-messages')(req,res);
  next();
})
app.use('/', index);
app.use('/system_structure', system_structure);
app.use('/comment', comment);
app.use('/control_system', control_system);
app.use('/epics_manual', manual);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200); /让options请求快速返回/
  }
  else {
    next();
  }
});

module.exports = app;
