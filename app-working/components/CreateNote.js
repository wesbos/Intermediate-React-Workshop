import React, { Component } from 'react';
import { NoteConsumer } from '../components/NoteProvider';
import Form from './styles/Form';
import FancyButton from './styles/FancyButton';
import CreateNoteDropDown from './styles/CreateNoteDropdown';

class CreateNote extends Component {
  state = {
    title: '',
    content: '',
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e, saveNote) => {
    e.preventDefault();
    console.log('Save Note!');
    saveNote(this.state);
  };

  render() {
    return (
      <NoteConsumer>
        {({ state, toggleDrawer, saveNote }) => (
          <CreateNoteDropDown open={state.drawerOpen}>
            <Form onSubmit={e => this.handleSubmit(e, saveNote)}>
              <label htmlFor="title">
                <input
                  required
                  type="text"
                  onChange={this.saveToState}
                  value={this.state.title}
                  name="title"
                  id="title"
                />
              </label>
              <label htmlFor="content">
                <textarea
                  required
                  type="text"
                  onChange={this.saveToState}
                  value={this.state.content}
                  name="content"
                  id="content"
                />
              </label>

              <FancyButton type="submit">Save Note</FancyButton>
              <FancyButton onClick={toggleDrawer}>Toggle</FancyButton>
            </Form>
          </CreateNoteDropDown>
        )}
      </NoteConsumer>
    );
  }
}

export default CreateNote;
