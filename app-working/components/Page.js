import Link from 'next/link';
import PageStyles from './styles/PageStyles';
import CreateNote from './CreateNote';
import Search from './Search';

const Page = props => (
  <PageStyles>
    <Link href="/">
      <a>
        <h1>Take Notes!</h1>
      </a>
    </Link>
    <CreateNote />
    <Search />
    {props.children}
  </PageStyles>
);

export default Page;
