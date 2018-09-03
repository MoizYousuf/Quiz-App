firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    if(user.email == 'moiz@gmail.com'){
      document.location = "./html/indexAdmin.html";
    }else{
      document.location = "./html/index.html";
    }
  } else {
  }
});

function login() {
  let email = document.getElementById("inputEmail").value;
  let password = document.getElementById("inputPassword").value;
  let adminData;
  // firebase

      firebase
        .database()
        .ref(`Admin/`)
        .on("value", snapshot => {
          adminData = snapshot.val();
          console.log(adminData);
          if (email == adminData.email && password == adminData.password) {
            firebase
              .auth()
              .signInWithEmailAndPassword(email, password)
              .then(success => {
                // console.log(success);
                document.location = "./html/indexAdmin.html";
              })
              .catch(error => {
                console.log(error);
              });
          } else {
            firebase
              .auth()
              .signInWithEmailAndPassword(email, password)
              .then(success => {
                // console.log(success);
                document.location = "./html/index.html";
              })
              .catch(error => {
                console.log(error);
              });
          }
        });
    
}
