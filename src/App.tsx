import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DemoProvider } from "./context/DemoContext";
import { AppShell } from "./components/AppShell";
import { Dashboard } from "./pages/Dashboard";
import { ServerWorkspace } from "./pages/ServerWorkspace";
import { AICopilot } from "./pages/AICopilot";
import { DemoFlow } from "./pages/DemoFlow";

export function App() {
  return (
    <BrowserRouter>
      <DemoProvider>
        <AppShell>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/server" element={<ServerWorkspace />} />
            <Route path="/copilot" element={<AICopilot />} />
            <Route path="/demo-flow" element={<DemoFlow />} />
          </Routes>
        </AppShell>
      </DemoProvider>
    </BrowserRouter>
  );
}

export default App;
