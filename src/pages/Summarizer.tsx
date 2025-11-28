import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/Header';
import { Waveform } from '@/components/Waveform';
import { Chatbot } from '@/components/Chatbot';
import { Footer } from '@/components/Footer';
import { HistorySidebar } from '@/components/HistorySidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Upload, Link2, Copy, Download, RefreshCw } from 'lucide-react';
import { mockUploadService, mockSummarizeService } from '@/services/mockServices';
import { toast } from 'sonner';

const Summarizer = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [summary, setSummary] = useState<{
    summary: string;
    confidence: number;
    duration: number;
    timestamps: Array<{ time: number; text: string }>;
  } | null>(null);

  const handleFileUpload = async (file: File) => {
    // Validate file type
    const validTypes = ['audio/mpeg', 'audio/wav', 'audio/mp4', 'audio/webm'];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(mp3|wav|m4a|webm)$/i)) {
      toast.error('Please upload a valid audio file (MP3, WAV, M4A, WebM)');
      return;
    }

    // Validate file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      toast.error('File size must be less than 50MB');
      return;
    }

    setAudioFile(file);
    setIsUploading(true);
    setSummary(null);

    try {
      await mockUploadService.upload(file, setUploadProgress);
      toast.success('File uploaded successfully!');
      setIsUploading(false);
      handleSummarize();
    } catch (error) {
      toast.error('Upload failed');
      setIsUploading(false);
    }
  };

  const handleSummarize = async () => {
    setIsSummarizing(true);
    try {
      const result = await mockSummarizeService.summarize('mock-file-id');
      setSummary(result);
      toast.success('Summary generated successfully!');
    } catch (error) {
      toast.error('Summarization failed');
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleCopySummary = () => {
    if (summary) {
      navigator.clipboard.writeText(summary.summary);
      toast.success('Summary copied to clipboard!');
    }
  };

  const handleDownloadSummary = () => {
    if (summary) {
      const blob = new Blob([summary.summary], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'summary.txt';
      a.click();
      toast.success('Summary downloaded!');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="dark min-h-screen bg-background flex flex-col">
      <HistorySidebar isOpen={historyOpen} onClose={() => setHistoryOpen(false)} />
      
      <Header 
        showLogo={false} 
        onHistoryClick={() => setHistoryOpen(!historyOpen)}
      />

      <main className="pt-24 pb-16 flex-1 flex flex-col">
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          {/* Summary Generator Section - 60% default */}
          <ResizablePanel defaultSize={60} minSize={40}>
            <div className="h-full container mx-auto px-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold mb-2 text-foreground">Audio Summarizer</h1>
            <p className="text-muted-foreground">
              Upload your audio file or paste a URL to generate an intelligent summary
            </p>
          </motion.div>

          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-xl p-8 mb-8"
          >
            <div className="space-y-6">
              {/* Drag and Drop */}
              <div
                className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-electric transition-colors cursor-pointer"
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  if (file) handleFileUpload(file);
                }}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => document.getElementById('file-input')?.click()}
              >
                <Upload className="w-12 h-12 text-electric mx-auto mb-4" />
                <p className="text-foreground font-semibold mb-2">
                  Drop your audio file here or click to browse
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports MP3, WAV, M4A, WebM (max 50MB)
                </p>
                <input
                  id="file-input"
                  type="file"
                  accept="audio/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file);
                  }}
                />
              </div>

              {/* URL Input */}
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Link2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="url"
                    placeholder="Or paste audio URL here..."
                    value={audioUrl}
                    onChange={(e) => setAudioUrl(e.target.value)}
                    className="pl-10 bg-background border-border text-foreground"
                  />
                </div>
                <Button
                  onClick={() => {
                    if (audioUrl) {
                      toast.info('URL processing not implemented in this demo');
                    }
                  }}
                  className="bg-gradient-to-r from-electric to-teal hover:opacity-90 text-white"
                  disabled={!audioUrl}
                >
                  Process URL
                </Button>
              </div>

              {/* Upload Progress */}
              <AnimatePresence>
                {isUploading && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground">Uploading...</span>
                      <span className="text-electric">{uploadProgress}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-electric to-teal"
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Waveform Visualization */}
          <AnimatePresence>
            {audioFile && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-8"
              >
                <Waveform audioFile={audioFile} audioUrl={audioUrl} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Summary Section */}
          <AnimatePresence>
            {(isSummarizing || summary) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-card border border-border rounded-xl p-8"
              >
                {isSummarizing ? (
                  <div className="text-center py-12">
                    <div className="w-12 h-12 border-4 border-electric border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-foreground font-semibold">Generating summary...</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      This may take a few moments
                    </p>
                  </div>
                ) : summary ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-foreground">Summary</h2>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleCopySummary}
                          className="border-border text-foreground"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleDownloadSummary}
                          className="border-border text-foreground"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleSummarize}
                          className="border-border text-foreground"
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Regenerate
                        </Button>
                      </div>
                    </div>

                    <div className="bg-background border border-border rounded-lg p-6">
                      <p className="text-foreground leading-relaxed">{summary.summary}</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-background border border-border rounded-lg p-4">
                        <p className="text-sm text-muted-foreground mb-1">Confidence</p>
                        <p className="text-2xl font-bold text-electric">
                          {(summary.confidence * 100).toFixed(0)}%
                        </p>
                      </div>
                      <div className="bg-background border border-border rounded-lg p-4">
                        <p className="text-sm text-muted-foreground mb-1">Duration</p>
                        <p className="text-2xl font-bold text-teal">
                          {formatTime(summary.duration)}
                        </p>
                      </div>
                      <div className="bg-background border border-border rounded-lg p-4">
                        <p className="text-sm text-muted-foreground mb-1">Key Points</p>
                        <p className="text-2xl font-bold text-foreground">
                          {summary.timestamps.length}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Key Timestamps</h3>
                      {summary.timestamps.map((ts, idx) => (
                        <div
                          key={idx}
                          className="flex items-start space-x-3 p-3 bg-background border border-border rounded-lg hover:border-electric transition-colors"
                        >
                          <span className="text-sm font-mono text-electric min-w-[50px]">
                            {formatTime(ts.time)}
                          </span>
                          <span className="text-sm text-foreground">{ts.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Chatbot Section - 40% default */}
          <ResizablePanel defaultSize={40} minSize={30}>
            <div className="h-full">
              <Chatbot />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
      <Footer />
    </div>
  );
};

export default Summarizer;
