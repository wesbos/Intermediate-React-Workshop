## Managing State with React's context API

React has a new API for managing data and it's called Context.

It allows you to get data from one component to lower components without having to pass the data down through the entire component tree - this is called "prop-drilling".

The idea is that high-up in your application you create a context - this will hold your data (state) and any functions used to update that data.

Then, whenever you need access to that data (notes) or the functions to work with it (`createNote()`) - we can simply use a consumer component to inject that data at any level deep.

We're going to start with a simple example of a boolean called `drawerOpen` that will determine if the create note drawer is open or closed.

## Provider setup

Let's start by making `components/NoteProvider.js`.

```js
import React, { Component } from 'react';
import axios from 'axios';
import { endpoint } from '../config';

// first we will make a new context
const NoteContext = React.createContext();

// Then create a provider Component
class NoteProvider extends Component {
  state = {
    notes: [],
    drawerOpen: false,
  };
  render() {
    return (
      <NoteContext.Provider>
        {this.props.children}
      </NoteContext.Provider>
    );
  }
}

// then make a consumer which will surface it
const NoteConsumer = NoteContext.Consumer;

export default NoteProvider;
export { NoteConsumer };
```

Then in order to surface the state and functions to our provider, we pass them like so:


```js
<NoteContext.Provider
  value={{
    state: this.state,
    toggleDrawer: () => {
      this.setState({ drawerOpen: !this.state.drawerOpen });
    },
  }}
>
  {this.props.children}
</NoteContext.Provider>
```

Then we need to inject this provider in at the top of our application so we can _rain down state_ on all of it's component. The best place to do this is in our `_app.js` so that we will maintain state from page to page.

First we need to import that note provider:

```js
import NoteProvider from '../components/NoteProvider';
```

Then wrap our page in it:

```diff
<Container>
+  <NoteProvider>
    <Page>
      <Component {...pageProps} />
    </Page>
+  </NoteProvider>
</Container>
```

Now in order to access the values from our state, we use the `NoteConsumer` we exported from the provider file.

Let's try create a CreateNote.js component in the components folder.

```js
import React, { Component } from 'react';
import { NoteConsumer } from '../components/NoteProvider';

class CreateNote extends Component {
  render() {
    return (
      <div>I will ytell you if I'm open or closed</div>
    );
  }
}

export default CreateNote;
```

Now in order to inject the data from our provider's state, we use something called render props.

Render props are a bit of a weird name. It's a component that, instead of having regular component children, requires a function as a child. That function will then pass you the data you are asking for.

Here is a simple example outside of what we are doing right now. What if we wanted a component that provided us with a list of dogs? We might be supplied with a `GiveMeDogs` component that we would use this way:


```js
class DisplayDogs extends React.Component {
  render() {
    return (
      <GiveMeDogs>
        {(dogs) => (
          <p>There are {dogs.length} dogs</p>
        )}
      </GiveMeDogs>
    )
  }
}
```

The thing about render props is that it moves much of your data logic into your render. This is often referred to `declarative` programming where as explicitly running a function to fetch the dogs would be `imperative` programming


The child of GiveMeDogs is a function. When that function runs, it gives us some data - dogs. From that function we can then return some more JSX.

This is often confusing because we use a few features of ES6 - Arrow functions, implicit return and often argument destructuring.

While this is popular, you can also just simply provide a regular 'ol function that accepts an argument and returns some JSX:

```js
function makeDogSentence(dogs) {
  return <p>There are {dogs.length} dogs</p>
}

class DisplayDogs extends React.Component {
  render() {
    return (
      <GiveMeDogs>{makeDogSentence}</GiveMeDogs>
    )
  }
}
```


Back to our `NoteConsumer` component - this render prop function will pass you any values that were defined in the `NoteProvder`'s value.

We can access everything like this:

```JSX
<NoteConsumer>
  {(values) => <div>I will tell you if I'm open or closed</div>}
</NoteConsumer>
```

Then we can access state with `values.state` and our function via `values.toggleDrawer`

That is good, but we can make things easier and destructure them into their own variables:

```JSX
<NoteConsumer>
  {({ state, toggleDrawer }) => <div>I will tell you if I'm open or closed</div>}
</NoteConsumer>
```

Now we can go ahead and use those values:

```JSX
<div>
  <p>I am {state.drawerOpen ? 'Open' : 'Closed'}</p>
  <button onClick={toggleDrawer}>Toggle</button>
</div>
```

## Context FAQ

### Q: Should I put everything in there? Does it replace state?

A: Whenever you move data out of a component, it becomes less portable. Suddenly this component requires that the provider comes along for the ride whenever you bring that component into another project.

Local state in components is still very useful - often times you will only want that data to be contained to a single component, or are fine with passing data down via props.

TLDR reach for context when you have a need for elevated (or dare we say global) state that is accessible and injectable at different levels.

### Q: Does it replace Redux?

A: In many cases Redux was use solely for the ability to inject the data at any level - context fixes that. Context does not have the developer tooling, testability or any other advanced features that redux and it's ecosystem of 3rd part packages has.


### Q: Can I have multiple Providers?

A: Absolutely - in this course we are only creating a single provider, but if you have different types of data, it makes sense to have separate provider and consumers for that.
