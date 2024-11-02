# Project Ado
### **Project Ado is a DOM interfacing collection of modules I'm in the process of developing for an intuitive, modular, flexible, and scalable solution to working with DOM and managing state for web appliations

## Getting Started
   -Import
    -BaseHTML.js
      -utilize selection normalization and helpful methods for targeting DOM elements.
    -StateManager.js
      -stores global state
      -registers handlers
      -notifies subscribers.
    -AnimationHandler.js
      -handles animation state.
    -AccessibilityConfig.js
      -configures accessibility attributes.
    -StyleConfig.js
      -configures styles
      -configures classes
    > tip: start with BaseHTML.js and StateManager.js, create handlers/reducers to to subscribe to StateManager or use one of the other modules as a starting point for context specific handling.

## To-Do
  -Refine configuration object approach, make more declarative, consider utilizing JSON and configuration files
  -Refine context specific handlers to have more relevant general purpose methods
  -Confirm consistent handling of asynchronus state updates
  -Describe best practices and usage scenarios
  -Solidify documentation
  -Manage and set up more administration of version control and feature branches
  -Define and outline project resources, heirarchy, and flow
  -Add basic usage examples
  -Develop and add installation instructions