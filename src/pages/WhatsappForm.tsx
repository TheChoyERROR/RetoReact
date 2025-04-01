import { useNavigate } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import Button from "../components/Button";
import TextArea from "../components/TextArea";
import { useFormContext } from "../context/FormContext";

const WhatsappForm = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useFormContext();
  
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateFormData({ whatsappMessage: e.target.value });
  };
  
  const handleNext = () => {
    // Al ser el último formulario, siempre navegamos al resumen
    navigate("/resumen"); 
  };
  
  return (
    <PageTransition>
      <div className="p-8 bg-gray-800 rounded-2xl text-white w-full shadow-2xl border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center">WhatsApp</h2>
        <TextArea 
          placeholder="Escribe mensaje" 
          value={formData.whatsappMessage} 
          onChange={handleMessageChange}
        />
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
export default WhatsappForm;