import urllib.request
import re
import json

js_url = "https://www.levlhealth.com/_next/static/chunks/10180cc9d9d37c3b.js"
js_content = urllib.request.urlopen(js_url).read().decode("utf-8")

# We can see the array starts with `d=[{name:"Vitamin B6"`
start = js_content.find('d=[{name:"Vitamin B6"')
end = js_content.find(']', start) + 1

# Try to parse the JS array using regex to extract name and details
objects = re.findall(r'\{name:"([^"]+)",(?:.*?)details:"([^"]+)"\}', js_content)

for name, details in objects:
    print(f"NAME: {name}")
    print(f"DETAILS: {details}")
    print("---")
