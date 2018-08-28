var length = 5,
charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
retVal = "";
for (var i = 0, n = charset.length; i < length; ++i) {
retVal += charset.charAt(Math.floor(Math.random() * n));
}
firebase.database().ref(`/key/`).set({
password: retVal,
}).then((success) =>{
console.log(success);
}).catch((error) => {
console.log(error);
});
let key;
firebase.database().ref("/key/password").on('value', (snapshot) =>{
    key = snapshot.val();
})

function adminKey(){
    let getKey = document.getElementById('getKey').value
            if(key === getKey){
                document.location = 'addquiz.html'
            }else{
                console.log('not match')
            }
}
function logout(){
    firebase.auth().signOut().then(() => {
        document.location='login.html'
    })
    }