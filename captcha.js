/**
 * captcha.js
 * Generates a visual CAPTCHA on canvas that closely matches
 * the style of common government result portals:
 * - Solid dark blue background
 * - White bold characters
 * - Random noise dots + strike lines
 * - Slight character rotation / position jitter
 */

(function () {
  "use strict";

  const canvas = document.getElementById("captchaCanvas");
  const ctx = canvas.getContext("2d");

  // Character set (mixed case + numbers, avoiding confusing chars)
  const CHARSET = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  const LENGTH = 6;

  let currentCaptcha = "";

  /**
   * Generate a random CAPTCHA string
   */
  function generateCode() {
    let code = "";
    for (let i = 0; i < LENGTH; i++) {
      code += CHARSET.charAt(Math.floor(Math.random() * CHARSET.length));
    }
    return code;
  }

  /**
   * Draw the CAPTCHA on canvas
   * Style goal: dark blue box + white text + noise (similar to reference)
   */
  function drawCaptcha(code) {
    const width = canvas.width;
    const height = canvas.height;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Background - solid dark blue (matches the reference style)
    ctx.fillStyle = "#1a3a6e";
    ctx.fillRect(0, 0, width, height);

    // Subtle gradient overlay for depth
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "rgba(255,255,255,0.05)");
    gradient.addColorStop(1, "rgba(0,0,0,0.12)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Noise dots
    for (let i = 0; i < 45; i++) {
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.25 + 0.05})`;
      const x = Math.random() * width;
      const y = Math.random() * height;
      const r = Math.random() * 1.8 + 0.5;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Strike / noise lines
    for (let i = 0; i < 4; i++) {
      ctx.strokeStyle = `rgba(255,255,255,${Math.random() * 0.3 + 0.1})`;
      ctx.lineWidth = Math.random() * 1.5 + 0.5;
      ctx.beginPath();
      ctx.moveTo(Math.random() * width, Math.random() * height);
      ctx.lineTo(Math.random() * width, Math.random() * height);
      ctx.stroke();
    }

    // Draw characters
    const charWidth = width / (LENGTH + 1);
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    for (let i = 0; i < code.length; i++) {
      const char = code[i];
      const x = charWidth * (i + 0.8);
      const y = height / 2 + (Math.random() * 8 - 4);

      ctx.save();

      // Slight rotation for each character
      const angle = (Math.random() * 24 - 12) * (Math.PI / 180);
      ctx.translate(x, y);
      ctx.rotate(angle);

      // White bold text
      ctx.fillStyle = "#ffffff";
      ctx.font = `bold ${22 + Math.floor(Math.random() * 4)}px Arial, sans-serif`;

      // Soft shadow for readability
      ctx.shadowColor = "rgba(0,0,0,0.35)";
      ctx.shadowBlur = 2;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;

      ctx.fillText(char, 0, 0);
      ctx.restore();
    }

    // Thin border
    ctx.strokeStyle = "rgba(255,255,255,0.25)";
    ctx.lineWidth = 1;
    ctx.strokeRect(0.5, 0.5, width - 1, height - 1);
  }

  /**
   * Public: Generate and render a new CAPTCHA
   */
  function refresh() {
    currentCaptcha = generateCode();
    drawCaptcha(currentCaptcha);
    return currentCaptcha;
  }

  /**
   * Public: Validate user input (case-sensitive)
   */
  function validate(input) {
    return input === currentCaptcha;
  }

  /**
   * Public: Get current code (for debugging only - not exposed in production UI)
   */
  function getCode() {
    return currentCaptcha;
  }

  // Expose API
  window.Captcha = {
    refresh,
    validate,
    getCode
  };

  // Initial draw
  refresh();
})();
