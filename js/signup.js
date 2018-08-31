function signUp(){
    let firstName = document.getElementById('first_name').value;
    let lastName = document.getElementById('last_name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value


    
    // firebase
    
    firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
        console.log(`users/${user.user.uid}`)
        firebase.database().ref(`/users/${user.user.uid}`).set({
           firstName,
           lastName,
           uid : user.user.uid,
           email,
           password
        }).then(() => {
            document.location='login.html'
        })
        })

}