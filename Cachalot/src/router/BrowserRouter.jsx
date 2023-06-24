import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

// Components
import HomePage from "../pages/home/HomePage.jsx";
import ExerciseHomePage from "../pages/exercise/TrainingHomePage.jsx";
import ProfileHomePage from "../pages/profile/ProfileHomePage.jsx";
import SearchUser from "../pages/profile/components/SearchUser.jsx";
import Loading from "../components/utils/loading/Loading.jsx";
import About from "../components/utils/about/About.jsx";
import Settings from "../components/utils/settings/Settings.jsx";
import Quests from "../components/utils/quests/Quests.jsx";
import FindLeagueHomePage from "../pages/league/FindLeagueHomePage.jsx";
import LeagueHomePage from "../pages/league/LeagueHomePage.jsx";
import Class from "../components/utils/class/Class.jsx";
import ClassHomePage from "../pages/class/ClassHomePage.jsx";
import ClassGameHomePage from "../pages/class/ClassGameHomePage.jsx";
import MathExercise from "../pages/exercise/components/training/MathExercise.jsx";
import MyClass from "../components/utils/class/MyClass.jsx";
import FullLoading from "../components/utils/loading/FullLoading.jsx";
import Exercise from "../pages/exercise/components/exercise/Exercise.jsx";
import FrenchExercise from "../pages/exercise/components/training/FrenchExercise.jsx";

// 3️⃣ Router singleton created
const router = createBrowserRouter([
    // HomePage
    { path: "/", element: <HomePage /> },
    // ExerciseOld Main Page and ExerciseOld by id
    { path: "/exercise", element: <ExerciseHomePage/> },
    { path: "/training", element: <ExerciseHomePage/> },
    { path: "/exercise/:id",  element: <Exercise /> },
    { path: "/training/math",  element: <MathExercise /> },
    { path: "/training/french",  element: <FrenchExercise /> },
    // Ranked Page
    { path: "/ranked", element: <FindLeagueHomePage /> },
    { path: "/ranked/:discipline/:id", element: <LeagueHomePage /> },
    // Quest Page
    { path: "/quest", element: <Quests /> },
    // Profile Page
    { path: "/profile", element: <ProfileHomePage isSearching={false} /> },
    { path: "/profile/:user", element: <ProfileHomePage isSearching={true} /> },
    { path: "/user-search", element: <SearchUser /> },
    { path: "/loading", element: <Loading /> },
    { path: "/full-loading", element: <FullLoading /> },
    // Class Page
    { path: "/class", element: <Class /> },
    { path: "/my-class", element: <MyClass /> },
    { path: "/class/:id", element: <ClassHomePage /> },
    { path: "/class/:id/:discipline/:idgame", element: <ClassGameHomePage /> },
    // Settings Page
    { path: "/settings", element: <Settings /> },
    // About Page
    { path: "/about", element: <About /> },

    // 404
    {path: "*", element: <div>Oupsss une erreur est survenue !</div>},
]);


export default function BrowserRouter() {
    return <RouterProvider router={router} />;
}


