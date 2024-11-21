import { BrowserRouter, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";
import PrivateLayout from "./layout/Private";
import PublicLayout from "./layout/Public";

import "./index.css";
import "font-awesome/css/font-awesome.min.css";
import { ConfigProvider } from "antd";

import viVN from "antd/es/locale/vi_VN";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import AuthMiddleware from "@/routes/authMiddleware.tsx";

dayjs.locale("vi");

function App() {
  return (
    <ConfigProvider
      locale={viVN}
      theme={{
        token: {
          colorPrimary: "#54b2fe",
          fontSize: 16,
          fontFamily: "Inter var, sans-serif",
        },
      }}
    >
      <BrowserRouter>
        <div>
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <PublicLayout>
                      <Page />
                    </PublicLayout>
                  }
                />
              );
            })}
            {privateRoutes.map((route, index) => {
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <AuthMiddleware>
                      <PrivateLayout>
                        <Page />
                      </PrivateLayout>
                    </AuthMiddleware>
                  }
                />
              );
            })}
          </Routes>
        </div>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
