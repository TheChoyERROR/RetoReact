import { useNavigate } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import Button from "../components/Button";
import { useFormContext } from "../context/FormContext";

const Resumen = () => {
  const navigate = useNavigate();
  const { formData } = useFormContext();

  // Datos adicionales para las plantillas (simular datos si no existen)
  const procesoActividad = "la reunión de planificación";
  const fecha = "20 de abril de 2025";
  const hora =  "15:00 horas";
  const ubicacion =  "Sala de Conferencias A, Piso 3";
  
  // Función para reemplazar todas las variables en el texto
  const replaceVariables = (text: string) => {
    return text
      .replace(/\[nombre\]/gi, formData.destinatario)
      .replace(/\[proceso\]/gi, procesoActividad)
      .replace(/\[fecha\]/gi, fecha)
      .replace(/\[hora\]/gi, hora)
      .replace(/\[ubicacion\]/gi, ubicacion);
  };

  // Función para generar mensaje basado en la plantilla seleccionada
  const generateMessage = (type: 'sms' | 'email' | 'whatsapp') => {
    // Primero verifica si el usuario ha escrito algo en ese canal específico
    if (type === 'sms' && formData.smsMessage) {
      return replaceVariables(formData.smsMessage);
    }
    
    if (type === 'email' && formData.emailMessage) {
      return replaceVariables(formData.emailMessage);
    }
    
    if (type === 'whatsapp' && formData.whatsappMessage) {
      return replaceVariables(formData.whatsappMessage);
    }
    
    // Si no hay mensaje personalizado, usa las plantillas predefinidas
    const mensajes = {
      invitacion: {
        sms: `Estimado/a ${formData.destinatario}, te invitamos a participar en [proceso] el día [fecha] a las [hora] en [ubicacion]. Por favor confirma tu asistencia. Gracias.`,
        whatsapp: `Hola ${formData.destinatario}! 👋\n\nTe invitamos cordialmente a participar en *[proceso]* que se llevará a cabo el *[fecha]* a las *[hora]* en *[ubicacion]*.\n\n¿Podrías confirmar tu asistencia? 🙏\n\nGracias y saludos cordiales.`,
        email: `Estimado/a ${formData.destinatario},\n\nEsperamos que te encuentres bien.\n\nNos complace invitarte a participar en *[proceso]* que se llevará a cabo:\n\n• Fecha: *[fecha]*\n• Hora: *[hora]*\n• Lugar: *[ubicacion]*\n\nTu participación es muy importante para nosotros, por lo que agradeceremos confirmes tu asistencia respondiendo a este mensaje.\n\nSi tienes alguna pregunta, no dudes en contactarnos.\n\nSaludos cordiales,\nEquipo Organizador`
      },
      recordatorio: {
        sms: `${formData.destinatario}, te recordamos que [proceso] está programado para mañana [fecha] a las [hora] en [ubicacion]. ¡Te esperamos!`,
        whatsapp: `Hola ${formData.destinatario}! 📅 \n\nTe recordamos que *[proceso]* está programado para mañana:\n\n• Fecha: *[fecha]*\n• Hora: *[hora]*\n• Lugar: *[ubicacion]*\n\n¡No faltes! Esperamos contar con tu valiosa presencia.`,
        email: `Estimado/a ${formData.destinatario},\n\nTe enviamos este mensaje como recordatorio de *[proceso]* programado para mañana:\n\n• Fecha: *[fecha]*\n• Hora: *[hora]*\n• Lugar: *[ubicacion]*\n\nTu participación es muy importante. Si por algún motivo no puedes asistir, te agradeceremos nos lo hagas saber a la brevedad.\n\nSaludos cordiales,\nEquipo Organizador`
      }
    };
    
    // Si hay una plantilla seleccionada, úsala y reemplaza las variables
    if (formData.plantilla === 'invitacion' || formData.plantilla === 'recordatorio') {
      return replaceVariables(mensajes[formData.plantilla][type]);
    }
    
    return "No se ha seleccionado ninguna plantilla ni ingresado un mensaje personalizado.";
  };
  
  return (
    <PageTransition>
      <div className="bg-gray-800/50 rounded-xl text-white w-full shadow-lg border border-gray-700 overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Resumen del Mensaje</h2>
          
          <div className="space-y-6">
            {/* Sección de destinatario */}
            <div className="bg-gray-700/60 p-5 rounded-lg">
              <h3 className="font-bold mb-2 text-xl text-purple-300">Destinatario</h3>
              <p className="text-lg">{formData.destinatario}</p>
            </div>
            
            <div className="bg-gray-700/60 p-5 rounded-lg">
              <h3 className="font-bold mb-2 text-xl text-blue-300">Plantilla seleccionada</h3>
              <p className="capitalize text-lg">{formData.plantilla || "Ninguna"}</p>
            </div>
            
            {/* Detalles del evento */}
            <div className="bg-gray-700/60 p-5 rounded-lg">
              <h3 className="font-bold mb-2 text-xl text-pink-300">Detalles del evento</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <span className="text-gray-400 block text-sm">Proceso/Actividad:</span>
                  <span className="text-white">{procesoActividad}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-sm">Fecha:</span>
                  <span className="text-white">{fecha}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-sm">Hora:</span>
                  <span className="text-white">{hora}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-sm">Ubicación:</span>
                  <span className="text-white">{ubicacion}</span>
                </div>
              </div>
            </div>
            
            {/* Sección de canales seleccionados */}
            <div className="bg-gray-700/60 p-5 rounded-lg">
              <h3 className="font-bold mb-2 text-xl text-yellow-300">Canales seleccionados</h3>
              <div className="flex flex-wrap gap-2">
                {formData.channels.sms && (
                  <span className="px-3 py-1 bg-green-700 rounded-full text-white">SMS</span>
                )}
                {formData.channels.email && (
                  <span className="px-3 py-1 bg-blue-700 rounded-full text-white">Email</span>
                )}
                {formData.channels.whatsapp && (
                  <span className="px-3 py-1 bg-emerald-700 rounded-full text-white">WhatsApp</span>
                )}
              </div>
            </div>
            
            {/* Mensaje SMS */}
            {formData.channels.sms && (
              <div className="bg-gray-700/60 p-5 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-lg font-bold">SMS</span>
                  </div>
                  <h3 className="font-bold text-xl text-green-300">Mensaje SMS</h3>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                  <p className="text-md">{generateMessage('sms')}</p>
                </div>
              </div>
            )}
            
            {/* Mensaje Email */}
            {formData.channels.email && (
              <div className="bg-gray-700/60 p-5 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-lg font-bold">@</span>
                  </div>
                  <h3 className="font-bold text-xl text-blue-300">Mensaje de Email</h3>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                  <p className="text-md font-semibold mb-2">Asunto: {formData.emailSubject || `${formData.plantilla === 'invitacion' ? 'Invitación a' : 'Recordatorio:'} ${procesoActividad}`}</p>
                  <div className="border-t border-gray-600 pt-3">
                    <p className="text-md whitespace-pre-line">{generateMessage('email')}</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Mensaje WhatsApp */}
            {formData.channels.whatsapp && (
              <div className="bg-gray-700/60 p-5 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-emerald-700 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-lg font-bold">W</span>
                  </div>
                  <h3 className="font-bold text-xl text-emerald-300">Mensaje de WhatsApp</h3>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                  <p className="text-md whitespace-pre-line">{generateMessage('whatsapp')}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="p-6 bg-gray-800/80 border-t border-gray-700 mt-4">
          <div className="flex justify-between gap-4">
            <Button className="text-white" variant="secondary" onClick={() => navigate(-1)}>
              Atrás
            </Button>
            <Button onClick={() => alert("¡Mensaje enviado con éxito a " + formData.destinatario + "!")}>
              Enviar
            </Button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Resumen;