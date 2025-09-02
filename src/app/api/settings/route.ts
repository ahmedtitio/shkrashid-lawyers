import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Static settings data for the law firm
    const settings = {
      contact: {
        phone: '044475234',
        mobile: '+971 58 388 3441',
        email: 'rashidalnuimiest@gmail.com',
        address: 'UAE/Dubai/Sheikh Rashid Bin Nasser Al Nuaimi Law Firm - Oud Metha - Malaysia Trade Centre - 3rd Floor - Office 303',
        mapUrl: 'https://maps.google.com/?q=UAE+Dubai+Oud+Metha+Malaysia+Trade+Centre'
      },
      officeHours: [
        { day: 'Sunday - Thursday', hours: '9:00 AM - 6:00 PM' },
        { day: 'Friday', hours: '9:00 AM - 1:00 PM' },
        { day: 'Saturday', hours: 'Closed' }
      ],
      socialMedia: {
        instagram: 'https://instagram.com/shkrashidlawyers',
        whatsapp: 'https://wa.me/971583883441',
        linkedin: 'https://linkedin.com/company/shkrashidlawyers',
        facebook: 'https://facebook.com/shkrashidlawyers'
      },
      whatsappFloat: {
        url: 'https://wa.me/971583883441?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20your%20legal%20services.',
        enabled: true
      },
      navigation: {
        home: '/',
        about: '/about',
        contact: '/contact',
        terms: '/terms',
        privacy: '/privacy'
      },
      buttons: {
        consultation: {
          text: 'Free Consultation',
          url: '#consultation'
        },
        services: {
          text: 'Our Services',
          url: '#services'
        },
        contact: {
          text: 'Contact Us',
          url: '/contact'
        }
      },
      seo: {
        title: 'Sheikh Rashid Bin Nasser Al Nuaimi Law Firm - UAE Legal Services',
        description: 'Expert legal services in UAE including commercial law, arbitration, family law, and more. Professional legal consultation and representation.',
        keywords: 'law firm UAE, legal services Dubai, commercial law, family law, criminal law, real estate law'
      }
    };

    return NextResponse.json({
      success: true,
      settings,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Settings API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch settings',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // For admin panel updates - this would require authentication in production
    const body = await request.json();

    // In a real application, you would validate the request and update the database
    // For now, we'll just return success
    console.log('Settings update request:', body);

    return NextResponse.json({
      success: true,
      message: 'Settings updated successfully',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Settings update error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update settings',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
