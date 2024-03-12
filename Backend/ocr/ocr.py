from PIL import Image
import pytesseract
import tkinter as tk
from tkinter import filedialog

def read_image(image):
    print(pytesseract.image_to_string(image, lang='chi_sim'))

def open_file_dialog():
    file_path = filedialog.askopenfilename(title="选择图像文件", filetypes=[("Image files", "*.png;*.jpg;*.jpeg;*.gif;*.bmp")])
    if file_path:
        image = Image.open(file_path)
        read_image(image)

def main():
    root = tk.Tk()
    root.withdraw()  # 隐藏主窗口

    print("按 Enter 键选择文件...")
    input("按 Enter 键继续...")

    open_file_dialog()

if __name__ == '__main__':
    main()
