import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
  import {  getAuth,updateProfile } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
 
  const firebaseConfig = {
    apiKey: "AIzaSyB7wsOkOJaG6YlvphI6zNNNSg-IrYx1NjM",
    authDomain: "talha-askhubblogs.firebaseapp.com",
    projectId: "talha-askhubblogs",
    storageBucket: "talha-askhubblogs.appspot.com",
    messagingSenderId: "657780442786",
    appId: "1:657780442786:web:ab179be9738ae80c76b9fb",
    measurementId: "G-52T3C2TDDG"
  };

// <<--------CLOSE------->>



  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

// <<--------CLOSE------->>





let updatePro =(e)=>{
e.preventDefault()
    let firstName = document.getElementById("fname").value;
    let lastName = document.getElementById("lname").value;
    let photo = document.getElementById("photo").file;
    console.log(photo)
    
    let fullNmae = firstName + " " + lastName;




    updateProfile(auth.currentUser, {
        displayName: `${fullNmae}`, photoURL: "https://example.com/jane-q-user/profile.jpg"
      }).then(() => {
        // Profile updated!
        // ...
      }).catch((error) => {
        // An error occurred
        // ...
      });
   }

  

   let updateBtn = document.getElementById("update")
   updateBtn && updateBtn.addEventListener("click",updatePro)