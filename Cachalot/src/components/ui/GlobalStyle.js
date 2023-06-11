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

export const Container = styled.main`
  ${tw`flex flex-row min-h-[100vh]`};

  @media (max-width: 768px) {
    //flex-direction: column-reverse;
  }
`