const display = document.getElementById('display');

// Thêm số hoặc phép tính vào màn hình
function appendValue(value) {
  if (display.value === '0' || display.value === 'Lỗi') {
    display.value = value;
  } else {
    display.value += value;
  }
}

// Xóa toàn bộ màn hình
function clearDisplay() {
  display.value = '0';
}

// Xóa 1 ký tự cuối cùng
function deleteLast() {
  display.value = display.value.slice(0, -1);
  if (display.value === '') {
    display.value = '0';
  }
}

// Tính kết quả
// Tính kết quả
function calculate() {
  try {
    // Tự động đổi các số có dấu % (ví dụ 80%) thành (80/100)
    const expression = display.value.replace(/(\d+(?:\.\d+)?)%/g, '($1/100)');
    const result = new Function('return ' + expression)();
    
    if (!isFinite(result)) {
      display.value = 'Lỗi';
    } else {
      display.value = result;
    }
  } catch (error) {
    display.value = 'Lỗi';
  }
}
document.addEventListener('keydown', function (event) {
  const key = event.key;
  if ((key >= '0' && key <= '9') || ['+', '-', '*', '/', '%', '.'].includes(key)) {
    appendValue(key);
  } else if (key === 'Enter') {
    event.preventDefault();
    calculate();
  } else if (key === 'Backspace') {
    deleteLast();
  } else if (key === 'Escape') {
    clearDisplay();
  }
});

// Chuyển giữa máy tính có CSS và máy tính HTML thuần
let styledCalculator;
let simpleCalculator;
let simpleForm;
let simpleFirstNumber;
let simpleSecondNumber;
let simpleOperator;
let simpleResult;
let viewToggle;
let calculatorStylesheet;
let simpleMode = false;

// Khởi tạo sau khi toàn bộ HTML đã được trình duyệt đọc xong
document.addEventListener('DOMContentLoaded', function () {
  styledCalculator = document.querySelector('.calculator');
  simpleCalculator = document.getElementById('simple-calculator');
  simpleForm = document.getElementById('simple-calc-form');
  simpleFirstNumber = document.getElementById('simple-first-number');
  simpleSecondNumber = document.getElementById('simple-second-number');
  simpleOperator = document.getElementById('simple-operator');
  simpleResult = document.getElementById('simple-result');
  viewToggle = document.getElementById('view-toggle');
  calculatorStylesheet = document.querySelector('link[href="style.css"]');
});

function toggleCalculatorView() {
  simpleMode = !simpleMode;
  styledCalculator.style.display = simpleMode ? 'none' : 'block';
  simpleCalculator.hidden = !simpleMode;
  if (calculatorStylesheet) {
    calculatorStylesheet.disabled = simpleMode;
  }
  viewToggle.textContent = simpleMode ? 'Chuyển sang bản có CSS' : 'Chuyển sang bản thuần';
  if (simpleMode) {
    simpleFirstNumber.focus();
  } else {
    document.getElementById('display').focus();
  }
}

function simpleClearDisplay() {
  simpleForm.reset();
  simpleResult.textContent = '';
  simpleFirstNumber.focus();
}

function simpleCalculate() {
  const firstValue = simpleFirstNumber.value.trim();
  const secondValue = simpleSecondNumber.value.trim();

  if (firstValue === '' || secondValue === '') {
    simpleResult.textContent = 'Vui lòng nhập đủ hai số.';
    return;
  }

  const firstNumber = Number(firstValue);
  const secondNumber = Number(secondValue);

  if (!Number.isFinite(firstNumber) || !Number.isFinite(secondNumber)) {
    simpleResult.textContent = 'Lỗi dữ liệu.';
    return;
  }

  let result;
  switch (simpleOperator.value) {
    case '+':
      result = firstNumber + secondNumber;
      break;
    case '-':
      result = firstNumber - secondNumber;
      break;
    case '*':
      result = firstNumber * secondNumber;
      break;
    case '/':
      result = secondNumber === 0 ? 'Không thể chia cho 0.' : firstNumber / secondNumber;
      break;
    default:
      result = 'Phép tính không hợp lệ.';
  }

  simpleResult.textContent = result;
}

// Bàn phím điều khiển bản đang hiển thị
document.addEventListener('keydown', function (event) {
  if (!simpleMode || !simpleCalculator.contains(event.target)) {
    return;
  }

  if (event.key === 'Enter' && !(event.target instanceof HTMLButtonElement)) {
    event.preventDefault();
    event.stopImmediatePropagation();
    simpleCalculate();
    return;
  }

  if (event.key === 'Escape') {
    event.preventDefault();
    event.stopImmediatePropagation();
    simpleClearDisplay();
    return;
  }

  event.stopImmediatePropagation();
}, true);