// StyleConfig.js

export default class StyleConfig {
  /**
   * Apply style properties or classes to a target element.
   * @param {Element} element - DOM element to apply styles to.
   * @param {Object} config - Styling configuration (CSS properties or classes).
   */
  static apply(element, config) {
    if (config.styles) {
      Object.assign(element.style, config.styles);
    }
    if (config.classes) {
      element.classList.add(...config.classes);
    }
  }
}
