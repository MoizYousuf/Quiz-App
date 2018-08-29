function login() {
  let email = document.getElementById("inputEmail").value;
  let password = document.getElementById("inputPassword").value;
  let firstName = localStorage.getItem("firstName");
  let lastName = localStorage.getItem("lastName");
  let fullName = firstName + lastName;
  console.log(fullName)
  // firebase

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(success => {
      console.log(success);
      firebase.auth().currentUser.updateProfile({
        displayName: fullName,
      }).then(() => {
      document.location = "../html/index.html";
    })
    })
    .catch(error => {
      console.log(error);
    });
}
