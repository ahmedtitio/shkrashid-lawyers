import { NextRequest, NextResponse } from 'next/server';
import settingsStorage from '../../lib/settingsStorage';

export async function GET() {
  try {
    const settings = await settingsStorage.getSettings();

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
    const body = await request.json();
    const { settings } = body;

    // Validate and update settings in storage
    const updatedSettings = await settingsStorage.updateSettings(settings);

    return NextResponse.json({
      success: true,
      message: 'Settings updated successfully',
      settings: updatedSettings,
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
