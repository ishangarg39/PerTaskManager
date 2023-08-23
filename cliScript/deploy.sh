#!/bin/bash

projectName='my-app' # Replace with your project's name
buildDir='build' # Replace with your build directory

# Step 1: Build the Next.js App
echo 'Building the Next.js app...'
npm run build

# Set Firebase environment variables
export API_KEY='AIzaSyBjXU0k5e5Ay_qM64YkvMmrrwjp5_1ilhA'
export AUTH_DOMAIN='personaltaskmanager-715e7.firebaseapp.com'
export PROJECT_ID='personaltaskmanager-715e7'
# Add other Firebase environment variables as needed

# Step 2: Deploy using Vercel CLI
echo 'Deploying to Vercel...'
vercel "$buildDir"

# Step 3: Read deployment URL from .vercel/output.json
output=$(cat .vercel/output.json)
deployment=$(echo "$output" | jq '.[0]')
deploymentURL=$(echo "$deployment" | jq -r '.url')
echo "Deployment URL: $deploymentURL"
