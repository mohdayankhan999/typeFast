let TIME_LIMIT = 60;
let sample_Tests = [
  "The journey of a thousand miles begins with one step, Lao Tzu",
  "Life is what happens when you’re busy making other plans, John Lennon",
  "When the going gets tough, the tough get going, Joe Kennedy",
  "You must be the change you wish to see in the world, Mahatma Gandhi",
  "You only live once, but if you do it right, once is enough, Mae West",
  "That which does not kill us makes us stronger, Friedrich Nietzsche",
  "Tough times never last but tough people do, Robert H. Schuller",
  "Get busy living or get busy dying, Stephen King",
  "Whether you think you can or you think you can’t, you’re right, Henry Ford",
];

let accuracy_text = document.querySelector(".curr_accuracy");
let error_text = document.querySelector(".curr_errors");
let cpm_text = document.querySelector(".curr_cpm");
let wpm_text = document.querySelector(".curr_wpm");
let test_text = document.querySelector(".test_text");
let input_area = document.querySelector(".input_area");
let timer_text = document.querySelector(".curr_time");
let restart_btn = document.querySelector(".restart_btn");
let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accuracy");
let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_test = "";
let quoteNo = 0;
let timer = null;

function updateTest() {
    test_text.textContent = null;
  current_test = sample_Tests[quoteNo];
  current_test.split('').forEach(char => {
    const charSpan = document.createElement('span')
    charSpan.innerText = char
    test_text.appendChild(charSpan)
  })
  if (quoteNo < sample_Tests.length - 1)
    quoteNo++;
  else
    quoteNo = 0;
}

function processCurrentText() {
  curr_input = input_area.value;
  curr_input_array = curr_input.split('');
  characterTyped++;
  errors = 0;
  quoteSpanArray = test_text.querySelectorAll('span');
  quoteSpanArray.forEach((char, index) => {
    let typedChar = curr_input_array[index]
    if (typedChar == null) {
      char.classList.remove('correct_char');
      char.classList.remove('incorrect_char');
    } else if (typedChar === char.innerText) {
      char.classList.add('correct_char');
      char.classList.remove('incorrect_char');
    } else {
      char.classList.add('incorrect_char');
      char.classList.remove('correct_char');
      errors++;
    }
  });
  error_text.textContent = total_errors + errors;
  let correctCharacters = (characterTyped - (total_errors + errors));
  let accuracyVal = ((correctCharacters / characterTyped) * 100);
  accuracy_text.textContent = Math.round(accuracyVal);
  if (curr_input.length == current_test.length) {
    updateTest();
    total_errors += errors;
    input_area.value = "";
  }
}

function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeElapsed++;
    timer_text.textContent = timeLeft + "s";
  }
  else {
    finishGame();
  }
}

function finishGame() {
  clearInterval(timer);
  input_area.disabled = true;
  test_text.textContent = "Click on restart to start a new game.";
  restart_btn.style.display = "block";
  cpm = Math.round(((characterTyped / timeElapsed) * 60));
  wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));
  cpm_text.textContent = cpm;
  wpm_text.textContent = wpm;
  cpm_group.style.display = "block";
  wpm_group.style.display = "block";
  error_group.style.display = "block";
  accuracy_group.style.display = "block";
}


function startTest() {

  resetValues();
  updateTest();

  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

function resetValues() {
  timeLeft = TIME_LIMIT;
  timeElapsed = 0;
  errors = 0;
  total_errors = 0;
  accuracy = 0;
  characterTyped = 0;
  quoteNo = 0;
  input_area.disabled = false;
  input_area.value = "";
  test_text.textContent = 'Ready to race ?';
  accuracy_text.textContent = 100;
  timer_text.textContent = timeLeft + 's';
  error_text.textContent = 0;
  restart_btn.style.display = "none";
  cpm_group.style.display = "none";
  wpm_group.style.display = "none";
  error_group.style.display = "none";
  accuracy_group.style.display = "none";
}