import Downshift from 'downshift';
import Router from 'next/router';
import styled from 'styled-components';
import withNotes from '../lib/withNotes';
import SearchStyles from './styles/SearchStyles';

const Search = ({ notes }) => (
  <Downshift
    onChange={note => Router.push(`/note?id=${note._id}`)}
    itemToString={item => (item ? item.title : '')}
  >
    {({
      getInputProps,
      getItemProps,
      getLabelProps,
      getMenuProps,
      isOpen,
      inputValue,
      highlightedIndex,
    }) => (
      <div>
        <SearchStyles>
          <input {...getInputProps({ placeholder: 'Search' })} />
          <ul {...getMenuProps()}>
            {isOpen &&
              notes
                .filter(item => !inputValue || item.title.includes(inputValue))
                .map((item, index) => (
                  <li
                    {...getItemProps({
                      key: item.value,
                      index,
                      item,
                      className: highlightedIndex === index ? 'selected' : '',
                    })}
                  >
                    {item.title}
                  </li>
                ))}
          </ul>
        </SearchStyles>
      </div>
    )}
  </Downshift>
);

export default withNotes(Search);
