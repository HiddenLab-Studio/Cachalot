import tw, { styled } from "twin.macro";

export const AsideContainer = styled.aside`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`

export const ContentContainer = styled.div`
  flex-grow: 2;
`

export const MainSection = styled.section`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  gap: 20px;
  padding: 25px 0 25px 256px;
  max-width: 1024px;
  margin: 0 auto;

  // Responsive padding for navbar
  @media (min-width: 768px) and (max-width: 1200px) {
    padding: 25px 0 25px 128px;
  }

  @media (max-width: 768px) {
    padding: 25px;
  }
  
`

export const MainContainer = styled.main`
  ${tw`flex flex-row min-h-[100vh]`};
  background-color: ${props => props.theme.background};
  
  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;