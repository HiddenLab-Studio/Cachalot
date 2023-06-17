import React, {useEffect, useState} from "react";
import { styled } from "twin.macro";
import {useCache} from "../../../context/manager/cache/CacheProvider.js";


const XpInformationContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  span {
    font-family: "Din_Round_Bold", sans-serif;
    color: ${props => props.theme.navbarText};
    font-size: var(--fs-sss);
  }
`;
const Bar = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  position: relative;
  width: 100%;
  height: 18px;
  border-radius: 12px;
  background-color: ${props => props.theme.borderRightColor};
  div {
    width: ${props => props.progress};
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    border-radius: 12px;
    background-color: ${props => props.theme.cachalotColor};
  }
  span {
    margin-right: 12px;
    font-family: "Din_Round_Med", sans-serif;
    color: ${props => props.theme.navbarText};
    font-size: var(--fs-xs);
  }
`;
const XpBarContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const XpBar = (props) => {
    const cache = props.cache;
    const userXp = cache.xpCache;
    const userXpCache = cache.xpCache.getXpCache();

    function getWidthXp(currentXp, requiredXp) { return Math.round(currentXp * 100 / requiredXp).toString() + "%"; }

    return (
        <>
            <XpBarContainer>
                <Bar progress={getWidthXp(userXpCache.currentXp, userXp.getRequiredXp(userXpCache.currentLvl))}>
                    <div></div>
                    <span>Lv. {userXpCache.currentLvl}</span>
                </Bar>
            </XpBarContainer>
            <XpInformationContainer>
                <span>{userXpCache.currentXp} / {userXp.getRequiredXp(userXpCache.currentLvl)}</span>
            </XpInformationContainer>
        </>
    )
}

export default XpBar;