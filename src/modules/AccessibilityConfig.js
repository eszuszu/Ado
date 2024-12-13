// AccessibilityConfig.js

export default class AccessibilityConfig {
  /**
   * Apply accessibility attributes to a target element.
   * @param {Element} element - DOM element to apply attributes to.
   * @param {Object} config - Accessibility configuration object.
   */
  
  static apply(element, config) {
    if (!element) throw new Error("Invalid element provided.");
    Object.entries(config).forEach(([key, value]) => {
      element.setAttribute(`aria-${key}`, value);
    });
  }
}