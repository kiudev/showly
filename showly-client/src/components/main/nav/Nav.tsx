import { Button } from "@/components/ui/button";
import { languages } from "@/i18n/ui";
import { useLanguageContext } from "@/context/LanguageContext";

export const Nav = () => {
  const { handleChangeLanguage, lang, isSelected, setIsSelected } = useLanguageContext();
  const delays = ["animate-delay-0", "animate-delay-400", "animate-delay-200", "animate-delay-300", "animate-delay-400"];

  return (
    <nav className="flex flex-col gap-5">
      <Button
        onClick={() => setIsSelected(!isSelected)}
        className="border-white border cursor-pointer bg-neutral-100 text-neutral-900"
      >
        <span
          className={`fi fi-${
            languages[lang as keyof typeof languages].flagCode
          }`}
        ></span>
        {languages[lang as keyof typeof languages].name}
      </Button>

      <ul className={`${isSelected ? "flex flex-col absolute top-14" : "hidden"}`}>
        {Object.entries(languages)
          .filter(([langKey]) => langKey !== lang)
          .map(([langKey, { name, flagCode }], idx) => (
            <li key={langKey} className={`bg-primary-500 animate-fade-down hover:bg-primary-800 ${delays[idx]}`}>
              <Button
                className="cursor-pointer"
                onClick={() => handleChangeLanguage(langKey)}
              >
                <span className={`fi fi-${flagCode}`}></span>
                <p>{name}</p>
              </Button>
            </li>
          ))}
      </ul>
    </nav>
  );
};
