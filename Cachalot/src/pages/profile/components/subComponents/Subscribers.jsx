import React, { useState } from "react";
import tw, { styled } from "twin.macro";

const ChoosePanelContainer = styled.div`
  display: flex;
  flex-direction: row;
  border: 2px solid ${props => props.theme.borderRightColor};
  border-radius: 12px;
  height: 512px;
  
  .followingOrFollowerSection {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 48px;
    div {
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 2px solid ${props => props.theme.borderRightColor};
      font-family: "Din_Round_Med", sans-serif;
      text-transform: uppercase;
      &:hover {
        cursor: pointer;
        color: ${props => props.theme.cachalotColor};
        border-bottom: 2px solid ${props => props.theme.cachalotColor};
      }
    }
  }
  
  .follower {
    flex-grow: 1;
  }
  
`;

const Subscribers = () => {
    const [followerSection, setFollowerSection] = useState(false);

    return (
        <>
            <ChoosePanelContainer>
                <div className="followingOrFollowerSection">
                    <div>
                        <span>Abonnements</span>
                    </div>
                    <div>
                        <span>Abonnés</span>
                    </div>
                </div>

            </ChoosePanelContainer>
        </>
    )
}

export default Subscribers;