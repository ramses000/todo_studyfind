import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where,
    orderBy, 
    getDocs, updateDoc

} from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyCwkIrpdGl-Lz_nBT_D7NZsK3mv7nH2eCw",
    authDomain: "todolistfirebase-e7a87.firebaseapp.com",
    projectId: "todolistfirebase-e7a87",
    storageBucket: "todolistfirebase-e7a87.appspot.com",
    messagingSenderId: "85488989773",
    appId: "1:85488989773:web:7c4939386d4749e4960e04"
  };
//initialize app
initializeApp(firebaseConfig);
//init services
const db = getFirestore()
// collection ref
const colRef = collection(db, 'newtasks')


let hidden = true;

const shoppingListEl = document.getElementById("taskList")
//Code for realtime collection data
const stan = query(colRef, where("visibility", "==", true))
onSnapshot(stan,(snapshot)=>{
    let books = []
    snapshot.docs.forEach((doc)=> {
        books.push({...doc.data(), id:doc.id})
    })
    console.log(books)
//My code
    shoppingListEl.innerHTML = ""

    if (books.length>0) {
        emptyTasks.textContent = ""
    for (let i = 0; i < books.length; i++) {
        
        let currentItem = books[i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]
        appendItemToShoppingListEl(currentItem)
    }  
}
else{
    let emptyTasks = document.getElementById("emptyTasks")
    emptyTasks.textContent = "This is the perfect time to add some of your tasks"
}
});

   

function appendItemToShoppingListEl(item) {
    
    let itemID = item.id
    let itemValue = item.name
    let itemDate = item.dateAsString
    
    

    let newEl = document.createElement("li")
    newEl.textContent = `Your task: ${itemValue} is due: ${itemDate}`
    newEl.addEventListener("click", function() {
        const docRef = doc(db, 'newtasks',itemID);
        updateDoc(docRef,{visibility: false})
    })
    shoppingListEl.append(newEl)
}

const addTaskForm = document.querySelector('.add')
addTaskForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    name: addTaskForm.name.value,
    date: addTaskForm.dueDate.valueAsNumber,
    dateAsString: addTaskForm.dueDate.value,
    visibility: true,
  })
  .then(() => {
    addTaskForm.reset()
  })
  const stan = query(colRef, where("visibility", "==", true))
  onSnapshot(stan,(snapshot)=>{
      let books = []
      snapshot.docs.forEach((doc)=> {
          books.push({...doc.data(), id:doc.id})
      })
      console.log(books)
  //My code
      shoppingListEl.innerHTML = ""
  
      if (books.length>0) {
          emptyTasks.textContent = ""
      for (let i = 0; i < books.length; i++) {
          
          let currentItem = books[i]
          let currentItemID = currentItem[0]
          let currentItemValue = currentItem[1]
          appendItemToShoppingListEl(currentItem)
      }  
  }
  else{
      let emptyTasks = document.getElementById("emptyTasks")
      emptyTasks.textContent = "This is the perfect time to add some of your tasks"
  }
  });
  
})
const filterTaskForm = document.querySelector('.filter')

filterTaskForm.addEventListener('submit', (e) => {
    
    e.preventDefault()
    const q = query(colRef, where("date", "==", filterTaskForm.date.valueAsNumber),where("visibility", "==", true))
    onSnapshot(q,(snapshot)=>{
        let books = []
        snapshot.docs.forEach((doc)=> {
            books.push({...doc.data(), id:doc.id})
        })
        shoppingListEl.innerHTML = ""


        for (let i = 0; i < books.length; i++) {
            
            let currentItem = books[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            appendItemToShoppingListEl(currentItem)
        }
    
    
    });

  })
  const sortDate = document.getElementById('sortEl')
  sortDate.addEventListener('click', () => {

    const q = query(colRef, where("visibility", "==", true), orderBy("date", 'asc'))
    onSnapshot(q,(snapshot)=>{
        let books = []
        snapshot.docs.forEach((doc)=> {
            books.push({...doc.data(), id:doc.id})
        })
        shoppingListEl.innerHTML = ""


        for (let i = 0; i < books.length; i++) {
            
            let currentItem = books[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            appendItemToShoppingListEl(currentItem)
        }
    
    
    });
    
})

const sortName = document.getElementById('nameSortEl')
sortName.addEventListener('click', () => {

  const q = query(colRef, orderBy("name", 'asc'),where("visibility", "==", true))
  onSnapshot(q,(snapshot)=>{
      let books = []
      snapshot.docs.forEach((doc)=> {
          books.push({...doc.data(), id:doc.id})
      })
      shoppingListEl.innerHTML = ""


      for (let i = 0; i < books.length; i++) {
          
          let currentItem = books[i]
          let currentItemID = currentItem[0]
          let currentItemValue = currentItem[1]
          appendItemToShoppingListEl(currentItem)
      }
  
  
  });
})

const hide = document.getElementById('hide')
hide.addEventListener('click', () => {
const q = query(colRef, where("visibility", "==", true))
onSnapshot(q,(snapshot)=>{
    let books = []
    snapshot.docs.forEach((doc)=> {
        books.push({...doc.data(), id:doc.id})
    })
    shoppingListEl.innerHTML = ""


    for (let i = 0; i < books.length; i++) {
        
        let currentItem = books[i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]
        appendItemToShoppingListEl(currentItem)
    }


});
hidden = true;
})
const unhide = document.getElementById('unhide')
unhide.addEventListener('click', () => {
    const q = query(colRef)
    onSnapshot(q,(snapshot)=>{
        let books = []
        snapshot.docs.forEach((doc)=> {
            books.push({...doc.data(), id:doc.id})
        })
        shoppingListEl.innerHTML = ""
    
    
        for (let i = 0; i < books.length; i++) {
            
            let currentItem = books[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            appendItemToShoppingListEl(currentItem)
        }
    
    
    });
    hidden = false;
    })



      




    const clear = document.getElementById('del')
    clear.addEventListener('click', (clearFun))
async function clearFun(){
    const q = query(colRef, where('visibility', '==', false))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(doc => {
        deleteDoc(doc.ref)
      })
    }     