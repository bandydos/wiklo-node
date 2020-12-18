$(() => {
    $('#btn-search').on('click', async () => {
        console.log('Clicked');
        
        const id = await getData(`http://localhost:3001/api/facts/${$('#input-search').val()}`);
        console.log(id);
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