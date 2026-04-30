from PIL import Image

img = Image.open("/Users/kylenmcclintock/.gemini/antigravity/brain/f31cce1e-2a1e-48b0-be10-6be867635ca1/media__1777507922559.png")
width, height = img.size

# Sample a vertical line at 10% width
x = int(width * 0.1)
for y in range(0, height, 10):
    r, g, b = img.getpixel((x, y))[:3]
    if r > 100 or g > 100 or b > 100:  # If it's bright, it's inside a button
        print(f"Found button at Y={y}")
        
        # Now let's sample across this button
        w10 = int(width * 0.1)
        w50 = int(width * 0.5)
        w90 = int(width * 0.9)
        
        c1 = img.getpixel((w10, y))[:3]
        c2 = img.getpixel((w50, y))[:3]
        c3 = img.getpixel((w90, y))[:3]
        
        def to_hex(rgb):
            return '#{:02x}{:02x}{:02x}'.format(rgb[0], rgb[1], rgb[2])
            
        print(f"Left: {to_hex(c1)}")
        print(f"Middle: {to_hex(c2)}")
        print(f"Right: {to_hex(c3)}")
        break
