const express = require('express');
const watson = require('./config.json');
const bodyParser = require('body-parser');
var prompt = require('prompt-sync')();
let AssistantV1 = require('watson-developer-cloud/assistant/v1'); // watson sdk

const assistant = new AssistantV1({
    url: watson.url,
    version: '2018-10-19',
    iam_apikey: watson.apikey,
});

let processResponse = (err, response) => {
    if (err) {
        console.error(err);
        return;
    }

    // If an intent was detected, log it out to the console.
    if (response.intents.length > 0) {
        console.log(`Detected intent: #${response.intents[0].intent}`);
    }

    // Display the output from dialog, if any. Assumes a single text response.
    if (response.output.generic.length != 0) {
        console.log(response.output.generic[0].text);
    }

    // Prompt for the next round of input.
    let newMessageFromUser = prompt('>> ');
    assistant.message({
        workspace_id: watson.workspace_id,
        input: {text: newMessageFromUser}
    }, processResponse);

};

// Start conversation with empty message.
assistant.message({
    workspace_id: watson.workspace_id
}, processResponse);


// next steps
// https://console.bluemix.net/docs/services/conversation/develop-app.html#construindo-um-aplicativo-cliente