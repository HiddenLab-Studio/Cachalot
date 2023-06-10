import tw, { styled } from 'twin.macro';

export const NoFollowerContainer = styled.div``
export const FriendsDiv = styled.div``;
export const FollowerButton = styled.div`
  border-bottom: 2px solid ${props => props.current === false ? props.theme.cachalotColor : props.theme.borderRightColor};
  color: ${props => props.current === false ? props.theme.cachalotColor : props.theme.subText};
`;

export const FollowingButton = styled.div`
  border-bottom: 2px solid ${props => props.current === true ? props.theme.cachalotColor : props.theme.borderRightColor};
  color: ${props => props.current === true ? props.theme.cachalotColor : props.theme.subText};
`;

export const ChoosePanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid ${props => props.theme.borderRightColor};
  border-radius: 12px;
  min-height: auto;
  max-height: 512px;
  
  .followingOrFollowerSection {
    display: flex;
    flex-direction: row;
    width: 100%;
    min-height: 48px;
    
    ${FollowingButton}, ${FollowerButton} {
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: "Din_Round_Med", sans-serif;
      text-transform: uppercase;
      &:hover {
        cursor: pointer;
        color: ${props => props.theme.cachalotColor};
        border-bottom: 2px solid ${props => props.theme.cachalotColor};
      }
    }
  }

  ${FriendsDiv} {
    display: flex;
    flex-direction: column;
    padding: 16px;
    border-bottom: 2px solid ${props => props.theme.borderRightColor};
    width: 100%;
    
    ${NoFollowerContainer} {
      display: flex;
      justify-content: center;
      align-items: center;
      max-width: inherit;
      color: ${props => props.theme.text};
      height: 48px;
      span {
        font-size: var(--fs-s);
        font-family: "Din_Round_Bold", sans-serif;
        color: ${props => props.theme.text};
      }
    }
    
    a {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 12px;
      img {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        overflow: hidden;
        border: 2px solid ${props => props.theme.borderRightColor};
      }
      span {
        font-size: var(--fs-sm);
        font-family: "Din_Round_Bold", sans-serif;
        color: ${props => props.theme.text};
      }
    }
    
  }
`;