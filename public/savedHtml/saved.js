// open the modal
// document.addEventListener('click', e => {
//   if (e.target.className === 'waves-effect waves-light btn modal-trigger') {
//   }
// })


$('#myModal').on('shown.bs.modal', function() {
  $('#myInput').trigger('focus')
})



//builds the articles
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
       <textarea class="form-control" id="t${article._id}" rows="3"></textarea>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary textarea" data-id="t${article._id}">Save changes</button>
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


document.addEventListener('click', e => {
  if (e.target.className === 'btn btn-primary textarea') {
let notesId = e.target.dataset.id
let realId = notesId.slice(1)
let notes = document.getElementById(notesId).value
let comment = {
  notes: notes,
  parent: realId
}
console.log(comment)
addNote(comment)

document.getElementById(notesId).value = ''
 
  }
 

})

// add comment to article
let addNote = notes => {
  axios.post('/comments', notes)
  .then(() => {
console.log("sucess")
  })
  .catch(e => console.error(e))
}

//show comment on article
let showNote = () => {
  axios.get('/comments')
      .then(({ data }) => {
console.log(data)
      })
      .catch(e => console.error(e))
}
showNote()