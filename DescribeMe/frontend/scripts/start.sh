#!/usr/bin/env bash

# Start ngrok pointing to your backend server port (e.g., 5001)
ngrok http 5001 > ngrok.log 2>&1 &
NGROK_PID=$!

# Wait a moment for ngrok to initialize
sleep 2

# Fetch the ngrok URL from the ngrok API
# This assumes ngrok is running locally and has an API on 127.0.0.1:4040
NGROK_URL=$(curl -s http://127.0.0.1:4040/api/tunnels | jq -r '.tunnels[0].public_url')

if [ -z "$NGROK_URL" ]; then
  echo "Failed to fetch ngrok URL"
  kill $NGROK_PID
  exit 1
fi

echo "NGROK_URL: $NGROK_URL"

# Export NGROK_URL as an environment variable so that app.config.js can read it
export NGROK_URL=$NGROK_URL

# Now start Expo
# We use npx to ensure we use the local version of Expo CLI if available
npx expo start

# When you stop Expo with Ctrl+C, also stop ngrok
kill $NGROK_PID