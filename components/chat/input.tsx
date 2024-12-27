"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Mic, MicOff, Paperclip, Loader2 } from 'lucide-react';
import { useSendMessage } from '@/hooks/use-send-message';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';

export function ChatInput() {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { sendMessage, isLoading } = useSendMessage();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
      }
    };
  }, [isRecording]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    await sendMessage(message);
    setMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        await handleAudioUpload(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast.info('جاري التسجيل...', {
        description: 'انقر مرة أخرى لإيقاف التسجيل'
      });
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast.error('فشل الوصول إلى الميكروفون', {
        description: 'يرجى التحقق من إذن الوصول إلى الميكروفون'
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      // هنا يمكنك إضافة منطق رفع الملف إلى السيرفر
      // على سبيل المثال:
      // const formData = new FormData();
      // formData.append('file', file);
      // await uploadFile(formData);
      
      toast.success('تم رفع الملف بنجاح');
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('فشل رفع الملف');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleAudioUpload = async (audioBlob: Blob) => {
    try {
      setIsUploading(true);
      // هنا يمكنك إضافة منطق رفع التسجيل الصوتي إلى السيرفر
      // على سبيل المثال:
      // const formData = new FormData();
      // formData.append('audio', audioBlob);
      // await uploadAudio(formData);
      
      toast.success('تم رفع التسجيل الصوتي بنجاح');
    } catch (error) {
      console.error('Error uploading audio:', error);
      toast.error('فشل رفع التسجيل الصوتي');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="border-t border-white/10 bg-card/30 backdrop-blur-sm py-4">
      <form onSubmit={handleSubmit} className="container mx-auto px-4">
        <div className="flex gap-2">
          <div className="sr-only">
            <Label htmlFor="file-upload">رفع ملف</Label>
          </div>
          <input
            id="file-upload"
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
            accept="image/*,application/pdf,.doc,.docx"
            aria-label="رفع ملف"
            title="اختر ملفاً للرفع"
          />
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="h-[52px] w-[52px]"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading || isLoading}
            aria-label={isUploading ? 'جاري رفع الملف' : 'رفع ملف'}
          >
            {isUploading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Paperclip className="h-5 w-5" />
            )}
          </Button>
          <Button
            type="button"
            size="icon"
            variant={isRecording ? 'destructive' : 'ghost'}
            className="h-[52px] w-[52px]"
            onClick={toggleRecording}
            disabled={isUploading || isLoading}
            aria-label={isRecording ? 'إيقاف التسجيل' : 'بدء التسجيل الصوتي'}
          >
            {isRecording ? (
              <MicOff className="h-5 w-5" />
            ) : (
              <Mic className="h-5 w-5" />
            )}
          </Button>
          <div className="flex-1">
            <Label htmlFor="message-input" className="sr-only">
              رسالتك
            </Label>
            <Textarea
              id="message-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="اكتب رسالتك هنا..."
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[52px] max-h-32"
              rows={1}
              disabled={isRecording}
              aria-label="رسالتك"
            />
          </div>
          <Button
            type="submit"
            size="icon"
            className="h-[52px] w-[52px] neon-glow"
            disabled={(!message.trim() && !isRecording) || isLoading || isUploading}
            aria-label={isLoading ? 'جاري الإرسال' : 'إرسال'}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}