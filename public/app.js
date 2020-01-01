// builds the articles
let buildArticles = articles => {
  document.getElementById('articles').innerHTML = ''
  articles.forEach(article => {
    let artElem = document.createElement('div')
    artElem.innerHTML = `
	<div class="row">
    <div class="col s12 m">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
					<span class='card-title'><a target="_blank" href='${article.url}'>${article.heading}</a></span>
					<p>${article.summary}</p>
					<a  data-id=${article._id} class="waves-effect waves-light btn save">Save Article</a>
        </div>
      </div>
    </div>
  </div>
		`
    document.getElementById('articles').append(artElem)
  })
}

// shows articles on refresh
let showArticles = () => {
  axios.get('article')
    .then(({ data }) => {
      buildArticles(data)
    })
    .catch(e => console.error(e))
}
showArticles()

// Scrape articles
let scrapeArticles = () => {
  let empty = document.getElementById('articles').innerHTML === ''
  if (empty === true) {
    axios.get('articles')
      .then(({ data }) => {
        console.log(data)
        buildArticles(data)
      })
      .then(() => {
        showArticles()
      })
      .catch(e => console.error(e))
  } else {
  }
}

// Delete all Articles
let deleteArticles = () => {
  axios.delete('articles')
    .then(() => {
      console.log('deleted')
      document.getElementById('articles').innerHTML = ''
    })
    .catch(e => console.error(e))
}

// Save articles
let saveArticles = id => {
  axios.put(`articles/${id}`)
    .then(() => {
      console.log('success')
    })
    .catch(e => console.log(e))
}

// EVENT LISTENERS
document.addEventListener('click', e => {
  if (e.target.id === 'scrapeData') {
    scrapeArticles()
    console.log('hi')
  }

  if (e.target.id === 'deleteData') {
    deleteArticles()
  }

  if (e.target.className === 'waves-effect waves-light btn save') {
    console.log(e.target.dataset.id)
    saveArticles(e.target.dataset.id)
    showArticles()
  }
})
