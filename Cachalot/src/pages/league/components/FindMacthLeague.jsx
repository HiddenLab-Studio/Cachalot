import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import "./style/league.css";

// Styled components
const FindMatchContainerWrapper = tw.div`flex flex-col space-y-4`;

const FindMatchContainer = ({ auth }) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState("french");
  const [ranked, setRanked] = useState(false);
  const [rankedIcon, setRankedIcon] = useState("");

  const handleDisciplineChange = (discipline) => {
    setSelectedDiscipline(discipline);
    handleRankChange(discipline);
  };

  const handleRankChange = async (discipline) => {
    const ranked = await auth.league.getRank(discipline);
    setRanked(ranked.name);
    setRankedIcon(ranked.image);
  };

  const handleSearchClick = () => {
    // Perform the search logic here based on the selected discipline
    console.log(selectedDiscipline);
    auth.league.joinGame(selectedDiscipline);
  };

  useEffect(() => {
    const getRanked = async () => {
      handleRankChange(selectedDiscipline);
    };

    getRanked();
  }, []);

  return (
    <FindMatchContainerWrapper>
      <div className="flex flex-col md:flex-row items-center justify-center h-screen overflow-y-hidden">

        

        {/* Recherche d'une partie */}
        <div className="flex flex-col items-center bg-white rounded-lg border-2 border-gray-200 border-[#e5e5e5] border-b-4 p-8 space-y-4">
          <img src={rankedIcon} className="w-20 h-20 mb-2" alt="Ranked Icon" />
          <h2 style={{ fontFamily: "'DIN Round Pro bold', sans-serif",color:"#3c3c3c" }} className="text-2xl mb-2 text-gray-700">{ranked}</h2>
          <div className="flex space-x-4">
            <button
              className={`${selectedDiscipline === "french" ? "bg-gray-300 border-2 border-b-4 border-green-500" : "bg-gray-100 hover:bg-gray-300 border-[#e5e5e5] border-b-4 border-2"
                } py-2 px-4 rounded-md w-40 flex items-center flex-col`}
              onClick={() => handleDisciplineChange("french")}
            >
              <img src="../../../../static/img/icons/french.png" alt="Math" className="p-0" />
              <span style={{ fontFamily: "'DIN Round Pro Medi', sans-serif",color:"#3c3c3c" }}>Français</span>
            </button>
            <button
              className={`${selectedDiscipline === "math" ? "bg-gray-300 border-2 border-b-4 border-green-500" : "bg-gray-100 hover:bg-gray-300 border-[#e5e5e5] border-b-4 border-2"
                } py-2 px-4 rounded-md w-40 flex items-center flex-col`}
              onClick={() => handleDisciplineChange("math")}
            >
              <img src="../../../../static/img/icons/math.png" alt="Math" className="p-0" />
              <span style={{ fontFamily: "'DIN Round Pro Medi', sans-serif",color:"#3c3c3c" }}>Mathématiques</span>
            </button>
          </div>


          <button
            id="searchButton"
            className="py-2 px-4 bg-[#0a78ff] text-white rounded-md "
            onClick={handleSearchClick}
            style={{
              fontFamily: "'DIN Round Pro medi', sans-serif",
            }}
          >
            Rechercher
          </button>
        </div>
        {/* Explication du mode Ranked */}
        <div id="explication" className="w-full md:w-1/2 flex flex-col items-center md:items-start p-8 space-y-4">
          <h2 style={{ fontFamily: "'DIN Round Pro bold', sans-serif", fontSize: "3rem" ,color:"#3c3c3c"}} className="text-gray-700">LIGUE</h2>
          <p style={{ fontFamily: "'DIN Round Pro', sans-serif", fontSize: "1rem", textAlign: "left" ,color:"#afafaf"}} className="text-gray-500">
            Les duels classés en mathématiques et en français sont des compétitions où le niveau varie selon le rang des participants, offrant ainsi des défis stimulants et l'opportunité de mesurer ses compétences. C'est l'occasion parfaite de mettre en pratique ses connaissances et de progresser dans la matière choisie.
          </p>
          {/*<img src="../../../../static/img/gif/combat.gif" alt="Ranked" className="" />*/}
        </div>
      </div>
    </FindMatchContainerWrapper>
  );
};

export default FindMatchContainer;
