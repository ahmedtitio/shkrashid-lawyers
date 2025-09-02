import { NextRequest, NextResponse } from 'next/server';

// بيانات تجريبية للرسائل (في التطبيق الحقيقي ستكون قاعدة بيانات)
const messages = [
  {
    id: '1',
    firstName: 'أحمد',
    lastName: 'محمد',
    email: 'ahmed@example.com',
    phone: '+971501234567',
    topic: 'Civil Law',
    message: 'أحتاج استشارة قانونية بخصوص قضية مدنية',
    timestamp: new Date('2024-01-15T10:30:00'),
    read: false
  },
  {
    id: '2',
    firstName: 'فاطمة',
    lastName: 'علي',
    email: 'fatima@example.com',
    phone: '+971507654321',
    topic: 'Family Law',
    message: 'استفسار حول إجراءات الطلاق',
    timestamp: new Date('2024-01-14T14:20:00'),
    read: true
  },
  {
    id: '3',
    firstName: 'محمد',
    lastName: 'خالد',
    email: 'mohammed@example.com',
    phone: '+971509876543',
    topic: 'Commercial Law',
    message: 'نحتاج استشارة لتأسيس شركة جديدة',
    timestamp: new Date('2024-01-13T09:15:00'),
    read: false
  }
];

// GET - جلب جميع الرسائل والإحصائيات
export async function GET() {
  try {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const stats = {
      total: messages.length,
      read: messages.filter(m => m.read).length,
      unread: messages.filter(m => !m.read).length,
      today: messages.filter(m => new Date(m.timestamp) >= today).length
    };

    return NextResponse.json({
      success: true,
      messages,
      stats
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

// POST - إضافة رسالة جديدة (من نموذج الاستشارة)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // التحقق من البيانات المطلوبة
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'topic', 'message'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // إنشاء رسالة جديدة
    const newMessage = {
      id: Date.now().toString(),
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      topic: body.topic,
      message: body.message,
      timestamp: new Date(),
      read: false
    };

    // إضافة الرسالة إلى القائمة
    messages.unshift(newMessage); // إضافة في البداية لتظهر أولاً

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
      data: newMessage
    });
  } catch (error) {
    console.error('Error creating message:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create message' },
      { status: 500 }
    );
  }
}

// PATCH - تحديث حالة الرسالة (تحديث كمقروءة)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Message ID is required' },
        { status: 400 }
      );
    }

    const messageIndex = messages.findIndex(m => m.id === id);
    if (messageIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Message not found' },
        { status: 404 }
      );
    }

    // تحديث حالة الرسالة كمقروءة
    messages[messageIndex].read = true;

    return NextResponse.json({
      success: true,
      message: 'Message updated successfully'
    });
  } catch (error) {
    console.error('Error updating message:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update message' },
      { status: 500 }
    );
  }
}

// DELETE - حذف رسالة
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Message ID is required' },
        { status: 400 }
      );
    }

    const messageIndex = messages.findIndex(m => m.id === id);
    if (messageIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Message not found' },
        { status: 404 }
      );
    }

    // حذف الرسالة
    messages.splice(messageIndex, 1);

    return NextResponse.json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete message' },
      { status: 500 }
    );
  }
}
