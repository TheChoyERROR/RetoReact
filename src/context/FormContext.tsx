import { createContext, useContext, useState, ReactNode } from "react";

type FormData = {
  plantilla: string;
  destinatario: string; // Nuevo campo para el destinatario
  channels: {
    sms: boolean;
    email: boolean;
    whatsapp: boolean;
  };
  smsMessage: string;
  emailSubject: string;
  emailMessage: string;
  whatsappMessage: string;
};

type FormContextType = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
};

const initialFormData: FormData = {
  plantilla: "",
  destinatario: "Mendoza Roncal Edward Joel", 
  channels: {
    sms: false,
    email: false,
    whatsapp: false,
  },
  smsMessage: "",
  emailSubject: "",
  emailMessage: "",
  whatsappMessage: "",
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};