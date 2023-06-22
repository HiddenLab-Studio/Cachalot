import tw, { styled } from "twin.macro";

export const AsideClassContainer = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 16px;
  width: 400px;
  flex: 0 0 auto;

  @media (max-width: 1050px) {
    width: 100%;
  }
  
`

