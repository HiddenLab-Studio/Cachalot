import React, { useEffect, useState } from "react";
import tw from "twin.macro";

// Styled components
const FindMatchContainerWrapper = tw.div`flex flex-col space-y-4`;

const FindMatchContainer = ({ auth }) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState("francais");

  const handleDisciplineChange = (event) => {
    setSelectedDiscipline(event.target.value);
  };

  const handleSearchClick = () => {
    // Perform the search logic here based on the selected discipline
    auth.league.joinGame(selectedDiscipline)
  };

  return (
    <FindMatchContainerWrapper>
      <div className="flex flex-col items-center justify-center h-screen">
        {/* Recherche d'une partie */}
        <div id="searchGame" className="flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">Recherche d'une partie</h2>
          <label htmlFor="matiere" className="mb-2">Choisissez la matière :</label>
          <select id="discipline" className="mb-4" value={selectedDiscipline} onChange={handleDisciplineChange}>
            <option value="francais">Français</option>
            <option value="mathematiques">Mathématiques</option>
            <option value="autre">Autre</option>
          </select>
          <button id="searchButton" className="py-2 px-4 bg-blue-500 text-white rounded" onClick={handleSearchClick}>
            Rechercher
          </button>
        </div>
      </div>
    </FindMatchContainerWrapper>
  );
};

export default FindMatchContainer;
