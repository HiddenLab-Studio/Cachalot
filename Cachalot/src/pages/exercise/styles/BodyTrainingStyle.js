import tw, { styled } from "twin.macro";

export const BodyTrainingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex: 2;
  
  .title__container {
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
  
  .training__choice__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;

      .grid__container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
      .card {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 16px;
        border: 2px solid ${props => props.theme.borderRightColor};
        border-bottom: 4px solid ${props => props.theme.borderRightColor};
        border-radius: 12px;
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
      }
    }
  }
  
  .training__note__container {
    span {
      font-size: var(--fs-xs);
      font-family: "Din_Round", sans-serif;
      color: ${props => props.theme.subText};
      text-align: justify;
      max-width: 95%;
    }
  }
    
  h1 {
    font-size: var(--fs-l);
    font-family: "Din_Round_Bold", sans-serif;
    color: ${props => props.theme.text};
  }
  
  @media (min-width: 768px) and (max-width: 1200px) {
  }
    
`