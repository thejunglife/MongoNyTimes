
// function for modal for article comments
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
  <a href="${article.url}" target ="_blank" class="btn btn-primary heading">${article.heading}</a>
    <p class="card-text">${article.summary}</p>
    <button type="button" class="btn btn-primary comment" data-toggle="modal" data-target="#${article._id}">
      Article Comment
    </button>
 <button class="btn btn-primary delSaved" id="a${article._id}">Delete From Saved</button>
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
  <ul class="list-group" id='r${article._id}'>
  <li class="list-group-item"></li>
</ul>
      <div class="modal-body">
       <textarea class="form-control" id="t${article._id}" rows="3"></textarea>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary textarea" data-id="t${article._id}" data-dismiss="modal">Save changes</button>
      </div>
    </div>
  </div>
</div>


		`
    document.getElementById('savedArticles').append(artElem)
  })
}

// build comment list within a saved article

let buildComments = (comments, id) => {

document.getElementById(`r${id}`).innerHTML = ''
comments.forEach(comment => {
  let listElem = document.createElement('li')
  listElem.className = 'list-group-item'
  // listElem.id = `${comment._id}`
  listElem.innerHTML = `
  ${comment.notes}
  <button type="button" class="btn btn-danger delete" data-id = "${comment._id}" data-dismiss="modal">delete</button>
  `
  document.getElementById(`r${id}`).append(listElem)
 
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

// grabs comment from textarea
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
// Event to show comments when article comment is clicked
  if (e.target.className === 'btn btn-primary comment') {
    let datasetId = e.target.dataset.target
    let commentId = datasetId.slice(1)
    showNote(commentId)
  }

  if (e.target.className === 'btn btn-danger delete') {
    let datasetId = e.target.dataset.id
    deleteNote(datasetId)
    
  }
 
 if (e.target.className === 'btn btn-primary delSaved') {
   let articleId = e.target.id.slice(1)
    deleteArticle(articleId)
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

// delete comment
let deleteNote = deleteId => {
  axios.delete(`/comments/${deleteId}`)
      .then(() => {
        
      })
      .catch(e => console.error(e))
}

//show comment(s) on article
let showNote = commentId => {
  axios.get(`/comments/${commentId}`)
      .then(({ data }) => {
        buildComments(data, commentId)
      })
      .catch(e => console.error(e))
}

// delete article from saved 
let deleteArticle = deleteArt => {
  axios.delete(`/article/${deleteArt}`)
      .then(() => {
    savedArticles()
      })
      .catch(e => console.error(e))
}
