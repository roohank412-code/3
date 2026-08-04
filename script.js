/**
 * script.js
 * Handles form interaction, CAPTCHA validation,
 * loading states, and opening the result PDF.
 */

(function () {
  "use strict";

  // DOM Elements
  const captchaInput = document.getElementById("captchaInput");
  const submitBtn = document.getElementById("submitBtn");
  const refreshBtn = document.getElementById("refreshCaptcha");
  const errorMsg = document.getElementById("errorMsg");
  const loadingOverlay = document.getElementById("loadingOverlay");
  const btnText = submitBtn.querySelector(".btn-text");
  const btnSpinner = submitBtn.querySelector(".btn-spinner");

  /**
   * Show error message
   */
  function showError(message) {
    errorMsg.textContent = message;
    errorMsg.classList.remove("hidden");
    captchaInput.focus();
    captchaInput.select();
  }

  /**
   * Hide error message
   */
  function hideError() {
    errorMsg.classList.add("hidden");
    errorMsg.textContent = "";
  }

  /**
   * Set button loading state
   */
  function setButtonLoading(isLoading) {
    if (isLoading) {
      submitBtn.disabled = true;
      btnText.classList.add("hidden");
      btnSpinner.classList.remove("hidden");
    } else {
      submitBtn.disabled = false;
      btnText.classList.remove("hidden");
      btnSpinner.classList.add("hidden");
    }
  }

  /**
   * Show full-page loading overlay and open PDF after delay
   */
  function showSuccessAndOpenPDF() {
    // Show overlay
    loadingOverlay.classList.remove("hidden");

    // After 2 seconds open the PDF
    setTimeout(function () {
      // Open PDF in new tab
      window.open("result.pdf", "_blank");

      // Hide overlay and reset form after a short extra delay
      setTimeout(function () {
        loadingOverlay.classList.add("hidden");
        setButtonLoading(false);
        captchaInput.value = "";
        window.Captcha.refresh(); // new CAPTCHA for next use
        hideError();
      }, 400);
    }, 2000);
  }

  /**
   * Handle form submission
   */
  function handleSubmit() {
    hideError();

    const userInput = captchaInput.value.trim();

    if (!userInput) {
      showError("Please enter the CAPTCHA code.");
      return;
    }

    if (userInput.length !== 6) {
      showError("CAPTCHA must be 6 characters.");
      return;
    }

    // Start button loading
    setButtonLoading(true);

    // Small artificial delay so the spinner is visible
    setTimeout(function () {
      if (window.Captcha.validate(userInput)) {
        // Success
        showSuccessAndOpenPDF();
      } else {
        // Failure
        setButtonLoading(false);
        showError("Incorrect CAPTCHA. Please try again.");
        window.Captcha.refresh();
        captchaInput.value = "";
      }
    }, 450);
  }

  // Event Listeners
  submitBtn.addEventListener("click", handleSubmit);

  captchaInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  });

  // Clear error while typing
  captchaInput.addEventListener("input", function () {
    if (!errorMsg.classList.contains("hidden")) {
      hideError();
    }
  });

  // Refresh CAPTCHA
  refreshBtn.addEventListener("click", function () {
    window.Captcha.refresh();
    captchaInput.value = "";
    hideError();
    captchaInput.focus();
  });

  // Accessibility: focus input on load
  window.addEventListener("load", function () {
    captchaInput.focus();
  });
})();
