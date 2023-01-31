import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import {
  getColor,
  getBackgroundColor,
  getFontFamily,
  getFontSize,
  getFontWeight,
  getHeight,
  getLetterSpacing,
  getMarginTop,
  getMarginRight,
  getMarginBottom,
  getMarginLeft,
  getBoxShadow,
  getBorderRadius,
  getMinWidth
} from '@carpenjk/themeweaver'
import { getProp, breakpoint } from '@carpenjk/prop-x/css'

import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'
import InputLabel from './InputLabel'

const StyledDateHandler = styled.div`
display: block;
position: relative;
width: ${getProp('width')};
min-width: ${(props) => getMinWidth(`date.${props.variant}`, '0')(props)};
margin-top: ${(props) => getMarginTop(`date.${props.variant}`, '0')(props)};
margin-right: ${(props) => getMarginRight(`date.${props.variant}`, '0')(props)};
margin-bottom: ${(props) =>
  getMarginBottom(`date.${props.variant}`, '0')(props)};
margin-left: ${(props) => getMarginLeft(`date.${props.variant}`, '0')(props)};



.react-datepicker-popper {
  position: relative;
  z-index: 99999;
}
.react-datepicker-wrapper {
  width: 100%;
  box-sizing: border-box;
}
.react-datepicker__input-container {
  width:100%;
}
.react-datepicker__input-container > input {
  width: 100%;
  padding-left: ${getProp('textOffset')};
  background-image: url(${getProp('icon')});
  background-repeat: no-repeat;
  background-position: ${getProp('iconOffset')} 50%;
  box-shadow: ${(props) =>
    getBoxShadow(
      `date.${props.variant}`,
      '0px 0px 8px rgba(192, 192, 192, 0.52)'
    )(props)};
  border-radius: ${(props) =>
    getBorderRadius(`date.${props.variant}`, '5px')(props)};
  border-style: none;
  color: ${(props) => getColor(`date.${props.variant}`, 'inherit')(props)};
  background-color: ${(props) =>
    getBackgroundColor(`date.${props.variant}`, 'initial')(props)};
  font-family: ${(props) =>
    getFontFamily(`date.${props.variant}`, 'inherit')(props)};
  font-weight: ${(props) =>
    getFontWeight(`date.${props.variant}`, 'normal')(props)};
  font-size: ${(props) =>
    getFontSize(`date.${props.variant}`, '1.6rem')(props)};
  height: ${(props) => getHeight(`date.${props.variant}`, 'auto')(props)};
  letter-spacing: ${(props) =>
    getLetterSpacing(`date.${props.variant}`, '0.025em')(props)};
  
}

${breakpoint(1)`
  width: ${getProp('width')};
  min-width: ${(props) => getMinWidth(`date.${props.variant}`, '0')(props)};
  margin-top: ${(props) => getMarginTop(`date.${props.variant}`, '0')(props)};
  margin-right: ${(props) =>
    getMarginRight(`date.${props.variant}`, '0')(props)};
  margin-bottom: ${(props) =>
    getMarginBottom(`date.${props.variant}`, '0')(props)};
  margin-left: ${(props) => getMarginLeft(`date.${props.variant}`, '0')(props)};

  

  .react-datepicker__input-container > input {
    width: ${getProp('width')};

    color: ${(props) => getColor(`date.${props.variant}`, 'inherit')(props)};
    background-color: ${(props) =>
      getBackgroundColor(`date.${props.variant}`, 'initial')(props)};
    font-family: ${(props) =>
      getFontFamily(`date.${props.variant}`, 'inherit')(props)};
    font-weight: ${(props) =>
      getFontWeight(`date.${props.variant}`, 'normal')(props)};
    font-size: ${(props) =>
      getFontSize(`date.${props.variant}`, '1.6rem')(props)};
    letter-spacing: ${(props) =>
      getLetterSpacing(`date.${props.variant}`, '0.025em')(props)};
    box-shadow: ${(props) =>
      getBoxShadow(
        `date.${props.variant}`,
        '0px 0px 8px rgba(192, 192, 192, 0.52)'
      )(props)};
    border-radius: ${(props) =>
      getBorderRadius(`date.${props.variant}`, '5px')(props)};
  }
`}
`

StyledDateHandler.defaultProps = {
  textOffset: '2.6rem',
  icon: '',
  iconOffset: '0.5rem',
  width: '12.5rem'
}

const FormikDatePicker = (props) => {
  const styleRef = useRef()

  const {
    forceClose,
    id,
    icon,
    iconOffset,
    label,
    textOffset,
    width,
    showLabel,
    onFocus,
    inputRef,
    popperParent,
    variant,
    ...restProps
  } = props

  const PopperContainer = ({ children }) => {
    if (popperParent && popperParent.current) {
      return createPortal(children, popperParent.current)
    }
    return null
  }

  const handleFocus = (e) => {
    e.target.readOnly = true
    if (onFocus) {
      onFocus()
    }
  }

  const handleKeyDown = (e) => {
    if (inputRef && inputRef.current) {
      if (e.key === 'Tab') {
        inputRef.current.setOpen(false)
      }
    }
  }

  useEffect(() => {
    if (forceClose && inputRef && inputRef.current) {
      inputRef.current.setOpen(false)
    }
  }, [forceClose, inputRef, inputRef.current])
  return (
    <StyledDateHandler
      variant={variant}
      icon={icon}
      iconOffset={iconOffset}
      textOffset={textOffset}
      width={width}
      ref={styleRef}
    >
      {showLabel && <InputLabel htmlFor={id}>{label}</InputLabel>}
      <DatePicker
        {...restProps}
        id={id}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        popperContainer={PopperContainer}
        popperPlacement="bottom"
        popperModifiers={{
          offset: {
            enabled: true,
            offset: '0px, 0px'
          },
          flip: {
            enabled: false
          },
          preventOverflow: {
            enabled: true,
            escapeWithReference: false,
            boundariesElement: 'viewport'
          }
        }}
        strictParsing
        ref={inputRef}
      />
    </StyledDateHandler>
  )
}

export default FormikDatePicker
