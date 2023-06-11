import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import HomePage from "../pages/home/HomePage.jsx";
import ExerciseHomePage from "../pages/exercise/ExerciseHomePage.jsx";
import ExerciseOld from "../pages/exercise/Exercise.old.jsx";
import ProfileHomePage from "../pages/profile/ProfileHomePage.jsx";
import SearchUser from "../pages/profile/components/SearchUser.jsx";

// 3️⃣ Router singleton created
const router = createBrowserRouter([
    // HomePage
    { path: "/", element: <HomePage /> },
    // ExerciseOld Main Page and ExerciseOld by id
    { path: "/exercise", element: <ExerciseHomePage/> },
    { path: "/exercise/:id",  element: <ExerciseOld /> },
    // Ranked Page
    { path: "/ranked", element: <HomePage /> },
    // Quest Page
    { path: "/quest", element: <HomePage /> },
    // Profile Page
    { path: "/profile", element: <ProfileHomePage isSearching={false} /> },
    { path: "/profile/:user", element: <ProfileHomePage isSearching={true} /> },
    { path: "/user-search", element: <SearchUser /> },
    // Settings Page
    { path: "/settings", element: <HomePage /> },
    // About Page
    { path: "/about", element: <HomePage /> },

    // 404
    {path: "*", element: <div>Oupsss une erreur est survenue !</div>},
]);


export default function BrowserRouter() {
    return <RouterProvider router={router} />;
}


