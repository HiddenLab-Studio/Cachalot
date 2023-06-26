import tw, { styled } from "twin.macro";
import {Container} from "../../../components/utils/ui/GlobalStyle.js";

export const BodyProfileAsideContainer = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 0 0 auto;
  width: 400px;
  transition: all 0.1s ease-in-out;

  .title {
    font-family: "Din_Round_Bold", sans-serif;
    font-size: var(--fs-sl);
    color: ${props => props.theme.text};
  }
  
`

export const SuccessContainer = styled.div``
export const GridElement = styled.div`
  background-color: white;
`
export const GridContainer = styled.div``
export const BodyProfileSectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  gap: 16px;


  h1 {
    font-family: "Din_Round_Bold", sans-serif;
    font-size: var(--fs-sl);
    color: ${props => props.theme.text};
  }
  
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
`

export const Content = styled.div`
  margin: 0 auto;
  max-width: 1056px;
  width: 100%;
  padding: 25px;
`
export const ProfileContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 32px;
  padding-left: 256px;

  @media (max-width: 1115px) {
      ${BodyProfileSectionContainer} {
        ${GridContainer} {
            grid-template-columns: repeat(1, 1fr);
        }
      }
  }
   
  // Responsive
  @media (min-width: 768px) and (max-width: 1200px) {
    padding-left: 128px;
    ${BodyProfileAsideContainer} {
      width: 350px;
    }
  }
  
  @media (min-width: 768px) and (max-width: 950px) {
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
    /*max-height: calc(100vh - 85px);
    overflow-y: auto;
    padding: 0;*/
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