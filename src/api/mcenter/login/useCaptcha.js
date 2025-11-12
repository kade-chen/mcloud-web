import { ref } from 'vue'

/**
 * A Vue 3 Composable for handling client-side graphical captcha.
 *
 * @returns {object} An object containing:
 * - captchaText: A reactive ref holding the current captcha string.
 * - generateCaptcha: A function to generate a new captcha.
 * - validateCaptcha: A validator function compatible with Arco Design forms.
 */
export function useCaptcha() {
  // Reactive state for the captcha text displayed to the user.
  const captchaText = ref('')

  /**
   * Generates a new 4-character alphanumeric captcha and updates the state.
   */
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    captchaText.value = result
  }

  /**
   * A custom validator function for use in a-form-item rules.
   * It checks if the user's input matches the generated captcha, ignoring case.
   *
   * @param {string} value - The value from the input field.
   * @param {function} callback - The callback to signal validation result.
   */
  const validateCaptcha = (value, callback) => {
    if (!value) {
      // The `required: true` rule will handle empty input
      callback()
      return
    }
    if (value.toLowerCase() !== captchaText.value.toLowerCase()) {
      callback('图形验证码错误')
    } else {
      callback()
    }
  }

  // Expose the state and methods to the component that uses this composable.
  return {
    captchaText,
    generateCaptcha,
    validateCaptcha
  }
}