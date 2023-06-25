import tw, { styled } from "twin.macro";
import { Container } from "../../../components/utils/ui/GlobalStyle.js";



export const ClassContainer = styled(Container)``;
export const Content = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 1024px;
  margin: 0 auto;
  padding: 25px;
  gap: 32px;

  @media (min-width: 768px) and (max-width: 1050px) {
    max-width: 768px;
  }
  
  @media (min-width: 0px) and (max-width: 1050px) {  
    flex-direction: column;
  }
  
`