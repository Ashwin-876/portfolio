from rembg import remove
from PIL import Image

input_path = "src/assets/avatar_cartoon.png"
output_path = "src/assets/avatar_cartoon.png" # Overwrite

input_image = Image.open(input_path)
output_image = remove(input_image)
output_image.save(output_path)
