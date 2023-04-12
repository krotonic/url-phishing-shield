#!/bin/sh

# Set the name of the output XPI file
output_xpi="url_phishing_shield.xpi"

# Remove the existing XPI file, if it exists
if [ -f "$output_xpi" ]; then
  rm "$output_xpi"
fi

# Create a new XPI file by zipping the extension files
zip -r "$output_xpi" background.js icons manifest.json LICENSE

echo "XPI file created: $output_xpi"

