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

// check user login 

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    localStorage.setItem("uid", user.uid)
    // User is signed in.
  } else {
    document.location='../html/login.html'
  }
});

function logout(){
  firebase.auth().signOut().then(() => {
      document.location='login.html'
  })
  }

function body() {
  listsDiv.innerHTML = "";
  firebase
    .database()
    .ref(`Quiz/`)
    .on("value", snapshot => {
      let data = snapshot.val();
      data = Object.keys(data);
      quiz = Object.values(snapshot.val());
      title = data;
      data.map((value, index) => {
        return (listsDiv.innerHTML += `
        
      <button onclick="quizPassword(${index})" class='w3-btn w3-red w3-block'>${value}</button><br /> 
      `);
      });
    });
}
function quizPassword(index) {
  document.getElementById("id01").style.display = "block";
  let modalDiv = document.getElementById("modalParent");
  modalDiv.innerHTML = "";
  modalDiv.innerHTML = `
  <div id="body" class="w3-center">
  <div class="w3-panel w3-card-4 w3-center" action="/action_page.php">
      <h2 class="w3-jumbo">key for Quiz</h2>
    
      <p><input class="w3-input" type="password" id="Key" placeholder="key"></p>
      <p><button class="w3-btn w3-black" onclick="quizPasswordCheck(${index})">Register</button></p>
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
  let questions = Object.values(quiz[buttonIndex].questions);

  let questionNo = document.getElementById("questionNo");
  let questionDiv = document.getElementById("question");

  correctIndex = questions[count].correct_index;

  questionNo.innerHTML = `${count + 1}`;
  questionDiv.innerHTML = `${questions[count].question}`;
  lastQuestion = count;
  totalQuestions = questions.length;

  questions[count].selections.map((selection, index) => {
    return (modalDiv.innerHTML += `
  <input type='radio' name="selector" onclick="getRadioIndex(${index})" value="${selection}">${selection}<br />
  `);
  });

  // })
  // })
}

function getRadioIndex(index) {
  console.log(index);
  answer = index;
}

function submit() {
  document.getElementById("id01").style.display = "none";
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
          username: user.displayName
        })
        .then(() => {
          console.log("push");
          modalParent.innerHTML = `
        <h1>Your Current Percentage is : <span>${percentage}%</span><br />${check}</h1>
        `;
          percentage = 0;
        });
    } else {
      // User is signed out.
      // ...
    }
  });
  body();
}

body();
