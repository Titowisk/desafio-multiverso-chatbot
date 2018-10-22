const express = require('express');
const watson = require('./config.json');
const bodyParser = require('body-parser');

let AssistantV1 = require('watson-developer-cloud/assistant/v1'); // watson sdk

const app = express();

app.use(bodyParser.json());

const port = 8000;

const assistant = new AssistantV1({
    url: watson.url,
    version: '2018-10-19',
    iam_apikey: watson.apikey,
});

// http://expressjs.com/en/4x/api.html
app.post('/conversation/', (req, res) => {
    const { text, context = {} } = req.body;

    const params = {
        input: { text },
        workspace_id: watson.workspace_id,
        context
    };

    assistant.message(params, (err, response) => {
        if (err) {
            console.error(err);
            res.status(500).json(err);
        } else {
            res.json(response);
            console.log(response.output.generic[0].text);
        }
    });
});



app.listen(port, () => console.log(`Running on port ${port}`))