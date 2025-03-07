#!/bin/sh

echo "=== ENVIRONMENT VARIABLE CHECK ==="
echo "Checking environment variables (showing only if they're set, not their values)..."
echo "NEXT_PUBLIC_SUPABASE_URL is set: $(if [ -n "$NEXT_PUBLIC_SUPABASE_URL" ]; then echo "YES"; else echo "NO"; fi)"
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY is set: $(if [ -n "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ]; then echo "YES"; else echo "NO"; fi)"
echo "RESEND_API_KEY is set: $(if [ -n "$RESEND_API_KEY" ]; then echo "YES"; else echo "NO"; fi)"
echo "SMTP_HOST is set: $(if [ -n "$SMTP_HOST" ]; then echo "YES"; else echo "NO"; fi)"
echo "SMTP_PORT is set: $(if [ -n "$SMTP_PORT" ]; then echo "YES"; else echo "NO"; fi)"
echo "SMTP_USER is set: $(if [ -n "$SMTP_USER" ]; then echo "YES"; else echo "NO"; fi)"
echo "SMTP_PASS is set: $(if [ -n "$SMTP_PASS" ]; then echo "YES"; else echo "NO"; fi)"
echo "SMTP_FROM is set: $(if [ -n "$SMTP_FROM" ]; then echo "YES"; else echo "NO"; fi)"
echo "NEXT_PUBLIC_SITE_URL is set: $(if [ -n "$NEXT_PUBLIC_SITE_URL" ]; then echo "YES"; else echo "NO"; fi)"

echo ""
echo "=== NETWORK CONNECTIVITY CHECK ==="
# Check connectivity to Supabase
if [ -n "$NEXT_PUBLIC_SUPABASE_URL" ]; then
  SUPABASE_HOST=$(echo $NEXT_PUBLIC_SUPABASE_URL | sed -e 's|^[^/]*//||' -e 's|/.*$||')
  echo "Trying to connect to Supabase host: $SUPABASE_HOST..."
  RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" $NEXT_PUBLIC_SUPABASE_URL)
  echo "Connection to Supabase: $RESPONSE"
  
  if [ "$RESPONSE" = "200" ] || [ "$RESPONSE" = "404" ]; then
    echo "✅ Supabase connection successful (got HTTP $RESPONSE)"
  else
    echo "❌ Supabase connection failed (got HTTP $RESPONSE)"
    echo "This might be why your services and admin login aren't working!"
  fi
else
  echo "❌ NEXT_PUBLIC_SUPABASE_URL is not set, skipping connectivity check."
  echo "This is likely why your services and admin login aren't working!"
fi

echo ""
echo "=== STARTING APPLICATION ==="
echo "Starting the Next.js application..."
node server.js 