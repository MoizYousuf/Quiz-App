function logout(){
    firebase.auth().signOut().then(() => {
        document.location='login.html'
    })
    }
    let quizName;
    let selection1;

function addQuiz(){

     quizName = document.getElementById('quiz').value;
    passing_percentage = document.getElementById('passingPer').value;

    document.getElementById('quizAdd').className='w3-panel w3-card-4 w3-center none'
    document.getElementById('questionDiv').className='w3-panel w3-card-4 w3-center'
    
    console.log(document.getElementById('quiz').value)
    
}

function addQuestion(){
        let question = document.getElementById('question').value;
        let selection1 = document.getElementById('input1').value;
        let selection2 = document.getElementById('input2').value;
        let selection3 = document.getElementById('input3').value;
        let selection4 = document.getElementById('input4').value;
        let correctIndex = document.getElementById('correctIndex').value;
        
        quizName = quizName.toLowerCase();
        console.log(`Quiz/${quizName}/questions`)
        firebase.database().ref(`Quiz/${quizName}/questions/`).push({
            'question': question,
            "selections": [selection1,selection2,selection3,selection4],
            'correct_index' : correctIndex,
            'passing_percentage' : passing_percentage
            
        }).then(() => {
            console.log('quiz added')
        }).catch((error) => {
            console.log(error)
        })

    }