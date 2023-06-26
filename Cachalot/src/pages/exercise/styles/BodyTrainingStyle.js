import tw, { styled } from "twin.macro";

export const InputNumberContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  flex-grow: 1;
  
  div {
    background-color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding: 8px 16px;
    border: 2px solid ${props => props.theme.borderRightColor};
    border-bottom: 4px solid ${props => props.theme.borderRightColor};
    border-radius: 12px;
    span {
      font-size: var(--fs-sm);
      font-family: "Din_Round_Med", sans-serif;
      color: ${props => props.theme.text};
    }
    svg {
      font-size: var(--fs-sss);
      margin: 4px;
      cursor: pointer;
      color: ${props => props.theme.text};
    }
  }

`;
export const BodyTrainingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex: 1;
  
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
  
  .exercise__btn__container {
    display: flex;
    justify-content: center;
    flex-direction: row;
    gap: 16px;
    
    
    .exercise__catalog, .exercise__creation {
      display: flex;
      flex-direction: row;
      align-items: center;
      border: 2px solid ${props => props.theme.borderRightColor};
      border-radius: 12px;
      width: 100%;
      padding: 16px;
      img {
        height: 64px;
        width: 64px;
      }
      span {
        font-size: var(--fs-s);
        font-family: "Din_Round_Med", sans-serif;
        color: ${props => props.theme.text};
        
        max-width: 80%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      svg {
        color: ${props => props.theme.iconColor};
      }
      
      &:hover {
        cursor: pointer;
        background-color: ${props => props.theme.buttonBgHover};
      }
    }


    
    @media (max-width: 768px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .exercise__catalog, .exercise__creation {
        width: calc(95% - 32px);
        img {
          height: 32px !important;
          width: 32px !important;
        }
      }
    }
  }

  h1 {
    font-size: var(--fs-l);
    font-family: "Din_Round_Bold", sans-serif;
    color: ${props => props.theme.text};
    @media (max-width: 768px) {
      font-size: var(--fs-m);
    }
  }

  
  @media (max-width: 550px) {
    ${InputNumberContainer} {
      flex-direction: column;
    }
  }
  
    
`