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
function calculate() {
  try {
    const result = new Function('return ' + display.value)();
    
    if (!isFinite(result)) {
      display.value = 'Lỗi';
    } else {
      display.value = result;
    }
  } catch (error) {
    display.value = 'Lỗi';
  }
}