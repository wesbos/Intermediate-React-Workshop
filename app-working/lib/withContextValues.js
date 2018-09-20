import { NoteConsumer } from '../components/NoteProvider';

function withContextValues(Component) {
  return function ContextValues(props) {
    return (
      <NoteConsumer>
        {values => <Component {...props} contextValues={values} />}
      </NoteConsumer>
    );
  };
}

export default withContextValues;
