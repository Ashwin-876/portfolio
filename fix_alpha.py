from PIL import Image
import numpy as np

input_path = "src/assets/avatar_cartoon.png"
output_path = "src/assets/avatar_cartoon.png"

img = Image.open(input_path).convert("RGBA")
data = np.array(img)

# Make all pixels with alpha > 10 fully opaque (alpha = 255)
# This will fix any semi-transparent pixels inside the body
data[data[:, :, 3] > 10, 3] = 255

img_fixed = Image.fromarray(data)
img_fixed.save(output_path)
