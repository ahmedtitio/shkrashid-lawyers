import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Static settings data for the law firm admin panel
    const settings = {
      contact: {
        phone: '044475234',
        mobile: '+971 58 388 3441',
        email: 'rashidalnuimiest@gmail.com',
        address: 'UAE/Dubai/Sheikh Rashid Bin Nasser Al Nuaimi Law Firm - Oud Metha - Malaysia Trade Centre - 3rd Floor - Office 303',
        mapUrl: 'https://maps.google.com/?q=UAE+Dubai+Oud+Metha+Malaysia+Trade+Centre'
      },
      officeHours: [
        { day: 'mondayThursday', hours: '9:00 AM - 6:00 PM' },
        { day: 'friday', hours: '9:00 AM - 1:00 PM' },
        { day: 'weekend', hours: 'Closed' }
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
          text: 'Free Legal Consultation',
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
    console.error('Admin settings API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch admin settings',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { settings } = body;

    // In a real application, you would validate the request and update the database
    // For now, we'll just return success with the updated settings
    console.log('Admin settings update request:', settings);

    return NextResponse.json({
      success: true,
      message: 'Admin settings updated successfully',
      settings: settings, // Return the updated settings
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Admin settings update error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update admin settings',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
