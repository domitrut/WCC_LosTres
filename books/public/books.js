// This is the code for the client application
// This does not contain the solution to the second assignment 

function createBookBox(book) {
    // This is to be replaced by the appropriate code to construct the HTML elements in JavsScript
    const li = document.createElement("LI")
    li.innerHTML = '<div class="bookbox"><img src="https://covers.openlibrary.org/b/id/9251896-L.jpg"><div><h2>Ubik</h2><h3>Philip K. Dick</h3></div><div><span class="star yellowstar">★</span><span class="star yellowstar">★</span><span class="star yellowstar">★</span><span class="star yellowstar">★</span><span class="star">★</span><span>(300)</span></div></div>'
    return li
}

function fillBooks(books) {
    console.log(books)
    const list = document.getElementById("listofbooks")
    list.innerHTML = ""
    for (const idx in books) {
        const li = createBookBox(books[idx])
        list.append(li)
    }
}

function loadAndFillBooks(search) {
    let query = ""
    if( search != undefined )
        query = `?search=${search}`

    fetch('api/books'+query)
    .then(data => data.json())
    .then(books => { fillBooks(books) })
}

function addNewBook() {
    fetch("/api/books", {
        method: "POST",
        headers: {
            'content-type':'application/json;charset=utf-8'
        },
        body: JSON.stringify({title:"data coming from the form"})
    })
}

function applySearch() {
    const input = document.getElementById("searchbox")
    console.log(input)
    const text = input.value
    loadAndFillBooks(text)
}

function installOtherEventHandlers() {
    // Events to open and close menus
    // ...

    // Events to call loadAndFillBooks with a new search value
    document.getElementById("searchbutton").onclick = applySearch
}

window.onload = () => {
    loadAndFillBooks() // If no parameter is given, search is undefined

    installOtherEventHandlers()
}

// DROPDOWN
function dropdown1() {
    document.getElementById("dropdown1").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropdownbutton')) {
  
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
}

//SEARCH FUNCTION
function booksearch() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById('listofbooks');
    li = ul.getElementsByTagName('li');
    
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("h2")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    } 
  }