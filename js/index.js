
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
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