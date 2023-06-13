import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

// Components
import HomePage from "../pages/home/HomePage.jsx";
import ExerciseHomePage from "../pages/exercise/ExerciseHomePage.jsx";
import ExerciseOld from "../pages/exercise/Exercise.old.jsx";
import ProfileHomePage from "../pages/profile/ProfileHomePage.jsx";
import SearchUser from "../pages/profile/components/SearchUser.jsx";
import Loading from "../components/utils/loading/Loading.jsx";
import About from "../components/utils/about/About.jsx";
import Settings from "../components/utils/settings/Settings.jsx";
import Quests from "../components/utils/quests/Quests.jsx";
import DivisionHomePage from "../pages/division/DivisionHomePage.jsx";

// 3️⃣ Router singleton created
const router = createBrowserRouter([
    // HomePage
    { path: "/", element: <HomePage /> },
    // ExerciseOld Main Page and ExerciseOld by id
    { path: "/exercise", element: <ExerciseHomePage/> },
    { path: "/exercise/:id",  element: <ExerciseOld /> },
    // Ranked Page
    { path: "/ranked", element: <DivisionHomePage /> },
    // Quest Page
    { path: "/quest", element: <Quests /> },
    // Profile Page
    { path: "/profile", element: <ProfileHomePage isSearching={false} /> },
    { path: "/profile/:user", element: <ProfileHomePage isSearching={true} /> },
    { path: "/user-search", element: <SearchUser /> },
    { path: "/loading", element: <Loading /> },
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


