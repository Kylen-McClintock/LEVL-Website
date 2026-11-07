import sys
import os
from PIL import Image

def remove_black_bg(input_path, output_path):
    img = Image.open(input_path).convert('RGBA')
    data = img.getdata()
    
    newData = []
    for item in data:
        r, g, b, a = item
        # Luma/Max channel as alpha
        max_val = max(r, g, b)
        if max_val == 0:
            newData.append((0, 0, 0, 0))
        else:
            # Un-premultiply
            new_r = int(min(255, (r * 255) / max_val))
            new_g = int(min(255, (g * 255) / max_val))
            new_b = int(min(255, (b * 255) / max_val))
            
            # Use max_val as alpha, but maybe tweak it with a power curve to keep it looking solid
            # max_val gives a true additive blend simulation when composited over black
            newData.append((new_r, new_g, new_b, max_val))
            
    img.putdata(newData)
    img.save(output_path, "PNG")

def main():
    if not os.path.exists('public/images'):
        os.makedirs('public/images')

    base_dir = '/Users/kylenmcclintock/.gemini/antigravity/brain/6207a804-339d-4782-8977-662509a7f4da/'
    images = [
        ('platform_thesis_visual_1778704851137.png', 'platform-visual-2.png'),
        ('literature_engine_visual_1778704881276.png', 'literature_engine_visual.png'),
        ('longevity_graph_visual_1778704911001.png', 'platform-visual.png'),
        ('synergy_engine_visual_1778704934765.png', 'synergy_engine_visual.png'),
        ('protocol_app_visual_1778704959150.png', 'protocol_app_visual.png'),
        ('feedback_loop_visual_1778704989552.png', 'feedback_loop_visual.png'),
    ]

    for artifact_name, target_name in images:
        input_path = os.path.join(base_dir, artifact_name)
        output_path = os.path.join('public/images', target_name)
        print(f"Processing {input_path} -> {output_path}")
        try:
            remove_black_bg(input_path, output_path)
            print("Success")
        except Exception as e:
            print(f"Failed: {e}")

if __name__ == "__main__":
    main()
