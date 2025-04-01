import { useNavigate } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import Button from "../components/Button";
import { useFormContext } from "../context/FormContext";

const PlantillaSeleccion = () => {
  const navigate = useNavigate();
  
  let formData = { plantilla: "" };
  let updateFormData = (data: any) => console.log(data);
  
  try {
    const context = useFormContext();
    formData = context.formData;
    updateFormData = context.updateFormData;
  } catch (error) {
    console.error("Error usando FormContext:", error);
  }
  
  const handlePlantillaChange = (plantilla: string) => {
    updateFormData({ plantilla });
  };
  
  const handleNext = () => {
    if (!formData.plantilla) {
      alert("Por favor selecciona una plantilla");
      return;
    }
    navigate("/canales");
  };

  return (
    <PageTransition>
      <div className="w-full bg-white rounded-xl shadow-md border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Selección de Plantilla</h2>

        <div className="space-y-5 mb-8 text-left">
          {["invitacion", "recordatorio", "personalizado"].map((tipo) => (
            <label 
              key={tipo} 
              className={`flex items-center p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                formData.plantilla === tipo 
                  ? "bg-blue-50 border-blue-500 shadow-md" 
                  : "border-gray-200 hover:border-blue-200 hover:bg-gray-50"
              }`}
            >
              <input 
                type="radio" 
                name="plantilla" 
                className="w-5 h-5 min-w-[20px] flex-shrink-0 text-blue-600 accent-blue-600"
                checked={formData.plantilla === tipo}
                onChange={() => handlePlantillaChange(tipo)}
              />
              <span className="ml-3 font-medium text-gray-800 capitalize">{tipo}</span>
            </label>
          ))}
        </div>

        <div className="flex justify-between items-center mt-8 pt-5 border-t border-gray-200 gap-4">

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

export default PlantillaSeleccion;