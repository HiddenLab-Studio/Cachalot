import tw, { styled } from 'twin.macro';
import SignInUp from "../connection/components/SignInUp.jsx";

export const Container = styled.main`
  ${tw`flex flex-row min-h-[100vh]`};

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`