import React, { useCallback, useState, useEffect } from 'react';
import { Image as ImageIcon, Video, X, Film, UploadCloud } from 'lucide-react';

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
      <div className="relative w-full max-w-md mx-auto aspect-square rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-lg group">
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
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-transform hover:scale-110 border-2 border-white"
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
          ? 'border-purple-500 bg-purple-50 scale-[1.02] shadow-xl shadow-purple-100' 
          : 'border-slate-300 hover:border-purple-400 hover:bg-slate-50 bg-white'
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
      
      <div className={`p-4 rounded-full mb-4 shadow-sm ring-1 flex items-center justify-center space-x-2 transition-colors duration-300
        ${isDragging ? 'bg-white ring-purple-200' : 'bg-slate-50 ring-slate-200'}
      `}>
        {isDragging ? (
          <UploadCloud className="w-8 h-8 text-purple-600 animate-bounce" />
        ) : (
          <>
            <ImageIcon className="w-6 h-6 text-slate-400" />
            <span className="text-slate-300">|</span>
            <div className="relative">
              <Video className="w-6 h-6 text-slate-400" />
            </div>
          </>
        )}
      </div>
      
      <h3 className={`text-lg font-bold mb-2 transition-colors ${isDragging ? 'text-purple-700' : 'text-slate-900'}`}>
        {isDragging ? 'Drop it here!' : 'Upload Image or Video'}
      </h3>
      <p className={`text-sm max-w-[200px] ${isDragging ? 'text-purple-600' : 'text-slate-500'}`}>
        Drag & drop or click to browse. <br/>
        <span className="text-xs opacity-70">JPG, PNG, MP4, MOV supported.</span>
      </p>
    </div>
  );
};