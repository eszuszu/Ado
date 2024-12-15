/**
 * AnimationHandler
 * Manages and applies animations based on the state.
 * 
 * Dependencies:
 * - StateManager (to subscribe to animation state changes)
 * - Animation configuration object (defining keyframes options and element selectors)
 */


export default class AnimationHandler {
  /**
   * Apply animation properties and manage state for animations.
   * @param {Object} stateManager - State Manager to subscribe to.
   * @param {Object} config - Base animation configuration.
   * 
   */
  constructor(stateManager, config){
    this.stateManager = stateManager;
    this.config = config;

    this.stateManager.subscribe("animations", this.apply.bind(this));
  }
  /**
   * Applies animations based on the current state. Handles both resolved and pending animation configurations.
   * @param {Object} animationState - The current animation state.
   */
  
  async apply(animationState) {
    // Loop over each animation key in the state
    for (const animationKey of Object.keys(animationState || {})) {
      // Await the animation configuration in case it is a Promise
      const animationConfig = await Promise.resolve(this.config[animationKey]);

      if (animationConfig) {
        // Select elements based on selectors in the animation state
        const elements = document.querySelectorAll(animationState[animationKey].selectors);

        if (elements.length === 0) {
          console.warn(`No elements found for selector ${animationState[animationKey].selectors}`);
          continue;
        }

        // Apply animation to each element
        elements.forEach((element) => {
          element.animate(animationConfig.keyframes, animationConfig.options);
        });
      } else {
        console.warn(`No animation config found for key: ${animationKey}`);
      }
    }
  }

  // Additional methods for play/pause, restart, etc., can be added here.
}
