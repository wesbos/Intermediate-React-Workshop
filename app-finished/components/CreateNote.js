import React, { Component } from 'react';
import { NoteConsumer } from '../components/NoteProvider';
import Form from './styles/Form';
import styled from 'styled-components';
import ToggleDrawer from './ToggleDrawer';
import FancyButton from './styles/FancyButton';
import CreateNoteDropDown from './styles/CreateNoteDropdown';

class CreateNote extends Component {
  state = {
    title: 'Test est',
    content: 'testing 123',
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
        {({ state, saveNote }) => (
          <CreateNoteDropDown open={state.drawerOpen}>
            <Form onSubmit={e => this.handleSubmit(e, saveNote)}>
              <label htmlFor="title">
                <input
                  value={this.state.title}
                  required
                  onChange={this.saveToState}
                  type="text"
                  name="title"
                  id="title"
                />
              </label>
              <label htmlFor="content">
                <textarea
                  value={this.state.content}
                  required
                  type="text"
                  name="content"
                  id="content"
                  onChange={this.saveToState}
                />
              </label>

              <FancyButton type="submit">Save Note</FancyButton>
              <ToggleDrawer>Cancel</ToggleDrawer>
            </Form>
          </CreateNoteDropDown>
        )}
      </NoteConsumer>
    );
  }
}

export default CreateNote;
