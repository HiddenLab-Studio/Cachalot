import tw, { styled } from 'twin.macro';

export const ImgWrapper = styled.div`
  display: flex;
  align-items: center;
  img {
    width: ${props => props.width};
    height: ${props => props.width};
    border: 1px solid black;
    border-radius: 50%;
  }
`

export const Container = styled.section`
  flex-grow: 1;
  padding-left: 256px;

  // Responsive padding for navbar
  @media (min-width: 768px) and (max-width: 1200px) {
    padding-left: 128px;
  }

  @media (max-width: 768px) {
    max-height: calc(100vh - 92px);
    overflow-y: auto;
    padding: 0;
  }
`

export const MainContainer = styled.main`
  ${tw`flex flex-row min-h-[100vh]`};

  @media (max-width: 768px) {
    //flex-direction: column-reverse;
  }
`