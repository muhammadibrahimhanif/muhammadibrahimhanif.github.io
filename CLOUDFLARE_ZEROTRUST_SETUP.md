# 🔐 Cloudflare ZeroTrust Tunnel Setup Guide

# Toko Gas Bu Siti → GitHub Pages

# Version 1.0 | Updated: 2026-01-31

---

## 📚 TABLE OF CONTENTS

1. [ZeroTrust Overview](#zerotrust-overview)
2. [Prerequisites](#prerequisites)
3. [Create Tunnel](#create-tunnel)
4. [Configure Routes](#configure-routes)
5. [Run Tunnel](#run-tunnel)
6. [DNS Configuration](#dns-configuration)
7. [Monitoring](#monitoring)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 ZEROTRUST OVERVIEW

### Why use ZeroTrust?

```
TRADITIONAL SETUP:
Domain → DNS → GitHub Pages
(Direct CNAME to GitHub Pages)

ZEROTRUST SETUP:
Domain → Cloudflare DNS → ZeroTrust Tunnel → GitHub Pages
(Adds security layer + more control)

ADVANTAGES:
✓ Security: No direct connection to origin
✓ DDoS Protection: Cloudflare filters attacks
✓ Access Control: Can restrict by IP/location/authentication
✓ Analytics: Detailed traffic logs
✓ Failover: Can redirect to backup if needed
```

### Architecture Diagram

```
┌─────────────────────┐
│  tokogasbusiti.     │
│  store              │
└──────────┬──────────┘
           │
           │ DNS resolves to Cloudflare
           ▼
┌──────────────────────────────────────┐
│        CLOUDFLARE NETWORK            │
│                                      │
│  ┌────────────────────────────────┐ │
│  │  Web Cache / DDoS Protection   │ │
│  │  Security Headers / Filtering  │ │
│  └────────────────┬───────────────┘ │
│                   │                  │
│  ┌────────────────▼───────────────┐ │
│  │     ZeroTrust Tunnel Ingress   │ │
│  │  (cloudflared connector)       │ │
│  └────────────────┬───────────────┘ │
└────────────────────┼──────────────────┘
                     │
                     │ Encrypted tunnel
                     ▼
        ┌────────────────────────┐
        │   TUNNEL CONNECTOR     │
        │   (cloudflared client) │
        │   (runs on machine)    │
        └────────────────┬───────┘
                         │
                         │
                         ▼
        ┌────────────────────────┐
        │  GITHUB PAGES ORIGIN   │
        │  your-user.github.io/  │
        │  deploy2-copy/         │
        └────────────────────────┘
```

---

## ✅ PREREQUISITES

### Before Starting:

- [ ] Cloudflare account created
- [ ] Domain added to Cloudflare
- [ ] Nameservers updated to Cloudflare
- [ ] GitHub Pages working & accessible
- [ ] Local machine ready

### Required:

- Git installed
- Cloudflared CLI installed
- Terminal/Command prompt access

### Knowledge:

- Basic CLI commands
- JSON configuration files
- DNS concepts

---

## 🔧 STEP 1: CREATE TUNNEL

### 1.1 Via Cloudflare Dashboard (GUI Method - Easier)

```
1. Login to: https://dash.cloudflare.com/
2. Left sidebar → Zero Trust
3. Click "Networks" → "Tunnels"
4. Click "Create a tunnel"
5. Choose connector: Cloudflared
6. Name: toko-gas-tunnel
7. Click "Save tunnel"

System akan generate:
- Tunnel UUID
- Credentials file location
```

### 1.2 Via CLI (Command Line Method)

```bash
# Make sure cloudflared is installed
cloudflared --version

# Authenticate with Cloudflare
cloudflared tunnel login

# Browser opens → Grant permission → Copy token if needed

# Create tunnel
cloudflared tunnel create toko-gas-tunnel

# Output will show:
# Tunnel credentials have been saved to:
# /Users/yourname/.cloudflared/[UUID].json
#
# Tunnel ID: [your-tunnel-id]
# Tunnel name: toko-gas-tunnel
# Account tag: [account-id]
```

### 1.3 Verify Tunnel Created

```bash
# List all tunnels
cloudflared tunnel list

# Should show:
# NAME                ID                   ACCOUNT   CREATED             CONNECTIONS
# toko-gas-tunnel     [UUID]               [ID]      2026-01-31T...      (not connected)
```

---

## 🛣️ STEP 2: CONFIGURE ROUTES

### 2.1 Create Configuration File

```bash
# Navigate to Cloudflared directory
cd ~/.cloudflared/

# Create config file
nano config.yml

# OR if using Windows:
# notepad %APPDATA%\cloudflared\config.yml
```

### 2.2 Add Configuration Content

```yaml
# config.yml - Toko Gas Bu Siti ZeroTrust Configuration
# Updated: 2026-01-31

# Tunnel name
tunnel: toko-gas-tunnel

# Credentials file (auto-generated when creating tunnel)
credentials-file: ~/.cloudflared/[YOUR-UUID].json

# Define ingress routes
ingress:
  # Root domain
  - hostname: tokogasbusiti.store
    service: https://your-username.github.io/deploy2-copy/
    originRequest:
      httpHostHeader: your-username.github.io

  # www subdomain
  - hostname: www.tokogasbusiti.store
    service: https://your-username.github.io/deploy2-copy/
    originRequest:
      httpHostHeader: your-username.github.io

  # Future: API subdomain (example)
  # - hostname: api.tokogasbusiti.store
  #   service: https://api-backend.example.com
  #   originRequest:
  #     httpHostHeader: api-backend.example.com

  # Catch-all: Default for unknown routes
  - service: http_status:404

# Logging configuration
log-level: info
# Optional: Connector configuration
# warp-routing:
#   enabled: true
```

### 2.3 Update Credentials Path

```bash
# Find your credentials file UUID
ls ~/.cloudflared/

# Output example:
# config.yml
# cert.pem
# [12345678-abcd-efgh-ijkl-mnopqrstuvwx].json  ← This is UUID

# Update config.yml:
# credentials-file: ~/.cloudflared/[12345678-abcd-efgh-ijkl-mnopqrstuvwx].json
```

### 2.4 Save Configuration

```bash
# Press Ctrl+O to save
# Press Enter to confirm
# Press Ctrl+X to exit
# (or equivalent if not using nano)
```

---

## 🚀 STEP 3: RUN TUNNEL

### 3.1 Start Tunnel (Foreground)

```bash
# Run tunnel in terminal (for testing)
cloudflared tunnel run toko-gas-tunnel

# Output should show:
# [2026-01-31T10:30:45Z] INF Monitoring DNS query responses for: tokogasbusiti.store
# [2026-01-31T10:30:45Z] INF Registered tunnel connection id: ...
# [2026-01-31T10:30:45Z] INF Tunnel running at full bandwidth.
# [2026-01-31T10:30:45Z] INF Each HA connection's auth token expires after 15 minutes...

# Keep this running to test tunnel
```

### 3.2 Test Tunnel (From Another Terminal)

```bash
# Open new terminal

# Test from Cloudflare tunnel
curl -I https://tokogasbusiti.store

# If 502 Bad Gateway: Tunnel not connected or origin unreachable
# If 200 OK: Tunnel working!
```

### 3.3 Install as Service (For Production)

```bash
# Linux / macOS
sudo cloudflared service install

# This creates systemd service (Linux) or LaunchAgent (macOS)
# Service auto-starts on reboot

# Start service
sudo systemctl start cloudflared
sudo systemctl enable cloudflared

# Check status
sudo systemctl status cloudflared

# View logs
sudo journalctl -u cloudflared -f
```

### 3.4 Windows Installation

```batch
# Download installer or use:
.\cloudflared.exe service install

# This creates Windows Service
# Service auto-starts on reboot

# Start service
net start cloudflared

# OR via Services app: Admin → Services → Cloudflared
```

---

## 🌐 STEP 4: DNS CONFIGURATION

### 4.1 Add DNS Records (Cloudflare Dashboard)

```
1. Go to: https://dash.cloudflare.com/
2. Select domain: tokogasbusiti.store
3. Go to: DNS tab
4. Add New Record:

RECORD 1 - Root Domain:
- Type: CNAME
- Name: @ (or leave blank for root)
- Target: tokogasbusiti.store
  (or your-username.github.io if not using tunnel)
- TTL: Auto
- Proxy: ☑ Proxied (orange cloud)

RECORD 2 - www Subdomain:
- Type: CNAME
- Name: www
- Target: tokogasbusiti.store
- TTL: Auto
- Proxy: ☑ Proxied (orange cloud)

RECORD 3 - Tunnel Verification (if needed):
- Type: CNAME
- Name: _acme-challenge.tokogasbusiti.store
- Target: (varies based on setup)
- Proxy: ☐ DNS Only (gray cloud)
```

### 4.2 Verify DNS Records

```bash
# Check DNS propagation
nslookup tokogasbusiti.store

# Should resolve to Cloudflare nameservers
# If not yet: Wait 5-30 minutes

# Trace DNS resolution
dig tokogasbusiti.store

# Should show Cloudflare nameservers in answer section
```

---

## 📊 STEP 5: MONITORING

### 5.1 Monitor in Cloudflare Dashboard

```
1. Go to: https://dash.cloudflare.com/
2. Zero Trust → Networks → Tunnels
3. Click "toko-gas-tunnel"
4. View:
   - Status: Connected (green) or Disconnected (red)
   - Connections: Number of active connectors
   - Last Activated: Timestamp
   - Traffic: Real-time request logs
```

### 5.2 Check Tunnel Status

```bash
# List tunnels with status
cloudflared tunnel list

# Should show connection count > 0:
# NAME                ID      ACCOUNT     CREATED             CONNECTIONS
# toko-gas-tunnel     ...     ...         2026-01-31T...      3

# Test connectivity
curl -v https://tokogasbusiti.store

# Should show:
# HTTP/2 200
# X-Powered-By: cloudflare
```

### 5.3 View Tunnel Logs

```bash
# macOS/Linux - systemd
sudo journalctl -u cloudflared -f -n 50

# Or from Cloudflare Dashboard:
Zero Trust → Analytics → Logs

# Filter by:
- Domain
- Status Code
- IP Address
- Time period
```

### 5.4 Set Up Alerts (Optional)

```
Cloudflare Notifications:
1. Profile → Notifications
2. Email alerts:
   - Tunnel connection down
   - High error rate
   - Custom rules

Set thresholds:
- Alert if tunnel down > 5 mins
- Alert if 5xx errors > 10%
```

---

## 🔧 ADVANCED CONFIGURATION

### A1. Access Control (Authentication)

```yaml
# Add this to config.yml for authentication

# Example: Restrict by IP
- hostname: admin.tokogasbusiti.store
  service: https://your-username.github.io/deploy2-copy/admin
  # Only allow specific IPs
  originRequest:
    access:
      required: true
      team: "your-team"
      audTag: ["admin"]
```

### A2. Load Balancing

```yaml
# Route to multiple origins
- hostname: tokogasbusiti.store
  service: https://origin-1.example.com
  # Backup origins
  loadBalancer:
    - service: https://origin-2.example.com
    - service: https://origin-3.example.com
```

### A3. Custom Headers

```yaml
# Add custom headers to origin requests
- hostname: tokogasbusiti.store
  service: https://your-username.github.io/deploy2-copy/
  originRequest:
    headers:
      X-Custom-Header: "TokoGas-Origin"
      X-Request-Source: "Cloudflare-Tunnel"
```

### A4. Custom 404 Pages

```yaml
# Add this to GitHub Pages for better 404 handling
# Create /404.html in root with SPA redirect

# Then in config.yml:
- hostname: tokogasbusiti.store
  service: https://your-username.github.io/deploy2-copy/
  originRequest:
    # GitHub Pages will serve 404.html for missing pages
```

---

## 🆘 TROUBLESHOOTING

### Issue: "Error: Tunnel not connected"

```
Causes:
1. cloudflared service not running
2. Credentials file missing/invalid
3. Network blocked

Solutions:
# Check if running
ps aux | grep cloudflared

# Restart service
sudo systemctl restart cloudflared

# Check logs
sudo journalctl -u cloudflared -f

# Reinstall if corrupted
sudo cloudflared service uninstall
sudo cloudflared service install
```

### Issue: "502 Bad Gateway"

```
Causes:
1. Origin (GitHub Pages) unreachable
2. Wrong origin URL in config
3. GitHub Pages down

Solutions:
# Test GitHub Pages directly
curl -I https://your-username.github.io/deploy2-copy/

# Verify config.yml syntax
cloudflared tunnel ingress-rule

# Check tunnel logs
cloudflared tunnel run toko-gas-tunnel
```

### Issue: "DNS points to wrong location"

```
Causes:
1. Old DNS records cached
2. Nameservers not updated
3. Cloudflare DNS not configured

Solutions:
# Clear DNS cache
# macOS:
sudo dscacheutil -flushcache

# Linux:
sudo systemctl restart nscd

# Windows:
ipconfig /flushdns

# Wait 5-10 minutes for propagation
```

### Issue: "Certificate errors"

```
Causes:
1. Self-signed certificate issues
2. TLS version mismatch
3. HSTS headers

Solutions:
# Disable TLS verification (dev only)
cloudflared tunnel run toko-gas-tunnel --disable-tls-verify

# For production: Fix SSL certificate on origin
# GitHub Pages handles SSL automatically
```

### Issue: "Can't reach tunnel from specific location"

```
Causes:
1. ISP blocking Cloudflare IPs
2. Corporate firewall
3. Geographic restrictions

Solutions:
# Check Cloudflare IP ranges not blocked
# Use different ISP/network for testing
# Contact network admin if corporate
```

---

## 📋 TUNNEL MAINTENANCE

### Regular Tasks:

```
DAILY:
☐ Monitor tunnel status
☐ Check error rates in logs
☐ Test site accessibility

WEEKLY:
☐ Review traffic analytics
☐ Check for security alerts
☐ Verify HTTPS working

MONTHLY:
☐ Update cloudflared CLI
☐ Rotate credentials (if needed)
☐ Review Cloudflare firewall rules
☐ Update DNS records (if needed)
```

### Update Cloudflared

```bash
# Check current version
cloudflared --version

# Update (brew)
brew upgrade cloudflare/cloudflare/cloudflared

# Update (manual)
# Download latest from:
# https://github.com/cloudflare/cloudflared/releases

# Restart service
sudo systemctl restart cloudflared
```

---

## 🔐 SECURITY BEST PRACTICES

```
1. ✓ Use strong Cloudflare API tokens
2. ✓ Keep credentials file secure (don't commit to git)
3. ✓ Enable 2FA on Cloudflare account
4. ✓ Monitor tunnel access logs
5. ✓ Use least privilege (minimal access needed)
6. ✓ Enable DDoS protection (automatic with Cloudflare)
7. ✓ Set up rate limiting if needed
8. ✓ Regularly rotate credentials
```

### .gitignore for ZeroTrust:

```
# Don't commit tunnel credentials!
~/.cloudflared/
*.json
credentials-file
tunnel-id
```

---

## 📊 PERFORMANCE OPTIMIZATION

### Caching:

```yaml
# In config.yml, add caching headers
- hostname: tokogasbusiti.store
  service: https://your-username.github.io/deploy2-copy/
  originRequest:
    cacheDefault: 3600 # 1 hour cache
```

### Compression:

```yaml
# Cloudflare automatically compresses:
- HTML
- CSS
- JavaScript
- JSON
- XML
- SVG
# No action needed - automatic!
```

### HTTP/2 & HTTP/3:

```
Cloudflare automatically enables:
- HTTP/2 (multiplexing)
- HTTP/3 / QUIC (faster)

No configuration needed
```

---

## 🎯 FINAL TUNNEL CHECKLIST

```
Setup:
✓ Tunnel created
✓ Credentials file saved
✓ config.yml configured
✓ Routes defined
✓ Service installed

DNS:
✓ DNS records added in Cloudflare
✓ Nameservers propagated
✓ Domain resolves correctly

Monitoring:
✓ Tunnel shows connected
✓ Test requests successful
✓ Logs showing traffic
✓ Status page green

Security:
✓ HTTPS working
✓ Green padlock visible
✓ No certificate warnings
✓ Credentials secured

Performance:
✓ Response time < 500ms
✓ No 502 errors
✓ Pages loading fast
✓ Images cached
```

---

**Generated:** 2026-01-31
**Status:** ✅ READY FOR PRODUCTION
**Next:** Test tunnel, then monitor performance
