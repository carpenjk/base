import React from 'react'
import styled from 'styled-components'
import {
  getMarginTop,
  getMarginRight,
  getMarginBottom,
  getMarginLeft,
  getPaddingTop,
  getPaddingRight,
  getPaddingBottom,
  getBorderRadius,
  getPaddingLeft
} from '@carpenjk/themeweaver'
import { getProp, breakpoint } from '@carpenjk/prop-x/css'

const StyledWrapper = styled.div`
  display: block;
  position: relative;
  border-radius: ${getBorderRadius({}, '5px')};
  box-sizing: border-box;
  background-color: transparent;
  width: ${getProp('width')};

  margin-top: ${getMarginTop({}, '0')};
  margin-right: ${getMarginRight({}, '0')};
  margin-bottom: ${getMarginBottom({}, '0')};
  margin-left: ${getMarginLeft({}, '0')};
  padding-top: ${getPaddingTop({}, '4px')};
  padding-right: ${getPaddingRight({}, '4px')};
  padding-bottom: ${getPaddingBottom({}, '4px')};
  padding-left: ${getPaddingLeft({}, '4px')};

  ${breakpoint(1)`
    width: ${getProp('width', 1)};
    border-radius: ${getBorderRadius({}, '5px')};
    margin-top: ${getMarginTop({}, '0')};
    margin-right: ${getMarginRight({}, '0')};
    margin-bottom: ${getMarginBottom({}, '0')};
    margin-left: ${getMarginLeft({}, '0')};
    padding-top: ${getPaddingTop({}, '4px')};
    padding-right: ${getPaddingRight({}, '4px')};
    padding-bottom: ${getPaddingBottom({}, '4px')};
    padding-left: ${getPaddingLeft({}, '4px')};

  `}
`

const InputWrapper = ({ children, ...props }) => (
  <StyledWrapper {...props}>{children}</StyledWrapper>
)

export default InputWrapper
