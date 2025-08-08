# Deployment Guide

This portfolio can be deployed to various hosting platforms. Below are instructions for the most popular options.

## Prerequisites

1. Ensure the project builds successfully:
   ```bash
   npm run build:prod
   ```

2. Test the production build locally:
   ```bash
   npm run preview
   ```

## Vercel Deployment (Recommended)

Vercel is the recommended platform for this React/Vite application.

### Option 1: Vercel CLI
1. Install Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from the project root:
   ```bash
   npm run deploy:vercel
   ```

### Option 2: GitHub Integration
1. Push your code to a GitHub repository
2. Visit [vercel.com](https://vercel.com)
3. Click "New Project" and import your GitHub repository
4. Vercel will automatically detect the Vite framework
5. Deploy with default settings

### Vercel Configuration
The project includes a `vercel.json` file with optimized settings:
- Build command: `npm run build`
- Output directory: `dist`
- SPA routing support
- Asset caching headers

## Netlify Deployment

### Option 1: Netlify CLI
1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Build and deploy:
   ```bash
   npm run build
   npm run deploy:netlify
   ```

### Option 2: Drag and Drop
1. Build the project: `npm run build`
2. Visit [netlify.com](https://netlify.com)
3. Drag and drop the `dist` folder to deploy

### Option 3: GitHub Integration
1. Push code to GitHub
2. Connect repository in Netlify dashboard
3. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

## GitHub Pages Deployment

1. Install gh-pages package:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add deployment script to package.json:
   ```json
   "scripts": {
     "deploy:github": "gh-pages -d dist"
   }
   ```

3. Build and deploy:
   ```bash
   npm run build
   npm run deploy:github
   ```

4. Enable GitHub Pages in repository settings

## Custom Domain Configuration

### For Vercel:
1. Add domain in Vercel dashboard
2. Update DNS records as instructed
3. SSL certificate is automatically provisioned

### For Netlify:
1. Add custom domain in site settings
2. Update DNS records
3. SSL certificate is automatically provisioned

### For GitHub Pages:
1. Add CNAME file to public directory with your domain
2. Configure DNS records to point to GitHub Pages
3. Enable HTTPS in repository settings

## Environment Variables

If you need to add environment variables:

### Vercel:
- Add in Vercel dashboard under Project Settings > Environment Variables
- Prefix with `VITE_` for client-side variables

### Netlify:
- Add in Netlify dashboard under Site Settings > Environment Variables
- Prefix with `VITE_` for client-side variables

## Performance Optimization

The build is already optimized with:
- ✅ Code splitting and lazy loading
- ✅ Asset compression and minification
- ✅ Tree shaking for unused code
- ✅ Optimized chunk sizes
- ✅ Source maps for debugging
- ✅ Cache headers for static assets

## Post-Deployment Checklist

After deployment, verify:
- [ ] All pages load correctly
- [ ] Navigation works properly
- [ ] Contact form functions (if backend is configured)
- [ ] All external links work
- [ ] Images and assets load properly
- [ ] Mobile responsiveness
- [ ] Performance scores (Lighthouse)
- [ ] SEO meta tags are present

## Monitoring and Analytics

Consider adding:
- Google Analytics for user tracking
- Vercel Analytics for performance monitoring
- Error tracking (Sentry, LogRocket)
- Uptime monitoring

## Troubleshooting

### Build Failures:
- Check Node.js version compatibility
- Clear node_modules and reinstall dependencies
- Check for TypeScript errors

### Routing Issues:
- Ensure SPA routing is configured (included in vercel.json)
- Check for case-sensitive file paths

### Asset Loading Issues:
- Verify asset paths are relative
- Check public directory structure
- Ensure assets are included in build output

## Support

For deployment issues:
- Vercel: [vercel.com/docs](https://vercel.com/docs)
- Netlify: [docs.netlify.com](https://docs.netlify.com)
- GitHub Pages: [pages.github.com](https://pages.github.com)