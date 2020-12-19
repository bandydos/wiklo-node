$(async () => {
    // Tags.
    const hTitle = $('#h-title');
    const hId = $('#h-id');
    const pContent = $('#p-content');

    // Display loading screen.
    displayWhileFetching();
    // Fetch initial data.
    const initialData = await getData('http://localhost:3001/api/facts/api');
    // Fill in data.
    fillIn(hTitle, hId, pContent, initialData);

    $('#btn-search').on('click', async () => {
        emptyOut([hId, pContent]);
        displayWhileFetching();

        if (!$('#input-search').val()) {
            $('#p-warning').show();
            $('#p-warning').text('please fill in search form.').css('color', 'red');
            emptyOut([hTitle]);
            return;
        }

        const data = await getData(`http://localhost:3001/api/facts/${$('#input-search').val()}`);
        fillIn(hTitle, hId, pContent, data);
        console.log(data);
    })
})


const getData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        console.log(`Something went wrong, status: ${response.status}.`);
        return;
    }
    return await response.json();
}


const emptyOut = (tags) => {
    for (let tag of tags) {
        tag.text('');
    }
}

const fillIn = (titleTag, idTag, contentTag, data) => {
    titleTag.text(data.pageTitle);
    idTag.text(data.pageId);
    contentTag.text(data.pageContent);
}

const displayWhileFetching = () => {
    $('#p-warning').hide();
    $('#h-title').text('Fetching...');
}