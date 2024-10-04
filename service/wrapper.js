const axios = require('axios');
const config = require('../NJ_AI4Bharat_sound_conversion/config/data/config.json');
const headers = config.headers;

async function sendRequest(url, payload) {
    try {
        console.log("error 3");
      const response = await axios.post(url, payload,{headers});
    //   console.log('Response:', response.data.audio[0].audioContent);
      return response
    } catch (error) {
      console.error('Error:', error.message);
    }
}
module.exports.sendRequest = sendRequest;