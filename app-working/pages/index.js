import Link from 'next/link';

const IndexPage = () => (
  <div>
    <p>Hey!</p>
    <Link href="/note">
      <a>Note</a>
    </Link>
  </div>
);

export default IndexPage;
