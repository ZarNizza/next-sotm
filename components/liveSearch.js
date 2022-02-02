{
  /* <h1>JavaScript live search</h1>
<input autocomplete="off" type="search" id="search" placeholder="Search for a country or name!" />

<ul id="results"></ul> */
}

const data = [
  { name: 'Ryan', country: 'Saint Lucia' },
  { name: 'Malcolm', country: 'Portugal' },
  { name: 'Dalton', country: 'Brazil' },
  { name: 'Imelda', country: 'Chad' },
  { name: 'Aubrey', country: 'Bulgaria' },
  { name: 'Brittany', country: 'Guatemala' }
]

const search = document.getElementById('search')
const results = document.getElementById('results')
let search_term = ''

const showList = () => {
  results.innerHTML = ''
  data
    .filter((item) => {
      return (
        item.country.toLowerCase().includes(search_term) ||
        item.name.toLowerCase().includes(search_term)
      )
    })
    .forEach((e) => {
      const li = document.createElement('li')
      li.innerHTML = `<i>Name:</i> ${e.name}  || <i>Country:</i> ${e.country}`
      results.appendChild(li)
    })
}

showList()

search.addEventListener('input', (event) => {
  search_term = event.target.value.toLowerCase()
  showList()
})
