import React, {useState} from "react";
import {Link} from "react-router-dom";
import tw from "twin.macro";

// Context
import {useCache} from "../../context/manager/cache/CacheProvider.js";

// Styled Components
import {
    ChestImage,
    QuestContainer,
    QuestListContainer,
    QuestProgressBarContainer,
    TitleContainer
} from "./QuestStyle.js";


const Quest = ({amountOfQuestToDisplay}) => {
    const cache = useCache();
    const quest = cache.questCache.getCache().currentQuest;

    // State
    let isClaimedForEachQuest = [];
    quest.forEach(q => isClaimedForEachQuest.push(q.isClaimed));
    const [questList, setQuestList] = useState(isClaimedForEachQuest);

    function getWidthXp(done, num) { return Math.round(done * 100 / num).toString() + "%"; }

    return (
        <QuestContainer>
            <TitleContainer tw="flex flex-row items-center">
                <h1>Quêtes du jour</h1>
                {
                    window.location.pathname === "/quest" ?
                            null
                        :
                            <div tw="flex justify-end grow-[1]">
                                <Link to="/quest">
                                    <span>Afficher tout</span>
                                </Link>
                            </div>
                }
            </TitleContainer>
            <QuestListContainer>
                {
                    quest.map((q, index) => {
                        if(index < amountOfQuestToDisplay || amountOfQuestToDisplay === -1){
                            return (
                                <div key={index} className="quest__container">
                                    <div className="container">
                                        <div className="imgWrapper">
                                            <img src="../../../static/img/icons/spark.svg" alt=""/>
                                        </div>
                                        <div className="title__and__progress">
                                            <div className="title" tw="flex flex-row items-center">
                                                <h2>{q.name}</h2>
                                                <div className="reward__container">
                                                    <span>+{q.reward}XP</span>
                                                </div>
                                            </div>
                                            <QuestProgressBarContainer progress={getWidthXp(q.current, q.amount)}>
                                                <div className="progress__bar">
                                                    <div className="progress__bar__fill" />
                                                    <div className="info">
                                                    <span>
                                                        {q.current}/{q.amount}
                                                    </span>
                                                    </div>

                                                </div>
                                                <ChestImage
                                                    isFinished={q.current >= q.amount}
                                                    src={!questList[index] ? "../../../static/img/icons/chestQuest.svg" : "../../../static/img/icons/chestOpen.svg"}
                                                    alt="Chest"
                                                    onClick={() => {
                                                        if(q.current >= q.amount && !q.isClaimed) {
                                                            console.log("can claim");
                                                            cache.questCache.claimReward(index).then(r => {
                                                                if(r) {
                                                                    // Update questList state without changing the whole array
                                                                    let temp = [...questList];
                                                                    temp[index] = true;
                                                                    setQuestList(temp);
                                                                    console.info(questList);
                                                                }
                                                            });
                                                        }
                                                    }}
                                                />
                                            </QuestProgressBarContainer>
                                        </div>
                                    </div>
                                    {
                                        index !== quest.length - 1 ?
                                            <div className="quest__separator"/>
                                            :
                                            null
                                    }
                                </div>
                            )
                        } else {
                            return null;
                        }
                })}
            </QuestListContainer>
        </QuestContainer>
    )
}

export default Quest;