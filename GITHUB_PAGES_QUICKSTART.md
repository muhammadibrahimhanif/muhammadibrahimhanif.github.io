# ⚡ QUICK START - GitHub Pages + Cloudflare + ZeroTrust

# Toko Gas Bu Siti - tokogasbusiti.store

# Fast deployment guide - 5 steps

---

## 🎯 THE PLAN

```
GitHub Pages   →   Cloudflare Tunnel   →   tokogasbusiti.store
(Free hosting)      (Security/DNS)            (Your domain)
```

---

## ⏱️ TIME ESTIMATE

```
Setup:              1.5 - 2 hours
- GitHub: 30 mins
- Cloudflare: 45 mins
- Testing: 15 mins

DNS Propagation:    5 mins - 48 hours (usually 10-30 mins)
TOTAL:              2 hours + waiting for DNS
```

---

## 🚀 5-STEP DEPLOYMENT

### ✅ STEP 1: PREPARE GITHUB (30 mins)

```bash
# 1. Create repository at:
https://github.com/new

# Repository name: deploy2-copy
# ☑ Public
# ☑ Add .gitignore (Node)

# 2. Clone locally
git clone https://github.com/YOUR_USERNAME/deploy2-copy.git
cd deploy2-copy

# 3. Copy all files from "deploy2 (copy)" folder
# Include: *.html, *.css, *.js, *.xml, *.txt, *.md, folders

# 4. Commit & push
git add .
git commit -m "Initial: Toko Gas Bu Siti - Production Ready"
git push -u origin main

# 5. Enable GitHub Pages
# Settings → Pages → Source: Deploy from branch → main → Save
# ⏳ Wait 1-2 minutes

# Test at: https://your-username.github.io/deploy2-copy/
```

### ✅ STEP 2: SETUP CLOUDFLARE (45 mins)

```bash
# 1. Create Cloudflare account
https://dash.cloudflare.com/

# 2. Add domain
Add → tokogasbusiti.store → Continue → Free Plan

# 3. Update nameservers (at domain registrar)
# Registrar → Nameservers → Change to:
# - ns1.cloudflare.com
# - ns2.cloudflare.com

# ⏳ Wait for nameserver propagation (5-30 mins)

# Verify:
nslookup tokogasbusiti.store
# Should show Cloudflare nameservers

# 4. Add DNS records (Cloudflare Dashboard)
DNS → Add records:

  Root (@):      CNAME → your-username.github.io
  www:           CNAME → your-username.github.io

# Both with: Proxy ☑ (orange cloud)

# 5. SSL/TLS settings
SSL/TLS → Overview → Full (recommended)
☑ Always Use HTTPS
☑ Automatic HTTPS Rewrites
```

### ✅ STEP 3: CREATE ZEROTRUST TUNNEL (45 mins)

```bash
# 1. Install cloudflared (local machine)
# macOS:
brew install cloudflare/cloudflare/cloudflared

# Linux:
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared-linux-amd64.deb

# Windows: Download MSI from above link

# 2. Authenticate
cloudflared tunnel login
# Browser opens → Grant permission

# 3. Create tunnel
cloudflared tunnel create toko-gas-tunnel

# 4. Create config file
cd ~/.cloudflared/
nano config.yml

# Paste this:
tunnel: toko-gas-tunnel
credentials-file: ~/.cloudflared/[UUID].json

ingress:
  - hostname: tokogasbusiti.store
    service: https://your-username.github.io/deploy2-copy/
    originRequest:
      httpHostHeader: your-username.github.io
  - hostname: www.tokogasbusiti.store
    service: https://your-username.github.io/deploy2-copy/
    originRequest:
      httpHostHeader: your-username.github.io
  - service: http_status:404

log-level: info

# Save: Ctrl+O → Enter → Ctrl+X

# 5. Test tunnel
cloudflared tunnel run toko-gas-tunnel

# In another terminal:
curl -I https://tokogasbusiti.store
# Should get 200 OK

# 6. Install as service (auto-run)
# macOS/Linux:
sudo cloudflared service install
sudo systemctl start cloudflared
sudo systemctl enable cloudflared

# Windows:
cloudflared.exe service install
net start cloudflared
```

### ✅ STEP 4: VERIFY EVERYTHING (15 mins)

```bash
# 1. Check tunnel status
cloudflared tunnel list
# Should show CONNECTIONS > 0

# 2. Test domain
https://tokogasbusiti.store
# ☑ Green padlock
# ☑ Homepage loads
# ☑ Styles applied
# ☑ Images display
# ☑ Mobile responsive

# 3. Test www subdomain
https://www.tokogasbusiti.store
# Should redirect to root domain

# 4. Test sitemap
https://tokogasbusiti.store/sitemap.xml
# Should show XML

# 5. Test robots.txt
https://tokogasbusiti.store/robots.txt
# Should show robots content

# 6. Test mobile
Open on phone: https://tokogasbusiti.store
# Check responsive design works
```

### ✅ STEP 5: SUBMIT TO GOOGLE (10 mins)

```bash
# 1. Google Search Console
https://search.google.com/search-console

# 2. Add property
https://tokogasbusiti.store

# 3. Verify ownership
Choose DNS verification → Add record in Cloudflare

# 4. Submit sitemap
Sitemaps → New sitemap → tokogasbusiti.store/sitemap.xml

# 5. Request indexing
URL Inspection → https://tokogasbusiti.store
Request Indexing

# 6. Monitor
Check Search Console daily first week for errors
```

---

## ✅ COMPLETE CHECKLIST

### GitHub Pages:

- [ ] Repository created
- [ ] Files pushed
- [ ] GitHub Pages enabled
- [ ] Accessible at: your-username.github.io/deploy2-copy/

### Cloudflare:

- [ ] Domain added
- [ ] Nameservers updated
- [ ] DNS records added (root + www)
- [ ] SSL/TLS configured

### ZeroTrust:

- [ ] Tunnel created
- [ ] cloudflared installed
- [ ] config.yml configured
- [ ] Service installed & running
- [ ] Tunnel shows connected

### Domain:

- [ ] tokogasbusiti.store accessible
- [ ] HTTPS working (green padlock)
- [ ] Responsive on mobile
- [ ] All pages loading

### SEO:

- [ ] Sitemap accessible
- [ ] robots.txt accessible
- [ ] Google Search Console setup
- [ ] Sitemap submitted

---

## 🎯 FINAL STATUS

If all checkmarks are done:

✅ **Your website is LIVE at https://tokogasbusiti.store**

Next steps:

- Monitor Google Search Console
- Add Google Analytics (optional)
- Publish new content regularly
- Monitor tunnel status

---

## 🆘 QUICK TROUBLESHOOTING

| Problem                  | Solution                                                 |
| ------------------------ | -------------------------------------------------------- |
| Domain not resolving     | Wait 5-30 mins for DNS propagation                       |
| 502 Bad Gateway          | Restart: `sudo systemctl restart cloudflared`            |
| GitHub Pages not loading | Check repository public, files committed, Pages enabled  |
| HTTPS errors             | Wait for SSL cert (24 hours) or check Cloudflare SSL/TLS |
| Images not showing       | Check file paths (case-sensitive on Linux)               |

---

## 📚 DETAILED GUIDES

For detailed steps, see:

- `GITHUB_PAGES_SETUP.md` - Complete GitHub Pages guide
- `CLOUDFLARE_ZEROTRUST_SETUP.md` - ZeroTrust details
- `DEPLOYMENT_GUIDE.md` - Original hosting guide (reference)

---

## 🎉 YOU'RE DONE!

Website is live at: **https://tokogasbusiti.store**

Status: 🟢 PRODUCTION READY

---

**Generated:** 2026-01-31
**Time to Deploy:** ~2 hours
**Support:** Read guides above for details
