//BOOK CONSTRUCTOR
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

////////////////////////////////////////////////////////////////////////////////

//UI CONSTRUCTOR
function UI() { }

///////////////////////////////////////////////////////////////////////////////////

//ADD BOOK TO LIST
UI.prototype.addBookToList = function (book) {
    const list = document.getElementById('book-list');
    //Create tr element
    const row = document.createElement('tr')
    //Insert cols
    row.innerHTML=`
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td><a href="#" class="delete">X</a></td>

    `;
    list.appendChild(row)
    
}
////////////////////////////////////////////////////////////////////////////////////

//SHOWALERT
UI.prototype.showAlert=function(message, className){
    //create div
    const div = document.createElement('div')
    //Add classes
    div.className=`alert ${className}`
    div.appendChild(document.createTextNode(message))
    //Get parent
    const container=document.querySelector('.container')
    //Get form
    const form=document.querySelector("#book-form")
    //Insert alert
    container.insertBefore(div,form)

    //Disappear after 3 seconds
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000)
}

////////////////////////////////////////////////////////////////////////////////////

//Delete book
UI.prototype.deleteBook=function(target){
    if(target.className==="delete"){
        target.parentElement.parentElement.remove()
    }
}

//CLEAR FIELDS

UI.prototype.clearFields=function(){
    document.getElementById('title').value=''
    document.getElementById('author').value=''
    document.getElementById('isbn').value=''
}

////////////////////////////////////////////////////////////////////////////////////////

//EVENTLISTENERS
document.getElementById('book-form').addEventListener('submit', function (e) {

//Get form values
const title = document.getElementById('title').value,
author = document.getElementById('author').value,
isbn = document.getElementById('isbn').value;


//Instantiate book
const book = new Book(title, author, isbn)

//Instantiate UI
const ui = new UI()

//VALIDATE
if(title==='' || author==='' || isbn===''){
    //Error alert
    ui.showAlert('Please fill in all fields', 'error')
} else{
    //Add book to list
ui.addBookToList(book)

//Sucess message for book added fingers crossed
ui.showAlert(`${book.title} was successfully added`, 'success')

//Clear fields
ui.clearFields()
}



console.log(book)
e.preventDefault();
})

///////////////////////////////////////////////////////////////////////////////////////////////

//EVENT LISTENER FOR DELETE
document.getElementById('book-list').addEventListener('click', function(e){

    
    //Instantiate UI
    const ui=new UI()
    ui.deleteBook(e.target)
//Show message
ui.showAlert(`a book was removed`,'success')

    e.preventDefault()
})