# 🚀 DEPLOYMENT GUIDE - Toko Gas Bu Siti

# Domain: tokogasbusiti.store

# Last Updated: 2026-01-31

## ✅ PRE-DEPLOYMENT CHECKLIST

### 1. SEO & Metadata Setup

- [x] JSON-LD LocalBusiness Schema (index.html)
- [x] Open Graph Tags (all pages)
- [x] Twitter Card Tags (index.html)
- [x] Canonical URLs (all pages)
- [x] Meta descriptions
- [x] Meta keywords
- [x] Sitemap.xml created
- [x] robots.txt created
- [x] Article Schema (artikel pages)

### 2. Files & Security

- [x] .htaccess configuration (Apache)
- [x] Security headers configured
- [x] GZIP compression enabled
- [x] Cache control headers set
- [x] Favicon implemented (all devices)
- [x] Logo SVG added

### 3. Code Quality

- [x] No console warnings (mobile menu fixed)
- [x] Responsive design tested
- [x] Images optimized (WebP format)
- [x] Lazy loading implemented
- [x] Mobile menu functionality
- [x] Smooth scrolling
- [x] AOS animations

### 4. Phone Number & Contact

- [x] Updated to: +6289664935427
- [x] All WhatsApp links updated
- [x] All contact cards updated

---

## 🔧 DEPLOYMENT STEPS

### STEP 1: Get SSL Certificate (HTTPS)

```bash
# If using hosting with Let's Encrypt (recommended)
# - Contact hosting provider to auto-install
# - Or install manually via cPanel/Plesk

# Verify SSL after installation:
# Visit https://tokogasbusiti.store
# Check for green padlock in browser
```

### STEP 2: Upload Files to Server

```bash
# Upload all files to public_html/ root:
- index.html
- artikel/ (folder with subpages)
- img/ (all images)
- src/ (CSS files)
- styles.css
- script.js
- sitemap.xml
- robots.txt
- .htaccess (if Apache server)

# Directory Structure on Server:
/public_html/
├── index.html
├── sitemap.xml
├── robots.txt
├── .htaccess
├── styles.css
├── script.js
├── artikel/
│   ├── index.html
│   ├── keamanan-gas-lpg/
│   ├── penyimpanan-gas-air/
│   └── supplier-gas-katering/
├── img/
└── src/
```

### STEP 3: Verify Files on Server

```bash
# Check if files exist:
- https://tokogasbusiti.store/ → Should load homepage
- https://tokogasbusiti.store/sitemap.xml → Should show XML
- https://tokogasbusiti.store/robots.txt → Should show robots file
- https://tokogasbusiti.store/artikel/ → Should load artikel hub
```

### STEP 4: Setup Google Search Console

1. Visit: https://search.google.com/search-console
2. Add new property: "https://tokogasbusiti.store"
3. Verify ownership (add HTML file or DNS record)
4. Submit sitemap.xml:
   - Go to "Sitemaps" → "New sitemap"
   - Enter: "tokogasbusiti.store/sitemap.xml"
5. Request indexing:
   - Go to "URL Inspection"
   - Enter: https://tokogasbusiti.store/
   - Click "Request Indexing"

### STEP 5: Setup Google Analytics (Optional)

1. Visit: https://analytics.google.com
2. Create new property for "tokogasbusiti.store"
3. Add tracking ID to HTML (in <head> tag)
4. Verify tracking is working

### STEP 6: Test & Verify

**Security Check:**

```bash
curl -I https://tokogasbusiti.store
# Should show:
# - HTTP/2 200 OK
# - X-Frame-Options: SAMEORIGIN
# - X-Content-Type-Options: nosniff
```

**SEO Check:**

```
Google PageSpeed Insights:
- https://pagespeed.web.dev
- Enter: tokogasbusiti.store
- Check Mobile & Desktop scores

Should target:
- Mobile: 80+
- Desktop: 90+
```

**Mobile Test:**

```
Google Mobile Friendly Test:
- https://search.google.com/test/mobile-friendly
- Enter: https://tokogasbusiti.store/
- Should show: "Page is mobile-friendly"
```

---

## 📈 POST-DEPLOYMENT TASKS

### Week 1:

- [ ] Monitor Google Search Console for crawl errors
- [ ] Check indexation status
- [ ] Verify all pages indexed
- [ ] Monitor analytics traffic
- [ ] Check bounce rate

### Week 2-4:

- [ ] Monitor ranking for target keywords
- [ ] Check mobile usability issues
- [ ] Review Core Web Vitals
- [ ] Optimize pages based on metrics
- [ ] Setup Google Business Profile

### Monthly:

- [ ] Publish new articles (at least 1 per month)
- [ ] Update sitemap if adding new pages
- [ ] Monitor backlinks
- [ ] Check for security issues
- [ ] Update content seasonally

---

## 🎯 SEO TARGET KEYWORDS

**Primary (Tier 1):**

- gas lpg tangerang
- pengecer gas tangerang
- supplier gas binong permai
- air galon tangerang
- gas untuk katering

**Secondary (Tier 2):**

- harga gas lpg 12kg
- gas elpiji curug
- jual air galon binong
- supplier gas 3kg 5.5kg
- gas bisnis kuliner

**Long-tail (Tier 3):**

- pengecer gas lpg 12kg di binong permai
- jual gas lpg untuk katering tangerang
- harga air galon isi ulang curug
- supplier gas murah tangerang
- gas 3kg di dekat binong permai

---

## 💻 IMPORTANT NOTES

1. **HTTPS is MANDATORY:**

   - Google will penalize non-HTTPS sites
   - SSL certificates are now free (Let's Encrypt)

2. **Update sitemap.xml when adding pages:**

   - Add new URL with `<url>` tags
   - Resubmit to Google Search Console

3. **Monitor Core Web Vitals:**

   - LCP (Largest Contentful Paint): < 2.5s
   - FID (First Input Delay): < 100ms
   - CLS (Cumulative Layout Shift): < 0.1

4. **Keep backups:**

   - Backup all files weekly
   - Test backups monthly

5. **Update robots.txt if adding new content:**
   - Keep Sitemap URL current
   - Update Disallow rules if needed

---

## 🆘 TROUBLESHOOTING

**Problem: "Not secure" warning**
→ Solution: Install SSL certificate (https://)

**Problem: Pages not indexed in Google**
→ Solution: Submit in Google Search Console manually

**Problem: Sitemap error in Google Console**
→ Solution: Verify XML format at: https://www.xml-sitemaps.com/validate-xml-sitemap.html

**Problem: Mobile score low in PageSpeed**
→ Solution:

- Compress images further
- Minify CSS/JS
- Enable browser caching
- Use CDN for assets

---

## 📞 SUPPORT CONTACTS

**Registrar:** (Your Domain Registrar)
**Hosting:** (Your Hosting Provider)
**SSL Provider:** Let's Encrypt / Hosting Provider

---

**STATUS:** ✅ READY FOR DEPLOYMENT
**SCORE:** 78% SEO Optimized
**ESTIMATED TIME TO DEPLOY:** 2-3 hours
**ESTIMATED TIME FOR INDEX:** 1-2 weeks

Generated: 2026-01-31
