export const LanguageButton = ({
  handleChangeLanguage,
  value,
}: {
  handleChangeLanguage: () => void;
  value: string;
}) => {
  return (

      <li>
        <button
          className="bg-white text-black cursor-pointer px-4 py-2 rounded-lg"
          onClick={handleChangeLanguage}
        >
          {value}
        </button>
      </li>
  );
};
