const link = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
</svg>
`

let data = [];
let start = 0
let end = 20;
const table = document.querySelector('table');
const btns = document.querySelectorAll('button')
const loadMore = document.querySelector('load')

// Switch button
btns.forEach(btn => btn.addEventListener('click', function (e) {
    removeActive(btns)
    e.target.classList.add('active')
    loadData(e.target.textContent)
}))

// REmove Active
function removeActive(btns) {
    btns.forEach(btn => btn.classList.remove('active'))
}

/// Get Top News 
const getData = async () => {   // fetch news data from an API
    let responseTop = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
    let json = await responseTop.json()
    return json
}

// Get BestNews
const getDataBest = async () => {
    let responseBest = await fetch('https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty')
    let json = responseBest.json()
    console.log(json);
    return json
}

// Get Jobs
const getDataJobs = async () => {
    let responseJobs = await fetch('https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty')
    let json = await responseJobs.json()
    return json
}

// Get Items 
const getItems = async (id) => {
    let response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
    let json = await response.json()
    return json
}

// Loading Data 
function loadData(news) {
    data = news
    Data();
}

// Display Data
const Data = async (dataType) => {
    let range = []
    const tbody = table.querySelector('tbody')
    tbody.innerHTML = ''
    if (dataType == 'best Stories') {
        data = await getDataBest()
        range = loadFunc(start, end)
    }else if (dataType == 'Jobs') {
        data = await getDataJobs()
        range = data.slice(start, end)
    }else {
        data = await getData()
        range = data.slice(start, end)
    }
  

    for (let i = 0; i < range.length; i++) {
        const element = await getItems(range[i]);
        const row = document.createElement('tr');
        
        row.innerHTML = `
        <td>${element.title}
        <span>${new Date(element.time*1000).toLocaleString()}</span>
        </td>
        <td>${element.by}</td>
        <td><a href = "${element.url}">${link}</a></td>
        `
        tbody.appendChild(row);
    }
}

//loadMore.addEventListener('click', loadFunc(start, total))

const loadFunc = (start, end) => {
   data.slice(start+20, end+20)
   return data
}

loadData('top Stories')
