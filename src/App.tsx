import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlantillaSeleccion from "./pages/PlantillaSeleccion";
import CanalSeleccion from "./pages/CanalSeleccion";
import SmsForm from "./pages/SmsForm";
import EmailForm from "./pages/EmailForm";
import WhatsappForm from "./pages/WhatsappForm";
import Resumen from "./pages/Resumen";
import { FormProvider } from "./context/FormContext";
import "./index.css";

function App() {
  return (
    <FormProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex justify-center items-center p-4 w-full">
          <div className="w-full max-w-2xl mx-auto"> {/* Cambié max-w-lg a max-w-2xl */}
            <Routes>
              <Route path="/" element={<PlantillaSeleccion />} />
              <Route path="/canales" element={<CanalSeleccion />} />
              <Route path="/sms" element={<SmsForm />} />
              <Route path="/email" element={<EmailForm />} />
              <Route path="/whatsapp" element={<WhatsappForm />} />
              <Route path="/resumen" element={<Resumen />} />
            </Routes>
          </div>
        </div>
      </Router>
    </FormProvider>
  );
}

export default App;