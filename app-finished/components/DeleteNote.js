import { NoteConsumer } from './NoteProvider';

const DeleteNote = props => (
  <NoteConsumer>{({ deleteNote }) => props.children(deleteNote)}</NoteConsumer>
);

export default DeleteNote;
