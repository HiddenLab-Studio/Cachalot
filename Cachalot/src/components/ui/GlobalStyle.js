import tw, { styled } from 'twin.macro';

export const ImgWrapper = styled.div`
  width: ${props => props.width};
  height: auto;
  border-radius: 50%;
  border: 1px solid black;
`

export const Container = styled.main`
  ${tw`flex flex-row min-h-[100vh]`};

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`