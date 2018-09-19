import CreateNote from '../components/CreateNote';
import Search from '../components/Search';
import PageStyles from './styles/PageStyles';
import Link from 'next/link';
import styled from 'styled-components';

const Heading = styled.h1`
  text-align: center;
  font-size: 70px;
  color: black;
  margin: 0;
`;

const Page = props => (
  <PageStyles>
    <Link href="/">
      <a>
        <Heading>Take Notes!</Heading>
      </a>
    </Link>
    <CreateNote />
    <Search />
    {props.children}
  </PageStyles>
);

export default Page;
