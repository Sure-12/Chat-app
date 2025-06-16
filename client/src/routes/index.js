import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegisterPage from "../pages/RegisterPage"
import EmailPage from "../pages/EmailPage";
import PasswordPage from "../pages/PasswordPage";
import Home from "../pages/Home";
import MessagePage from "../component/MessagePage";
import AuthLayouts from "../layout";
import Forgotpassword from "../pages/Forgotpassword";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "register",
        element: <AuthLayouts><RegisterPage /></AuthLayouts>,
      },
      {
        path: 'email',
        element: <AuthLayouts><EmailPage /></AuthLayouts>
      },
      {
        path: 'password',
        element: <AuthLayouts><PasswordPage /></AuthLayouts>
      },
      {
        path: 'forgot-password',
        element: <AuthLayouts><Forgotpassword /></AuthLayouts>
      },
      {
        path: "",
        element: <Home />,
        children: [
          {
            path: ':userId',
            element: <MessagePage />
          }
        ]
      }

    ],
  },
]);

export default router;
