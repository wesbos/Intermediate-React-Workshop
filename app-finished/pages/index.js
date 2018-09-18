import CreateNote from '../components/CreateNote';
import NotesList from '../components/NotesList';
import ToggleDrawer from '../components/ToggleDrawer';

const IndexPage = () => (
  <>
    <ToggleDrawer>Create A New Note</ToggleDrawer>
    <NotesList />
  </>
);

export default IndexPage;
