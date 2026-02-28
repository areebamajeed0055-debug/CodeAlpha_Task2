let currentInput = "";
let previousInput = "";
let operator = null;

const display = document.getElementById("display");
const history = document.getElementById("history");

function appendNumber(number) {
  if (number === "." && currentInput.includes(".")) return;
  currentInput += number;
  updateDisplay();
}

function appendOperator(op) {
  if (currentInput === "") return;
  if (previousInput !== "") {
    calculate();
  }
  operator = op;
  previousInput = currentInput;
  currentInput = "";
  history.innerText = previousInput + " " + op;
}

function calculate() {
  if (previousInput === "" || currentInput === "") return;

  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  switch (operator) {
    case '+': result = prev + current; break;
    case '-': result = prev - current; break;
    case '*': result = prev * current; break;
    case '/': result = current !== 0 ? prev / current : "Error"; break;
    default: return;
  }

  history.innerText = previousInput + " " + operator + " " + currentInput;
  currentInput = result.toString();
  operator = null;
  previousInput = "";
  updateDisplay();
}

function clearAll() {
  currentInput = "";
  previousInput = "";
  operator = null;
  display.innerText = "0";
  history.innerText = "";
}

function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

function updateDisplay() {
  display.innerText = currentInput || "0";
}

document.addEventListener("keydown", function (event) {
  const key = event.key;

  if (!isNaN(key)) appendNumber(key);
  if (key === ".") appendNumber(".");
  if (["+", "-", "*", "/"].includes(key)) appendOperator(key);
  if (key === "Enter") calculate();
  if (key === "Backspace") deleteLast();
  if (key === "Escape") clearAll();
});