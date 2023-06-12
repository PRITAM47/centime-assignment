import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          // here we will place our translations...
          description: {
            warning: "Spent Wisely - Your Expense is greater than Income",
            choose: "Choose Your Language :",
          },
          dashboard: {
            income: "Income",
            expenditure: "Expenditure",
            total: "Total",
            message: "Amount should be a valid number",
          },
          form: {
            name: "Name",
            amount: "Amount",
            buttonAdd: "Add",
            buttonUpdate: "Update",
          },

          table: {
            name: "Name",
            amount: "Amount",
            action: "Action",
            button: {
              edit: "Edit",
              delete: "Delete",
            },
          },
        },
      },
      de: {
        translation: {
          description: {
            warning:
              "Mit Bedacht ausgeben – Ihre Ausgaben sind höher als Ihre Einnahmen",
            choose: "Wähle deine Sprache :",
          },
          dashboard: {
            income: "Einkommen",
            expenditure: "Ausgaben",
            total: "Gesamt",
            message: "Der Betrag sollte eine gültige Zahl sein",
          },
          form: {
            name: "Name",
            amount: "Menge",
            buttonAdd: "hinzufügen",
            buttonUpdate: "Aktualisieren",
          },
          table: {
            name: "Name",
            amount: "Amount",
            action: "Action",
            button: {
              edit: "Bearbeiten",
              delete: "Löschen",
            },
          },
        },
      },
    },
  });

export default i18n;
