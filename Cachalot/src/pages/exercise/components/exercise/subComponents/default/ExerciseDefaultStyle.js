import tw, {styled} from "twin.macro";

export const LikeContainer = styled.div`
  ${tw`flex flex-row items-center gap-[4px] justify-end`};
  span {
    font-family: "Din_Round_Med", sans-serif;
    font-size: var(--fs-ss);
    color: ${props => props.theme.text};
  }
  svg {
    cursor: pointer;
    font-size: var(--fs-m);
  }
`;
export const ExerciseCompleteContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
  justify-content: center;
  svg {
    font-size: var(--fs-sm);
  }
  span {
    font-family: "Din_Round_Med", sans-serif;
    font-size: var(--fs-s);
    color: ${props => props.theme.text};
  }
`;
export const GridElement = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  border: 2px solid ${props => props.theme.borderRightColor};
  border-bottom: 4px solid ${props => props.theme.borderRightColor};
  border-radius: 12px;
  padding: 16px;
  
  // text
  font-family: "Din_Round", sans-serif;
  font-size: var(--fs-ss);
  color: ${props => props.theme.text};
  
  background-color: ${props => props.current ? props.theme.iconColor : null};

  &:hover {
    cursor: pointer;
    background-color: ${props => !props.current ? props.theme.buttonBgHover : null};
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 16px;
  }
`;

export const ImageZoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  img {
    border-radius: ${props => props.zoom ? "12px" : "50%"};
    width: ${props => props.zoom ? "512px" : "128px"};
    height: ${props => props.zoom ? "512px" : "128px"};
    transition: all 150ms ease-out;
    
    &:hover {
      cursor: ${props => props.zoom ? "zoom-out" : "zoom-in"};
      border: 3px solid ${props => props.theme.subText};
    }
  }
  h2 {
    font-size: var(--fs-m);
    font-family: "Din_Round_Bold",sans-serif;
    color: ${props => props.theme.text};
  }
`;

export const ExerciseDefaultContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  
  .title__container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    border-bottom: 2px solid ${props => props.theme.borderRightColor};
    span {
      font-size: var(--fs-sss);
      color: ${props => props.theme.subText};
    }
    h1 {
      font-size: var(--fs-sl);
      font-family: "Din_Round_Bold",sans-serif;
      color: ${props => props.theme.text};
      @media (max-width: 768px) {
        font-size: var(--fs-m);
      }
    }
    img {
      width: 48px;
      height: 48px;
      @media (max-width: 768px) {
        width: 32px;
        height: 32px;
      }
    }
  }
  
  .submit__btn__container {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    button {
        width: 100%;
        max-width: 256px;
        height: 48px;
        border-radius: 12px;
        border: 2px solid ${props => props.theme.borderRightColor};
        border-bottom: 4px solid ${props => props.theme.borderRightColor};
        color: ${props => props.theme.cachalotColor};
        font-size: var(--fs-m);
        font-family: "Din_Round_Med",sans-serif;
        transition: all 150ms ease-out;
        &:hover {
            cursor: pointer;
            background-color: ${props => props.theme.buttonBgHover};
        }
    }
  }
  

`;