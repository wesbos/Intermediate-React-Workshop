import styled from 'styled-components';
import Search from '../Search';

const SearchStyles = styled.div`
  margin: 20px;
  position: relative;
  background: red;
  input {
    width: 100%;
    font-size: 20px;
    padding: 5px;
  }
  ul {
    margin: 0;
    list-style: none;
    padding: 0;
    position: absolute;
    background: white;
    width: 100%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  li {
    padding: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  .selected {
    background: #ffc600;
  }
`;

export default SearchStyles;
