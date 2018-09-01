function logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        document.location = "login.html";
      });
  }
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      localStorage.setItem("uid", user.uid);
      firebase
        .database()
        .ref(`users/${user.uid}/`)
        .on("value", snapshot => {
          let userData = snapshot.val();
          document.getElementById("usernamePlace").innerHTML =
            userData.firstName + userData.lastName;
        });
    } else {
      document.location = "../html/login.html";
    }
  });
function sendMessage() {
    let inputVal = document.getElementById("input").value;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        firebase
          .database()
          .ref(`messages_to_Admin/`)
          .push({
            message: inputVal,
            sendBy: 'Admin',
            sendByName: 'Admin',
          });
        document.getElementById("input").value = "";
        displayMessages();
        // User is signed in.
      } else {
        document.location = "../html/login.html";
      }
    });
  
  }
  function displayMessages(){
    document.getElementById('messages').innerHTML='';
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          firebase
            .database()
            .ref(`messages_to_Admin/`)
            .on("value", snapshot => {
              let messages = Object.values(snapshot.val());
              console.log(messages)
              messages.map((value, index) => {
                  return document.getElementById('messages').innerHTML += `
                  <h4><b>${value.sendByName}</b> : ${value.message}</h4>
                  `
                });
            });
        } else {
        }
      });
  }
  displayMessages();