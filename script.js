document.getElementById('leadForm').addEventListener('submit', function(event) {
  event.preventDefault();
  document.getElementById('formMessage').textContent = "Thanks! We'll get in touch soon.";
  this.reset(); // Clear form
});
