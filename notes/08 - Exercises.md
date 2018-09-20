# Your turn!

It's time for you to try and work a little on your own.

## 1. Create a Delete Button

Create a button that when clicked will both ping the backend to delete on the server as well as remove that item from local state.

Some tips:

1. You'll need to create a new method in your Provider and expose it via your consumer
1. The backend endpoint must use DELETE verbe. IE: `axios.delete(`${endpoint}/${id}`)`
1. For Extra points, make a `DeleteNote.js` render prop component that can be used like below. this way the look of your delete button isn't tied to the functionality.

```JSX
<DeleteNote>
  {del => <FancyButton onClick={() => del(note._id)}>DELETE</FancyButton>}
</DeleteNote>
```

## 1. Create an Edit Page

1. you'll need to make a new `updateNote` method in your provider
1. You'll need to make a page called `edit.js`.
1. This page will resemble `note.js` in that you can SSR fetch the data
1. This page will resemble `CreateNote.js` in that you must have a form that mirrors to state.
1. The endpoint needs to use the PUT verb. IE:
  > const res = await axios.put(`${endpoint}/${note._id}`, { note });
1. You must update the note both on the backend as well as in local state
