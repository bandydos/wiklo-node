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

app.get('/api/facts/:term', async (req, res) => {
    const term = req.params.term;
    const titleUrl = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${term}&format=json`;
    const response = await fetchData(titleUrl);

    const titles = response[1];
    let searchTitle = titles[Math.floor(Math.random() * titles.length)];
    searchTitle = searchTitle.replace(/\s+/g, '_');

    console.log(searchTitle);
    const contentUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=revisions&titles=${searchTitle}&rvslots=*&rvprop=content&format=json&formatversion=2`;
    const content = await fetchData(encodeURI(contentUrl));

    const page = content.query.pages[0]; 

    const pageid = page.pageid;
    const pagetitle = page.title;
    const pagecontent = page.revisions[0].slots.main.content;

    const usable = {
        'pageId': pageid,
        'pageContent': pagecontent,
        'pageTitle': pagetitle,
    }

    res.json(usable);
})

const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        console.log(`Something went wrong, status: ${response.status}.`);
        return;
    }
    return await response.json();
}
