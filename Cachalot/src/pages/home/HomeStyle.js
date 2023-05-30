import tw, { styled } from "twin.macro";

export const AsideContainer = styled.aside`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`

export const ContentContainer = styled.div`
  flex-grow: 2;
`

export const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  gap: 20px;
  padding: 25px;
`