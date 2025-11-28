export const mockUploadService = {
  upload: (file: File, onProgress: (progress: number) => void): Promise<{ fileId: string; url: string }> => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          onProgress(100);
          setTimeout(() => {
            resolve({
              fileId: 'mock-file-' + Date.now(),
              url: URL.createObjectURL(file),
            });
          }, 300);
        } else {
          onProgress(Math.floor(progress));
        }
      }, 200);
    });
  },
};

export const mockSummarizeService = {
  summarize: (fileId: string): Promise<{
    summary: string;
    confidence: number;
    duration: number;
    timestamps: Array<{ time: number; text: string }>;
  }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          summary: `This audio recording discusses key insights about artificial intelligence and its applications in modern technology. The speaker covers various topics including machine learning fundamentals, neural networks, and practical implementations. Key points include the importance of data quality, model training techniques, and ethical considerations in AI development. The presentation concludes with future trends and recommendations for practitioners in the field.`,
          confidence: 0.94,
          duration: 342,
          timestamps: [
            { time: 0, text: 'Introduction to AI concepts' },
            { time: 45, text: 'Machine learning fundamentals' },
            { time: 120, text: 'Neural network architectures' },
            { time: 210, text: 'Practical applications' },
            { time: 290, text: 'Future trends and conclusion' },
          ],
        });
      }, 2000);
    });
  },
};
