import styled from 'styled-components';

const Form = styled.form`
  padding: 20px;
  label {
    display: block;
    margin-bottom: 20px;
  }
  input,
  textarea {
    border: 0;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
    width: 100%;
    font-size: 30px;
    padding: 10px;
    font-weight: 800;
    &:focus {
      outline: 0;
      border-color: #ffc600;
    }
  }
  textarea {
    font-size: 20px;
  }
`;

export default Form;
