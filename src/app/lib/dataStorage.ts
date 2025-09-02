import fs from 'fs-extra';
import path from 'path';

interface ConsultationMessage {
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

class DataStorage {
  private dataFilePath: string;
  private messages: ConsultationMessage[] = [];

  constructor() {
    // إنشاء مجلد البيانات إذا لم يكن موجوداً
    const dataDir = path.join(process.cwd(), 'data');
    fs.ensureDirSync(dataDir);

    this.dataFilePath = path.join(dataDir, 'messages.json');

    // تحميل البيانات عند التهيئة
    this.loadData();
  }

  private async loadData(): Promise<void> {
    try {
      if (await fs.pathExists(this.dataFilePath)) {
        const data = await fs.readJson(this.dataFilePath);
        this.messages = data.messages || [];
        // تحويل timestamps إلى Date objects
        this.messages = this.messages.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
      } else {
        // إنشاء ملف البيانات الأولي
        await this.saveData();
      }
    } catch (error) {
      console.error('Error loading data:', error);
      this.messages = [];
    }
  }

  private async saveData(): Promise<void> {
    try {
      await fs.writeJson(this.dataFilePath, {
        messages: this.messages,
        lastUpdated: new Date().toISOString()
      }, { spaces: 2 });
    } catch (error) {
      console.error('Error saving data:', error);
      throw new Error('Failed to save data');
    }
  }

  // جلب جميع الرسائل
  async getAllMessages(): Promise<ConsultationMessage[]> {
    return [...this.messages];
  }

  // جلب إحصائيات الرسائل
  async getStats(): Promise<{
    total: number;
    read: number;
    unread: number;
    today: number;
  }> {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return {
      total: this.messages.length,
      read: this.messages.filter(m => m.read).length,
      unread: this.messages.filter(m => !m.read).length,
      today: this.messages.filter(m => new Date(m.timestamp) >= today).length
    };
  }

  // إضافة رسالة جديدة
  async addMessage(messageData: Omit<ConsultationMessage, 'id' | 'timestamp' | 'read'>): Promise<ConsultationMessage> {
    const newMessage: ConsultationMessage = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      ...messageData,
      timestamp: new Date(),
      read: false
    };

    this.messages.unshift(newMessage); // إضافة في البداية
    await this.saveData();

    return newMessage;
  }

  // تحديث حالة الرسالة
  async updateMessage(id: string, updates: Partial<ConsultationMessage>): Promise<boolean> {
    const messageIndex = this.messages.findIndex(m => m.id === id);
    if (messageIndex === -1) {
      return false;
    }

    this.messages[messageIndex] = { ...this.messages[messageIndex], ...updates };
    await this.saveData();
    return true;
  }

  // حذف رسالة
  async deleteMessage(id: string): Promise<boolean> {
    const messageIndex = this.messages.findIndex(m => m.id === id);
    if (messageIndex === -1) {
      return false;
    }

    this.messages.splice(messageIndex, 1);
    await this.saveData();
    return true;
  }

  // البحث في الرسائل
  async searchMessages(query: string): Promise<ConsultationMessage[]> {
    const lowerQuery = query.toLowerCase();
    return this.messages.filter(message =>
      message.firstName.toLowerCase().includes(lowerQuery) ||
      message.lastName.toLowerCase().includes(lowerQuery) ||
      message.email.toLowerCase().includes(lowerQuery) ||
      message.topic.toLowerCase().includes(lowerQuery) ||
      message.message.toLowerCase().includes(lowerQuery)
    );
  }

  // جلب رسائل غير مقروءة
  async getUnreadMessages(): Promise<ConsultationMessage[]> {
    return this.messages.filter(message => !message.read);
  }

  // جلب رسائل اليوم
  async getTodayMessages(): Promise<ConsultationMessage[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.messages.filter(message => new Date(message.timestamp) >= today);
  }
}

// إنشاء instance واحد من DataStorage
const dataStorage = new DataStorage();

export default dataStorage;
export type { ConsultationMessage };
