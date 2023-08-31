const express = require('express');
const request = require('request')
const bodyParser = require('body-parser');
const path = require('path');
const { response } = require('express');
// const fetch = require('node-fetch');

const app = express();

// Bodyparser Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Signup Route
app.post('/subscribe', (req, res) => {
  const { email } = req.body;

  const mcData = {
    members: [
      {
        email_address: email,
        status: 'pending'
      } 
    ]
  }

  const mcDataPost = JSON.stringify(mcData);

  const options = {
    url: 'https://us21.api.mailchimp.com/3.0/lists/6270c3c791',
    method: 'POST', 
    headers: {
      Authorization: 'auth be0005fcf036d1f994872a464307d393-us21'
    },
    body: mcDataPost
  }

  if (email) {
    request(options, (err, response, body) => {
      if(err) {
        res.json({error: err})
      }else {
        if (js) {
          res.sendStatus(200);
        }else {
          res.redirect('/success.html')
        }
      }
    })
  }else{
    res.redirect('/fail.html');
  }
  
})

  
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));