import { useNavigate } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import Button from "../components/Button";
import TextArea from "../components/TextArea";
import { useFormContext } from "../context/FormContext";

const SmsForm = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useFormContext();
  
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateFormData({ smsMessage: e.target.value });
  };
  
  const handleNext = () => {
    if (formData.channels.email) navigate("/email");
    else if (formData.channels.whatsapp) navigate("/whatsapp");
    else navigate("/resumen");
  };
  
  return (
    <PageTransition>
      <div className="p-8 bg-gray-800 rounded-2xl text-white w-full shadow-2xl border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center">SMS</h2>
        
        {/* Destinatario */}
        <div className="mb-4 bg-gray-700 p-3 rounded-md border border-gray-600 flex items-center">
          <span className="text-green-300 font-medium">Para:</span>
          <span className="ml-2 text-white">{formData.destinatario}</span>
        </div>
        
        <div className="text-left mb-4">
          <p className="text-sm text-gray-400 mb-2">Puedes usar [nombre] para personalizar el mensaje</p>
          <TextArea 
            placeholder="Escribe mensaje" 
            value={formData.smsMessage}
            onChange={handleMessageChange}
          />
        </div>
        
        <div className="flex justify-between mt-6 gap-4">
          <Button className="text-white" variant="secondary" onClick={() => navigate("/canales")}>
            Atrás
          </Button>
          <Button onClick={handleNext}>
            Siguiente
          </Button>
        </div>
      </div>
    </PageTransition>
  );
};

export default SmsForm;