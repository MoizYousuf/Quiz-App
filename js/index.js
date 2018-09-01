localStorage.setItem("adminUid", "ve8FYPaEmkVNPOPboncCJU8ybiq1");
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

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    localStorage.setItem("uid", user.uid);
    // User is signed in.
  } else {
    document.location = "../html/login.html";
  }
});

function logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      document.location = "login.html";
    });
}

function totalUsers() {
  let totalUsers = document.getElementById("totalUsers");
  let body = document.getElementById("modal");

  firebase
    .database()
    .ref(`users/`)
    .on("value", snapshot => {
      let usersData = Object.values(snapshot.val());
      usersData.map((value, index) => {
        totalUsers.innerHTML = `${usersData.length - 1}`;
        if (localStorage.getItem("adminUid") == value.uid) {
        } else {
          return body.innerHTML += `
          <h3 class="w3-light-gray"><b>Username:</b> ${value.firstName + value.lastName} and <b>Uid:</b> ${value.uid}</h3>
        `;
        }
      });

      console.log(usersData);
    });
}
totalUsers();
