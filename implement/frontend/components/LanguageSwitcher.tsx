'use client';

import { useState } from 'react';

const LanguageSwitcher: React.FC = () => {
  const [currentLocale, setCurrentLocale] = useState('es');

  const handleLanguageChange = (locale: string) => {
    setCurrentLocale(locale);
    // Future: Implement actual language change logic here
    console.log(`Language changed to: ${locale}`);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600 hidden sm:inline">
        Idioma:
      </span>
      <div className="inline-flex rounded-lg border border-gray-300 bg-white p-1">
        <button
          onClick={() => handleLanguageChange('es')}
          className={`px-3 py-1 rounded-md text-sm font-medium transition ${
            currentLocale === 'es'
              ? 'bg-blue-600 text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
          aria-label="Español"
          title="Español"
        >
          ES
        </button>
        <button
          onClick={() => handleLanguageChange('en')}
          className={`px-3 py-1 rounded-md text-sm font-medium transition ${
            currentLocale === 'en'
              ? 'bg-blue-600 text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
          aria-label="English"
          title="English"
        >
          EN
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
