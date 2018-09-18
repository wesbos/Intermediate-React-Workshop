import Link from 'next/link';
import DeleteNote from './DeleteNote';
import NoteStyles from './styles/NoteStyles';
import Title from './styles/Title';
import FancyButton from './styles/FancyButton';

const Note = ({ note }) => (
  <NoteStyles>
    <Link
      href={{
        pathname: '/note',
        query: { id: note._id },
      }}
    >
      <a>
        <Title>{note.title}</Title>
      </a>
    </Link>

    <Link
      href={{
        pathname: '/edit',
        query: { id: note._id },
      }}
    >
      <a>Edit</a>
    </Link>

    <DeleteNote>
      {del => <FancyButton onClick={() => del(note._id)}>DELETE</FancyButton>}
    </DeleteNote>
  </NoteStyles>
);

export default Note;
