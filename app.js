const express = require('express');
const watson = require('./config.json');
const bodyParser = require('body-parser');
let AssistantV1 = require('watson-developer-cloud/assistant/v1'); // watson sdk

const assistant = new AssistantV1({
    url: watson.url,
    version: '2018-10-19',
    iam_apikey: watson.apikey,
});

console.log(assistant); // test

assistant.message({
    workspace_id: watson.workspace_id,
    input: {'text': "qual o seu nome?"},
    headers: {'Custom-header': 'custom', 'Accept-Language': 'custom'}
}, (err, result, response) => {
    if (err) {console.log('error:', err)}
    else {console.log(JSON.stringify(result, null, 2))};
});

// next steps
// https://console.bluemix.net/docs/services/conversation/develop-app.html#construindo-um-aplicativo-cliente