import React from 'react'
import styled from 'styled-components'
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: center;
  height: 3rem;
  width: 100%;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 0 0 3px 3px;
  outline: none;
  outline-color: transparent;
  
  .downArrow {
    height: 1px;
    width: 1px;
    margin-top: 0.9rem;
    overflow: hidden;
    border: 0.9rem solid transparent;
    border-top-color: #767676;
    border-radius: 5px;
  }
  .activeColor {
    background: #ffffff;
  }
`
const DropDownIncrArrow = () => {
  return (
    <StyledContainer className={'arrowContainer '}>
      <div className="downArrow"></div>
    </StyledContainer>
  )
}

export default DropDownIncrArrow
