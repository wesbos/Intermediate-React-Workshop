import CreateNote from '../components/CreateNote';
import ToggleDrawer from '../components/ToggleDrawer';
import NotesList from '../components/NotesList';

const IndexPage = () => (
  <>
    <ToggleDrawer>Create A New Note</ToggleDrawer>
    <NotesList />
  </>
);

export default IndexPage;
