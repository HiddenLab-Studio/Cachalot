import { styled } from "twin.macro";

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4px;
  
  span {
    font-family: "Din_Round_Med", sans-serif;
    font-size: var(--fs-s);
    color: ${props => props.theme.errorText};
    @media (max-width: 550px) {
      font-size: var(--fs-xs);
    }
  }
  svg {
    font-size: var(--fs-s);
    color: ${props => props.theme.errorText}; 
  }
;`

export const ExerciseTypeCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border: 2px solid ${props => props.theme.borderRightColor};
  border-bottom: 4px solid ${props => props.theme.borderRightColor};
  border-radius: 12px;
  background-color: ${props => props.current === true ? props.theme.buttonBgHover : "transparent"};
  img {
    height: 64px;
    width: 64px;
  }
  span {
    font-size: var(--fs-ss);
    font-family: "Din_Round_Med", sans-serif;
    color: ${props => props.theme.text};
    text-align: justify;
  }

  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.buttonBgHover};
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  @media (max-width: 550px) {
    grid-template-columns: repeat(1, 100%);
  }
`;

export const ExerciseTypeCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media (max-width: 550px) {
    flex-direction:  !important;
  }
`;

export const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.current === true ? props.theme.cachalotColor : props.theme.borderRightColor};
  margin: 0 4px;
  &:hover {
    cursor: pointer;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 4px;
`;

export const NextStepContainer = styled.div`
  position: absolute;
  right: ${props => props.right === true ? 0 : null};
  left: ${props => props.left === true ? 0 : null};
  top: 50%;
  transform: translateY(-16px);
  svg {
    font-size: var(--fs-xl);
    color: ${props => props.theme.iconColor};
    &:hover {
      cursor: pointer;
    }
  }  
`;
export const PreviousStepContainer = styled(NextStepContainer)``;



export const CreationSwiperContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border: 2px solid ${props => props.theme.borderRightColor};
  border-bottom: 4px solid ${props => props.theme.borderRightColor};
  border-radius: 12px;
  padding: 16px;
  gap: 24px;
  
  h1 {
    font-family: "Din_Round_Bold", sans-serif;
    font-size: var(--fs-m);
    color: ${props => props.theme.text};
    text-decoration: underline;
  }
  
  span {
    max-width: 95%;
  }
  
  @media (max-width: 550px) {
    h1 {
      font-size: var(--fs-s);
    }
    span {
      font-size: var(--fs-ss);
    }
  }
  
`;