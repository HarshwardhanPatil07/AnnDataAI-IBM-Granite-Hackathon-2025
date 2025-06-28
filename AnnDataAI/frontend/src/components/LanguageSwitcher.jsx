import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-900 dark:bg-gray-100 dark:text-white rounded-lg shadow-md hover:bg-gray-300 dark:hover:bg-gray-200"
      >
        Select Language <ChevronDownIcon className="w-5 h-5 text-gray-900 dark:text-white" />
      </button>

      {isOpen && (
        <ul className="absolute left-0 mt-2 w-40 bg-white dark:bg-gray-200 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <li
            className="px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            onClick={() => changeLanguage("en")}
          >
            English
          </li>
          <li
            className="px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            onClick={() => changeLanguage("te")}
          >
            తెలుగు
          </li>
          <li
            className="px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            onClick={() => changeLanguage("hi")}
          >
            हिन्दी
          </li>
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
