let data = [];
const link = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
</svg>
`
export const loadData = news => {   
    console.log(news)
    data = news
    pData();
}

export const getData = async () => {   // fetch news data from an API
    let responseBest = await fetch('https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty')
    let responseJobs = await fetch('https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty')
    let responseTop = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
    const job = document.getElementById('job');
    let json = responseTop.json()
    console.log(json);
    return json
}

export const getItems = async (id) => {
    let response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
    let json = response.json()
    return json 
}



const pData = async () => {
    const table = document.getElementById('table');
    const tbody = table.querySelector('tbody')
    data = await getData()
    console.log(data)
    for (let i = 0; i < data.length; i++) {
       const element = await getItems(data[i]);
       const row = document.createElement('tr');

        row.innerHTML = `
        <td>${element.title}</td>
        <td>${element.by}</td>
        <td><a href = "${element.url}">${link}</a></td>
        `
        tbody.appendChild(row);
    }
}