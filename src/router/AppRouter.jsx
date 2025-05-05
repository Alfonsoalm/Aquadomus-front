import { Routes, Route, Navigate } from "react-router-dom";
import { GlobalModuleProvider } from "../context/GlobalContext";
import { InfoPage } from "../pages/InfoPage";
import { SensorPage } from "../pages/SensorPage";
import { NodePage } from "../pages/NodePage";
import { AlertPage } from "../pages/AlertPage";
import { RegisterPage } from "../pages/RegisterPage";
import { SettingsPage } from "../pages/SettingsPage";

const AppRouter = () => {

  return (
    <GlobalModuleProvider> 
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/nodes" element={<NodePage />} />
        <Route path="/selection/:id?" element={<InfoPage />} />
        <Route path="/selection/:id?/:sensorId?" element={<SensorPage />} />
        <Route path="/alerts" element={<AlertPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/*" element={<Navigate to="/" replace />} />
      </Routes>
    </GlobalModuleProvider>
  );
};

export default AppRouter;
