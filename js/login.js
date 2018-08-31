function login() {
  let email = document.getElementById("inputEmail").value;
  let password = document.getElementById("inputPassword").value;
  let fullName;
  // console.log(fullName);
  // firebase
 

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(success => {
      // console.log(success);
        document.location = "../html/index.html";
    })
    .catch(error => {
      console.log(error);
    });
}
