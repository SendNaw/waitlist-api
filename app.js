const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const fetch = require('node-fetch');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Signup Route
app.post('/signup', (req, res) => {
  const { email } = req.body;

  // Make sure fields are filled
  if (!email) {
    res.redirect('/fail.html');
    return;
  }

  // Construct req data
  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed'
      }
    ]
  };

  const postData = JSON.stringify(data);

  fetch('https://us21.api.mailchimp.com/3.0/lists/6270c3c791.', {
    method: 'POST',
    headers: {
      Authorization: 'auth 9be5e4a7137a5d54c9c18a8b03c9dec7-us21'
    },
    body: postData
  })
    .then(res.statusCode === 200 ?
      res.redirect('/success.html') :
      res.redirect('/fail.html'))
    .catch(err => console.log(err))
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));