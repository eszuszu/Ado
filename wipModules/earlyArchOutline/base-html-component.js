//Primary HTML semantic and base component, AdoBaseHtmlComponent

class AdoBaseHtmlComponent {
  #selection;
  #selectionType;

  #ally;
  #attributes;
  #semanticContext;

  #isConstructed;

  //The rest parameters inside the constructor are the selection itself as a string, and a queryType if enforced.

  constructor(isConstructed = false, ...incoming) {
    let incArgs = incoming;
    let selectionObject;

    // selectionObject is a representation of the passed selection containing the selection itself and the queryType after being processed, during processing any live html node collections passed are converted into static arrays

    if (incArgs.length > 1) {

      selectionObject = this.getNormalizedElements(...incoming);

    } else if (incArgs.length === 1) {

      selectionObject = this.getNormalizedElements(incArgs[0]);
    } else {

      throw new Error("No selection argument provided")

    }



    this.#selection = selectionObject.elements;
    this.#selectionType = selectionObject.queryType;
    this.#isConstructed = isConstructed;

  }

  get selection() {
    return this.#selection;
  }

  set selection(incoming) {

  }

  get selectionType() {
    return this.#selectionType;
  }

  get ally() {
    return this.#ally;
  }

  set ally(incAlly) {
    this.#ally = incAlly;
  }

  get attributes() {
    return this.#attributes;
  }

  set attributes(incAttributes) {
    this.#attributes = incAttributes;
  }

  get semanticContext() {
    return this.#semanticContext;
  }

  set semanticContext(incSemanticContext) {
    this.#semanticContext = incSemanticContext;
  }

  get isConstructed() {
    return this.#isConstructed;
  }

  getNormalizedElements(selector, queryType = null) {
    // Check if a node is an element
    const isElementNode = (node) => node && node.nodeType === Node.ELEMENT_NODE;

    // Normalize collection into an array or single element
    const normalizeCollection = (collection) => {
      const elements = Array.from(collection).filter(isElementNode); // Filter only valid elements
      if (elements.length === 1) {
        return { queryType: "single", elements: elements[0] }; // Return single element if length is 1
      }
      return { queryType: "collection", elements: elements }; // Return array from collection
    };

    // Perform query using querySelectorAll (covers both single and multiple elements)
    const result = document.querySelectorAll(selector);

    // Determine queryType based on the result's length or explicit queryType passed
    if (queryType === "single") {
      if (result.length === 1) {
        return { queryType: "single", elements: result[0] }; // Single element found
      } else {
        throw new Error(`Expected a single element but found ${result.length}.`);
      }
    } else if (queryType === "collection") {
      if (result.length > 0) {
        return normalizeCollection(result); // Handle as collection
      } else {
        throw new Error("No valid elements found for collection query.");
      }
    } else if (!queryType) {
      // If no queryType is provided, decide based on result length
      if (result.length === 1) {
        return { queryType: "single", elements: result[0] }; // Single element found
      } else if (result.length > 1) {
        return normalizeCollection(result); // Multiple elements found
      } else {
        throw new Error(`No valid elements found for selector: ${selector}`);
      }
    } else {
      throw new Error("Invalid queryType. Must be 'single', 'collection', or left as default value");
    }
  }


  hasChildElements() {
    if (this.#selectionType === "single") {
      return this.#selection.hasChildNodes();
    } else {
      throw new Error(`call hasChildElements on selectionType: "single"`);
    }
  }

  arrayFromChildElements(incNodeListDefault = []) {
    return this.hasChildElements() ? Array.from(incNodeListDefault) : incNodeListDefault;
  }
}

//Primary "Viewer" component, use to group animations with UI AgazeBaseViewerComponent

class AgazeBaseViewerComponent extends AdoBaseHtmlComponent {
  #isInteractive;
  #UIElements;
  #attachedAnimation;
  #viewport;

  constructor(incoming, isInteractive) {
    super(undefined, ...incoming);
    this.#isInteractive = isInteractive;
  }

}

//Primary Animation component, AdazzleBaseAnimationComponent

class AdazzleBaseAnimationComponent extends AdoBaseHtmlComponent {
  #animationContext;
  #frames;
  #timing;
  #elementsToAnimate;
  #childElements;

  constructor(incoming, framesDefault = { contains: null, appendDefault: true }, timingDefault = null, isInteractive) {
    super(undefined, ...incoming);
    this.#frames = framesDefault; //Animation component instantiates with default values, creates framesDefault object;
    this.#timing = timingDefault;
    this.#animationContext = isInteractive;
    this.hasChildElements() ? this.#childElements = this.arrayFromChildElements(this.childElements) : this.#childElements = null;
  }

  get childElements() {
    return this.#childElements;
  }

  get animationContext() {
    return this.#animationContext;
  }

  set animationContext(incAnimContext) {
    this.#animationContext = incAnimContext;
  }

  get frames() {
    return this.#frames;
  }

  set frames(incFrames) {

    this.#frames.contains === null ? this.#frames.contains = incFrames
      : this.appendToFrames(incFrames, this.frames.appendDefault)
  }

  set appendDefault(bool) {
    this.#frames.appendDefault = bool;
  }

  appendToFrames(incFrames, appendDefault) {
    this.appendDefault(appendDefault);
    appendDefault ? console.error("frames.appendDefault is true, set this.appendDefault to false.") : this.frames.contains.push(incFrames);
  }

  get timning() {
    return this.#timing;
  }
  set timing(incTimingFunction) {
    this.#timing = incTimingFunction;
  }

  get elementsToAnimmate() {
    return this.#elementsToAnimate;
  }

  set elementsToAnimate(elements) {

    elements.isHtmlCollection || elements.isNodeList ? Array.from(elements) : this.#elementsToAnimate = this.#elementsToAnimate = elements;

  }


}


//Primary UI Base Component, ZigZagUI

class ZigZagBaseUIComponent extends AdoBaseHtmlComponent {
  #container;
  #interactiveElements;
  #listeners;
  constructor(incoming, incListenersArray, container = false) {
    super(undefined, incoming);
    this.#container = container;
    !this.#container ? this.#interactiveElements = this.selection
      : this.selection.isHtmlCollection
        ? this.#interactiveElements = this.htmlCollectionToArray()
        : this.#interactiveElements = this.selection;

    this.#listeners = new Map();

    incListenersArray.forEach((listener, index) => {
      this.#listeners.set(listener, incListenersArray[index])
    })
  }

  get listeners() {
    return this.#listeners;
  }


}


//Primary State Base Component, AffairsState

class AffairsStateManager {
  #components;
  #animations;
  #stateMap;
  constructor(incComponents, incAnimations) {
    this.#stateMap = new Map();

  }
}