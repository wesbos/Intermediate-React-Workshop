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
    saveNote: async note => {
      // post it to the backend
      const res = await axios.post(endpoint, { note });
      // this is a new note - put it at the top
      this.setState({
        notes: [res.data, ...this.state.notes],
        drawerOpen: true,
      });
      return res.data;
    },
  };
  render() {
    return (
      <NoteContext.Provider
        value={{
          state: this.state,
          toggleDrawer: () => {
            console.log(this.state.drawerOpen);
            this.setState({ drawerOpen: !this.state.drawerOpen });
          },
          getNotes: async () => {
            const { data: notes } = await axios.get(endpoint);
            console.log(notes);
            this.setState({ notes });
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
