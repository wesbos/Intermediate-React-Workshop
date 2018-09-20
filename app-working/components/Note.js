import Link from 'next/link';
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
  </NoteStyles>
);

export default Note;
