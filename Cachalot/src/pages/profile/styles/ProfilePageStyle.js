import tw, { styled } from "twin.macro";


export const BodyProfileAsideContainer = styled.aside`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`
export const BodyProfileSectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 2;
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
  max-width: 896px;
  gap: 32px;
`