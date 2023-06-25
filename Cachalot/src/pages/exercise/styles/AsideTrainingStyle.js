import tw, { styled } from "twin.macro";

export const AsideTrainingContainer = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 400px;
  flex: 0 0 auto;

  @media (max-width: 1050px) {
    width: 100%;
  }
  
`