# Project Ado
### *I’m developing Project Ado as a lightweight, modular library for intuitive DOM interfacing and managing state and reactivity in web and Node.js applications. This project reflects my interest in building tools that are both flexible and scalable, and I’m excited to share it as it evolves.*



## Features  

- **BaseHTML.js**  
  Provides utility methods for working with DOM elements, offering a consistent interface for element selection and manipulation.  

- **StateManager.js**  
  Manages global state with handler registration and subscriber notifications, enabling a lightweight and reactive approach to state management.  

- **AnimationHandler.js**  
  Simplifies animation state tracking and transitions, making it easier to coordinate visual updates.  

- **AccessibilityConfig.js**  
  Provides a centralized way to ensure your application meets accessibility standards by configuring ARIA attributes and more.  

- **StyleConfig.js**  
  Streamlines the application of styles and classes, ensuring consistent and dynamic styling capabilities.  


## Getting Started

  > **Tip**: start with `BaseHTML.js` and `StateManager.js` for foundational functionality, create handlers/reducers to subscribe to StateManager or use one of the other modules as a starting point for context specific handling.

### Installation
Currently, the project is under active development and has no installation package yet. Feel free to clone the repo and experiment with the modules.

```bash
git clone https://github.com/eszuszu/Ado
cd Ado
```
### Usage
You can import the modules into your project and use them as needed. Here's a quick example:

  > **Example**: Using BaseHTML.js and StateManager.js
  ```javascript
  import BaseHTML from './BaseHTML.js';
  import StateManager from './StateManager.js';

  // Initialize a StateManager instance
  const state = new StateManager();
  
  //Create a BaseHTML instance to manage a dynamic list, in this case 'single', as we're not targeting a nodeCollection
  const listContainer = new BaseHTML('#listContainer', 'single');

  //Subscribe to state changes for the list
  state.subscribe('items', (items) => {
    // Re-render the list whenever the state updates
    const container = listContainer.getSelection();

    //Clear the container
    container.innerHTML = '';

    //Populate the list with new items
    items.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.textContent = item;
      container.appendChild(listItem);
    });
  });
  
   //Initial list of items
   state.setState({
    items: ['Item 1', 'Item 2', 'Item 3'],
   });

   const addButton = new BaseHTML('#addButton', 'single');
   addButton.getSelection().addEventListener('click', () => {
    //Get the current items from the state
    const currentItems = state.getState('items');

    //Add a new item
    const newItem = `Item ${currentItems.length + 1}`;
    state.setState({
      items: [...currentItems, newItem],
    });
   });
   ```
  > **Make sure the following HTML structure is set up for the example to work**:
   ```HTML
  <div id="app">
    <ul id="listContainer"></ul>
    <button id="addButton">Add Item</button>
  </div>
  ```

### Explanation of Example

1. **State Management**
   - The `StateManager` instance manages the list of items. The `subscribe` method ensures the DOM dynamically updates when the 'items' state changes.

2. **DOM Management**
   - The `BaseHTML` instance (in this case `listContainer`) is used to manage the DOM pointer for the list container (`#listContainer`).
   - The `getSelection` method retrieves the container element, which is essentially a fancy `querySelector` enabling DOM manipulation.

3. **Reactivity and Modularity**
   - The `setState` method updates the `items` state and triggers the subscriber to re-render the list.
   - The `addButton` uses a separate `BaseHTML` instance to handle user interactions independently.




## Roadmap

### To-Do
  - Refine configuration object approaches for greater declarative clarity.
  - Explore JSON and external configuration files for more modular handling.
  - Add support for TypeScript for enhanced type safety.
  - Ensure asynchronous state updates are consistent across modules.
  - Expand AnimationHandler.js with general-purpose animation utilities.
  - Create detailed examples for common usage scenarios.
  - Improve project documentation and establish best practices.
  - Finalize a resource hierarchy and workflow.
  - Develop installation instructions for npm or other package managers.

### Future Goals
  - Implement unit tests for core modules using a testing library (e.g., Jest, Mocha).
  - Adapt modules for compatibility with server-side rendering (SSR) and hydration.
  - Investigate integration with popular frameworks (e.g., React, Next.js).
  - Enhance support for rendering workflows utiling Canvas, WebGL, and other rendering pipelines.
  - Add a linter (e.g., ESLint) and code formatter (e.g., Prettier) to ensure consistent code style.

## Contribution
I welcome feedback, ideas, and contributions from the community!

If you’d like to collaborate:

    Open an issue with your suggestions or questions.
    Fork the repository, make changes, and submit a pull request.

>note: This is my first open-source project, and I’m learning how to manage contributions effectively. Thank you for your patience!

## License
This project is licensed under the MIT License

## Acknowledgements
  - Thank you to the open-source community for inspiring this project.
  - Special thanks to everyone who provides feedback or contributes
  - This project is built as a learning exercise to explore state management, DOM manipulation and animation systems. Concepts such as pub/sub systems and declarative design patterns have influenced the implementation. 

## Disclaimer
Project Ado is a work in progress and subject to change. While it’s actively being developed, please use it at your own risk. Feel free to reach out with any questions or ideas. Automated tests are not yet fully implemented as it's I'm actively learning—contributions here are welcome.

