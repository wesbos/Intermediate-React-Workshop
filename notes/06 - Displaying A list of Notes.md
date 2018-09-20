# Listing All Notes

Now it's time to pull a list of all notes when the page loads.

let's create a new component called `NotesList.js`

```JSX
import React from 'react';
import Head from 'next/head';
import NotesListStyles from './styles/NotesListStyles';

class NotesList extends React.Component {
  render() {
    return (
      <NotesListStyles>
        <p>Notes Go Here!</p>
      </NotesListStyles>
    );
  }
}
export default NotesList;
```

Then import that sucker into our index.js page and use it:

```JSX
import NotesList from '../components/NotesList';
... then in your render...
<NotesList />
```

Now we need to code up a method in our provider so that we can fetch the notes from our DB and insert them into state.

```JSX
getNotes: async () => {
  const { data: notes } = await axios.get(endpoint);
  console.log(notes);
  this.setState({ notes });
},
```

Now comes a problem that we have with render props.

We could of course use our consumer in the render to pull a list of notes from state, **BUT** we need to fetch the notes when the component is mounted to the page.

The best place to fetch data when a react component mounts is in the `componentDidMount` lifecycle method. This typically fires before the initial render is put on the page.

So here is the problem — if `getNotes` is exposed via a render prop, how do we call it in a lifecycle method? Furthermore, if we were to call it inside of render, it would get called on every single re-render!

so, _when you need access to a method throughout the entire component (not just render),  it it best to just a High Order Component (HOC) instead of a render prop_. This will allow us to pass reference to the function into our `NotesList.js` component via props.

### Sample HOC

A HOC is useful when you want another function or component to manage data and simply pass down reference to that data.


Say for example with component:

```JSX
const Dogs = (props) => <div>{props.dogs.map(dog => <p>{dog}</p>)}</div>
```

We could use it like this:

```JSX
<Dogs dogs={['hugo', 'sunny']}>
```

But what if we wanted another component to just inject the data for us? For that, we can make a HOC

```JSX
function withNames(WrappedComponent) {
  return function (originalProps) {
    return <WrappedComponent {...originalProps} dogs={['hugo', 'sunny', 'snickers']} />
  }
}
```

1. Make a function (withNames) that accepts a component - we call this the wrappedComponent
2. return a function (or full react component) that in turn returns the original (wrappedComponent) with it's original props _plus_ the new prop of dogs.

The way we use the above component is to create a _composed_ component:

```JSX
// create a composed component
const DogsWithNames withNames(Dogs);
// use it
<DogsWithNames/>
```

### making a withContextValues HOC

Because the only way to access our consumer is via a render prop, this HOC will turn the render prop into a HOC:

This goes in `lib/withContextValues.js`

```JSX
import { NoteConsumer } from './NoteProvider';

function withContextValues(Component) {
  return function (props) {
    return <NoteConsumer>{values => <Component {...props} contextValues={values} />}</NoteConsumer>;
  };
}

export default withContextValues;
```

Then we import this function into NotesList.js

```JSX
import withContextValues from '../lib/withContextValues';
```

and wrap our exported NotesList component:

```diff
- export default NotesList;
+ export default withContextValues(NotesList);
```

Then inside of our `NotesList.js` component, we can access the entire context vis `this.props.contextValues`

We will create a `componentDidMount()` lifecycle method and fire off the function we created earlier:

```JSX
componentDidMount() {
  this.props.contextValues.getNotes();
}
```

We should now be able to see the notes in our Provider's state and we can now loop over them:

```JSX
<NotesListStyles>
  {this.props.contextValues.state.notes.map(note => <p>{note.title}</p>)}
</NotesListStyles>
```

Let's clean that up a bit and make a `Note.js` component and render that out for each one:


in `components/NoteList.js`

```JSX
import Note from './Note';
// then in your render..
{this.props.contextValues.state.notes.map(note => <Note key={note._id} note={note} />)}
```

in `components/Note.js`

```JSX
import Link from 'next/link';
import NoteStyles from './styles/NoteStyles';
import Title from './styles/Title';
import FancyButton from './styles/FancyButton';

const Note = ({ note }) => (
  <NoteStyles>
    <Link
      href={{
        pathname: '/note',
        query: { id: note._id },
      }}
    >
      <a>
        <Title>{note.title}</Title>
      </a>
    </Link>
  </NoteStyles>
);

export default Note;
```

## Updating the Title Tag

You may have noticed that our title tag isn't showing anything. Thats because React doesnt manage anything outside of the div where it's mounted. If you want to reach outside of the application an update the document, that is called a side effect.

Luckily for us, Next.js makes these side effects really easy.

We can simply import the Head from `next/head` and use it anywhere we like. Tags in that head will be taken out of your render and put into the document's head

In NotesList.js lets try show how many notes there are.

```JSX
<Head>
  <title>Notes - {this.props.contextValues.state.notes.length}</title>
</Head>
```
