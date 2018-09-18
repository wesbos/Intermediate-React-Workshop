import styled from 'styled-components';

const CreateNoteDropDown = styled.div`
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: scale(0);
  transition: all 0.2s;
  display: grid;
  align-items: center;
  justify-items: center;
  border-radius: 50%;
  overflow: hidden;

  ${props =>
    props.open &&
    `
    border-radius: 0;
    transform: scale(1);`};
  form {
    background: white;
  }
`;

export default CreateNoteDropDown;
