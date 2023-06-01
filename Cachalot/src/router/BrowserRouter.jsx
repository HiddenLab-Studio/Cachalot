import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import HomePage from "../pages/home/HomePage.jsx";
import ExerciseHomePage from "../pages/exercise/ExerciseHomePage.jsx";
import Exercise from "../pages/exercise/Exercise.jsx";

// 3️⃣ Router singleton created
const router = createBrowserRouter([
    // HomePage
    { path: "/", element: <HomePage /> },
    // Exercise Main Page and Exercise by id
    { path: "/exercise", element: <ExerciseHomePage/> },
    { path: "/exercise/:id",  element: <Exercise /> },
    // Ranked Page
    { path: "/ranked", element: <HomePage /> },
    // Quest Page
    { path: "/quest", element: <HomePage /> },
    // Profile Page
    { path: "/profile", element: <HomePage /> },
    // Settings Page
    { path: "/settings", element: <HomePage /> },
    // About Page
    { path: "/about", element: <HomePage /> },
]);


export default function BrowserRouter() {
    return <RouterProvider router={router} />;
}


