import axios from 'axios';
import SingleNote from '../components/SingleNote';
import { endpoint } from '../config';

const NotePage = props =>
  console.log(props) || (
    <div>
      <SingleNote note={props.note} />
    </div>
  );

NotePage.getInitialProps = async ({ query }) => {
  const response = await axios.get(`${endpoint}/${query.id}`);
  const note = response.data.note;
  return { note };
};

export default NotePage;
