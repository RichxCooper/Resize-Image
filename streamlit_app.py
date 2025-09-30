import streamlit as st
from PIL import Image
from rembg import remove
import io

st.title("Image Resizer & Background Remover")

uploaded_file = st.file_uploader("Upload an image", type=["png", "jpg", "jpeg"])
if uploaded_file:
    image = Image.open(uploaded_file)
    st.image(image, caption="Original Image", use_column_width=True)

    width = st.number_input("Width", min_value=1, value=image.width)
    height = st.number_input("Height", min_value=1, value=image.height)

    if st.button("Resize"):
        resized_image = image.resize((int(width), int(height)))
        st.image(resized_image, caption="Resized Image", use_column_width=True)

    if st.button("Remove Background"):
        output = remove(image)
        st.image(output, caption="Background Removed", use_column_width=True)

        buf = io.BytesIO()
        output.save(buf, format="PNG")
        st.download_button("Download Result", buf.getvalue(), file_name="output.png", mime="image/png")
