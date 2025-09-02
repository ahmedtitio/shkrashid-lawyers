import fs from 'fs';
import path from 'path';
import { ConsultationMessage } from './storage';

// Interface for raw message data from JSON file
interface RawConsultationMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const MESSAGES_FILE = path.join(process.cwd(), 'data', 'consultation-messages.json');

// توليد معرف فريد
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// التأكد من وجود مجلد البيانات
const ensureDataDirectory = (): void => {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// جلب جميع الرسائل من الملف
export const getConsultationMessages = (): ConsultationMessage[] => {
  try {
    ensureDataDirectory();
    if (!fs.existsSync(MESSAGES_FILE)) {
      return [];
    }

    const data = fs.readFileSync(MESSAGES_FILE, 'utf8');
    const messages = JSON.parse(data);

    return messages.map((msg: RawConsultationMessage) => ({
      ...msg,
      timestamp: new Date(msg.timestamp)
    }));
  } catch (error) {
    console.error('Error reading messages file:', error);
    return [];
  }
};

// حفظ رسالة جديدة
export const saveConsultationMessage = (message: Omit<ConsultationMessage, 'id' | 'timestamp' | 'read'>): ConsultationMessage => {
  const newMessage: ConsultationMessage = {
    ...message,
    id: generateId(),
    timestamp: new Date(),
    read: false
  };

  const messages = getConsultationMessages();
  messages.push(newMessage);

  try {
    ensureDataDirectory();
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
    console.log('Message saved successfully to file');
  } catch (error) {
    console.error('Error saving message to file:', error);
    throw error;
  }

  return newMessage;
};

// تحديث حالة القراءة
export const markMessageAsRead = (id: string): void => {
  const messages = getConsultationMessages();
  const updatedMessages = messages.map(msg => {
    if (msg.id === id) {
      return { ...msg, read: true };
    }
    return msg;
  });

  try {
    ensureDataDirectory();
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(updatedMessages, null, 2));
  } catch (error) {
    console.error('Error updating message status:', error);
    throw error;
  }
};

// إحصائيات الرسائل
export const getMessageStats = () => {
  const messages = getConsultationMessages();
  return {
    total: messages.length,
    unread: messages.filter(msg => !msg.read).length,
    read: messages.filter(msg => msg.read).length,
    today: messages.filter(msg => {
      const today = new Date();
      const msgDate = new Date(msg.timestamp);
      return msgDate.toDateString() === today.toDateString();
    }).length
  };
};
