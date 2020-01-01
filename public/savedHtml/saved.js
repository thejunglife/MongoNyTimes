// open the modal
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modal')
  var instances = M.Modal.init(elems)
})

// builds the articles
let buildSaved = articles => {
document.getElementById('savedArticles').innerHTML = ''
  articles.forEach(article => {
    let artElem = document.createElement('div')
    artElem.innerHTML = `
	
	<div class="row">
    <div class="col s12 m">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
					<span class='card-title'><a target="#" href='${article.url}'>${article.heading}</a></span>
					<p>${article.summary}</p>
					<a  data-id=${article._id} class="waves-effect waves-light btn save">Delete Article</a>
          <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Structure -->
  <div id="modal1" class="modal">
    <div class="modal-content">
      <h4>Modal Header</h4>
      <p>hello</p>
      <p>A bunch of text</p>
      <textarea rows="4" cols="50"></textarea>
    </div>
    <div class="modal-footer">
    <a href="#!" class="modal-close waves-effect waves-green btn-flat">Submit</a>
    </div>
  </div>

		`
    document.getElementById('savedArticles').append(artElem)
  })
}

// show saved articles on saved.HTML
let savedArticles = () => {

  let articles = [1, 2, 3]
  buildSaved(articles)
  // axios.get('savedArticles')
  //   .then(({ data }) => {
  //     buildSaved(data)
  //   })
  //   .catch(e => console.error(e))
}
savedArticles()
