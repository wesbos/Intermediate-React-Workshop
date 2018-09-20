import React from 'react';
import Head from 'next/head';
import NotesListStyles from './styles/NotesListStyles';
import withContextValues from '../lib/withContextValues';
import Note from './Note';

class NotesList extends React.Component {
  componentDidMount() {
    console.log(this.props);
    this.props.contextValues.getNotes();
  }

  render() {
    return (
      <NotesListStyles>
        <Head>
          <title>Notes - {this.props.contextValues.state.notes.length}</title>
        </Head>
        {this.props.contextValues.state.notes.map(note => (
          <Note key={note._id} note={note} />
        ))}
      </NotesListStyles>
    );
  }
}
export default withContextValues(NotesList);
