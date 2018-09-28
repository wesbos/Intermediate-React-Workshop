## Single Notes and SSR

You'll notice that if we refresh the page it goes from 0 to 3 notes. This is because the SSR has no idea it needs to wait for the list of notes to load.

We're going to leave that as-is, but look at another way to load data for SSR with our single notes. This will ensure that each note's single page will be SSR and indexed by search engines.

Next.js introduces something called `getInitialProps` which is an async lifecycle method. The way it works is that this getInitialProps method must resolve some values from it before the initial render of the page is called.

One downside to this is it's only available on pages, not child components. You can certainly walk that tree of components looking for more, but that is a bit outside of this workshop :)

Lets open our `pages/note.js` file and unpack the code below.

```JSX
import axios from 'axios';
import SingleNote from '../components/SingleNote';
import { endpoint } from '../config';

const NotePage = props =>
  console.log(props) || (
    <div>
      <SingleNote note={props.note} />
    </div>
  );

NotePage.getInitialProps = async ({ query }) => {
  const response = await axios.get(`${endpoint}/${query.id}`);
  const note = response.data.note;
  return { note };
};

export default NotePage;

```

We also need to create `components/SingleNote.js`

```JSX
import Head from 'next/head';
import Link from 'next/link';
import { NoteConsumer } from './NoteProvider';

const SingleNote = ({ note }) => {
  if (!note) return <p>No Note Found</p>;
  return (
    <>
      <Head>
        <title>{note.title}</title>
      </Head>
      <div>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
      </div>
    </>
  );
};

export default SingleNote;
```
