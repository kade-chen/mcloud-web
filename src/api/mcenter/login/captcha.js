// This is a MOCK API function.
// Replace this with your actual API call to send a verification code.
export function GET_VERIFICATION_CODE(data) {
  return new Promise((resolve) => {
    console.log('Requesting verification code for:', data.username)
    // Simulate a network delay
    setTimeout(() => {
      console.log('Mock API: Verification code sent successfully.')
      // In a real scenario, the backend handles sending the code.
      // The frontend just needs to know if the request was successful.
      resolve({ message: 'Code sent' })
    }, 500)
  })
}

// This is a MOCK API function.
// Replace this with your actual API call to get a captcha.
export function GET_CAPTCHA() {
  return new Promise((resolve) => {
    console.log('Requesting new captcha...');
    // Simulate a network delay
    setTimeout(() => {
      // In a real application, the backend generates a unique ID and a
      // base64-encoded image of the captcha text.
      const captchaId = `mock_captcha_${Date.now()}`;
      // This is a simple, dynamically generated SVG image as a placeholder.
      const captchaImageB64 =
        'data:image/svg+xml;base64,' +
        btoa(`
          <svg xmlns="http://www.w3.org/2000/svg" width="120" height="48" viewBox="0 0 120 48">
            <rect width="100%" height="100%" fill="#1f2937"></rect>
            <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
                  font-family="Arial, sans-serif" font-size="28" font-weight="bold"
                  fill="#9ca3af" style="letter-spacing: 4px; text-decoration: line-through; transform: skewX(-15deg);">
              AB3D
            </text>
          </svg>
        `);
        
      console.log(`Mock API: Captcha generated with ID: ${captchaId}`);
      resolve({
        id: captchaId,
        image_b64: captchaImageB64,
      });
    }, 500); // 500ms delay
  });
}