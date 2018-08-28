let listsDiv = document.getElementById("lists");
let quiz;
let count = 0;

firebase
  .database()
  .ref(`Quiz/`)
  .on("value", snapshot => {
    let data = snapshot.val();
    data = Object.keys(data);
    quiz = Object.values(snapshot.val());

    data.map((value, index) => {
      console.log(value);
      return (listsDiv.innerHTML = `
        <button onclick="quizStart(${index})" class='w3-btn w3-red w3-block'>${value}</button>
        `);
    });
  });
function quizStart(index) {
  document.getElementById("id01").style.display = "block";
  let questions = Object.values(quiz[index].questions);
  let modalDiv = document.getElementById("modal");

  modalDiv.innerHTML = `
Questions No ${count + 1}
${questions[count].question}
${questions[count].selections.map((selection) => {
    return `<p>${(selection)}</p>`;
  })}
`;

  console.log(questions);
}
