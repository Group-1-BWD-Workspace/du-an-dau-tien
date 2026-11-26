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