from PIL import Image

img = Image.open("/Users/kylenmcclintock/.gemini/antigravity/brain/f31cce1e-2a1e-48b0-be10-6be867635ca1/media__1777507922559.png")
# We'll just pick a row that goes through one of the buttons, e.g. the first button.
# Let's get the image size
width, height = img.size

# Let's just sample at y = height/10 (which should be inside the first button)
# We will sample at x = 10% (left), x = 50% (middle), x = 90% (right)
y = int(height * 0.1)

c1 = img.getpixel((int(width * 0.1), y))
c2 = img.getpixel((int(width * 0.5), y))
c3 = img.getpixel((int(width * 0.9), y))

def to_hex(rgb):
    return '#{:02x}{:02x}{:02x}'.format(rgb[0], rgb[1], rgb[2])

print(f"Left: {to_hex(c1)}")
print(f"Middle: {to_hex(c2)}")
print(f"Right: {to_hex(c3)}")
