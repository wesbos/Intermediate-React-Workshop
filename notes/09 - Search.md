# Search!

The final item today is search.

We're going to be using a package called Downshift which gives you all of the dropdown functionality without any  of the UI. IMO this is the best use case for render props and if you are still scratching your head as to why these are useful, this will hopefully clarify a few things.

### Getting All Notes

The search will be simple - we are just going to loop over all notes and see if the search term is in the title of the note. No server side calls here.

First thing we need to do is get a list of the notes. We could use the Consumer render prop here, but instead lets practice writing HOC.

create a new `lib/withNotes.js` component and lets talk thorugh this:

```JSX
import { NoteConsumer } from '../components/NoteProvider';

function withNotes(Component) {
  return function Notes(props) {
    return (
      <NoteConsumer>
        {values => <Component {...props} notes={values.state.notes} />}
      </NoteConsumer>
    );
  };
}

export default withNotes;
```

Now lets create a `components/Search.js` with this scaffolding:

```JSX
import Downshift from 'downshift';
import Router from 'next/router';
import withNotes from '../lib/withNotes';
import SearchStyles from './styles/SearchStyles';

const Search = ({ notes }) => (
  <div>
    <SearchStyles>
      <input />
      <ul>{notes.map((item, index) => <li>{item.title}</li>)}</ul>
    </SearchStyles>
  </div>
);

export default withNotes(Search);

```

This is the UI of our search, but all of the functionality is missing:

1. Handling arrow keys
1. Handling clicks on items and outside
1. Handling submits
1. Handling Accessibility

### Wrap Component in Downshift

Wrap your existing components in Downshift and then downshift will expose to you a payload with all the information you need - we will call this `ds` for brevity.

```JSX
  <Downshift>
    {ds => (
      ... everything existing
    )}
  </Downshift>
```

### Toggle Open
downshift gives us a variable called `isOpen` and a few helper methods for assigning props to our elements. The contents of search should now be:

```JSX
<input {...ds.getInputProps({ placeholder: 'Search' })} />
{ds.isOpen && (
  <ul {...ds.getMenuProps()}>
    {notes.map((item, index) => <li>{item.title}</li>)}
  </ul>
)}
```

### Highlighted Index + other list item props

On each list item, we also can apply these props:

```JSX
{...ds.getItemProps({
  key: item._id,
  index,
  item,
  className:
    ds.highlightedIndex === index ? 'selected' : '',
})}
```

You should now be able to use your arrow keys to go through items. Not perfect yet though!

![](http://wes.io/de54b82cc9dc/content)

To fix this we pass two props to downshift that answer:

1. How do I convert each note to a string to put into the input when selected?
1. What should I do when someone selects me?

We fix #1 with:

```JSX
itemToString={item => (item ? item.title : '')}
```

and #2 with:

```JSX
onChange={note => Router.push(`/note?id=${note._id}`)}
```

