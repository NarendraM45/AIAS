import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useSettings, SummaryLength, Language, OutputFormat, TranscriptionMode, ExportFormat } from '@/contexts/SettingsContext';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Save, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const summaryLengths: { value: SummaryLength; label: string; description: string }[] = [
  { value: 'short', label: 'Short', description: '2-3 sentences, key points only' },
  { value: 'medium', label: 'Medium', description: '1 paragraph, balanced overview' },
  { value: 'long', label: 'Long', description: '2-3 paragraphs, comprehensive' },
  { value: 'detailed', label: 'Detailed', description: 'Full breakdown with timestamps' },
];

const languages: { value: Language; label: string; flag: string }[] = [
  { value: 'auto', label: 'Auto Detect', flag: '🌐' },
  { value: 'en', label: 'English', flag: '🇬🇧' },
  { value: 'hi', label: 'Hindi', flag: '🇮🇳' },
  { value: 'es', label: 'Spanish', flag: '🇪🇸' },
  { value: 'fr', label: 'French', flag: '🇫🇷' },
  { value: 'de', label: 'German', flag: '🇩🇪' },
  { value: 'zh', label: 'Chinese', flag: '🇨🇳' },
  { value: 'ja', label: 'Japanese', flag: '🇯🇵' },
  { value: 'ar', label: 'Arabic', flag: '🇸🇦' },
  { value: 'custom', label: 'Custom', flag: '⚙️' },
];

const outputFormats: { value: OutputFormat; label: string; description: string }[] = [
  { value: 'paragraph', label: 'Paragraph', description: 'Continuous text format' },
  { value: 'timestamped', label: 'Timestamped', description: 'With time markers' },
  { value: 'bullets', label: 'Bullet Points', description: 'Key points listed' },
];

const transcriptionModes: { value: TranscriptionMode; label: string; description: string }[] = [
  { value: 'fast', label: 'Fast', description: 'Lower accuracy, faster processing' },
  { value: 'balanced', label: 'Balanced', description: 'Good balance of speed and accuracy' },
  { value: 'accurate', label: 'High Accuracy', description: 'Best quality, slower processing' },
];

const exportFormats: { value: ExportFormat; label: string }[] = [
  { value: 'txt', label: '.txt' },
  { value: 'pdf', label: '.pdf' },
  { value: 'docx', label: '.docx' },
];


const Settings = () => {
  const navigate = useNavigate();
  const {
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
  } = useSettings();

  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

  const handleReset = () => {
    resetSettings();
    toast.info('Settings reset to defaults');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <Button
                  variant="ghost"
                  onClick={() => navigate(-1)}
                  className="mb-4 -ml-4"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <h1 className="text-4xl font-bold text-foreground mb-2">Settings</h1>
                <p className="text-muted-foreground">
                  Customize your RSENIC experience
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleReset}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
                <Button onClick={handleSave} className="bg-gradient-to-r from-electric to-teal">
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </div>
            </div>

            {/* Settings Cards */}
            <Tabs defaultValue="summary" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="language">Language</TabsTrigger>
                <TabsTrigger value="transcription">Transcription</TabsTrigger>
                <TabsTrigger value="files">File Handling</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
              </TabsList>

              {/* Summary Settings */}
              <TabsContent value="summary">
                <Card>
                  <CardHeader>
                    <CardTitle>Summary Length</CardTitle>
                    <CardDescription>
                      Choose how detailed you want your audio summaries to be
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {summaryLengths.map((option) => (
                      <motion.div
                        key={option.value}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSummaryLength(option.value)}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          summaryLength === option.value
                            ? 'border-electric bg-electric/10'
                            : 'border-border hover:border-electric/50'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <Label className="text-base font-semibold cursor-pointer">
                              {option.label}
                            </Label>
                            <p className="text-sm text-muted-foreground mt-1">
                              {option.description}
                            </p>
                          </div>
                          {summaryLength === option.value && (
                            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-electric to-teal flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-white" />
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Language Settings */}
              <TabsContent value="language">
                <Card>
                  <CardHeader>
                    <CardTitle>🌐 Default Language</CardTitle>
                    <CardDescription>
                      Select the language for your summaries and interface
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4">
                    {languages.map((lang) => (
                      <motion.div
                        key={lang.value}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setLanguage(lang.value)}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          language === lang.value
                            ? 'border-electric bg-electric/10'
                            : 'border-border hover:border-electric/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{lang.flag}</span>
                          <div className="flex-1">
                            <Label className="text-base font-semibold cursor-pointer">
                              {lang.label}
                            </Label>
                          </div>
                          {language === lang.value && (
                            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-electric to-teal flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-white" />
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Transcription Settings */}
              <TabsContent value="transcription">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>📝 Output Format</CardTitle>
                      <CardDescription>
                        Choose how your transcriptions are formatted
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {outputFormats.map((format) => (
                        <motion.div
                          key={format.value}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setOutputFormat(format.value)}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            outputFormat === format.value
                              ? 'border-electric bg-electric/10'
                              : 'border-border hover:border-electric/50'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <Label className="text-base font-semibold cursor-pointer">
                                {format.label}
                              </Label>
                              <p className="text-sm text-muted-foreground mt-1">
                                {format.description}
                              </p>
                            </div>
                            {outputFormat === format.value && (
                              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-electric to-teal flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-white" />
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>⚡ Transcription Mode</CardTitle>
                      <CardDescription>
                        Balance between speed and accuracy
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {transcriptionModes.map((mode) => (
                        <motion.div
                          key={mode.value}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setTranscriptionMode(mode.value)}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            transcriptionMode === mode.value
                              ? 'border-electric bg-electric/10'
                              : 'border-border hover:border-electric/50'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <Label className="text-base font-semibold cursor-pointer">
                                {mode.label}
                              </Label>
                              <p className="text-sm text-muted-foreground mt-1">
                                {mode.description}
                              </p>
                            </div>
                            {transcriptionMode === mode.value && (
                              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-electric to-teal flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-white" />
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>🧾 Profanity Filter</CardTitle>
                      <CardDescription>
                        Automatically filter inappropriate content
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base font-semibold">Enable Profanity Filter</Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            Censors inappropriate language in transcriptions
                          </p>
                        </div>
                        <Switch
                          checked={profanityFilter}
                          onCheckedChange={setProfanityFilter}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* File Handling Settings */}
              <TabsContent value="files">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>📂 Default Save Location</CardTitle>
                      <CardDescription>
                        Where transcripts should be saved by default
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Input
                        value={defaultSaveLocation}
                        onChange={(e) => setDefaultSaveLocation(e.target.value)}
                        placeholder="e.g., downloads, documents"
                        className="bg-background border-border text-foreground"
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>🗃 Auto-save Transcripts</CardTitle>
                      <CardDescription>
                        Automatically save transcripts when generated
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base font-semibold">Enable Auto-save</Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            Saves transcripts without asking
                          </p>
                        </div>
                        <Switch
                          checked={autoSaveTranscripts}
                          onCheckedChange={setAutoSaveTranscripts}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>🕒 Auto-delete Audio After</CardTitle>
                      <CardDescription>
                        Automatically delete audio files after specified days
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4">
                        <Input
                          type="number"
                          value={autoDeleteDays}
                          onChange={(e) => setAutoDeleteDays(Number(e.target.value))}
                          min="1"
                          max="365"
                          className="bg-background border-border text-foreground w-24"
                        />
                        <span className="text-muted-foreground">days</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>📄 Default Export Format</CardTitle>
                      <CardDescription>
                        Preferred format for exporting transcripts
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex gap-4">
                      {exportFormats.map((format) => (
                        <motion.div
                          key={format.value}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setExportFormat(format.value)}
                          className={`flex-1 p-4 rounded-lg border-2 cursor-pointer transition-all text-center ${
                            exportFormat === format.value
                              ? 'border-electric bg-electric/10'
                              : 'border-border hover:border-electric/50'
                          }`}
                        >
                          <Label className="text-base font-semibold cursor-pointer">
                            {format.label}
                          </Label>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>🗜 Compress Stored Audio</CardTitle>
                      <CardDescription>
                        Reduce file size of stored audio files
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base font-semibold">Enable Compression</Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            Saves storage space but may reduce quality
                          </p>
                        </div>
                        <Switch
                          checked={compressAudio}
                          onCheckedChange={setCompressAudio}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* About Section */}
              <TabsContent value="about">
                <Card>
                  <CardHeader>
                    <CardTitle>About RSENIC</CardTitle>
                    <CardDescription>
                      Reinforced Semantic Engine for Note Interpretation and Compression
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-foreground">Version</h3>
                      <p className="text-sm text-muted-foreground">1.0.0</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-foreground">Description</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        RSENIC transforms your audio into intelligent, searchable summaries using advanced AI technology. 
                        Process hours of audio in seconds with lightning-fast performance and secure encryption.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-foreground">Key Features</h3>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-electric">•</span>
                          <span>Advanced AI-powered audio transcription</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-electric">•</span>
                          <span>Intelligent summary generation with customizable length</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-electric">•</span>
                          <span>Multi-language support for global accessibility</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-electric">•</span>
                          <span>Secure and private processing with encryption</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-electric">•</span>
                          <span>Real-time chatbot assistance for summary queries</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

            </Tabs>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Settings;
