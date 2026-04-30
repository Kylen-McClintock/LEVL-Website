from PIL import Image

img = Image.open("/Users/kylenmcclintock/.gemini/antigravity/brain/f31cce1e-2a1e-48b0-be10-6be867635ca1/media__1777507922559.png")
width, height = img.size

def to_hex(rgb):
    return '#{:02x}{:02x}{:02x}'.format(rgb[0], rgb[1], rgb[2])

max_x = -1
max_y = -1
max_val = 0

for y in range(0, height, 10):
    for x in range(0, width, 10):
        r, g, b = img.getpixel((x, y))[:3]
        if r > max_val:
            max_val = r
            max_x = x
            max_y = y

print(f"Max pixel at ({max_x}, {max_y}) with R={max_val}")

# Try sampling that row
left_x = 0
for x in range(width):
    r, g, b = img.getpixel((x, max_y))[:3]
    if r > 50 or g > 50 or b > 50:
        left_x = x
        break
        
right_x = width - 1
for x in range(width-1, -1, -1):
    r, g, b = img.getpixel((x, max_y))[:3]
    if r > 50 or g > 50 or b > 50:
        right_x = x
        break

if left_x != right_x:
    button_w = right_x - left_x
    w05 = left_x + int(button_w * 0.05)
    w50 = left_x + int(button_w * 0.5)
    w95 = left_x + int(button_w * 0.95)
    
    c1 = img.getpixel((w05, max_y))[:3]
    c2 = img.getpixel((w50, max_y))[:3]
    c3 = img.getpixel((w95, max_y))[:3]
    
    print(f"Left: {to_hex(c1)}")
    print(f"Middle: {to_hex(c2)}")
    print(f"Right: {to_hex(c3)}")
