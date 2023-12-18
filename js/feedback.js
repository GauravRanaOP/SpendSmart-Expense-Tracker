$(document).ready(() => {
    $("#feedbackForm").submit((e) => {
      e.preventDefault();
  
      // Perform form validation
      const name = $("#name").val();
      const email = $("#email").val();
      const message = $("#message").val();
  
      if (!name || !email || !message) {
        alert("Please fill in all fields.");
        return;
      }
  
      // You can perform additional validation here if needed
      alert(`Feedback submitted:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`);
  
      // Clear form fields after submission
      $("#feedbackForm")[0].reset();
    });
  });