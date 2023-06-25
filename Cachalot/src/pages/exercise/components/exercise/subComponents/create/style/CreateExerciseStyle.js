import tw, { styled } from "twin.macro";

export const Fieldset = styled.fieldset`
  border: 1px solid black;
  width: 100%;
  height: inherit;
  span {
    position: absolute;
    transform: translateY(-px);
  }
`;
export const ExerciseCreationSubContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const ExerciseCreationBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  
`;
export const MainTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;
  border-bottom: 2px solid ${props => props.theme.borderRightColor};
  width: 100%;
  
  img {
    width: 36px;
    height: 36px;
  }
  
  h1 {
    font-family: "Din_Round_Bold", sans-serif;
    font-size: var(--fs-l);
    color: ${props => props.theme.text};
  }
  
  @media (max-width: 550px) {
    h1 {
      font-size: var(--fs-m);
    }
    span {
      font-size: var(--fs-ss);
    }
  }
  
`;
