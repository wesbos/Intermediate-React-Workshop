import axios from 'axios';
import EditNote from '../components/EditNote';
import { endpoint } from '../config';

const NotePage = props =>
  console.log(props) || (
    <div>
      <EditNote note={props.note} />
    </div>
  );

NotePage.getInitialProps = async ({ query }) => {
  const response = await axios.get(`${endpoint}/${query.id}`);
  const note = response.data.note;
  return { note };
};

export default NotePage;
