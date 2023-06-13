import tw, { styled } from "twin.macro";
import {Container} from "../../../components/utils/ui/GlobalStyle.js";

export const FindFriendsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  border: 2px solid ${props => props.theme.borderRightColor};
  border-bottom: 4px solid ${props => props.theme.borderRightColor};
  border-radius: 12px;
  width: 100%;
  gap: 16px;
  
  img {
    width: 64px;
    height: 64px;
  }
  
  div {
    display: flex;
    flex-direction: column;
    h1 {
      font-size: var(--fs-m);
      word-break: break-word;
    }
    span {
      font-family: "Din_Round_Med", sans-serif;
      font-size: var(--fs-ss);
      color: ${props => props.theme.subText};
    }
  }
  
  .chevron {
    display: flex;
    flex-grow: 1;
    align-items: end;
    svg {
      color: ${props => props.theme.subText};
    }
  }
`
export const JoinClassContainer = styled(FindFriendsContainer)`
  
`

export const BodyProfileAsideContainer = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 0 0 auto;
  width: 400px;
  transition: all 0.1s ease-in-out;
`

export const SuccessContainer = styled.div``
export const GridElement = styled.div``
export const GridContainer = styled.div``
export const BodyProfileSectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  gap: 16px;
  
  ${GridContainer} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    ${GridElement} {
      display: flex;
      align-items: center;
      gap: 16px;
      border-radius: 12px;
      border: 2px solid ${props => props.theme.borderRightColor};
      padding: 16px 24px;
      img {
        width: 32px;
        height: 32px;
      }
      div {
        flex-grow: 1;
        span {
          font-family: "Din_Round_Med", sans-serif;
          font-size: var(--fs-sm);
          font-weight: 700;
          color: ${props => props.theme.text};
        }
        h2 {
          font-family: "Din_Round", sans-serif;
          font-size: var(--fs-s);
          color: ${props => props.theme.subText};
        }
      }
    }
  }
  
`
export const BodyProfileContainer = styled.div`
  Display: flex;
  flex-direction: row;
  gap: 32px;
  margin-top: 24px;
  
  h1 {
    font-family: "Din_Round_Bold", sans-serif;
    font-size: var(--fs-sl);
    color: ${props => props.theme.text};
  }
`

export const Content = styled.div`
  margin: 0 auto;
  max-width: 1056px;
  width: 100%;
  padding: 25px;
`
export const ProfileContainer = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 32px;
  padding-left: 256px;
  
  // Responsive
  @media (min-width: 768px) and (max-width: 1200px) {
    padding-left: 128px;
    ${BodyProfileAsideContainer} {
      width: 350px;
    }
  }
  
  @media (min-width: 768px) and (max-width: 900px) {
    ${Content} {
      ${BodyProfileContainer} {
        flex-direction: column;
        align-items: flex-start;
        ${BodyProfileSectionContainer} {
          width: 100%;
        }
        ${BodyProfileAsideContainer} {
          width: 100%;
        }
      }
    }
  }
  
  @media (max-width: 768px) {
    max-height: calc(100vh - 85px);
    overflow-y: auto;
    padding: 0;
    ${BodyProfileContainer} {
      flex-direction: column;
      align-items: flex-start;
      ${BodyProfileSectionContainer} {
        width: 100%;
      }
      ${BodyProfileAsideContainer} {
        width: 100%;
        a {
          h1 {
            font-size: var(--fs-sm);
          }
        }
      }
    }
  }

`