import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
]

// Translation dictionary
const translations = {
  en: {
    'my_dashboard': 'My Dashboard',
    'profile': 'Profile',
    'tickets': 'Tickets',
    'results': 'Results',
    'history': 'History',
    'log_out': 'Log Out',
    'language': 'Language',
    'notifications': 'Notifications',
    'user': 'User',
    'manage_account': 'Manage your account settings and preferences',
    'winning_numbers': 'Winning Numbers',
    'upcoming_numbers': 'Upcoming Winning Numbers',
  },
  es: {
    'my_dashboard': 'Mi Panel',
    'profile': 'Perfil',
    'tickets': 'Boletos',
    'results': 'Resultados',
    'history': 'Historial',
    'log_out': 'Cerrar Sesión',
    'language': 'Idioma',
    'notifications': 'Notificaciones',
    'user': 'Usuario',
    'manage_account': 'Gestiona la configuración y preferencias de tu cuenta',
    'winning_numbers': 'Números Ganadores',
    'upcoming_numbers': 'Próximos Números Ganadores',
  },
  fr: {
    'my_dashboard': 'Mon Tableau de Bord',
    'profile': 'Profil',
    'tickets': 'Billets',
    'results': 'Résultats',
    'history': 'Historique',
    'log_out': 'Se Déconnecter',
    'language': 'Langue',
    'notifications': 'Notifications',
    'user': 'Utilisateur',
    'manage_account': 'Gérez les paramètres et préférences de votre compte',
    'winning_numbers': 'Numéros Gagnants',
    'upcoming_numbers': 'Prochains Numéros Gagnants',
  },
  de: {
    'my_dashboard': 'Mein Dashboard',
    'profile': 'Profil',
    'tickets': 'Tickets',
    'results': 'Ergebnisse',
    'history': 'Verlauf',
    'log_out': 'Abmelden',
    'language': 'Sprache',
    'notifications': 'Benachrichtigungen',
    'user': 'Benutzer',
    'manage_account': 'Verwalten Sie Ihre Kontoeinstellungen und -präferenzen',
    'winning_numbers': 'Gewinnzahlen',
    'upcoming_numbers': 'Kommende Gewinnzahlen',
  },
  it: {
    'my_dashboard': 'La Mia Dashboard',
    'profile': 'Profilo',
    'tickets': 'Biglietti',
    'results': 'Risultati',
    'history': 'Storia',
    'log_out': 'Disconnetti',
    'language': 'Lingua',
    'notifications': 'Notifiche',
    'user': 'Utente',
    'manage_account': 'Gestisci le impostazioni e le preferenze del tuo account',
    'winning_numbers': 'Numeri Vincenti',
    'upcoming_numbers': 'Prossimi Numeri Vincenti',
  },
  pt: {
    'my_dashboard': 'Meu Painel',
    'profile': 'Perfil',
    'tickets': 'Bilhetes',
    'results': 'Resultados',
    'history': 'Histórico',
    'log_out': 'Sair',
    'language': 'Idioma',
    'notifications': 'Notificações',
    'user': 'Usuário',
    'manage_account': 'Gerencie as configurações e preferências da sua conta',
    'winning_numbers': 'Números Vencedores',
    'upcoming_numbers': 'Próximos Números Vencedores',
  },
}

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    // Get from localStorage or default to 'en'
    return localStorage.getItem('language') || 'en'
  })

  useEffect(() => {
    // Save to localStorage whenever language changes
    localStorage.setItem('language', currentLanguage)
  }, [currentLanguage])

  const translate = (key) => {
    return translations[currentLanguage]?.[key] || translations.en[key] || key
  }

  const changeLanguage = (languageCode) => {
    setCurrentLanguage(languageCode)
  }

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === currentLanguage) || languages[0]
  }

  const value = {
    currentLanguage,
    languages,
    translate,
    changeLanguage,
    getCurrentLanguage,
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
