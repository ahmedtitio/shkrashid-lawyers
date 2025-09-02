"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useLanguage } from './LanguageProvider';
import { toast } from 'sonner';

interface ConsultationPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  verification: string;
  language: string;
}

export function ConsultationPopup({ isOpen, onClose }: ConsultationPopupProps) {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    topic: '',
    message: '',
    verification: '',
    language: language
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const consultationTopics = [
    { key: 'civilLaw', value: 'Civil Law' },
    { key: 'commercialLaw', value: 'Commercial Law' },
    { key: 'criminalLaw', value: 'Criminal Law' },
    { key: 'familyLaw', value: 'Family Law' },
    { key: 'realEstateLaw', value: 'Real Estate Law' },
    { key: 'employmentLaw', value: 'Employment Law' },
    { key: 'corporateLaw', value: 'Corporate Law' },
    { key: 'immigrationLaw', value: 'Immigration Law' },
    { key: 'intellectualProperty', value: 'Intellectual Property' },
    { key: 'other', value: 'Other' }
  ];

  const handleInputChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, topic: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Verify the simple math question (2 + 3 = 5)
      if (formData.verification !== '5') {
        toast.error(t('consultation.verificationError'));
        setIsSubmitting(false);
        return;
      }

      // Additional email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error(t('errors.invalidEmail'));
        setIsSubmitting(false);
        return;
      }

      // إرسال البيانات إلى API
      const response = await fetch('/api/admin/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Failed to send message');
      }

      toast.success('تم استلام طلب الاستشارة بنجاح! سيتم التواصل معك قريباً.');

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        topic: '',
        message: '',
        verification: '',
        language: language
      });

      onClose();
    } catch (error) {
      console.error('Consultation submission error:', error);
      toast.error(t('errors.general'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.firstName && formData.lastName && formData.email &&
                     formData.phone && formData.topic && formData.message && formData.verification;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center" style={{ color: 'var(--color-text)' }}>
            {t('consultation.title')}
          </DialogTitle>
          <DialogDescription className="text-center" style={{ color: 'var(--color-text-secondary)' }}>
            {t('consultation.description')}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Personal Information Section */}
          <div>
            <h3 className="font-semibold mb-4" style={{ color: 'var(--color-accent)' }}>
              {t('consultation.personalInfo')}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">{t('consultation.firstName')}</Label>
                <Input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange('firstName')}
                  required
                />
              </div>

              <div>
                <Label htmlFor="lastName">{t('consultation.lastName')}</Label>
                <Input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange('lastName')}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <Label htmlFor="email">{t('consultation.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">{t('consultation.phone')}</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange('phone')}
                  required
                />
              </div>
            </div>
          </div>

          {/* Consultation Details */}
          <div>
            <div className="mb-4">
              <Label htmlFor="topic">{t('consultation.topic')}</Label>
              <Select value={formData.topic} onValueChange={handleSelectChange} required>
                <SelectTrigger>
                  <SelectValue placeholder={t('consultation.topicPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  {consultationTopics.map((topic) => (
                    <SelectItem key={topic.value} value={topic.value}>
                      {t(`topics.${topic.key}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="message">{t('consultation.message')}</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={handleInputChange('message')}
                rows={4}
                placeholder={t('consultation.messagePlaceholder')}
                required
              />
            </div>

            {/* Verification Question */}
            <div>
              <Label htmlFor="verification">{t('consultation.verificationQuestion')}</Label>
              <Input
                id="verification"
                type="number"
                value={formData.verification}
                onChange={handleInputChange('verification')}
                placeholder="5"
                required
                min="0"
                max="10"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              {t('consultation.cancel')}
            </Button>

            <Button
              type="submit"
              className="flex-1"
              style={{
                backgroundColor: 'var(--color-cta)',
                color: 'var(--color-cta-text)'
              }}
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? t('consultation.submitting') : t('consultation.submit')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
