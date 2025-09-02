import { NextRequest, NextResponse } from 'next/server';

// بيانات تسجيل الدخول (في التطبيق الحقيقي ستكون في قاعدة بيانات مع تشفير)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123' // في التطبيق الحقيقي يجب تشفير كلمة المرور
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // التحقق من البيانات المطلوبة
    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'اسم المستخدم وكلمة المرور مطلوبان' },
        { status: 400 }
      );
    }

    // التحقق من بيانات تسجيل الدخول
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      // إنشاء جلسة تسجيل دخول
      const loginTime = new Date().toISOString();

      return NextResponse.json({
        success: true,
        message: 'تم تسجيل الدخول بنجاح',
        data: {
          username: ADMIN_CREDENTIALS.username,
          loginTime
        }
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'اسم المستخدم أو كلمة المرور غير صحيحة' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { success: false, error: 'حدث خطأ في تسجيل الدخول' },
      { status: 500 }
    );
  }
}
