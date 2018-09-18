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
      <NoteContext.Provider
        value={{
          state: this.state,
          getNotes: async () => {
            const { data: notes } = await axios.get(endpoint);
            console.log(notes);
            this.setState({ notes });
          },
          deleteNote: async id => {
            const res = await axios.delete(`${endpoint}/${id}`);
            console.log(res);
            const updatedNotes = this.state.notes.filter(note => note._id !== id);
            this.setState({ notes: updatedNotes });
          },
          updateNote: async note => {
            const res = await axios.put(`${endpoint}/note._id`, { note });
            console.log('Back from updating the note');
            const existingNoteIndex = this.state.notes.findIndex(n => n._id === note._id);
            console.log(existingNoteIndex);
            this.setState({
              notes: [
                ...this.state.notes.slice(0, existingNoteIndex),
                res.data, // updated note
                ...this.state.notes.slice(existingNoteIndex + 1),
              ],
            });
          },
          saveNote: async note => {
            // post it
            const res = await axios.post(endpoint, { note });
            // this is a new note - put it at the top
            this.setState({
              notes: [res.data, ...this.state.notes],
              drawerOpen: false,
            });
            return res.data;
          },
          toggleDrawer: () => {
            this.setState({ drawerOpen: !this.state.drawerOpen });
          },
        }}
      >
        {this.props.children}
      </NoteContext.Provider>
    );
  }
}

// then make a consumer which will surface it
const NoteConsumer = NoteContext.Consumer;

export default NoteProvider;
export { NoteConsumer };
