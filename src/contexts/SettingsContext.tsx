import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type SummaryLength = 'short' | 'medium' | 'long' | 'detailed';
export type Language = 'en' | 'es' | 'fr' | 'de' | 'zh' | 'ja' | 'ar' | 'auto' | 'hi' | 'custom';
export type OutputFormat = 'paragraph' | 'timestamped' | 'bullets';
export type TranscriptionMode = 'fast' | 'balanced' | 'accurate';
export type ExportFormat = 'txt' | 'pdf' | 'docx';

interface SettingsContextType {
  summaryLength: SummaryLength;
  language: Language;
  outputFormat: OutputFormat;
  transcriptionMode: TranscriptionMode;
  profanityFilter: boolean;
  defaultSaveLocation: string;
  autoSaveTranscripts: boolean;
  autoDeleteDays: number;
  exportFormat: ExportFormat;
  compressAudio: boolean;
  setSummaryLength: (length: SummaryLength) => void;
  setLanguage: (lang: Language) => void;
  setOutputFormat: (format: OutputFormat) => void;
  setTranscriptionMode: (mode: TranscriptionMode) => void;
  setProfanityFilter: (enabled: boolean) => void;
  setDefaultSaveLocation: (location: string) => void;
  setAutoSaveTranscripts: (enabled: boolean) => void;
  setAutoDeleteDays: (days: number) => void;
  setExportFormat: (format: ExportFormat) => void;
  setCompressAudio: (enabled: boolean) => void;
  resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const defaultSettings = {
  summaryLength: 'medium' as SummaryLength,
  language: 'en' as Language,
  outputFormat: 'paragraph' as OutputFormat,
  transcriptionMode: 'balanced' as TranscriptionMode,
  profanityFilter: false,
  defaultSaveLocation: 'downloads',
  autoSaveTranscripts: true,
  autoDeleteDays: 30,
  exportFormat: 'txt' as ExportFormat,
  compressAudio: false,
};

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [summaryLength, setSummaryLengthState] = useState<SummaryLength>(defaultSettings.summaryLength);
  const [language, setLanguageState] = useState<Language>(defaultSettings.language);
  const [outputFormat, setOutputFormatState] = useState<OutputFormat>(defaultSettings.outputFormat);
  const [transcriptionMode, setTranscriptionModeState] = useState<TranscriptionMode>(defaultSettings.transcriptionMode);
  const [profanityFilter, setProfanityFilterState] = useState<boolean>(defaultSettings.profanityFilter);
  const [defaultSaveLocation, setDefaultSaveLocationState] = useState<string>(defaultSettings.defaultSaveLocation);
  const [autoSaveTranscripts, setAutoSaveTranscriptsState] = useState<boolean>(defaultSettings.autoSaveTranscripts);
  const [autoDeleteDays, setAutoDeleteDaysState] = useState<number>(defaultSettings.autoDeleteDays);
  const [exportFormat, setExportFormatState] = useState<ExportFormat>(defaultSettings.exportFormat);
  const [compressAudio, setCompressAudioState] = useState<boolean>(defaultSettings.compressAudio);

  useEffect(() => {
    const stored = localStorage.getItem('rsenic_settings');
    if (stored) {
      const settings = JSON.parse(stored);
      setSummaryLengthState(settings.summaryLength || defaultSettings.summaryLength);
      setLanguageState(settings.language || defaultSettings.language);
      setOutputFormatState(settings.outputFormat || defaultSettings.outputFormat);
      setTranscriptionModeState(settings.transcriptionMode || defaultSettings.transcriptionMode);
      setProfanityFilterState(settings.profanityFilter ?? defaultSettings.profanityFilter);
      setDefaultSaveLocationState(settings.defaultSaveLocation || defaultSettings.defaultSaveLocation);
      setAutoSaveTranscriptsState(settings.autoSaveTranscripts ?? defaultSettings.autoSaveTranscripts);
      setAutoDeleteDaysState(settings.autoDeleteDays || defaultSettings.autoDeleteDays);
      setExportFormatState(settings.exportFormat || defaultSettings.exportFormat);
      setCompressAudioState(settings.compressAudio ?? defaultSettings.compressAudio);
    }
  }, []);

  const saveSettings = (newSettings: Partial<typeof defaultSettings>) => {
    const settings = {
      summaryLength,
      language,
      outputFormat,
      transcriptionMode,
      profanityFilter,
      defaultSaveLocation,
      autoSaveTranscripts,
      autoDeleteDays,
      exportFormat,
      compressAudio,
      ...newSettings,
    };
    localStorage.setItem('rsenic_settings', JSON.stringify(settings));
  };

  const setSummaryLength = (length: SummaryLength) => {
    setSummaryLengthState(length);
    saveSettings({ summaryLength: length });
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    saveSettings({ language: lang });
  };

  const setOutputFormat = (format: OutputFormat) => {
    setOutputFormatState(format);
    saveSettings({ outputFormat: format });
  };

  const setTranscriptionMode = (mode: TranscriptionMode) => {
    setTranscriptionModeState(mode);
    saveSettings({ transcriptionMode: mode });
  };

  const setProfanityFilter = (enabled: boolean) => {
    setProfanityFilterState(enabled);
    saveSettings({ profanityFilter: enabled });
  };

  const setDefaultSaveLocation = (location: string) => {
    setDefaultSaveLocationState(location);
    saveSettings({ defaultSaveLocation: location });
  };

  const setAutoSaveTranscripts = (enabled: boolean) => {
    setAutoSaveTranscriptsState(enabled);
    saveSettings({ autoSaveTranscripts: enabled });
  };

  const setAutoDeleteDays = (days: number) => {
    setAutoDeleteDaysState(days);
    saveSettings({ autoDeleteDays: days });
  };

  const setExportFormat = (format: ExportFormat) => {
    setExportFormatState(format);
    saveSettings({ exportFormat: format });
  };

  const setCompressAudio = (enabled: boolean) => {
    setCompressAudioState(enabled);
    saveSettings({ compressAudio: enabled });
  };

  const resetSettings = () => {
    setSummaryLengthState(defaultSettings.summaryLength);
    setLanguageState(defaultSettings.language);
    setOutputFormatState(defaultSettings.outputFormat);
    setTranscriptionModeState(defaultSettings.transcriptionMode);
    setProfanityFilterState(defaultSettings.profanityFilter);
    setDefaultSaveLocationState(defaultSettings.defaultSaveLocation);
    setAutoSaveTranscriptsState(defaultSettings.autoSaveTranscripts);
    setAutoDeleteDaysState(defaultSettings.autoDeleteDays);
    setExportFormatState(defaultSettings.exportFormat);
    setCompressAudioState(defaultSettings.compressAudio);
    localStorage.setItem('rsenic_settings', JSON.stringify(defaultSettings));
  };

  return (
    <SettingsContext.Provider
      value={{
        summaryLength,
        language,
        outputFormat,
        transcriptionMode,
        profanityFilter,
        defaultSaveLocation,
        autoSaveTranscripts,
        autoDeleteDays,
        exportFormat,
        compressAudio,
        setSummaryLength,
        setLanguage,
        setOutputFormat,
        setTranscriptionMode,
        setProfanityFilter,
        setDefaultSaveLocation,
        setAutoSaveTranscripts,
        setAutoDeleteDays,
        setExportFormat,
        setCompressAudio,
        resetSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
};
