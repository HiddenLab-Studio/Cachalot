import tw, {styled} from "twin.macro"
import {Container} from "../../components/utils/ui/GlobalStyle.js";


export const AsideContainer = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 400px;
  flex: 0 0 auto;

  .no__account__container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    border: 2px solid ${props => props.theme.borderRightColor};
    border-bottom: 4px solid ${props => props.theme.borderRightColor};
  }
  
  @media (max-width: 1050px) {
    width: 100%;
  }
`;
export const BodyContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex: 1;
  justify-content: start;

  h1 {
    font-family: "Din_Round_Bold", sans-serif;
    font-size: var(--fs-l);
    color: ${props => props.theme.text};
  }
  
  .trending__container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    span {
      font-family: "Din_Round", sans-serif;
      font-size: var(--fs-s);
      color: ${props => props.theme.subText};
      text-align: justify;
      max-width: 95%;
    }
  }
  
  @media (max-width: 1050px) {
    width: 100%;
  }
`;

export const HomeContainer = styled(Container)``;
export const Content = styled.section`
  display: flex;
  justify-content: center;
  padding: 25px;
  max-width: 1024px;
  margin: 0 auto;
  min-height: 100vh;
  gap: 24px;

  @media (min-width: 768px) and (max-width: 1050px) {
    max-width: 768px;
  }

  @media (min-width: 0px) and (max-width: 1050px) {
    flex-direction: column;
  }
  
`