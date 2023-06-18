import { styled } from "twin.macro";

// Styled components
import {
    MainContainer,
} from "../ui/GlobalStyle.js";
import {useEffect} from "react";
import loadXpCache from "../../../utils/onLoading.js";
import {useAuth} from "../../../context/AuthContext.js";
import {useCache} from "../../../context/manager/cache/CacheProvider.js";

const Content = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  
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

const FullLoading = ({setIsLoading}) => {
    const auth = useAuth();
    const cache = useCache();

    useEffect(() => {
        if(auth.currentUser instanceof Object) {
            console.info("Retrieving user data from cache...")
            cache.xpCache.loadData(auth.currentUser.uid).then(r => {
                cache.isUserCached = true;
                setIsLoading(!cache.isUserCached);
            });
        }
    }, [auth.currentUser]);

    return (
        <MainContainer>
            <Content>
                <div className="dots"></div>
            </Content>
        </MainContainer>
    )
}

export default FullLoading;