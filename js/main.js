var fireBaseRef = new Firebase("https://commentapplication.firebaseio.com/")


function addComment() { 
	// get the username and comment and store in variables
	var username = document.getElementById("username").value // value is always used for the input
	var comment = document.getElementById("comment").value 

    // add the new comment as an object to firebase
	fireBaseRef.push({usernameDATA: username, commentDATA: comment})
	
	
}
	// save the data to the page
	fireBaseRef.on('child_added', function(snapshot) { // child_added notifies the arrival of individual messages
	
	var firebaseData = snapshot.val() // stores all current comments from database

	var createUsername = document.createTextNode('Name: ' + firebaseData.usernameDATA) 
	var createComment = document.createTextNode('Comment: ' + firebaseData.commentDATA) 

	// Create element
	var listItem = document.createElement('LI') 
	listItem.className = "list-group-item"

	// Create image
	var newImg = document.createElement('img') 
	newImg.setAttribute('id', 'image')
	newImg.setAttribute('src', 'https://raw.githubusercontent.com/stevengangano/commentapp/master/img/giantsICON.png') 
	listItem.appendChild(newImg) 

	
	// Create Date
	var todaysDate = document.createElement('p') 
	todaysDate.setAttribute('id', 'theDate')
	var today = new Date()
	var theDate = today.toDateString()
	var createDate = document.createTextNode(theDate)
	todaysDate.appendChild(createDate)
	listItem.appendChild(todaysDate)


	// Create Username and Comment
	var newUsername2 = document.createElement("H3")
	newUsername2.appendChild(createUsername) // H3 is appended to var createdusername. this is saved since it is linked with firebaseData.
	var newComment2 = document.createElement("P")
	newComment2.appendChild(createComment)// p is appended to to var created comment. this is saved since it is linked with firebaseData.
	listItem.setAttribute('id', 'aList' )
	listItem.appendChild(newUsername2)
	listItem.appendChild(newComment2)

	// Create Button
	var removeButton = document.createElement('button')
	removeButton.setAttribute("class", "btn btn-danger btn-sm")
	removeButton.setAttribute("id", "delete")
	removeButton.setAttribute("onclick", "deleteButton(this);")
	removeButton.innerHTML = ('Delete')
	listItem.appendChild(removeButton)

	if ('username.value' && 'comment.value' == ''){
		alert ('Add something!')
	} else {

	document.getElementById('commentList').appendChild(listItem) // Displays <li>

} 
	username.value=''
	comment.value='' 
	username.focus() 
	comment.focus()
	username.focus()
	
}) // end function snapshot



function searchKeyPress(e) {
    // look for window.event in case event isn't passed in
    e = e || window.event;
    if (e.keyCode == 13)
    {
        document.getElementById('button').click();
        return false;
    }
    return true;
}

function deleteButton (item) {
		var remove = item.parentNode
		remove.parentNode.removeChild(remove)
	}

function reset () {
	username.value = ''
	comment.value = ''
}