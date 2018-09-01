let listsDiv = document.getElementById("listsDiv");
// get Username

// check user login

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

let length = 5,
  charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  retVal = "";
for (let i = 0, n = charset.length; i < length; ++i) {
  retVal += charset.charAt(Math.floor(Math.random() * n));
}
firebase
  .database()
  .ref(`/key/`)
  .set({
    password: retVal
  })
  .then(success => {
    console.log(success);
  })
  .catch(error => {
    console.log(error);
  });
let key;
firebase
  .database()
  .ref("/key/password")
  .on("value", snapshot => {
    key = snapshot.val();
  });

function removeQuizKey() {
  firebase
    .database()
    .ref(`Quizkey`)
    .set({});
}

function addQuizKey() {
  document.location = "addquiz.html";
}
function adminKey() {
  document.getElementById("adminKey").className =
    "w3-center none";
  document.getElementById("users").className = "w3-center block";

  getUserData();
}

function generateQuizKey() {
  let genrateKey;
  let length = 5;
  let charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let retVal = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  firebase
    .database()
    .ref(`/Quizkey/`)
    .set({
      password: retVal
    })
    .then(() => {
      console.log("generate");
    })
    .catch(() => {
      console.log("not generate");
    });
}
function logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      document.location = "login.html";
    });
}
function getUserData() {
  listsDiv.innerHTML = ``;
  firebase
    .database()
    .ref(`/Quiz`)
    .on("value", snapshot => {
      let data = snapshot.val();
      data = Object.keys(data);
      console.log(data);
      let quiz = Object.values(snapshot.val());
      console.log(quiz);
      data.map((value, index) => {
        let usernamePercentage = Object.values(quiz[index].correctanswers);
        console.log(usernamePercentage);
        return (listsDiv.innerHTML += `
        
      <h2 class='w3-blue'>Quiz(${index + 1}) : ${value}</h3> 
      ${usernamePercentage.map((correctanswers, index) => {
        return `<h4 class='w3-text-red'>${
          correctanswers.username
        }: <span class='w3-text-blue'>${
          correctanswers.percentage
        }%</span></h4>`;
      })}
      `);
      });
    });
}
