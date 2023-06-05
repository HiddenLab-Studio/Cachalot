import { styled } from "twin.macro";

export const AccountInformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  gap: 15px;
  
  .title {
    h1 {
      font-size: var(--fs-sl);
      font-weight: 700;
      font-family: "Din_Round_Bold", sans-serif;
      color: ${props => props.theme.text};
    }
    span {
      font-size: var(--fs-md);
      color: ${props => props.theme.subText};
    }
  }
  
  .info {
    display: flex;
    align-items: center;
    gap: 8px;
    span {
      font-family: "Din_Round", sans-serif;
      font-size: var(--fs-s);
      color: ${props => props.theme.text};
    }
    svg {
      color: ${props => props.theme.subText};
    }
  }
`

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 24px;
  padding: 0 0 24px;
  gap: 48px;
  border-bottom: 2px solid ${props => props.theme.borderRightColor};

`
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  max-width: 1056px;
  margin: 0 auto;
  padding: 25px;
`