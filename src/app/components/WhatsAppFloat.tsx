"use client";

import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { useLanguage } from './LanguageProvider';
import { useSettings } from './SettingsProvider';

export function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const { t, language } = useLanguage();
  const { settings, isLoading } = useSettings();

  // Don't render if settings are loading or WhatsApp is disabled
  if (isLoading || !settings || !settings.whatsappFloat.enabled) {
    return null;
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `${settings.whatsappFloat.url}&text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');
      setMessage('');
      setIsOpen(false);
    }
  };

  const defaultMessage = t('whatsapp.defaultMessage');

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative group">
          {/* Pulse Effect Background */}
          <div className="absolute inset-0 w-16 h-16 rounded-full bg-green-400/30 animate-ping"></div>
          <div className="absolute inset-0 w-16 h-16 rounded-full bg-green-400/20 animate-ping animation-delay-300"></div>
          
          {/* Main Button */}
          <Button
            onClick={() => setIsOpen(true)}
            className="relative w-16 h-16 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group-hover:rotate-12"
            style={{ 
              backgroundColor: '#25D366',
              color: 'white'
            }}
            title={t('whatsapp.title')}
          >
            <MessageCircle className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
          </Button>

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
              {t('whatsapp.title')}
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto animate-in fade-in-0 zoom-in-95 duration-300">
          <DialogHeader className="pb-4">
            <DialogTitle className="flex items-center gap-3 text-xl">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg animate-pulse"
                style={{ backgroundColor: '#25D366' }}
              >
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="font-bold">{t('whatsapp.title')}</div>
                <div className="text-sm font-normal text-muted-foreground">
                  {language === 'ar' ? 'متصل الآن' : 'Online now'}
                </div>
              </div>
            </DialogTitle>
            <DialogDescription className="text-base mt-2">
              {t('whatsapp.description')}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Message Input */}
            <div className="space-y-3">
              <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                <MessageCircle className="h-4 w-4" style={{ color: '#25D366' }} />
                {t('whatsapp.messageLabel')}
              </label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t('whatsapp.messagePlaceholder')}
                rows={4}
                className="resize-none border-2 focus:border-green-400 transition-colors duration-200"
                style={{ borderColor: message.trim() ? '#25D366' : undefined }}
              />
              <div className="text-xs text-muted-foreground text-right">
                {message.length}/1000
              </div>
            </div>
            
            {/* Quick Message Templates */}
            <div className="space-y-3">
              <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-white text-xs">⚡</span>
                </div>
                {t('whatsapp.quickMessages')}
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  t('whatsapp.template1'),
                  t('whatsapp.template2'),
                  t('whatsapp.template3')
                ].map((template, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setMessage(template)}
                    className="text-left justify-start h-auto py-3 px-4 hover:bg-green-50 hover:border-green-300 transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 group-hover:bg-green-500 transition-colors"></div>
                      <span className="text-sm">{template}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="flex-1 py-3 hover:bg-gray-50 transition-colors duration-200"
              >
                {t('whatsapp.cancel')}
              </Button>
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="flex-1 py-3 flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                style={{ 
                  backgroundColor: message.trim() ? '#25D366' : '#94a3b8',
                  color: 'white'
                }}
              >
                <Send className="h-4 w-4" />
                {t('whatsapp.send')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}