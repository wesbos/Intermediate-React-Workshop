import { NoteConsumer } from '../components/NoteProvider';
import FancyButton from './styles/FancyButton';

const ToggleDrawer = props => (
  <NoteConsumer>
    {({ toggleDrawer }) => <FancyButton onClick={toggleDrawer}>{props.children}</FancyButton>}
  </NoteConsumer>
);

export default ToggleDrawer;
