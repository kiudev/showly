import { TFunction } from "i18next";
import { createContext, ReactNode, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { defaultLng } from "@/i18n/ui";

interface LanguageContextType {
  t: TFunction;
  handleChangeLanguage: (lng: string) => void;
  lang: string;
  isSelected: boolean;
  setIsSelected: (value: boolean) => void;
}

export const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState<string>(defaultLng);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleChangeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLang(lng)
    setIsSelected(false)
  };

  const values = {
    t,
    handleChangeLanguage,
    lang,
    isSelected,
    setIsSelected
  }

  return (
    <LanguageContext value={values}>
      {children}
    </LanguageContext>
  );
};

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);

  if (!context)
    throw new Error(
      "useLanguageContext must be used within a LanguageProvider"
    );

  return context;
};
