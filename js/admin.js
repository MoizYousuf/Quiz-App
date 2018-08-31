let listsDiv = document.getElementById("listsDiv");

var length = 5,
  charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  retVal = "";
for (var i = 0, n = charset.length; i < length; ++i) {
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
function addQuizKey() {
  let getUserKey = document.getElementById("getUserKey").value;
  if (key === getUserKey) {
    document.location = "addquiz.html";
  } else {
    console.log("not match");
  }
}
function adminKey() {
  let getAdminKey = document.getElementById("getAdminKey").value;
  if (key === getAdminKey) {
    document.getElementById("adminKey").className =
      "w3-center w3-light-gray none";
    document.getElementById("users").className =
      "w3-center w3-light-gray block";
    getUserData();
  } else {
    console.log("not match");
  }
}
function generateQuizKey() {
  let generateKey = document.getElementById("generateKey").value;
  if (key === generateKey) {
    let genrateKey;
    (length = 5),
      (charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"),
      (retVal = "");
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    firebase
      .database()
      .ref(`/Quizkey/`)
      .set({
        password: retVal
      })
      .then(success => {
        console.log(success);
        document.getElementById("generateKey").value = "";
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    console.log("not match");
  }
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
        }: <span class='w3-text-green'>${
          correctanswers.percentage
        }%</span></h4>`;
      })}
      `);
      });
    });
}
