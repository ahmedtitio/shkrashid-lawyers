'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { toast } from 'sonner';
import {
  MessageSquare,
  Mail,
  Phone,
  Calendar,
  Eye,
  EyeOff,
  LogOut,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Filter,
  Copy,
  Check,
  Home,
  Settings
} from 'lucide-react';

import { WhatsAppFloat } from '../../components/WhatsAppFloat';

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

interface MessageStats {
  total: number;
  read: number;
  unread: number;
  today: number;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<ConsultationMessage[]>([]);
  const [stats, setStats] = useState<MessageStats>({ total: 0, read: 0, unread: 0, today: 0 });
  const [selectedMessage, setSelectedMessage] = useState<ConsultationMessage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<'all' | 'read' | 'unread'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const messagesPerPage = 10;

  useEffect(() => {
    // التحقق من تسجيل الدخول
    const isLoggedIn = localStorage.getItem('admin_logged_in');
    if (!isLoggedIn) {
      router.push('/admin/login');
      return;
    }

    loadData();
  }, [router]);

  // إعادة تعيين الصفحة عند تغيير الفلتر
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const loadData = async () => {
    try {
      const response = await fetch('/api/admin/messages');
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const data = await response.json();
      setMessages(data.messages);
      setStats(data.stats);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('حدث خطأ في تحميل البيانات');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      const response = await fetch('/api/admin/messages', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('Failed to update message');
      }

      await loadData();
      toast.success('تم تحديث حالة الرسالة');
    } catch (error) {
      console.error('Error marking message as read:', error);
      toast.error('حدث خطأ في تحديث الرسالة');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_logged_in');
    localStorage.removeItem('admin_login_time');
    router.push('/admin/login');
    toast.success('تم تسجيل الخروج بنجاح');
  };

  const formatDate = (date: Date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  // فلترة الرسائل حسب الحالة
  const filteredMessages = messages.filter(message => {
    if (filter === 'read') return message.read;
    if (filter === 'unread') return !message.read;
    return true;
  });

  // ترتيب الرسائل حسب التاريخ (الأحدث أولاً)
  const sortedMessages = [...filteredMessages].sort((a, b) =>
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  // حساب الصفحات
  const totalPages = Math.ceil(sortedMessages.length / messagesPerPage);
  const startIndex = (currentPage - 1) * messagesPerPage;
  const endIndex = Math.min(startIndex + messagesPerPage, sortedMessages.length);
  const currentMessages = sortedMessages.slice(startIndex, endIndex);

  // وظائف الصفحات
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // فتح modal للرسالة
  const openMessageModal = (message: ConsultationMessage) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  // إغلاق modal
  const closeMessageModal = () => {
    setIsModalOpen(false);
    setSelectedMessage(null);
    setCopiedField(null);
  };

  // نسخ النص إلى الحافظة
  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast.success('تم النسخ بنجاح');
      setTimeout(() => setCopiedField(null), 2000);
    } catch (error) {
      toast.error('فشل في النسخ');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push('/')}
                className="flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                الصفحة الرئيسية
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">لوحة تحكم الإدارة</h1>
                <p className="text-sm text-gray-600">إدارة رسائل الاستشارة</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => router.push('/admin/dashboard/settings')}>
                <Settings className="h-4 w-4 mr-2" />
                إعدادات الموقع
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                تسجيل الخروج
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الرسائل</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">رسائل غير مقروءة</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.unread}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">رسائل مقروءة</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.read}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">رسائل اليوم</CardTitle>
              <Calendar className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.today}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Messages List */}
          <div>
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>رسائل الاستشارة</CardTitle>
                    <CardDescription>
                      جميع رسائل الاستشارة المرسلة من الموقع
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <Select value={filter} onValueChange={(value: 'all' | 'read' | 'unread') => setFilter(value)}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">الكل</SelectItem>
                          <SelectItem value="unread">غير مقروءة</SelectItem>
                          <SelectItem value="read">مقروءة</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {sortedMessages.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">لا توجد رسائل استشارة حتى الآن</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {currentMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                            message.read ? 'bg-gray-50' : 'bg-blue-50 border-blue-200'
                          }`}
                          onClick={() => openMessageModal(message)}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">
                                {message.firstName} {message.lastName}
                              </h3>
                              <p className="text-sm text-gray-600">{message.topic}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              {!message.read && (
                                <Badge variant="destructive" className="text-xs">
                                  جديد
                                </Badge>
                              )}
                              <span className="text-xs text-gray-500">
                                {formatDate(message.timestamp)}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700 line-clamp-2">
                            {message.message}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {message.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {message.phone}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          عرض {startIndex + 1}-{Math.min(endIndex, sortedMessages.length)} من {sortedMessages.length} رسالة
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                          >
                            <ChevronRight className="h-4 w-4" />
                            السابق
                          </Button>

                          <div className="flex items-center gap-1">
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                              const pageNumber = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                              if (pageNumber > totalPages) return null;
                              return (
                                <Button
                                  key={pageNumber}
                                  variant={currentPage === pageNumber ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => goToPage(pageNumber)}
                                  className="w-8 h-8 p-0"
                                >
                                  {pageNumber}
                                </Button>
                              );
                            })}
                          </div>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                          >
                            التالي
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>


        </div>
      </div>

      {/* Message Modal */}
      <Dialog open={isModalOpen} onOpenChange={closeMessageModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>تفاصيل الرسالة</DialogTitle>
            <DialogDescription>
              معلومات الرسالة المحددة
            </DialogDescription>
          </DialogHeader>

          {selectedMessage && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">
                  {selectedMessage.firstName} {selectedMessage.lastName}
                </h3>
                <p className="text-sm text-gray-600">{selectedMessage.topic}</p>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{selectedMessage.email}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(selectedMessage.email, 'email')}
                    className="h-6 w-6 p-0"
                  >
                    {copiedField === 'email' ? (
                      <Check className="h-3 w-3 text-green-600" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{selectedMessage.phone}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(selectedMessage.phone, 'phone')}
                    className="h-6 w-6 p-0"
                  >
                    {copiedField === 'phone' ? (
                      <Check className="h-3 w-3 text-green-600" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{formatDate(selectedMessage.timestamp)}</span>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">محتوى الرسالة:</h4>
                <p className="text-sm text-gray-700 bg-gray-50 p-4 rounded whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
              </div>

              <div className="flex gap-2 pt-4">
                {!selectedMessage.read && (
                  <Button
                    onClick={() => {
                      handleMarkAsRead(selectedMessage.id);
                      closeMessageModal();
                    }}
                    className="flex-1"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    تحديث كمقروءة
                  </Button>
                )}
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={async () => {
                    if (!selectedMessage) return;
                    if (!confirm('هل أنت متأكد من حذف هذه الرسالة نهائياً؟')) return;
                    try {
                      const response = await fetch('/api/admin/messages', {
                        method: 'DELETE',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ id: selectedMessage.id }),
                      });
                      if (!response.ok) {
                        throw new Error('فشل في حذف الرسالة');
                      }
                      toast.success('تم حذف الرسالة بنجاح');
                      closeMessageModal();
                      await loadData();
                    } catch (error) {
                      console.error('Error deleting message:', error);
                      toast.error('حدث خطأ في حذف الرسالة');
                    }
                  }}
                >
                  حذف
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
