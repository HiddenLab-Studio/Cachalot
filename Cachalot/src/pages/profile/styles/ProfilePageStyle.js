import tw, { styled } from "twin.macro";

export const FindFriendsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  border: 2px solid ${props => props.theme.borderRightColor};
  border-bottom: 4px solid ${props => props.theme.borderRightColor};
  border-radius: 12px;
  width: 100%;
  gap: 16px;
  
  img {
    width: 64px;
    height: 64px;
  }
  
  div {
    display: flex;
    flex-direction: column;
    h1 {
      font-size: var(--fs-m);
      word-break: break-word;
    }
    span {
      font-family: "Din_Round_Med", sans-serif;
      font-size: var(--fs-ss);
      color: ${props => props.theme.subText};
    }
  }
  
  svg {
    color: ${props => props.theme.subText};
  }
  
`

export const BodyProfileAsideContainer = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 0 0 auto;
  width: 400px;
`
export const BodyProfileSectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  //flex-grow: 2;
`
export const BodyProfileContainer = styled.div`
  Display: flex;
  flex-direction: row;
  h1 {
    font-family: "Din_Round_Bold", sans-serif;
    font-size: var(--fs-sl);
    color: ${props => props.theme.text};
  }
`


export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 25px;
  width: 100%;
  margin: 0 auto;
  max-width: 1024px;
  gap: 32px;
`