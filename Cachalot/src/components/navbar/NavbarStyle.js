import { styled } from "twin.macro";

export const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 0;
  img {
    max-width: 192px;
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
    border-radius: 50%;
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
    border: 1px solid ${props => props.theme.navbarText};
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
  
  svg {
    font-size: var(--fs-ss);
    color: ${props => props.theme.text};
    &:hover {
      cursor: pointer;
    }
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
  position: fixed;
  height: 100vh;
  display: flex;
  flex-direction: column;
  border-right: 2px solid ${props => props.theme.borderRightColor};
  gap: 20px;
  background-color: ${props => props.theme.background};
  
  padding: 25px 16px;
  width: 256px;
  transition: all 0.1s ease-in-out;
  
  @media (min-width: 768px) and (max-width: 1200px) {
    padding: 8px;
    width: 128px;

    ${ProfileContainer} {
      display: none;
    }
    
    ${ImgWrapper} {
      img {
        width: 96px;
      }
    }
    
    ${LinkContainer} {
        align-items: center;
    }
  }
  
  @media (max-width: 768px) {
    transition: none;
    padding: 5px;
    border-right: none;
    border-top: 2px solid ${props => props.theme.borderRightColor};
    position: fixed;
    width: 100%;
    align-self: end;
    height: auto;
    
    ${LinkContainer} {
      justify-content: space-evenly;
      flex-direction: row;
      padding: 10px 5px;
    } 
    
    ${LinkDiv} {
      padding: 5px;
      img {
        width: 48px;
        height: 48px;
      }
    }
  }
`
