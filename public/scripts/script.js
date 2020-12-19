$(async () => {
    // Tags.
    const pWarning = $('#p-warning');
    const hTitle = $('#h-title');
    const hId = $('#h-id');
    const pContent = $('#p-content');
    const divArticle = $('#div-article');

    pWarning.hide();

    // Initial fetch.
    hTitle.text('Fetching...');
    const initialData = await getData('http://localhost:3001/api/facts/api');
    fillIn(hTitle, hId, pContent, initialData); // Fill in data.
    divArticle.addClass('border'); // Add border.

    // Button click.
    $('#btn-search').on('click', async () => {
        divArticle.removeClass('border'); // Remove border.
        emptyOut([hId, pContent]); // Empty out id and content.

        // If no input.
        if (!$('#input-search').val()) {
            // Warn.
            $('#p-warning').show();
            $('#p-warning').text('please fill in search form.').css('color', 'red');
            emptyOut([hTitle]); // Empty out title as well.
            return;
        }

        pWarning.hide();

        // Fetch data for searching term.
        hTitle.text('Fetching...');
        const searchData = await getData(`http://localhost:3001/api/facts/${$('#input-search').val()}`);
        fillIn(hTitle, hId, pContent, searchData); // Fill in data.
        divArticle.addClass('border');
        console.log(searchData);
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
    idTag.text(`(id: ${data.pageId})`);
    contentTag.text(data.pageContent);
}

const displayWhileFetching = () => {
    $('#p-warning').hide();
    $('#h-title').text('Fetching...');
}