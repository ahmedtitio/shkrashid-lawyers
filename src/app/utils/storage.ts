export interface ConsultationMessage {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface AdminCredentials {
  username: string;
  password: string;
}

// توليد معرف فريد
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// تخزين الرسائل
export const saveConsultationMessage = (message: Omit<ConsultationMessage, 'id' | 'timestamp' | 'read'>): ConsultationMessage => {
  const newMessage: ConsultationMessage = {
    ...message,
    id: generateId(),
    timestamp: new Date(),
    read: false
  };

  const messages = getConsultationMessages();
  messages.push(newMessage);
  localStorage.setItem('consultation_messages', JSON.stringify(messages));
  
  return newMessage;
};

// جلب جميع الرسائل
export const getConsultationMessages = (): ConsultationMessage[] => {
  try {
    const messages = localStorage.getItem('consultation_messages');
    if (!messages) return [];
    
    return JSON.parse(messages).map((msg: { timestamp: string; id: string; firstName: string; lastName: string; email: string; phone: string; topic: string; message: string; read: boolean }) => ({
      ...msg,
      timestamp: new Date(msg.timestamp)
    }));
  } catch {
    return [];
  }
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
    localStorage.setItem('consultation_messages', JSON.stringify(updatedMessages));
  };

  // جلب بيانات الاعتماد للإدارة
  export const getAdminCredentials = (): AdminCredentials => {
    const credentials = localStorage.getItem('admin_credentials');
    if (credentials) {
      return JSON.parse(credentials);
    }
    // Default credentials
    return { username: 'admin', password: 'admin1232025' };
  };

  // تعيين بيانات الاعتماد للإدارة
  export const setAdminCredentials = (credentials: AdminCredentials): void => {
    localStorage.setItem('admin_credentials', JSON.stringify(credentials));
  };

  // التحقق من صحة بيانات الاعتماد
  export const validateAdminCredentials = (username: string, password: string): boolean => {
    const credentials = getAdminCredentials();
    return credentials.username === username && credentials.password === password;
  };

  // تغيير كلمة مرور الإدارة
  export const changeAdminPassword = (newPassword: string): void => {
    const credentials = getAdminCredentials();
    setAdminCredentials({ ...credentials, password: newPassword });
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
