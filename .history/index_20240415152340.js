const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config(); // Load .env variables

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route handler for POST /oauth/token/request
app.post('/oauth/token/request', async (req, res) => {
    const { grant_type } = req.body;
    const { CLIENT_ID, CLIENT_SECRET, API_KEY } = process.env; // Destructure variables from .env
    
    try {
        // Make a POST request using Axios
        const response = await axios.post('https://api-approval.tingg.africa/v1/oauth/token/request', {
            client_id: CLIENT_ID, // Use client_id from .env
            client_secret: CLIENT_SECRET, // Use client_secret from .env
            grant_type: 'client_credentials'
        }, {
            headers: {
                'accept': 'application/json',
                'apikey': API_KEY, // Use API_KEY from .env
                'content-type': 'application/json'
            }
        });
        process.env.ACCESS_TOKEN = response.data.access_token;
        res.json(response.data);
    } catch (error) {
        // Handle errors
        console.error('Error:', error.message);
        res.status(500).json({ error: `$error` });
    }
});

app.post('/checkout', function (req, res) {
  const options = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'apikey': process.env.API_KEY,
      'Authorization': "eyJraWQiOiJjYXMtcGsiLCJhbGciOiJSUzUxMiJ9.eyJzdWIiOiIyMjI1NTgiLCJwYXJlbnQiOiJDRUxLRSIsImxldmVsIjoiQ1VTVE9NRVIiLCJpc3MiOiJodHRwOi8vY2FzLWFwaS5hcHByb3ZhbDo4MDgwLyIsInV0eXBlIjoiU0FOREJPWF9BUEkiLCJhdWQiOiIqIiwibmFtZSI6IlBFTlRBR09OUEVOU0lPTlNFUlZJMTcxMTYyMDA4OTc5MiIsImNsaWVudCI6IlBFTlRBR09OUEVOU0lPTlNfS0VOIiwiZXhwIjoxNzEzMTg3MDI2LCJpYXQiOjE3MTMxODM0MjYsImN1c3RfaWQiOjYwOTYyLCJqdGkiOiI5MGRhMDAwOC02M2UwLTQ1NDMtYjI3Ny00Zjc1ZmY2MjI1NWEzYWM2MTQwMS04M2VkLTQwMzMtOTQ0Yy1lYjAwZjFmZjc4ZWEifQ.KNdr8d7bn5ZHX_f04MSlPgLnVpTlMG_q1CsBCTL2-KrYmOnftWIFRnNlop28XjAp5BASYPbxnvG_fRDVqaL7idQm5CmIru5ovFn8vPjv1U7MuOdQcNkWkMAQD7ihe9wkHh_sN13b26F8AM0m7zQHv8Nin9fFf8yyrcmoSU2ZfDqDYkkzAz71dQ7_LGX57A6pDspEyXln5LopAQ79DG9EBaURf7azv1hVYf3YEbhxcp2taunTgZZz9Hr3zhm-gDYXnNgXnvEHz7iFhU0WLCx4WhpxLDMCJVfjURmK4amQspcdcRQskTKgVNbBtJs2ZGHMWFdy51OGH5D9NZSDe0uBHg",
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      msisdn: '254700000000',
      account_number: 'TinggAcc01',
      callback_url: 'https://jsonplaceholder.typicode.com/todos/1',
      country_code: 'KEN',
      currency_code: 'KES',
      customer_email: 'johndoe@gmail.com',
      customer_first_name: 'John',
      customer_last_name: 'Doe',
      due_date: '2024-03-28 20:00:00',
      payment_option_code: 'ABC',
      fail_redirect_url: 'https://jsonplaceholder.typicode.com/todos/1',
      invoice_number: '1234',
      merchant_transaction_id: '787867001614',
      raise_invoice: false,
      request_amount: 100,
      national_id: '123456',
      passport_number: '123456',
      request_description: 'Bag',
      service_code: 'TINGGTEST',
      success_redirect_url: 'https://jsonplaceholder.typicode.com/todos/1'
    })
  };
  
  fetch('https://api-approval.tingg.africa/v3/checkout-api/checkout/request', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
