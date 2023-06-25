import { styled } from "twin.macro";

// Components
import Navbar from "../../navbar/Navbar.jsx";

// Styled components
import {
    MainContainer,
    Container
} from "../ui/GlobalStyle.js";

const LoadingContainer = styled(Container)``
const Content = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  
  .dots {
    width: 72px;
    height: 34.6px;
    background: radial-gradient(circle closest-side, #0a78ff 90%, #0000) 0% 50%,
    radial-gradient(circle closest-side, #0a78ff 90%, #0000) 50% 50%,
    radial-gradient(circle closest-side, #0a78ff 90%, #0000) 100% 50%;
    background-size: calc(100% / 3) 17.3px;
    background-repeat: no-repeat;
    animation: dots-7ar3yq 1s infinite linear;
    align-self: center;
  }

  @keyframes dots-7ar3yq {
    20% {
      background-position: 0% 0%, 50% 50%, 100% 50%;
    }

    40% {
      background-position: 0% 100%, 50% 0%, 100% 50%;
    }

    60% {
      background-position: 0% 50%, 50% 100%, 100% 0%;
    }

    80% {
      background-position: 0% 50%, 50% 50%, 100% 100%;
    }
  }
`

const Loading = (props) => {
    return (
        <MainContainer>
            <Navbar />
            <LoadingContainer>
                <Content>
                    <div className="dots"></div>
                </Content>
            </LoadingContainer>
        </MainContainer>
    )
}

export default Loading;