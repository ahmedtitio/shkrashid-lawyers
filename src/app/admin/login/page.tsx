'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { toast } from 'sonner';
import { validateAdminCredentials } from '../../utils/storage';
import { Home, Eye, EyeOff } from 'lucide-react';
import { Toaster } from '../../components/ui/sonner';

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (validateAdminCredentials(formData.username, formData.password)) {
        // تخزين حالة تسجيل الدخول
        localStorage.setItem('admin_logged_in', 'true');
        localStorage.setItem('admin_login_time', new Date().toISOString());
        
        toast.success('تم تسجيل الدخول بنجاح');
        router.push('/admin/dashboard');
      } else {
        toast.error('اسم المستخدم أو كلمة المرور غير صحيحة');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('حدث خطأ أثناء تسجيل الدخول');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* زر العودة إلى الصفحة الرئيسية */}
      <div className="absolute top-4 left-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push('/')}
          className="flex items-center gap-2"
        >
          <Home className="h-4 w-4" />
          العودة إلى الصفحة الرئيسية
        </Button>
      </div>

      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            تسجيل دخول الإدارة
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            أدخل بيانات الاعتماد للوصول إلى لوحة التحكم
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>بيانات الاعتماد</CardTitle>
            <CardDescription>
              أدخل اسم المستخدم وكلمة المرور للوصول إلى لوحة التحكم
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="username">اسم المستخدم</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleInputChange('username')}
                  placeholder="أدخل اسم المستخدم"
                  autoComplete="username"
                />
              </div>

              <div>
                <Label htmlFor="password">كلمة المرور</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  placeholder="أدخل كلمة المرور"
                  autoComplete="current-password"
                />
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="text-center space-y-2">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800 font-medium">بيانات تسجيل الدخول الافتراضية:</p>
            <p className="text-xs text-blue-600 mt-1">
              اسم المستخدم: <span className="font-mono bg-blue-100 px-1 rounded">admin</span>
            </p>
           
          </div>
          <p className="text-sm text-gray-500">
            للأمان، يرجى تغيير كلمة المرور الافتراضية بعد أول تسجيل دخول
          </p>
        </div>
      </div>

      {/* Toast Notifications */}
      <Toaster position="top-right" />
    </div>
  );
}
