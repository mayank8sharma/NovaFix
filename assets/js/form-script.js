

  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevents default form submission
    
    const form = e.target;
    const data = new FormData(form);
    const scriptURL = 'https://script.google.com/macros/s/AKfycbx7ZyFnWaMEy5UTetZg6hhrXenak19APZIIIY1BLiHal1pBOYpIhlS7XcqtZR6cOvthQw/exec'; // Paste your Web App URL here
    
    // Optional: Change button text to show it's loading
    const submitBtn = form.querySelector('.btn-submit');
    const originalBtnText = submitBtn.innerText;
    submitBtn.innerText = "Sending...";
    submitBtn.disabled = true;

    fetch(scriptURL, { method: 'POST', body: data })
      .then(response => {
        alert('Thank you! Your message has been sent successfully.');
        form.reset(); // Clears the form fields
      })
      .catch(error => {
        console.error('Error!', error.message);
        alert('Oops! Something went wrong. Please try again.');
      })
      .finally(() => {
        // Reset the button state
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
      });
  });
