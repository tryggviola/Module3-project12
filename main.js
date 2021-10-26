const loginDiv = document.getElementById("login");
const notesDiv = document.getElementById("notes");
const loginButton = document.getElementById("login-button");
const logoutButton = document.getElementById("logout-button");

//Event listener on login button and logout button.
loginButton.addEventListener("click", submit);
logoutButton.addEventListener("click", logout);

let state = {};

const form = document.getElementById("myForm");
const username = document.getElementById("username");
const password = document.getElementById("password");
const note = document.getElementById("note");
const user = document.getElementById("user");

//Focus on the username input field.
(function initialize() {
	document.getElementById("username").focus();

	login();
})();

//Functions that validates the form, sees if you put in a username and password.
function submit(e) {
	e.preventDefault();

	if (form.checkValidity()) {
		localStorage.setItem("user", username.value);
		user.innerText = localStorage.getItem("user");

		login();
	} else {
		document.querySelectorAll(":invalid")[1].focus();
		form.childNodes.forEach((child) => {
			if (child.validity && !child.validity.valid) {
				child.classList.add("error");

				const getError = document.getElementById(`${child.id}-errorMessage`);
				getError.innerText = child.validationMessage;
			}
		});
	}
}

//Function that removes the error message in input fields.
function removeErrorMessage(el) {
	if (el.classList.contains("error")) {
		// check whether the current element contains class 'error'
		el.classList.remove("error");
		el.nextElementSibling.innerText = "";
	}
}

//Function that manipulates the DOM when you log in, the login page hides and the notes on appears.
function login() {
	if (localStorage.getItem("user")) {
		window.history.pushState(state, null, "notes");

		loginDiv.style.display = "none";
		notesDiv.style.display = "block";

		user.innerText = localStorage.getItem("user");
		note.value = localStorage.getItem(`note-${localStorage.getItem("user")}`);
	}
}

//Function that clears the input fields on login screen when you logout and changes it back to the login screen.
function logout() {
	if (localStorage.getItem("user")) {
		localStorage.removeItem("user");
		loginDiv.style.display = "block";
		notesDiv.style.display = "none";

		username.value = "";
		password.value = "";
		username.focus();
		note.value = "";

		window.history.pushState(state, null, "login");
	}
}

//Function that saves the notes that you make on your username.
function saveNote() {
	//Get value of the note
	const noteInput = document.getElementById("note").value;

	//Save the value in local storage.
	localStorage.setItem(`note-${localStorage.getItem("user")}`, noteInput);
	note.value = localStorage.getItem(`note-${localStorage.getItem("user")}`);
}
