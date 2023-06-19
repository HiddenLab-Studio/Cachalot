import { styled } from "twin.macro";
import { Container } from "../../ui/GlobalStyle.js";

export const Title = styled.div``;
export const MyClassMainTitleContainer = styled.div``;
export const MyClassContainer = styled(Container)``;
export const Content = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1024px;
  align-items: center;
  padding: 32px 25px 32px 25px;
  gap: 24px;
  margin: 0 auto;
  
  ${MyClassMainTitleContainer} {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    ${Title} {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 8px;
      border-bottom: 2px solid ${props => props.theme.borderRightColor};
      img {
        width: 48px;
        height: 48px;
      }
      h1 {
        font-family: "Din_Round_Bold", sans-serif;
        font-size: var(--fs-l);
        color: ${props => props.theme.text};
      }
    }
  }
  
`