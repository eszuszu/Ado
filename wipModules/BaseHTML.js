// BaseHTML.js

/**
 * Base class to manage DOM pointers with normalized querying, re-rendering, 
 * and element manipulation.
 */
export default class BaseHTML {
  #selectionType;
  #selection;
  #selector;

  /**
   * Constructor takes a selector and an optional selectionType to normalize single or multiple elements.
   * @param {string} selector - CSS selector for targeting elements.
   * @param {string} selectionType - 'single' or 'collection' (default: auto-detect).
   */
  constructor(selector, selectionType = null) {
    this.#selector = selector;
    const { selectionType: type, elements } = this.getNormalizedElements(selector, selectionType);
    this.#selectionType = type;
    this.#selection = elements;
  }

  /**
   * Normalizes selected elements based on selectionType or collection length.
   * @param {string} selector - The CSS selector to query.
   * @param {string|null} selectionType - Optional 'single' or 'collection' to specify desired output.
   * @returns {Object} - Object containing selectionType and selected element(s).
   */
  getNormalizedElements(selector, selectionType = null) {
    const isElementNode = (node) => node && node.nodeType === Node.ELEMENT_NODE;
    const normalizeCollection = (collection) => {
      const elements = Array.from(collection).filter(isElementNode);
      if (elements.length === 1) return { selectionType: "single", elements: elements[0] };
      return { selectionType: "collection", elements: elements };
    };

    const result = document.querySelectorAll(selector);

    // Determine selection type based on selectionType or result length
    if (selectionType === "single") {
      if (result.length === 1) {
        return { selectionType: "single", elements: result[0] };
      } else {
        throw new Error(`Expected single element but found ${result.length}.`);
      }
    } else if (selectionType === "collection") {
      if (result.length > 0) return normalizeCollection(result);
      throw new Error("No valid elements found for collection query.");
    } else {
      if (result.length === 1) return { selectionType: "single", elements: result[0] };
      else if (result.length > 1) return normalizeCollection(result);
      throw new Error(`No valid elements found for selector: ${selector}`);
    }
  }

  /**
   * Checks if the selected element has child nodes.
   * @returns {boolean} - True if a single element has child nodes.
   */
  hasChildElements() {
    if (this.#selectionType === "single") {
      return this.#selection.hasChildNodes();
    }
    throw new Error(`hasChildElements can only be called on selectionType: "single"`);
  }

  /**
   * Returns an array from child elements if present, else returns provided default.
   * @param {Array} incNodeListDefault - Default array if no child elements exist.
   * @returns {Array} - Array of child elements or default.
   */
  arrayFromChildElements(incNodeListDefault = []) {
    return this.hasChildElements() ? Array.from(this.#selection.children) : incNodeListDefault;
  }

  /**
   * Retrieves the element or elements currently referenced.
   * @returns {Element|Array<Element>} - Single element or array of elements.
   */
  getSelection() {
    return this.#selection;
  }

  /**
   * Re-renders the selected element(s) by forcing a re-query and refresh.
   */
  reRender() {
    const { selectionType, elements } = this.getNormalizedElements(this.#selector, this.#selectionType);
    this.#selectionType = selectionType;
    this.#selection = elements;
  }
}
