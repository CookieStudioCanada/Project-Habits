// Logs
const log = document.getElementById("log");
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
var yyyy = today.getFullYear();
today = mm + '/' + dd + '/' + yyyy;

// Show the current habits list from firebase...
/* 
It could show every Habits in the same way, it takes the value from firebase instead... 
Each NewHabits create a newHabits after the currents list... 
*/

// New habits lists
const form = document.getElementById("form");
const habitList = document.querySelector("#habitList");
var habitsArray = [];

form.addEventListener("submit", event => {
  event.preventDefault();

  // CANT SUBMIT EMPTY VALUE

  habitList.innerHTML = "";

  const habitInput = document.querySelector("input[name='habit']");
  const habitValue = habitInput.value;

  habitsArray.push(habitValue); // have to store THIS in firebase? habitsArray ou habit Value?

  for (i = 0; i < habitsArray.length; i++) {
    ShowList(i);
  }

  habitInput.value = "";
});

function ShowList(index) {

  var habitValue = habitsArray[index];
  console.log("habit value : " + habitValue);

  const newHabit = { 
    element: document.createElement("div"),
    habitValue: habitValue,
    habitXp: 0,
    habitLevel: 1,
  };

  newHabit.element.className = "habits-list";
  newHabit.element.innerHTML = habitValue;

  const infoButton = document.createElement("button");
  infoButton.innerHTML = "Info";
  infoButton.addEventListener("click", () => {
    openModal(newHabit.habitValue, newHabit.habitXp, newHabit.habitLevel); 
  });

  const addButton = document.createElement("button");
  addButton.innerHTML = "Add";
  addButton.addEventListener("click", () => {

    newHabit.habitXp += 1; // Have to remember this info too!!!

    if (newHabit.habitXp > 9)
    {
      newHabit.habitXp = 0;
      newHabit.habitLevel += 1;
      alert("wow new level :O");
    } else {
      // nothing
    }

    log.innerHTML += "Habit: " + newHabit.habitValue + ". Count: " + newHabit.habitXp + ". Date : " + today +"<br>";

  });

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Delete";
  deleteButton.addEventListener("click", () => {
    newHabit.element.remove();
    habitsArray.splice(index, 1);
  });

  newHabit.element.appendChild(deleteButton);  
  newHabit.element.appendChild(addButton);
  newHabit.element.appendChild(infoButton);

  habitList.appendChild(newHabit.element);
};

// Modal
var modal = document.getElementById("myModal");

// When the user clicks the button, open the modal 
function openModal(name, xp, lvl) {
  modal.style.display = "block";
  var newMess = document.getElementById("modal-message");
  newMess.innerHTML = "Name: " + name + "<br>" + "XP: " + xp + "<br>" + "LVL: " + lvl + "<br>"; 
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


