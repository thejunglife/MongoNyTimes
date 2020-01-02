// open the modal
// document.addEventListener('click', e => {
//   if (e.target.className === 'waves-effect waves-light btn modal-trigger') {
//   }
// })

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modal')
  var instances = M.Modal.init(elems)
})

$('#myModal').on('shown.bs.modal', function() {
  $('#myInput').trigger('focus')
})



// builds the articles
let buildSaved = articles => {
document.getElementById('savedArticles').innerHTML = ''
  articles.forEach(article => {
    let artElem = document.createElement('div')
    artElem.innerHTML = `
	<div class="card" style="width: 49rem;">
  <div class="card-body">
  <a href="${article.url}" class="btn btn-primary">${article.heading}</a>
    <p class="card-text">${article.summary}</p>
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#${article._id}">
      Article Comment
    </button>
  </div>
</div>

<!-- Modal -->
<div class="modal fade" id="${article._id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
       <textarea class="form-control" id="${article._id}" rows="3"></textarea>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>


		`
    document.getElementById('savedArticles').append(artElem)
  })
}

// show saved articles on saved.HTML
let savedArticles = () => {

  // let articles = [{2: 2}, {2:  3}]
  // buildSaved(articles)
  axios.get('savedArticles')
    .then(({ data }) => {
      buildSaved(data)
    })
    .catch(e => console.error(e))
}
savedArticles()
