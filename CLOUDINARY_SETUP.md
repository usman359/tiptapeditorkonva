# Cloudinary Setup Guide

This editor uses Cloudinary for uploading images, videos, and other files. Follow these steps to set up Cloudinary:

## 1. Create a Cloudinary Account

- Go to [cloudinary.com](https://cloudinary.com) and sign up for a free account
- Once logged in, go to your [dashboard](https://cloudinary.com/console)

## 2. Get Your Cloud Name

- In your dashboard, you'll see your "Cloud Name" (e.g., `my-cloud-name`)
- Copy this value

## 3. Create an Upload Preset

- Go to Settings > Upload
- Click "Add upload preset"
- Set the preset name (e.g., `tiptap-editor`)
- Set the signing mode to "Unsigned" (this allows client-side uploads)
- Set the folder to `tiptap-editor` (optional, for organization)
- Click "Save"

## 4. Set Environment Variables

Create a `.env` file in your project root with:

```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset_here
```

Replace the values with your actual Cloud Name and Upload Preset.

## 5. Restart Your Development Server

After setting up the environment variables, restart your development server:

```bash
npm run dev
```

## Features

- **Auto-upload**: Images, videos, and files are automatically uploaded to Cloudinary
- **Fallback**: If Cloudinary is not configured, files will use local URLs
- **Optimization**: Cloudinary automatically optimizes images and videos
- **CDN**: Files are served from Cloudinary's global CDN for fast loading

## Troubleshooting

- Make sure your upload preset is set to "Unsigned"
- Check that your Cloud Name is correct
- Verify the environment variables are loaded (check browser console)
- For production, set these as environment variables in your hosting platform
