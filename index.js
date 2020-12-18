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
app.use(express.static(__dirname + '/node_modules/jquery/dist'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.get('/facts', (req, res) => {
    res.send('helo')
})

app.get('/api/facts', async (req, res) => {
    const wiki_url = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=angular';
    const response = await fetch(wiki_url);
    if (!response.ok) {
        console.log(`Something went wrong, status: ${response.status}.`);
        return;
    }
    res.json(await response.json());
});