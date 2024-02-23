



import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
  import { getAuth, onAuthStateChanged ,signOut} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
  import {  getFirestore,collection, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
  import { getStorage,ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

  
  const firebaseConfig = {
    apiKey: "AIzaSyB7wsOkOJaG6YlvphI6zNNNSg-IrYx1NjM",
    authDomain: "talha-askhubblogs.firebaseapp.com",
    projectId: "talha-askhubblogs",
    storageBucket: "talha-askhubblogs.appspot.com",
    messagingSenderId: "657780442786",
    appId: "1:657780442786:web:ab179be9738ae80c76b9fb",
    measurementId: "G-52T3C2TDDG"
  };


  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);

let currentPage = window.location.pathname.split('/').pop();
let writeBtn = document.getElementById("writeBtn");
console.log(currentPage)


// radio Button Value chec ///



let saveBtn =document.getElementById("save");









const imageUpload = () => {
  return new Promise((resolve, reject) => {
    const fileEl = document.getElementById("file");
    const file = fileEl.files[0];

    if (!file) {
      reject(new Error("No file selected."));
      return;
    }

    const metadata = {
      name: file.name,
      size: file.size,
      type: file.type,
    };

    const fileName = `${file.name}_${Date.now()}`;
    const storageRef = ref(storage, 'images/' + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on('state_changed',
      (snapshot) => {
        // Track upload progress if needed
      },
      (error) => {
        reject(error); // Reject promise on upload error
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            resolve(downloadURL); // Resolve promise with download URL
          })
          .catch((error) => {
            reject(error); // Reject promise if getting download URL fails
          });
      }
    );
  });
};




const writeBlog = async ()=>{

  let typeVal =null;
  let statusVal=null;

  
   

//<****** Get title Value *****>

let title = document.getElementById("title");
let titleVal = title.value;
console.log(titleVal)

//<****** value checked for status *****>  
  let selection =document.getElementById("category")
let slectionVal =selection.value;
console.log(slectionVal)
  // <*******value check for type *******>
  let typeValRadio = document.getElementsByName("type")
  for(let i=0 ;i<typeValRadio.length ; i++){
    if(typeValRadio[i].checked){
         typeVal =typeValRadio[i].value;
         console.log(typeVal)
    }
  }

//<****** value checked for status *****>

  let radioBtnValue = document.getElementsByName("status")
  for(let i=0 ;i<radioBtnValue.length ; i++){
    if(radioBtnValue[i].checked){
         statusVal =radioBtnValue[i].value;
         console.log(statusVal)
    }
  }

//<****** Get value of description  *****>


  let description =document.getElementById("description")
  let descriptionVal =description.value;

  //<****** Get Image from database  *****>




  let imageUrl;
  try {
    imageUrl = await imageUpload();
  } catch (error) {
    console.error("Error uploading image:", error);
    return; // Exit function if image upload fails
  }




  const checkLogin2 =()=>{

    onAuthStateChanged(auth, (user) => {
      if (user) {
       
        const uid = user.uid;
     
      //  user = auth.currentUser;
      console.log(auth.currentUser)
        // ...
      } else {
        // User is signed out
        // ...
      
      }
  
      
    });
  }
  
  checkLogin2()
  


  const id = new Date().getTime()
  const payload ={
    id:id,
    title:titleVal,
    option:slectionVal,
    typeValue:typeVal,
    statusValue:statusVal,
    description:descriptionVal,
    imageUrl:imageUrl ,
    date:id,
    userName:auth.currentUser.displayName
    
    
  
  }


  // await setDoc(doc(db, "Blogs", `${id}`), payload)
  try {
    await setDoc(doc(db, "Blogs", `${id}`), payload);
    console.log("Blog successfully written to Firestore.");
    alert("Successfully upload")
    titleVal="";
    slectionVal="";
  } catch (error) {
    console.error("Error writing blog to Firestore:", error);
  }
   
}









saveBtn && saveBtn.addEventListener("click",writeBlog)








// <-------LOG OUT FUNCTION------->


let logout = (e)=>{
  e.preventDefault(); 
  signOut(auth).then(() => {
    // Sign-out successful.
    if(currentPage !=="index.html"){
      window.location.href="index.html"
    }
   console.log("hello")
  }).catch((error) => {
    // An error happened.
  });

  
}

let logoutBtn = document.getElementById("logoutBtn");
logoutBtn && logoutBtn.addEventListener("click",logout)

// <-------CLOSE------->