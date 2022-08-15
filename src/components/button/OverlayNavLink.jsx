import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const StyledA = styled.a`
  z-index: 999999;

  display: flex;
  align-items: center;
  text-align: center;
  flex-direction: row;
  padding: 10px;

  font-family: Roboto;
  font-size: ${({ theme }) => theme.fontSizes[3]}px;
  font-weight: bold;
  letter-spacing: 0.025em;
  color: ${({ theme }) => theme.colors.lightText};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 1px 2px rgba(116, 108, 108, 0.25);
  outline: 1px solid ${({ theme }) => theme.colors.action[2]};
  border-radius: 5px;
  cursor: pointer;

  background-color: ${({ theme }) => theme.colors.white};
  &:hover {
    color: ${({ theme }) => theme.colors.secondaryText};
    outline: 1px solid ${({ theme }) => theme.colors.action[1]};
  }
`
const OverlayNavLink = ({ children, href }) => (
  <Link href={href} passHref>
    <StyledA>{children}</StyledA>
  </Link>
)

export default OverlayNavLink
