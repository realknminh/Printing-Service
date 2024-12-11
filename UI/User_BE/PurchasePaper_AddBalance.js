
document.addEventListener('DOMContentLoaded', () => {
  const balanceForm = document.querySelector('#balanceControl form');
  const paymentForm = document.querySelector('#paymentControl form');
  const currentBalanceInputBalance = balanceForm.querySelector('input[type="number"][name="currentBalance"]');
  const currentBalanceInputPayment = paymentForm.querySelector('input[type="number"][name="currentBalance"]');
  const addBalanceInput = balanceForm.querySelector('input[type="number"][name="addBalance"]');
  const addPaperInput = paymentForm.querySelector('input[type="number"][name="addPaper"]');
  const amountToPayInput = paymentForm.querySelector('input[type="number"][name="amountToPay"]');
  const cancelButtonBalance = balanceForm.querySelector('button[onclick="exitBalanceContent()"]');
  const cancelButtonPayment = paymentForm.querySelector('button[onclick="exitPaymentContent()"]');
  const dashboardBalance = document.getElementById("balanceID");
  const dashboardPaper = document.getElementById("paperID");

  // Set initial balance from localStorage or dashboard
  let currentBalance = parseFloat(localStorage.getItem('currentBalance')) || parseFloat(dashboardBalance.textContent) || 100;
  let currentPaper = parseFloat(localStorage.getItem('dashboardPaper')) || parseFloat(dashboardPaper.textContent) ;
  currentBalanceInputBalance.value = currentBalance;
  currentBalanceInputPayment.value = currentBalance;

  dashboardBalance.textContent = currentBalance.toString();
  dashboardPaper.textContent = currentPaper.toString();

  addPaperInput.addEventListener('input', () => {
    const addPaperAmount = parseFloat(addPaperInput.value);
    if (!isNaN(addPaperAmount) && addPaperAmount > 0) {
      amountToPayInput.value = addPaperAmount;
    } else {
      amountToPayInput.value = '';
    }
  });

  balanceForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const addBalanceAmount = parseFloat(addBalanceInput.value);
    if (!isNaN(addBalanceAmount) && addBalanceAmount > 0) {
      currentBalance += addBalanceAmount;
      currentBalanceInputBalance.value = currentBalance;
      currentBalanceInputPayment.value = currentBalance;
      dashboardBalance.textContent = currentBalance;
      localStorage.setItem('currentBalance', currentBalance);
      alert(`Balance updated! New balance: $${currentBalance}`);
      exitBalanceContent();
    } else {
      alert('Please enter a valid amount to add.');
    }
  });

  paymentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const amountToPay = parseFloat(amountToPayInput.value);
    if (!isNaN(amountToPay) && amountToPay > 0 && amountToPay <= currentBalance) {
      currentBalance -= amountToPay;
      currentBalanceInputBalance.value = currentBalance;
      currentBalanceInputPayment.value = currentBalance;
      currentPaper += amountToPay;
      dashboardBalance.textContent = currentBalance;
      dashboardPaper.textContent = currentPaper;
      localStorage.setItem('currentBalance', currentBalance);
      localStorage.setItem('dashboardPaper', currentPaper);
      alert(`Paper purchased! Amount to pay: $${amountToPay}`);
      exitPaymentContent();
    } else {
      alert('Please enter a valid amount of paper to add or ensure you have sufficient balance.');
    }
  });

  cancelButtonBalance.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent form submission
    exitBalanceContent();
  });

  cancelButtonPayment.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent form submission
    exitPaymentContent();
  });

});

function exitBalanceContent() {
  const content = document.getElementById('balanceControl');
  content.style.display = 'none';
}

function exitPaymentContent() {
  const content = document.getElementById('paymentControl');
  content.style.display = 'none';
}
