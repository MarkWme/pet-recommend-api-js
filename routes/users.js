var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var axios = require('axios');

// parse application/json
router.use(bodyParser.json());

/* GET users listing. */
router.get('/pet/recommend', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST users listing. */
router.post('/', function(req, res, next) {
  var userData = req.body;
  console.log(userData);

  // Call OpenAI API
  [{"role": "assistant", "content": "Once upon a time "}]

  var prompt = JSON.stringify(userData);
  prompt = `What kind of dog would you recommend for someone of the following profile
  Age: ${userData.age}
  Active: ${userData.active}
  Works full time: ${userData.worksFullTime}
  Type of home: ${userData.typeOfHome}
  With a garden: ${userData.withGarden}
  With children: ${userData.withChildren}
  With other pets: ${userData.withOtherPets}
  With allergies: ${userData.withAllergies}
  Answer the question as if you are talking to the prospective dog owner. You should give a recommendation of at least one suitable dog breed, and explain why you think it is suitable.
  `;
  var data = {
    messages:[{"role": "assistant", "content": prompt}],
    temperature: 0.5,
    max_tokens: 500
  };
  var headers = {
    'Content-Type': 'application/json',
    'api-key': '<api key goes here>'
  };
  axios.post('<endpoint goes here>', data, { headers: headers })
    .then(function(response) {
      var aiResponse = response.data.choices[0].message.content;
      console.log(aiResponse);
      res.send(aiResponse);
    })
    .catch(function(error) {
      console.log(error);
      res.send('Error calling OpenAI API');
    });
});

module.exports = router;