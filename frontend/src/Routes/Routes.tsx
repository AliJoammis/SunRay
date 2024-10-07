import { Outlet, createBrowserRouter } from "react-router-dom";
import { RouterErrorElement } from "../Components/RouterErrorElement/RouterErrorElement";
import {MainNavbar} from "../Components/Navbar/MainNavbar";
import { Main } from "../Main/Main";
import Footer from "../Components/Footer/Footer";
import { Contact } from "../Components/Pages/Contact/Contact";
import { About } from "../Components/Pages/About/About";
import {LoginForm} from "../Components/LogIn/Login";
import { VacationsChart } from "../Components/Pages/VacationsChart/VacationsChart";
// import {ProtectedRoute} from "../Components/ProtectedRoute/ProtectedRoute"
import { HomePage } from "../Components/HomePage/HomePage";
import { ProtectedRoute } from "../Components/ProtectedRoute/ProtectedRoute";


export const router = createBrowserRouter([
  {
    element: (
      <>
        <MainNavbar />
        <Outlet />
        <Footer />

      </>
    ),
    errorElement: <RouterErrorElement />,
    children: [
      {
        path: "/",
        element: (
      <>
        <HomePage/>
      </>
        ),
        
      },
      {
        path:"/About",
        element: <>
        <About />
        </>
      },
      {
        path:"/contact",
        element: <>
        <Contact />
        </>
      },
      {
        path:"/auth/login",
        element: <>
        <LoginForm />
        </>
      },
      {
        path:"/admin",
        element: (
          <ProtectedRoute role="admin">
            <Main/>
          </ProtectedRoute>
        ),
      },
      {
        path:"/offers",
        element: (
          // <ProtectedRoute role="user">
             <Main/>
          // </ProtectedRoute>
        ),
      },
      {
        path:"/chart",
        element: <>
         {/* <ProtectedRoute role="admin"> */}
            <VacationsChart/>
         {/* </ProtectedRoute> */}
        </>
      },
    ],
  },
]);
