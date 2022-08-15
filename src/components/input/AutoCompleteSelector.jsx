import React from 'react'
import { getProp, breakpoint, condition } from '@carpenjk/prop-x/css'
import styled from 'styled-components'
import {
  getBackgroundColor,
  getBorderRadius,
  getColor,
  getFontFamily,
  getFontSize,
  getFontWeight,
  getHeight,
  getLetterSpacing
} from '@carpenjk/themeweaver'

const StyledContainer = styled.div`
  display: none;
  position: absolute;
  top: ${getHeight({}, 'auto')};
  left: 0;
  box-sizing: border-box;
  width: ${getProp('width')};
  border-radius: ${getBorderRadius({}, '5px')};
  outline: solid 1px ${getColor({}, '#b3b3a3')};

  color: ${getColor({}, 'initial')};
  font-family: ${getFontFamily({}, 'inherit')};
  font-weight: ${getFontWeight({}, 'normal')};
  font-size: ${getFontSize({}, '1.6rem')};
  letter-spacing: ${getLetterSpacing({}, '0.025em')};
  background-color: ${getBackgroundColor({}, 'white')};
  line-height: 250%;
  cursor: pointer;
  z-index 1000;

  ul {
    margin: 0;
    width: 100%;
  }
  li {
    margin: 0;
    list-style: none;
    width: 100%;
    border-radius: ${getBorderRadius({}, '5px')};
    font-size: 0.8em;
  }

  li:nth-child(${getProp('hightlightItem')}) {
    background-color: ${getColor({}, 'initial')};
    color: ${getBackgroundColor({}, 'white')};
  }
  li:hover {
    background-color: ${getColor({}, 'initial')};
    color: ${getBackgroundColor({}, 'white')};
  }

  ${condition('isOpen')`
    display: flex;
  `}
  ${breakpoint(1)`
  top: ${getHeight({}, 'auto')};
  border-radius: ${getBorderRadius({}, '5px')};
  color: ${getColor({}, 'initial')};
  font-family: ${getFontFamily({}, 'inherit')};
  font-weight: ${getFontWeight({}, 'normal')};
  font-size: ${getFontSize({}, '1.6rem')};
  letter-spacing: ${getLetterSpacing({}, '0.025em')};
  background-color: ${getBackgroundColor({}, 'white')};
  width: ${getProp('width')};

  li {
    padding-right: ${getProp('paddingLeft')};
    padding-left: ${getProp('paddingLeft')};
    border-radius: ${getBorderRadius({}, '5px')};
    font-size: 0.8em;
  }

  li:nth-child(${getProp('hightlightItem')}) {
    background-color: ${getColor({}, 'initial')};
    color: ${getBackgroundColor({}, 'white')};
  }
  li:hover {
    background-color: ${getColor({}, 'initial')};
    color: ${getBackgroundColor({}, 'white')};
  }
  `}
`
const AutoCompleteSelector = ({ autoComplete, ...props }) => {
  const { keyboardIndex, isOpen } = autoComplete.acState
  const { onClick, getSuggestions } = autoComplete.acControl
  const suggestions = getSuggestions()
  return (
    <StyledContainer
      {...props}
      isOpen={isOpen && suggestions.length > 0}
      hightlightItem={keyboardIndex + 1}
      onClick={onClick}
    >
      <ul>
        {suggestions.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </StyledContainer>
  )
}

export default AutoCompleteSelector
