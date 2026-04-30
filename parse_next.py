import re
import json

with open("levl.html", "r") as f:
    content = f.read()

# Try to find string literals in the JS chunks that look like ingredient data
import ast

for match in re.finditer(r'\[1,"([^"]+)"\]\)', content):
    s = match.group(1)
    # The string is a JSON-like payload or React fiber tree. Let's just find anything with "Learn more" and "Vitamin B6"
    pass

# Instead, let's just use a regex to find all text between double quotes that is longer than 50 characters
strings = re.findall(r'"([^"]{50,})"', content)
for s in strings:
    if "Cofactor" in s or "Vitamin B6" in s:
        print("FOUND:", s)
