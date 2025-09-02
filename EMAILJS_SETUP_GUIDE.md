# EmailJS Setup Guide for Consultation Form

## Overview
The consultation form has been modified to use EmailJS for sending form submissions directly to your email address (ah01110692728@gmail.com). This guide will help you set up EmailJS to make the form work properly.

## Step 1: Create a Free EmailJS Account
1. Go to [EmailJS website](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Set Up Email Service
1. After logging in, go to the "Email Services" section
2. Click "Add New Service"
3. Select "Gmail" as your email service provider
4. Connect your Gmail account (ah01110692728@gmail.com)
5. Note down the Service ID that gets generated

## Step 3: Create Email Template
1. Go to the "Email Templates" section
2. Click "Create New Template"
3. Set up your template with the following variables:
   - `{{from_name}}` - Client's full name
   - `{{from_email}}` - Client's email address
   - `{{phone}}` - Client's phone number
   - `{{topic}}` - Consultation topic
   - `{{message}}` - Client's message
   - `{{timestamp}}` - Submission timestamp
   - `{{user_agent}}` - Browser information

4. Design your template with a professional layout
5. Set the recipient to your email: ah01110692728@gmail.com
6. Note down the Template ID

## Step 4: Get Your Public Key
1. Go to your Account section in EmailJS
2. Find your Public Key (starts with "user_")
3. Copy this key

## Step 5: Update the Code
Replace the placeholder values in `src/app/components/ConsultationPopup.tsx`:

```typescript
const serviceId = 'your_actual_service_id'; // Replace with your Service ID
const templateId = 'your_actual_template_id'; // Replace with your Template ID
const publicKey = 'your_actual_public_key'; // Replace with your Public Key
```

## Step 6: Test the Form
1. Fill out the consultation form on your website
2. Submit the form
3. Check your email (ah01110692728@gmail.com) for the test submission

## Troubleshooting
- If emails aren't arriving, check your EmailJS dashboard for errors
- Make sure your Gmail account is properly connected in EmailJS
- Verify that all IDs and keys are correctly entered in the code

## Security Notes
- EmailJS uses your public key which is safe to include in client-side code
- The free plan includes 200 emails per month
- Consider upgrading to a paid plan for higher volume

## Support
- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: support@emailjs.com

## Alternative Setup (Environment Variables)
For better security, you can also use environment variables:

1. Create a `.env.local` file:
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

2. Update the code to use environment variables:
```typescript
const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';
