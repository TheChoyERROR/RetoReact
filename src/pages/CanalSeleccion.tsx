import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PageTransition from "../components/PageTransition";
import { useFormContext } from "../context/FormContext";

const CanalSeleccion = () => {
  const navigate = useNavigate();
  
  let formData = { channels: { sms: false, email: false, whatsapp: false } };
  let updateFormData = (data: any) => console.log(data);
  
  try {
    const context = useFormContext();
    formData = context.formData;
    updateFormData = context.updateFormData;
  } catch (error) {
    console.error("Error usando FormContext:", error);
  }
  
  const [selectedChannels, setSelectedChannels] = useState({
    sms: formData.channels.sms,
    email: formData.channels.email,
    whatsapp: formData.channels.whatsapp
  });
  
  const handleCheckboxChange = (channel: string) => {
    setSelectedChannels(prev => ({
      ...prev,
      [channel]: !prev[channel as keyof typeof prev]
    }));
  };
  
  const handleNext = () => {
    if (!selectedChannels.sms && !selectedChannels.email && !selectedChannels.whatsapp) {
      alert("Por favor selecciona al menos un canal");
      return;
    }
    
    // Guardar selecciones en el contexto
    updateFormData({ channels: selectedChannels });
    
    // Navegar al primer canal seleccionado
    if (selectedChannels.sms) navigate("/sms");
    else if (selectedChannels.email) navigate("/email");
    else if (selectedChannels.whatsapp) navigate("/whatsapp");
  };
  
  const handleBack = () => {
    navigate("/");
  };
  
  return (
    <PageTransition>
      <div className="w-full bg-white rounded-xl shadow-md border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Selección de Canales</h2>
        
        <div className="space-y-5 mb-8 text-left">
          <label className={`flex items-center p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
            selectedChannels.sms 
              ? "bg-blue-50 border-blue-500 shadow-md" 
              : "border-gray-200 hover:border-blue-200 hover:bg-gray-50"
          }`}>
            <input 
              type="checkbox" 
              className="w-5 h-5 min-w-[20px] flex-shrink-0 accent-blue-600"
              checked={selectedChannels.sms}
              onChange={() => handleCheckboxChange("sms")}
            />
            <div className="ml-3">
              <span className="font-medium text-gray-800 block">SMS</span>
              <span className="text-sm text-gray-500">Mensajes cortos a teléfonos móviles</span>
            </div>
          </label>
          
          <label className={`flex items-center p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
            selectedChannels.email 
              ? "bg-blue-50 border-blue-500 shadow-md" 
              : "border-gray-200 hover:border-blue-200 hover:bg-gray-50"
          }`}>
            <input 
              type="checkbox" 
              className="w-5 h-5 min-w-[20px] flex-shrink-0 accent-blue-600"
              checked={selectedChannels.email}
              onChange={() => handleCheckboxChange("email")}
            />
            <div className="ml-3">
              <span className="font-medium text-gray-800 block">Correo Electrónico</span>
              <span className="text-sm text-gray-500">Mensajes formales con más detalles</span>
            </div>
          </label>
          
          <label className={`flex items-center p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
            selectedChannels.whatsapp 
              ? "bg-blue-50 border-blue-500 shadow-md" 
              : "border-gray-200 hover:border-blue-200 hover:bg-gray-50"
          }`}>
            <input 
              type="checkbox" 
              className="w-5 h-5 min-w-[20px] flex-shrink-0 accent-blue-600"
              checked={selectedChannels.whatsapp}
              onChange={() => handleCheckboxChange("whatsapp")}
            />
            <div className="ml-3">
              <span className="font-medium text-gray-800 block">WhatsApp</span>
              <span className="text-sm text-gray-500">Mensajería instantánea y multimedia</span>
            </div>
          </label>
        </div>

        <div className="flex justify-between items-center mt-8 pt-5 border-t border-gray-200 gap-4">
          <button 
            onClick={handleBack}
            className="px-5 py-2.5 border text-white border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Atrás
          </button>
          <button 
            onClick={handleNext}
            className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Siguiente
          </button>
        </div>
      </div>
    </PageTransition>
  );
};

export default CanalSeleccion;