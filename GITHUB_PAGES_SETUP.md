# 🚀 GitHub Pages + Cloudflare + ZeroTrust Setup Guide

# Toko Gas Bu Siti - tokogasbusiti.store

# Version 1.0 | Updated: 2026-01-31

---

## 📋 TABLE OF CONTENTS

1. [Persiapan GitHub](#persiapan-github)
2. [Push ke GitHub Pages](#push-ke-github-pages)
3. [Konfigurasi Cloudflare](#konfigurasi-cloudflare)
4. [Setup ZeroTrust Tunnel](#setup-zerotrust-tunnel)
5. [Konfigurasi DNS](#konfigurasi-dns)
6. [Verifikasi & Testing](#verifikasi--testing)
7. [Troubleshooting](#troubleshooting)

---

## 🎯 ARCHITECTURE OVERVIEW

```
┌─────────────────────────────────────────────────────────────┐
│                     tokogasbusiti.store                     │
│                      (Domain terbeli)                       │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ DNS managed by Cloudflare
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   CLOUDFLARE                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ZeroTrust / Cloudflare Tunnel                      │   │
│  │  (Secure tunnel to origin)                         │   │
│  └──────────────┬──────────────────────────────────────┘   │
└─────────────────┼─────────────────────────────────────────┘
                  │
                  │ Tunnel points to:
                  ▼
┌─────────────────────────────────────────────────────────────┐
│              GITHUB PAGES                                   │
│  https://your-username.github.io/deploy2-copy              │
│                                                             │
│  ✓ Static website hosting                                  │
│  ✓ Automatic HTTPS                                         │
│  ✓ Free hosting                                            │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔧 STEP 1: PERSIAPAN GITHUB

### 1.1 Create Repository

```bash
# Login ke GitHub
# Visit: https://github.com/new

# Create repository dengan nama:
Repository name: deploy2-copy
(atau nama lain sesuai preferensi)

☑ Public (agar GitHub Pages bisa diakses)
☑ Add README.md
☑ Add .gitignore (pilih Node)

# Click "Create repository"
```

### 1.2 Clone Repository Lokal

```bash
cd ~/Code
git clone https://github.com/YOUR_USERNAME/deploy2-copy.git
cd deploy2-copy
```

### 1.3 Copy Files

```bash
# Copy semua files dari "deploy2 (copy)" ke "deploy2-copy"

# Option 1: Menggunakan cp
cp -r ~/Code/deploy2\ \(copy\)/* ~/Code/deploy2-copy/

# Option 2: Drag & drop di file manager
# Copy semua folders: artikel/, img/, src/
# Copy semua files: *.html, *.css, *.js, *.xml, *.txt, *.md, package.json
```

---

## 📤 STEP 2: PUSH KE GITHUB PAGES

### 2.1 Konfigurasi Git

```bash
cd ~/Code/deploy2-copy

# Configure git (if first time)
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# Initialize git (jika belum)
git init
git remote add origin https://github.com/YOUR_USERNAME/deploy2-copy.git
```

### 2.2 Commit & Push

```bash
# Add semua files
git add .

# Commit
git commit -m "Initial commit: Toko Gas Bu Siti - Production Ready"

# Push ke GitHub
git push -u origin main
# (atau 'master' jika default branch-nya master)
```

### 2.3 Enable GitHub Pages

```
1. Go to: https://github.com/YOUR_USERNAME/deploy2-copy
2. Settings → Pages
3. Under "Build and deployment":
   - Source: Deploy from a branch
   - Branch: main (atau master)
   - Folder: / (root)
4. Click "Save"

⏳ Wait 1-2 minutes for GitHub Pages to build
✅ Your site will be available at:
   https://your-username.github.io/deploy2-copy/
```

### 2.4 Test GitHub Pages

```bash
# Test URL:
https://your-username.github.io/deploy2-copy/

# Verify working:
☑ Homepage loads
☑ Styles applied
☑ Images display
☑ Navigation works
```

---

## ☁️ STEP 3: KONFIGURASI CLOUDFLARE

### 3.1 Add Domain ke Cloudflare

```
1. Visit: https://dash.cloudflare.com/
2. Create Account (if not exist)
3. Click "Add a domain"
4. Enter: tokogasbusiti.store
5. Select Plan: Free (sufficient for GitHub Pages)
6. Click "Continue"
```

### 3.2 Update Nameservers

```
Cloudflare akan memberikan 2 nameserver:
- ns1.cloudflare.com
- ns2.cloudflare.com

Go to: Domain registrar (tempat beli domain)
Update nameservers ke Cloudflare:
- ns1.cloudflare.com
- ns2.cloudflare.com

⏳ Wait 24-48 hours for propagation
(biasanya lebih cepat, bisa 5-10 menit)
```

### 3.3 Verify Domain Connection

```bash
# Check DNS propagation:
nslookup tokogasbusiti.store

# Should show Cloudflare nameservers
# If not working, wait & retry
```

---

## 🔒 STEP 4: SETUP ZEROTRUST TUNNEL

### 4.1 Create Cloudflare Tunnel

```
1. Go to: https://dash.cloudflare.com/
2. Left menu: Zero Trust → Access
3. Click "Create Tunnel"
4. Choose: Cloudflared
5. Give it a name: "TokoGas-GitHub-Pages"
6. Click "Save"
```

### 4.2 Install Cloudflared (Local)

```bash
# If not installed yet
# Download from: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/

# macOS:
brew install cloudflare/cloudflare/cloudflared

# Linux:
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared-linux-amd64.deb

# Windows:
# Download MSI installer from above link
```

### 4.3 Authenticate Cloudflared

```bash
cloudflared tunnel login

# Browser akan membuka Cloudflare login
# Grant permission untuk tunnel
# Terminal akan show token
```

### 4.4 Create Tunnel Configuration

```bash
# Create tunnel named "toko-gas-tunnel"
cloudflared tunnel create toko-gas-tunnel

# Note the UUID yang ditampilkan (akan digunakan di config)
```

### 4.5 Configure Tunnel Routes

```
Back di Cloudflare Dashboard:

1. Zero Trust → Access → Tunnels
2. Click "toko-gas-tunnel"
3. Click "Configure"
4. Under "Route to your origin":

   URL: https://your-username.github.io/deploy2-copy/
   Type: HTTPS

5. Under "Public Hostnames":
   - Subdomain: (leave blank untuk @ root)
   - Domain: tokogasbusiti.store
   - Service: HTTPS
   - URL: https://your-username.github.io/deploy2-copy/

6. Click "Save"
```

### 4.6 Create config.yml

```bash
cd ~/.cloudflared/

# Create config.yml
nano config.yml

# Content:
tunnel: toko-gas-tunnel
credentials-file: /home/YOUR_USERNAME/.cloudflared/toko-gas-tunnel.json

ingress:
  - hostname: tokogasbusiti.store
    service: https://your-username.github.io/deploy2-copy/
  - hostname: www.tokogasbusiti.store
    service: https://your-username.github.io/deploy2-copy/
  - service: http_status:404

# Save: Ctrl+O, Enter, Ctrl+X
```

### 4.7 Run Tunnel Locally

```bash
cloudflared tunnel run toko-gas-tunnel

# Should show:
# [2026-01-31T10:00:00Z] INF Starting tunnel toko-gas-tunnel
# [2026-01-31T10:00:00Z] INF Registered tunnel connection id: ...
```

---

## 🌐 STEP 5: KONFIGURASI DNS

### 5.1 Add DNS Records di Cloudflare

```
1. Go to: https://dash.cloudflare.com/
2. tokogasbusiti.store → DNS
3. Add Records:

Record 1: Root Domain
- Type: CNAME
- Name: @ (root)
- Target: your-username.github.io
- TTL: Auto
- Proxy: ☑ Proxied (orange cloud)

Record 2: www Subdomain
- Type: CNAME
- Name: www
- Target: your-username.github.io
- TTL: Auto
- Proxy: ☑ Proxied (orange cloud)

Record 3: ZeroTrust (Optional - advanced setup)
- Type: CNAME
- Name: _acme-challenge
- Target: (dari Cloudflare tunnel)
- TTL: Auto
- Proxy: ☐ DNS Only (gray cloud)
```

### 5.2 SSL/TLS Settings

```
1. Go to: tokogasbusiti.store → SSL/TLS
2. Overview tab:
   - Encryption mode: Full (recommended)
   - Automatic HTTPS rewrites: ☑ On
   - Always Use HTTPS: ☑ On
3. Edge Certificates:
   - Min TLS Version: TLS 1.2
```

---

## ✅ STEP 6: VERIFIKASI & TESTING

### 6.1 Test Domain Access

```bash
# Test HTTPS
curl -I https://tokogasbusiti.store

# Should show:
# HTTP/2 200
# Content-Type: text/html
# X-Frame-Options: SAMEORIGIN (from .htaccess - may not show on GitHub Pages)

# Test www
curl -I https://www.tokogasbusiti.store

# Both should work and redirect properly
```

### 6.2 Test in Browser

```
1. Visit: https://tokogasbusiti.store
2. Check:
   ☑ Green padlock (HTTPS working)
   ☑ Homepage loads
   ☑ Styles applied
   ☑ Images display
   ☑ Navigation works
   ☑ Links functional

3. Test social sharing:
   - Open: https://www.facebook.com/sharer/sharer.php?u=https://tokogasbusiti.store
   - Check preview image & title

4. Test mobile:
   - Open on phone browser
   - Check responsive design
```

### 6.3 Check Sitemap & robots.txt

```bash
# Test sitemap
curl https://tokogasbusiti.store/sitemap.xml | head -20

# Test robots.txt
curl https://tokogasbusiti.store/robots.txt

# Both should return valid content
```

### 6.4 Submit to Google Search Console

```
1. Go to: https://search.google.com/search-console
2. Add property: https://tokogasbusiti.store
3. Verify ownership (via DNS or HTML file)
4. Submit sitemap: https://tokogasbusiti.store/sitemap.xml
5. Monitor for crawl errors
```

---

## 🔄 IMPORTANT: GitHub Pages + .htaccess

### ⚠️ .htaccess NOT SUPPORTED on GitHub Pages

GitHub Pages tidak menggunakan Apache server, jadi **.htaccess tidak akan berfungsi**.

**Solusi:**

- Security headers yang ada di .htaccess tidak akan diterapkan
- Redirect HTTP to HTTPS: GitHub Pages handle otomatis ✓
- GZIP compression: GitHub Pages handle otomatis ✓
- Browser caching: Tidak bisa di-set (GitHub Pages punya default caching)

**Workaround untuk security headers:**

- Gunakan Cloudflare untuk menambah security headers
- Atau gunakan GitHub Pages dengan Actions untuk custom headers

### Alternative: Gunakan Cloudflare Pages (Recommended)

Jika ingin full control, pertimbangkan gunakan **Cloudflare Pages** instead:

- Cloudflare Pages support serverless functions
- Better caching control
- Support headers configuration
- Automatic HTTPS

---

## 📝 GITHUB PAGES SPECIFIC NOTES

### 1. Routing untuk /artikel/ pages

GitHub Pages handle folder routing otomatis:

```
tokogasbusiti.store/               → /index.html (root)
tokogasbusiti.store/artikel/       → /artikel/index.html
tokogasbusiti.store/artikel/keamanan-gas-lpg/
                                  → /artikel/keamanan-gas-lpg/index.html
```

### 2. SPA (Single Page App) Consideration

Jika di masa depan ingin gunakan JS routing:

- Buat 404.html di root
- Point ke index.html
- SPA akan handle routing

```html
<!-- 404.html -->
<!DOCTYPE html>
<html>
  <head>
    <script>
      sessionStorage.redirect = location.href;
    </script>
    <meta http-equiv="refresh" content="0;URL='/deploy2-copy/'" />
  </head>
  <body></body>
</html>
```

### 3. subdomain Setup (Optional)

Untuk subdomains di masa depan:

```
api.tokogasbusiti.store → Custom server
blog.tokogasbusiti.store → GitHub Pages

Setup di Cloudflare DNS untuk each subdomain
```

---

## 🚀 DEPLOYMENT FLOW SUMMARY

```
LOCAL MACHINE:
  1. git add .
  2. git commit -m "message"
  3. git push origin main
                ↓
GITHUB:
  4. GitHub Pages builds (1-2 mins)
  5. Available at: your-username.github.io/deploy2-copy/
                ↓
CLOUDFLARE TUNNEL:
  6. Tunnel forwards traffic to GitHub Pages
                ↓
CLOUDFLARE DNS:
  7. tokogasbusiti.store resolves to tunnel
                ↓
FINAL:
  8. https://tokogasbusiti.store WORKS!
```

---

## 🔑 ENVIRONMENT VARIABLES & SECRETS

### GitHub Secrets (for future CI/CD)

```yaml
# Settings → Secrets and variables → Actions

CLOUDFLARE_ZONE_ID=your-zone-id
CLOUDFLARE_API_TOKEN=your-api-token
GITHUB_TOKEN=auto (provided)
```

### Cloudflare API Token (for automation)

```
1. Cloudflare → My Profile → API Tokens
2. Create Token:
   - Template: "Edit Cloudflare Workers"
   - OR custom with permissions: Zone.Cache Purge, Zone.DNS
3. Copy token & keep safe
```

---

## ⚙️ CONTINUOUS DEPLOYMENT

### Auto-deploy on push (Optional)

```yaml
# .github/workflows/deploy.yml

name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy
        run: |
          echo "Deployed to GitHub Pages"
          # Optionally purge Cloudflare cache:
          curl -X POST "https://api.cloudflare.com/client/v4/zones/${{ secrets.CLOUDFLARE_ZONE_ID }}/purge_cache" \
            -H "Authorization: Bearer ${{ secrets.CLOUDFLARE_API_TOKEN }}" \
            -H "Content-Type: application/json" \
            --data '{"files":["https://tokogasbusiti.store/*"]}'
```

---

## 🆘 TROUBLESHOOTING

### Problem: Domain resolves to wrong IP

```
Solution:
- Clear browser cache
- Wait for DNS propagation (24-48 hours)
- Verify Cloudflare DNS records
- Use: dig tokogasbusiti.store
```

### Problem: "Page not found" on /artikel/ pages

```
Solution:
- Verify /artikel/index.html exists in repo
- Check file paths are correct
- GitHub Pages is case-sensitive!
  ✓ artikel/ (lowercase)
  ✗ Artikel/ (uppercase)
```

### Problem: HTTPS not working

```
Solution:
- GitHub Pages provides automatic HTTPS ✓
- Cloudflare will enforce HTTPS ✓
- Check SSL/TLS setting: Full (not Flexible)
- Wait for SSL cert to issue (24 hours)
```

### Problem: Styles/Images not loading

```
Solution:
- Check file paths (case-sensitive on Linux)
- Verify files are in repo
- Clear browser cache (Ctrl+Shift+Delete)
- Check browser console for 404 errors
```

### Problem: ZeroTrust Tunnel not working

```
Solution:
- Verify tunnel is running: cloudflared tunnel run
- Check config.yml syntax
- Verify credentials-file path is correct
- Monitor tunnel logs for errors
```

---

## 📊 FINAL CHECKLIST

### Pre-Deployment:

- [ ] Repository created on GitHub
- [ ] Files pushed to GitHub
- [ ] GitHub Pages enabled & working
- [ ] Domain registered & active
- [ ] Cloudflare account created
- [ ] Nameservers updated to Cloudflare
- [ ] Cloudflare tunnel configured
- [ ] DNS records added in Cloudflare
- [ ] SSL/TLS settings configured

### Post-Deployment:

- [ ] https://tokogasbusiti.store accessible
- [ ] Green padlock visible
- [ ] Homepage loads correctly
- [ ] Responsive on mobile
- [ ] Sitemap accessible
- [ ] robots.txt accessible
- [ ] Google Search Console setup
- [ ] Sitemap submitted to Google

### Maintenance:

- [ ] Monitor GitHub Pages status
- [ ] Monitor Cloudflare tunnel status
- [ ] Regular backups of GitHub repo
- [ ] Monitor Google Search Console
- [ ] Update content regularly

---

## 🎯 TOTAL TIME ESTIMATE

```
Setup:              1-2 hours
- GitHub Pages:     20 mins
- Cloudflare:       30 mins
- ZeroTrust Tunnel: 30 mins
- DNS + Testing:    20 mins

DNS Propagation:    5 mins - 48 hours
(usually 10-30 minutes)

Total to Live:      2-3 hours + DNS propagation
```

---

**Generated:** 2026-01-31
**Status:** ✅ READY FOR GITHUB PAGES DEPLOYMENT
**Next:** Follow GITHUB_PAGES_SETUP.md step by step
