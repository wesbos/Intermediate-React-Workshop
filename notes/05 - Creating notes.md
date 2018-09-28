# Creating Notes

In this section we are going to create notes. It will teach us how to use local state to hold form data and our Consumer to push that data both to our provider as well as the server.

## Templating out the create note form

First we need to pull in three different styled components I've prepared for you:

```JSX
import Form from './styles/Form';
import FancyButton from './styles/FancyButton';
import CreateNoteDropDown from './styles/CreateNoteDropdown';
```

Let's take a quick second to go over each of these styled components before moving forward.

Now inside the `<Form></Form>` component lets template out the inputs and labels:

```JSX
<CreateNoteDropDown open>
  <Form>
    <label htmlFor="title">
      <input required type="text" name="title" id="title" />
    </label>
    <label htmlFor="content">
      <textarea required type="text" name="content" id="content" />
    </label>

    <FancyButton type="submit">Save Note</FancyButton>
    <FancyButton onClick={toggleDrawer}>Toggle</FancyButton>
  </Form>
</CreateNoteDropDown>
```

## Saving Values to state

The way this will work is like so:

1. Someone fills out the form
2. We listen to for a form submit event
3. Send the data to our provider

Step three requires that we somehow take the data out of the form inputs before we can send it. While React does have something called refs, our best bet it to attach the inputs to local state.

Lets start by creating local state in our CreateNote component:

```JSX
state = {
  title: '',
  content: '',
};
```

Then we can tie our inputs to state by applying a `value={this.state.title}`.

Now if we try to type into an input, you'll notice we get an error.

This is because we need to mirror each change to state:

```JSX
saveToState = e => {
  this.setState({ [e.target.name]: e.target.value });
};
```

## Writing our saveNote function

Now before we handling the form submit, we need to write a function that will push it into the state of our provider.


Lets open our `NoteProvider.js`, and add the following function.

lets also step though exactly what this is doing

```JSX
saveNote: async note => {
  // post it to the backend
  const res = await axios.post(endpoint, { note });
  // this is a new note - put it at the top
  this.setState({
    notes: [res.data, ...this.state.notes],
    drawerOpen: false,
  });
  return res.data;
},
```

Now we want to expose that function via the consumer:

```diff
render() {
    return (
      <NoteConsumer>
-        {({ state, toggleDrawer }) => (
+        {({ state, toggleDrawer, saveNote }) => (
          <CreateNoteDropDown open>
            <Form>
              ....
```

## Handling Submits

When someone submits the form, we hav to do two things:

1. e.preventDefault() to stop the form from submitting
2. pass a copy of state to saveNote()

We can create an event handler on our CreateNote component:

```JSX
handleSubmit = (e, saveNote) => {
  e.preventDefault();
  console.log('Save Note!');
  saveNote(this.state);
};
```

This is where render props get a little bit weird.

If we introduce access to saveNote via the render prop, how are we supposed to get access to the saveNote function in the components methods?!

There are two solutions - both of which we will cover today.

1. Create a HOC (more later)
2. Pass the function (we do this now)

So on form submit, pass the event and reference to the saveNote function:

```JSX
<Form onSubmit={e => this.handleSubmit(e, saveNote)}>
```

Now when we submit the form you should see the NoteProvider State populate with a note:

![](http://wes.io/ce1d475c45f1/content)


## Opening and Closing The popup

If you open `CreateNoteDropdown.js` you'll see this bit of conditional CSS:

```JSX
${props =>
    props.open &&
    `
    border-radius: 0;
    transform: scale(1);
    `};
```

this should show and hide it based on if the open of open is passed or not. We can pipe this value in from our Consumer like so:

```JSX
open={state.drawerOpen}
```

And we can make a handle little toggle button. Create a file called `components/ToggleDrawer.js` and lets step through this code:


```JSX
import { NoteConsumer } from '../components/NoteProvider';
import FancyButton from './styles/FancyButton';

const ToggleDrawer = props => (
  <NoteConsumer>
    {({ toggleDrawer }) => <FancyButton onClick={toggleDrawer}>{props.children}</FancyButton>}
  </NoteConsumer>
);

export default ToggleDrawer;
```

Then we can use it in on our index.js page.

You'll notice I'm using React fragments here - let's talk about those quickly


```JSX
import CreateNote from '../components/CreateNote';
import ToggleDrawer from '../components/ToggleDrawer';

const IndexPage = () => (
  <>
    <ToggleDrawer>Create A New Note</ToggleDrawer>
    <p>Notes Go Here</p>
  </>
);

export default IndexPage;
```
