import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import HomePage from "../pages/home/HomePage.jsx";
import ExerciseHomePage from "../pages/exercise/ExerciseHomePage.jsx";
import ExerciseOld from "../pages/exercise/Exercise.old.jsx";
import ProfileHomePage from "../pages/profile/ProfileHomePage.jsx";
import ConnectionHomePage from "../pages/connection/ConnectionHomePage.jsx";

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
    { path: "/profile", element: <ProfileHomePage /> },
    // Settings Page
    { path: "/settings", element: <HomePage /> },
    // About Page
    { path: "/about", element: <HomePage /> },
]);


export default function BrowserRouter() {
    return <RouterProvider router={router} />;
}


