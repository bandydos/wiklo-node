const express = require('express');
const app = express();

const fetch = require('node-fetch');
const cors = require('cors');

const port = 3001;
app.listen(port, () => console.log(`Listening on ${port}.`));

app.use(cors({
    origin: '*',
    methods: ['GET']
}));

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.get('/facts', async (req, res) => {
    const wiki_url = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=angular';
    const response = await fetch(wiki_url);
    if (!response.ok) console.log(`Something went wrong, status: ${response.status}.`);
    res.json(await response.json());
});