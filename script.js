function add(a, b) {
  return a + b
}

function subtract(a, b) {
  return a - b
}

function multiply(a, b) {
  return a * b
}

function divide(a, b) {
  return a / b
}

function modulo(a, b) {
  return a % b
}

function operate(a, b, operator) {
  a = parseFloat(a)
  b = parseFloat(b)
  if (operator === '+') {
    return add(a, b)
  } else if (operator === '-') {
    return subtract(a, b)
  } else if (operator === '*') {
    return multiply(a, b)
  } else if (operator === '/') {
    return divide(a, b)
  } else {
    return modulo(a, b)
  }
}

function calculate() {
  if (numberTwo) {
    numberOne = parseFloat(operate(numberOne, numberTwo, operator).toFixed(2)).toString()
    numberTwo = ''
    document.querySelector('#display-nums').innerHTML = `${numberOne}<br><br>`
    if (numberOne == "Infinity" || numberOne === "NaN") {
      document.querySelector('#display-nums').innerHTML = `Don't divide by 0 :(<br><br>`
      numberOne = ''
    }
  }
}

function deleteChar(e) {
  if (operator && numberTwo) {
    numberTwo = numberTwo.slice(0, numberTwo.length - 1)
    document.querySelector('#display-nums').innerHTML = `${numberOne}<br>${numberTwo || '<br>'}`

  } else if (!operator && numberOne) {
    numberOne = numberOne.slice(0, numberOne.length - 1)
    document.querySelector('#display-nums').innerHTML = `${numberOne || '0'}<br><br>`
  }
}

function clear(e) {
  numberOne = ''
  numberTwo = ''
  operator = ''
  document.querySelector('#display-nums').innerHTML = '0<br><br>'
  document.querySelector('#display-op').textContent = ''
}

function operatorClicked(newOp) {
  if (!numberOne) {
    numberOne = '0'
  }
  calculate()
  operator = newOp
  document.querySelector('#display-op').textContent = operator
}

function number(number) {
  if (!operator) {
    if (numberOne.length < 15 && (number !== '.' || !numberOne.includes('.'))) {
      numberOne += number
      document.querySelector('#display-nums').innerHTML = `${numberOne}<br><br>`
    }
  } else {
    if (numberTwo.length < 15 && (number !== '.' || !numberTwo.includes('.'))) {
      numberTwo += number
      document.querySelector('#display-nums').innerHTML = `${numberOne}<br>${numberTwo}`
    }
  }
}

let numberOne = ''
let numberTwo = ''
let operator = ''

document.querySelectorAll('.btn--number').forEach(button => {
  button.addEventListener('click', e => number(e.target.getAttribute('id')))
})

document.querySelectorAll('.btn--operator, .btn--equals').forEach(button => {
  button.addEventListener('click', e => operatorClicked(e.target.getAttribute('id')))
})

document.querySelector('#clear').addEventListener('click', clear)
document.querySelector('#delete').addEventListener('click', deleteChar)

document.addEventListener('keydown', e => {
  let key = e.key;
  console.log(key)
  if (key.match(/^[0-9.]$/)) {
    number(key)
  } else if (key.match(/^[%/*-+]|Enter$/)) {
    operatorClicked(key === 'Enter' ? '' : key)
  } else if (key === 'Backspace') {
    deleteChar()
  } else if (key === 'c') {
    clear()
  }
})