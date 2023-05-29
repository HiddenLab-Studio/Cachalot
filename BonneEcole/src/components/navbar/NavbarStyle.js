import React from "react";
import tw, { styled } from "twin.macro";

export const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 0;
  img {
    width: 192px;
  }
`

export const LinkDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  gap: 10px;
  padding: 8px 20px;
  
  background-color: ${props => props.current === "true" ? props.theme.buttonBgOnCurrent : "transparent"};
  border: 2px solid ${props => props.current === "true" ? props.theme.buttonBorderOnCurrent : "transparent"};
  border-radius: 12px;
  
  span {
    text-transform: uppercase;
    font-size: var(--fs-ss);
    font-weight: 700;
    font-family: 'Din_Round', sans-serif;
    letter-spacing: .8px;
    color: ${props => props.theme.navbarText};
  }
  
  img {
    width: 32px;
    height: 32px;
  }
  
  &:hover {
    cursor: pointer;
    background-color: ${props => props.current === "true" ? "" : props.theme.buttonBgHover};
  }
`

export const LinkContainer = styled.div`
  display: flex;
  box-sizing: content-box;
  position: relative;
  flex-direction: column;
  gap: 8px;
  flex-grow: 5;
  padding-bottom: 10px;
`

export const ProfileElement = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  
  img {
    //border: 1px solid ${props => props.theme.navbarText};
    border-radius: 50%;
    width: 64px;
  }
  
  span {
    font-size: var(--fs-s);
    font-family: 'Din_Round_Bold', sans-serif;
    color: ${props => props.theme.navbarText};
  }
`

export const BeneathLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: end;
  gap: 8px;
`

export const XpBar = styled.div`
  width: 60%;
  height: 12px;
  border: 1px solid ${props => props.theme.navbarText};
  border-radius: 12px;
  overflow: hidden;
  div {
    width: 50%;
    height: inherit;
    border-radius: inherit;
    background-color: ${props => props.theme.buttonBorderOnCurrent};
  }
`

export const XpBarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const BarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`

export const LevelInformationContainer = styled.div`
  display: flex;
  width: 100%;
  span {
    font-size: var(--fs-xs);
  }
`

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
  border-top: 2px solid ${props => props.theme.borderRightColor};
  gap: 15px;
`

export const NavbarContainer = styled.nav`
  display: flex;
  flex-direction: column;
  border-right: 2px solid ${props => props.theme.borderRightColor};
  
  padding: 10px 16px;
  width: 256px;
`
