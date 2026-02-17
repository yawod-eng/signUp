document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signupForm');
  const username = document.getElementById('username');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const confirm = document.getElementById('confirm');
  const terms = document.getElementById('terms');
  const toggle = document.getElementById('togglePass');
  const strengthBar = document.getElementById('strengthBar');
  const strengthText = document.getElementById('strengthText');

  function setError(id, msg){ document.getElementById(id).textContent = msg; }
  function clearError(id){ document.getElementById(id).textContent = ''; }

  function scorePassword(pw){
    let score = 0;
    if (!pw) return 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  }

  function updateStrength(){
    const pw = password.value || '';
    const score = scorePassword(pw);
    const pct = Math.min(100, (score / 4) * 100);
    strengthBar.style.width = pct + '%';
    if (score <= 1){
      strengthText.textContent = 'Very weak';
      strengthBar.style.background = 'linear-gradient(90deg,#ef4444,#f59e0b,#10b981)';
    } else if (score === 2){
      strengthText.textContent = 'Weak';
      strengthBar.style.background = 'linear-gradient(90deg,#f59e0b,#f59e0b)';
    } else if (score === 3){
      strengthText.textContent = 'Good';
      strengthBar.style.background = 'linear-gradient(90deg,#f59e0b,#10b981)';
    } else {
      strengthText.textContent = 'Strong';
      strengthBar.style.background = 'linear-gradient(90deg,#10b981,#059669)';
    }
  }

  toggle.addEventListener('click', () => {
    const showing = password.type === 'text';
    password.type = showing ? 'password' : 'text';
    confirm.type = showing ? 'password' : 'text';
    toggle.textContent = showing ? 'Show' : 'Hide';
  });

  function checkConfirm(){
    if (confirm.value && password.value !== confirm.value){
      setError('confirmError', 'Passwords do not match');
      return false;
    }
    clearError('confirmError');
    return true;
  }

  password.addEventListener('input', () => { updateStrength(); clearError('passwordError'); checkConfirm(); });
  confirm.addEventListener('input', () => { checkConfirm(); });
  username.addEventListener('input', () => { if (username.value.trim().length >= 3) clearError('usernameError'); });
  email.addEventListener('input', () => { clearError('emailError'); });

  function validate(){
    let ok = true;
    if (username.value.trim().length < 3){ setError('usernameError', 'Username must be at least 3 characters'); ok = false; }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email.value)){ setError('emailError', 'Enter a valid email'); ok = false; }
    if (password.value.length < 8){ setError('passwordError', 'Password must be at least 8 characters'); ok = false; }
    if (!checkConfirm()) ok = false;
    if (!terms.checked){ setError('termsError', 'You must accept the terms'); ok = false; } else { clearError('termsError'); }
    return ok;
  }

  form.addEventListener('submit', (e) => {
    if (!validate()){
      e.preventDefault();
      const first = form.querySelector('.error:not(:empty)');
      if (first){ const label = first.previousElementSibling; if (label && label.focus) label.focus(); }
    }
  });

});
