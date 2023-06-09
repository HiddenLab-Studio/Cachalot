import React, { useState } from "react";
import tw, { styled } from "twin.macro";
import FollowButton from "./FollowButton.jsx";

// Styled components
const BadgeContainer = styled.div``;
const ShowcaseContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  
  ${BadgeContainer} {
    display: flex;
    align-items: end;
    justify-content: space-evenly;
    flex-direction: row;
    gap: 10px;
    flex-grow: 1;
    img {
      width: 92px;
      height: 92px;
    }
  }
  
`

const Showcase = ({isSearch, data}) => {
    // State
    const [isEditing, setIsEditing] = useState(false);

    // Data
    console.info("Showcase data:")
    console.log(data);

    const test = ["../../../../../static/img/logo.png", 2, 3]

    return (
        <ShowcaseContainer>
            <FollowButton isSearch={isSearch} data={data} />
            <BadgeContainer>
                {test.map((badge, index) => {
                    return (
                        <div key={index}>
                            <img src={badge} alt="badge" />
                        </div>
                    )
                })}
            </BadgeContainer>
        </ShowcaseContainer>
    )
}

/*

            {!isSearch ?
                <ButtonContainer>
                    <button>
                        <FaEdit />
                        <span>Modifier la vitrine</span>
                    </button>
                </ButtonContainer>
            :
                <ButtonContainer>
                    <button onClick={async () => {
                        const test = {
                            id: data.id,
                            username: data.username,
                            photo: data.photo,
                        }

                        let result = await auth.followUser(test)
                        if(result) {
                            console.log("followed")
                        } else {
                            console.log("not followed")
                        }
                    }}>
                        <FaPlusCircle />
                        <span>
                        {
                            data.currentUserData.username.includes(data.userFriends.following) ?
                                "Ne plus suivre"
                            :
                                "Suivre"
                        }
                        </span>
                    </button>
                </ButtonContainer>
            }

 */

export default Showcase;