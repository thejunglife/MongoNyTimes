// builds the articles
let buildArticles = articles => {
  document.getElementById('articles').innerHTML = ''
  articles.forEach(article => {
    let artElem = document.createElement('div')
    artElem.innerHTML = `
	<div class="card" style="width: 49rem;">
  <div class="card-body">
  <a href="${article.url}" class="btn btn-primary">${article.heading}</a>
    <p class="card-text">${article.summary}</p>
     <a data-id=${article._id} class="btn btn-primary saveArticle">Save Article</a>
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

  if (e.target.className === 'btn btn-primary saveArticle') {
    console.log(e.target.dataset.id)
    saveArticles(e.target.dataset.id)
    showArticles()
  }
})
