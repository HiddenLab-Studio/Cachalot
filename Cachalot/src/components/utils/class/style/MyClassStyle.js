import { styled } from "twin.macro";
import { Container } from "../../ui/GlobalStyle.js";

export const MyClassContainer = styled(Container)``;
export const Content = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 25px 32px 25px;
  
  .title__container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    h1 {
      font-family: "Din_Round_Bold", sans-serif;
      font-size: var(--fs-l);
      color: ${props => props.theme.text};
      border-bottom: 2px solid ${props => props.theme.borderRightColor};
    }
    span {
      font-family: "Din_Round", sans-serif;
      font-size: var(--fs-s);
      color: ${props => props.theme.subText};
      text-align: justify;
    }
  }
  
`