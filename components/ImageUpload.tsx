import React, { useCallback, useState, useEffect } from 'react';
import { Upload, Image as ImageIcon, Video, X, Film, Lock } from 'lucide-react';

interface MediaUploadProps {
  onImageSelect: (file: File) => void;
  selectedImage: File | null;
  onClear: () => void;
  disabled: boolean;
  isPro: boolean;
}

export const ImageUpload: React.FC<MediaUploadProps> = ({ 
  onImageSelect, 
  selectedImage, 
  onClear,
  disabled,
  isPro
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isVideo, setIsVideo] = useState(false);

  // Clean up URL on unmount or when selectedImage changes
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (disabled) return;
    setIsDragging(true);
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (disabled) return;
    setIsDragging(false);
  }, [disabled]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (disabled) return;
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        processFile(file);
      }
    }
  }, [disabled]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    // Revoke old URL if exists
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setIsVideo(file.type.startsWith('video/'));
    onImageSelect(file);
  };

  const handleClear = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setIsVideo(false);
    onClear();
  };

  // If we have a selected media, show preview
  if (selectedImage && previewUrl) {
    return (
      <div className="relative w-full max-w-md mx-auto aspect-square rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 shadow-2xl group">
        {isVideo ? (
           <video 
             src={previewUrl} 
             controls 
             className="w-full h-full object-contain bg-black"
           />
        ) : (
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        
        {!disabled && (
          <div className="absolute top-4 right-4 z-10">
             <button 
              onClick={handleClear}
              className="bg-red-500/80 hover:bg-red-600 text-white p-2 rounded-full backdrop-blur-sm shadow-lg transition-transform hover:scale-105"
              title="Remove media"
            >
              <X size={20} />
            </button>
          </div>
        )}
      </div>
    );
  }

  // Upload State
  return (
    <div 
      className={`relative w-full max-w-md mx-auto aspect-[4/3] rounded-2xl border-2 border-dashed transition-all duration-300 ease-in-out cursor-pointer flex flex-col items-center justify-center text-center p-6
        ${isDragging 
          ? 'border-indigo-500 bg-indigo-500/10 scale-[1.02]' 
          : 'border-slate-700 hover:border-indigo-400 hover:bg-slate-800/50 bg-slate-900/50'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => !disabled && document.getElementById('file-upload')?.click()}
    >
      <input 
        id="file-upload"
        type="file" 
        accept="image/*,video/*"
        className="hidden" 
        onChange={handleFileInput}
        disabled={disabled}
      />
      
      <div className="bg-slate-800 p-4 rounded-full mb-4 shadow-lg ring-1 ring-slate-700 flex items-center justify-center space-x-2">
        {isDragging ? (
          <Film className="w-8 h-8 text-indigo-400" />
        ) : (
          <>
            <ImageIcon className="w-6 h-6 text-slate-400" />
            <span className="text-slate-600">|</span>
            <div className="relative">
              <Video className={`w-6 h-6 ${isPro ? 'text-indigo-400' : 'text-slate-600'}`} />
              {!isPro && (
                <div className="absolute -top-2 -right-2 bg-slate-900 rounded-full p-0.5 border border-slate-700">
                  <Lock size={10} className="text-yellow-500" />
                </div>
              )}
            </div>
          </>
        )}
      </div>
      
      <h3 className="text-lg font-semibold text-slate-200 mb-2">
        {isDragging ? 'Drop media here' : 'Upload Image or Video'}
      </h3>
      <p className="text-slate-400 text-sm max-w-[200px]">
        Drag & drop or click. <br/>
        <span className="text-xs text-slate-500">JPG, PNG supported. <br/> {isPro ? 'Video enabled.' : 'Video available in Pro.'}</span>
      </p>
    </div>
  );
};
