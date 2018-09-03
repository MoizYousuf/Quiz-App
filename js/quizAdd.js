let questionNo = 1;

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

// check user login

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    localStorage.setItem("uid", user.uid);
    // User is signed in.
  } else {
    document.location = "../login.html";
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
let quizName;
let selection1;

function addQuiz() {
  quizName = document.getElementById("quiz").value;
  passing_percentage = document.getElementById("passingPer").value;
  if (quizName == "" || quizName == null) {
    alert("Add Title");
  } else if (passing_percentage == "" || passing_percentage == null) {
    alert("Add Passing Percentage");
  } else {
    document.getElementById("quizAdd").className =
      "w3-panel w3-card-4 w3-center none";
    document.getElementById("questionDiv").className =
      "w3-panel w3-card-4 w3-center";

    console.log(document.getElementById("quiz").value);

    document.getElementById("questionNo").innerHTML = `${questionNo}`;
  }
}

function addQuestion() {
  let question = document.getElementById("question").value;
  let selection1 = document.getElementById("input1").value;
  let selection2 = document.getElementById("input2").value;
  let selection3 = document.getElementById("input3").value;
  let selection4 = document.getElementById("input4").value;
  let Marks = document.getElementById("input5").value;
  let correctIndex = document.getElementById("correctIndex").value;

  if (question == "" || question == null) {
    alert("Add Question");
  } else if (selection1 == "" || selection1 == null) {
    alert("Add Selection:1");
  } else if (selection2 == "" || selection2 == null) {
    alert("Add Selection:2");
  } else if (Marks == "" || Marks == null) {
    alert("Add Marks");
  } else if (correctIndex == "" || correctIndex == null) {
    alert("Add Correct Index");
  } else {
    if(selection3 == "" || selection3 == null){

      quizName = quizName.toLowerCase();
      console.log(`Quiz/${quizName}/questions`);
      firebase
        .database()
        .ref(`Quiz/${quizName}/questions/`)
        .push({
          question: question,
          selections: [selection1, selection2],
          correct_index: correctIndex,
          passing_percentage: passing_percentage,
          question_marks: Marks
        })
        .then(() => {
          console.log("quiz added");
          questionNo++;
          document.getElementById("questionNo").innerHTML = questionNo;
          document.getElementById("question").value = "";
          document.getElementById("input1").value = "";
          document.getElementById("input2").value = "";
          document.getElementById("input3").value = "";
          document.getElementById("input4").value = "";
          document.getElementById("input5").value = "";
          document.getElementById("correctIndex").value = "";
        })
        .catch(error => {
          console.log(error);
        });
    }else if(selection4 == "" || selection4 == null){
      quizName = quizName.toLowerCase();
      console.log(`Quiz/${quizName}/questions`);
      firebase
        .database()
        .ref(`Quiz/${quizName}/questions/`)
        .push({
          question: question,
          selections: [selection1, selection2, selection3],
          correct_index: correctIndex,
          passing_percentage: passing_percentage,
          question_marks: Marks
        })
        .then(() => {
          console.log("quiz added");
          questionNo++;
          document.getElementById("questionNo").innerHTML = questionNo;
          document.getElementById("question").value = "";
          document.getElementById("input1").value = "";
          document.getElementById("input2").value = "";
          document.getElementById("input3").value = "";
          document.getElementById("input4").value = "";
          document.getElementById("input5").value = "";
          document.getElementById("correctIndex").value = "";
        })
        .catch(error => {
          console.log(error);
        });
    }else{
    quizName = quizName.toLowerCase();
    console.log(`Quiz/${quizName}/questions`);
    firebase
      .database()
      .ref(`Quiz/${quizName}/questions/`)
      .push({
        question: question,
        selections: [selection1, selection2, selection3, selection4],
        correct_index: correctIndex,
        passing_percentage: passing_percentage,
        question_marks: Marks
      })
      .then(() => {
        console.log("quiz added");
        questionNo++;
        document.getElementById("questionNo").innerHTML = questionNo;
        document.getElementById("question").value = "";
        document.getElementById("input1").value = "";
        document.getElementById("input2").value = "";
        document.getElementById("input3").value = "";
        document.getElementById("input4").value = "";
        document.getElementById("input5").value = "";
        document.getElementById("correctIndex").value = "";
      })
      .catch(error => {
        console.log(error);
      });
    }
  }
}

function end() {
    let confiremThat = confirm(`Question ${questionNo} dont add you add total Questions ${questionNo - 1}`)
    if(confiremThat){
  document.location = "../html/indexAdmin.html";
}
}
