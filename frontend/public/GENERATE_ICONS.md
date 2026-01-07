# Generating PWA Icons

The app needs PNG icons for the PWA manifest. Currently, we have an SVG icon (`icon.svg`).

## Quick Solution

1. **Use an online tool**:
   - Visit https://realfavicongenerator.net/ or https://www.pwabuilder.com/imageGenerator
   - Upload `icon.svg` or create a new icon
   - Generate icons in sizes: 192x192, 512x512
   - Download and place in `frontend/public/`:
     - `icon-192.png`
     - `icon-512.png`

2. **Or use ImageMagick** (if installed):
   ```bash
   convert icon.svg -resize 192x192 icon-192.png
   convert icon.svg -resize 512x512 icon-512.png
   ```

3. **Or manually create**:
   - Use any image editor
   - Create 192x192 and 512x512 PNG files
   - Use the gradient background (#6366f1 to #8b5cf6) with "M" letter
   - Save as `icon-192.png` and `icon-512.png` in `frontend/public/`

## Current Status

- ✅ `manifest.json` created
- ✅ `icon.svg` created (can be used as fallback)
- ⏳ Need to generate `icon-192.png` and `icon-512.png`

Once icons are generated, the PWA will be fully functional!
