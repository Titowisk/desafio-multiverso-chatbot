const express = require('express');
const bodyParser = require('body-parser');
let cors = require('cors');
const watson = require('./config.json');

let AssistantV1 = require('watson-developer-cloud/assistant/v1'); // watson sdk

const app = express();

app.use(express.static('./assets'));
app.use(bodyParser.json());
app.use(cors());

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
        }
    });
});



app.listen(port, () => console.log(`Running on port ${port}`))