let listsDiv = document.getElementById("lists");
let quiz;
let count = 0;
let answer;
let correctIndex;
let title;
let buttonIndex;
let correctAnswers = 0;
let lastQuestion;
let totalQuestions;
let totalNumber = 0;
let passingPercentage = 0;
let userUid = localStorage.getItem("uid");
let fullName;
let checkAlready = "submit";
let uid;
let data;

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
    document.location = "../index.html";
  }
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    localStorage.setItem("uid", user.uid);
    // User is signed in.
  } else {
    document.location = "../index.html";
  }
});

function logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      document.location = "index.html";
    });
}

function body() {
  listsDiv.innerHTML = "";
  firebase
    .database()
    .ref(`Quiz/`)
    .on("value", snapshot => {
      data = snapshot.val();
      data = Object.keys(data);
      quiz = Object.values(snapshot.val());
      title = data;
      data.map((value, index) => {
        return (listsDiv.innerHTML += `
        
      <button  onclick="quizPassword(${index})" class=' w3-red ' style='width: 91%;'>${value}</button>
      <button class="remove w3-hover-red" onclick='remove(${index})'>&times;</button><br /> <br />
      `);
      });
    });
}
function remove(index) {
  let nothing = Object.values(quiz[index]);
  var txt;
  var r = confirm("Press a button!");
  if (r == true) {
    firebase
      .database()
      .ref(`Quiz/${data[index]}`)
      .set({});
    body();
  } else {
  }
}
function quizPassword(index) {
  uid = localStorage.getItem("uid");
  document.getElementById("id01").style.display = "block";
  let complete = "";
  if (quiz[index].correctanswers) {
    let checkUsers = Object.values(quiz[index].correctanswers);
    checkUsers.map((value, index) => {
      if (value.uid == uid) {
        checkAlready = "Restart Quiz";
        complete = `<h1 class="w3-text-red"><span class='w3-text-blue'>Your Score : ${
          value.percentage
        }%<span></h1> `;
      } else {
        checkAlready = "take";
      }
    });
  }
  // console.log(checkUsers);
  let modalDiv = document.getElementById("modalParent");
  modalDiv.innerHTML = "";
  modalDiv.innerHTML = `
  <div id="body" class="w3-center">
  <div class="w3-panel w3-card-4 w3-center" action="/action_page.php">
  ${complete}
      <h2 class="w3-jumbo">key for Quiz</h2>
    
      <p><input class="w3-input" type="password" id="Key" placeholder="key"></p>
      <p><button class="w3-btn w3-black" onclick="quizPasswordCheck(${index})">${checkAlready}</button></p>
  </div>
</div>
`;
}
function quizPasswordCheck(index) {
  let input = document.getElementById("Key").value;
  let modalDiv = document.getElementById("modalParent");

  firebase
    .database()
    .ref("/Quizkey")
    .on("value", snapshot => {
      if (input == snapshot.val().password) {
        document.getElementById("id01").style.display = "none";
        modalDiv.innerHTML = `
  <p>Question No: <span id="questionNo"></span></p>
                    <h1> Question:<span id="question"></span></h1>
                    <div id="modal"></div>
                    <button class="w3-btn w3-black" onclick="submit()">Submit</button>
  `;
        quizStart(index);
      } else {
        console.log("not match");
      }
    });
}
function quizStart(index) {
  if (index !== undefined) buttonIndex = index;

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      firebase
        .database()
        .ref(`users/${user.uid}`)
        .on("value", snapshot => {
          let getName = snapshot.val();
          // console.log(getName.firstName);
          fullName = getName.firstName + getName.lastName;
          firebase
            .auth()
            .currentUser.updateProfile({
              displayName: fullName
            })
            .then(() => {
              // console.log(fullName);
            });
        });
    } else {
      // No user is signed in.
    }
  });
  // let correctanswers = Object.values(quiz[buttonIndex]);
  // firebase.auth().onAuthStateChanged(function(user) {
  // correctanswers.map((value, index) => {

  // document.getElementById("id01").style.display = "block";
  // let modalParent = document.getElementById("modalParent");
  // modalParent.innerHTML=`
  // <h1>Complete ${correctanswers[index].percentage}%</h1>
  // `

  let modalDiv = document.getElementById("modal");
  modalDiv.innerHTML = "";
  document.getElementById("id01").style.display = "block";

  let questionNo = document.getElementById("questionNo");
  let questionDiv = document.getElementById("question");
  let questions = Object.values(quiz[buttonIndex].questions);
  let selectionString;
  correctIndex = questions[count].correct_index;

  console.log(selectionString);
  questionNo.textContent = `${count + 1}`;
  questionDiv.textContent = `${questions[count].question}`;
  lastQuestion = count;
  totalQuestions = questions.length;

  questions[count].selections.map((selection, index) => {
    console.log(selectionString);
    selectionString = selection.toString();
    var span = document.createElement("span");
    var br = document.createElement("br");
var node = document.createTextNode(`${selectionString}`);
span.appendChild(node);
let returnModal = modalDiv.innerHTML += `<input type="radio" class='radio' name="selector" onclick="getRadioIndex(${index})" value="${selectionString}">`
modalDiv.appendChild(span)
modalDiv.appendChild(br);

return (returnModal);
span
// })
// })
  });
  // modalDiv.textContent += `>`;
}

function getRadioIndex(index) {
  console.log(index);
  if(index){
    answer = index;
  }else{
    alert("please select")
  }
}

function submit() {
  document.getElementById("id01").style.display = "none";
  if(answer){
  if (answer === correctIndex - 1) {
    console.log("right answer");
    ++correctAnswers;
    let questions = Object.values(quiz[buttonIndex].questions);
    passingPercentage = Number(questions[count].passing_percentage);
    totalNumber += Number(questions[count].question_marks);
    console.log(correctAnswers);
    console.log(totalNumber);
  } else {
    console.log("Wrong Answer");
    console.log(correctAnswers);
  }
  if (lastQuestion + 1 == totalQuestions) {
    // function
    body();
    saveToTheDatabaseAndShowPercentage();
    console.log("end");
  } else {
    console.log(lastQuestion + 1, totalQuestions);
    count++;

    quizStart();
    body();
  }
}else{
  alert('select selection')
  quizStart();
}
}

function saveToTheDatabaseAndShowPercentage() {
  document.getElementById("modalParent").innerHTML = "";

  document.getElementById("id01").style.display = "block";
  let percentage = (totalNumber / 100) * 100;
  console.log(percentage);
  let modalParent = document.getElementById("modalParent");
  let check;
  count = 0;

  if (percentage >= passingPercentage) {
    check = "Congrats Passed";
  } else {
    check = "Sorry you are failed";
  }

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log(user);
      // User is signed in.
      firebase
        .database()
        .ref(`Quiz/${title[buttonIndex]}/correctanswers/${user.uid}/`)
        .set({
          correctAnswers: correctAnswers,
          percentage: percentage,
          username: user.displayName,
          uid: uid
        })
        .then(() => {
          console.log("push");
          modalParent.innerHTML = `
        <h1>Your Score is : <span>${percentage}%</span><br />${check}</h1>
        `;
          percentage = 0;
          totalNumber = 0;
          console.log(percentage);
          body();
        });
    } else {
      // User is signed out.
      // ...
    }
  });
}

body();
