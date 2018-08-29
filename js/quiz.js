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
        
      <button onclick="quizStart(${index})" class='w3-btn w3-red w3-block'>${value}</button><br /> 
      `);
      });
    });
}

function quizStart(index) {
  if (index !== undefined) buttonIndex = index;
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
}

function getRadioIndex(index) {
  var radioList = document.getElementsByTagName("input");
  console.log(index);
  answer = index;
}

function submit() {
  document.getElementById("id01").style.display = "none";
  if (answer === correctIndex - 1) {
    console.log("right answer");
    ++correctAnswers;
    let questions = Object.values(quiz[buttonIndex].questions);
    passingPercentage = Number(questions[count].passing_percentage)
    totalNumber += Number(questions[count].question_marks);
    console.log(correctAnswers);
    console.log(totalNumber);
  } else {
    console.log("Wrong Answer");
    console.log(correctAnswers);
  }
  if (lastQuestion + 1 == totalQuestions) {
    // function
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

  if(percentage >= passingPercentage){
    check = "Congrats Passed"
  }else{
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
        count = 0;
        });
    } else {
      // User is signed out.
      // ...
    }
  });
  // body();
}

body();
