// StateManager.js

export default class StateManager {
  #state = {};
  #subscribers = {};

  /**
   * Registers a subscriber to manage specific state changes.
   * @param {string} key - State property to listen to.
   * @param {function} handler - Handler function that updates state.
   */
  subscribe(key, handler) {
    if (!this.#subscribers[key]) this.#subscribers[key] = [];
    this.#subscribers[key].push(handler);
  }

  /**
   * Updates the state and notifies relevant subscribers.
   * @param {object} updates - State object to update.
   */
  async setState(updates) {
    for (const [key, value] of Object.entries(updates)) {
      //Await if the value is a Promise; otherwise set it directly
      this.#state[key] = await value;

      // Notify subscribers for the given key, waiting for any async handlers
      if (this.#subscribers[key]) {
        await Promise.all(
          this.#subscribers[key].map(async (handler) => await handler(this.#state[key]))
        );
      }
    }
  }

  /**
   * Gets the current state.
   * @param {string} key - State key to retrieve.
   * @returns {any} - Current value of the state key.
   */
  getState(key = null) {
    return key ? this.#state[key] : this.#state;
  }
}
