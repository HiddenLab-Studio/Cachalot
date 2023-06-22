import tw, {styled} from "twin.macro";

export const ChestImage = styled.img`
  width: 32px;
  height: 32px;
  &:hover {
    cursor: ${props => props.isFinished ? "pointer" : "default"};
  }
`;
export const QuestProgressBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px;

  .progress__bar {
    position: relative;
    width: 100%;
    height: 24px;
    border-radius: 12px 0 0 12px;
    background-color: ${props => props.theme.borderRightColor};

    .progress__bar__fill {
      width: ${props => props.progress};
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      border-radius: ${props => props.progress !== "100%" ? "12px" : "12px 0 0 12px"};
      background-color: ${props => props.theme.cachalotColor};
    }

    .info {
      display: flex;
      width: inherit;
      position: relative;
      justify-content: center;
      align-items: center;
      height: 24px;

      span {
        font-size: var(--fs-ss);
        font-family: "Din_Round_Med", sans-serif;
        color: ${props => props.theme.text};
      }
    }

  }
`
export const QuestListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  .quest__container {
    .container {
      min-width: 100%;
      display: flex;
      flex-direction: row;
      padding: 16px;
      gap: 12px;

      .imgWrapper {
        display: flex;
        align-items: center;

        img {
          max-width: unset;
          height: 48px;
          width: 48px;
        }
      }

      .title__and__progress {
        display: flex;
        flex-direction: column;
        gap: 8px;
        width: 100%;

        .title {
          display: flex;
          flex-direction: row;
          align-items: center;

          h2 {
            font-family: "Din_Round_Med", sans-serif;
            font-size: var(--fs-s);
            color: ${props => props.theme.text};

            max-width: 250px;
            word-break: break-word;
            /*overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;*/
            @media (max-width: 450px) {
              max-width: 165px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            @media (max-width: 375px) {
              max-width: 125px;
            }
          }
        }
      }

      .reward__container {
        display: flex;
        justify-content: end;
        flex-grow: 1;

        img {
          max-width: 0;
          width: 32px;
          height: 32px;
        }

        span {
          font-size: var(--fs-sss);
          font-family: "Din_Round_Bold", sans-serif;
          color: ${props => props.theme.cachalotColor};
          text-transform: uppercase;
        }
      }
    }
`;
export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 16px 0 16px;

  h1 {
    font-family: "Din_Round_Med", sans-serif;
    font-weight: 700;
    font-size: var(--fs-sm);
    color: ${props => props.theme.text};
  }

  div {
    span {
      font-size: var(--fs-sss);
      font-family: "Din_Round_Bold", sans-serif;
      color: ${props => props.theme.cachalotColor};
      text-transform: uppercase;
    }
  }

  @media (max-width: 350px) {
    flex-direction: column;
  }

`;
export const QuestContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 2px solid ${props => props.theme.borderRightColor};
  border-bottom: 4px solid ${props => props.theme.borderRightColor};
  border-radius: 12px;

  .quest__separator {
    border-bottom: 2px solid ${props => props.theme.borderRightColor};
  }
  
`;