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
