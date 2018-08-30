
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