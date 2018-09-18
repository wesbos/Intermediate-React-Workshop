import React from 'react';
import Head from 'next/head';
import { NoteConsumer } from './NoteProvider';
import Note from './Note';
import NotesListStyles from './styles/NotesListStyles';
import withContextValues from '../lib/withContextValues';

class NotesList extends React.Component {
  componentDidMount() {
    this.props.contextValues.getNotes();
  }
  render() {
    return (
      <NoteConsumer>
        {({ state }) => (
          <NotesListStyles>
            <Head>
              <title>{state.notes.length} Notes</title>
            </Head>
            {state.notes.map(note => <Note key={note._id} note={note} />)}
          </NotesListStyles>
        )}
      </NoteConsumer>
    );
  }
}
export default withContextValues(NotesList);
