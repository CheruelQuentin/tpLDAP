const path= require('path')
const express = require("express")
const hbs = require('hbs')
const app = express()
const {spawn} = require('child_process')
var bodyParser = require("body-parser")

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(path.join(__dirname, '/public'))
const viewsPath = path.join(__dirname, '../code/templates/views')
const partialsPath = path.join(__dirname,'../code/templates/partials')
const connectUser = require('./utils/connectUser.js')
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function (req, res) {
  res.render('index');
});

app.post('/waiting',function (req, res) {
  const username = req.body.username
  const password = req.body.password
  if (password == undefined || username == undefined) { 
    return res.send({ 
      error : "you must a username"
    })
  } else {
    switch (connectUser(username, password)) {
      case 0:
        return res.send({ 
          error : "username or password errors"
        })
        break;
      case 1 :
        res.render('waiting',{
          username : username,
          password : password,
          admin : true,
          mailer : false,
          ftp : false 
        });
        break;
      case 2 : 
 
        res.render('waiting',{
          username : username,
          password : password,
          admin : false,
          mailer : true,
          ftp : false
        });
        break;
      case 3:

        res.render('waiting',{
          username : username,
          password : password,
          admin : false,
          mailer : false,
          ftp : true
        });
        break;
      default:
        return res.send({ 
          error : "username or password errors"
        })
    }   
  }
})

app.post('/ftp', function (req, res) {
  const username = req.body.username
  const password = req.body.password

  var dataToSend;
  const python = spawn('python',['../serverFTP/main.py',username,password])

  python.stdout.on('data', function (data){
    dataToSend = data.toString();
  });

  python.stderr.on('data', data => {
    console.error(`stderr: ${data.toString('utf8')}`)
  })

  python.on('exit',code => {
    console.log(`child process exited with code ${code}, ${dataToSend}`);
  })

});

app.post('/sendMail', function (req, res) {
  const username = req.body.username
  const password = req.body.password
  const destinataire = req.body.destinataire
  const sujet = req.body.sujet
  const texte = req.body.texte
  
  var dataToSend;
  const python = spawn('python',['../serverSMTP/main.py',username,password,destinataire,sujet,texte])


  python.stdout.on('data', function (data){
    dataToSend = data.toString();
    res.render('sendMail')
  });

  python.stderr.on('data', data => {
    console.error(`stderr: ${data.toString('utf8')}`)
  })

  python.on('exit',code => {
    console.log(`child process exited with code ${code}, ${dataToSend}`);
  })

});

app.get('/smtp', function (req, res) {
  res.render('smtp');
});

app.listen(port,()=>{
  console.log('Server listening on port' + port)
}) 