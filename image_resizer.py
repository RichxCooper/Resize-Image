import tkinter as tk
from tkinter import ttk, filedialog, messagebox
from PIL import Image, ImageTk
import os
from rembg import remove
import threading

class ImageResizerApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Image Resizer & Background Remover")
        self.root.geometry("1000x700")
        self.root.configure(bg='#8A2BE2')  # Purple background
        
        # Variables
        self.original_image = None
        self.processed_image = None
        self.image_path = None
        self.background_removed = False
        
        # Create GUI
        self.create_widgets()
        
    def create_widgets(self):
        # Main frame
        main_frame = tk.Frame(self.root, bg='#8A2BE2')
        main_frame.pack(fill='both', expand=True, padx=20, pady=20)
        
        # Title
        title_label = tk.Label(
            main_frame, 
            text="Image Resizer & Background Remover", 
            font=("Arial", 24, "bold"),
            bg='#8A2BE2',
            fg='white'
        )
        title_label.pack(pady=(0, 20))
        
        # Control frame
        control_frame = tk.Frame(main_frame, bg='#8A2BE2')
        control_frame.pack(fill='x', pady=(0, 20))
        
        # File selection
        file_frame = tk.Frame(control_frame, bg='#8A2BE2')
        file_frame.pack(side='left', padx=(0, 20))
        
        tk.Button(
            file_frame,
            text="Select Image",
            command=self.select_image,
            bg='#4B0082',
            fg='white',
            font=("Arial", 12),
            relief='raised',
            padx=20,
            pady=10
        ).pack(side='left')
        
        self.file_label = tk.Label(
            file_frame,
            text="No image selected",
            bg='#8A2BE2',
            fg='white',
            font=("Arial", 10)
        )
        self.file_label.pack(side='left', padx=(10, 0))
        
        # Resize controls
        resize_frame = tk.Frame(control_frame, bg='#8A2BE2')
        resize_frame.pack(side='left', padx=(0, 20))
        
        tk.Label(
            resize_frame,
            text="Width:",
            bg='#8A2BE2',
            fg='white',
            font=("Arial", 10)
        ).pack(side='left')
        
        self.width_var = tk.StringVar(value="800")
        self.width_entry = tk.Entry(
            resize_frame,
            textvariable=self.width_var,
            width=8,
            font=("Arial", 10)
        )
        self.width_entry.pack(side='left', padx=(5, 10))
        
        tk.Label(
            resize_frame,
            text="Height:",
            bg='#8A2BE2',
            fg='white',
            font=("Arial", 10)
        ).pack(side='left')
        
        self.height_var = tk.StringVar(value="600")
        self.height_entry = tk.Entry(
            resize_frame,
            textvariable=self.height_var,
            width=8,
            font=("Arial", 10)
        )
        self.height_entry.pack(side='left', padx=(5, 10))
        
        # Buttons frame
        button_frame = tk.Frame(control_frame, bg='#8A2BE2')
        button_frame.pack(side='right')
        
        self.resize_button = tk.Button(
            button_frame,
            text="Resize Image",
            command=self.resize_image,
            bg='#4B0082',
            fg='white',
            font=("Arial", 12),
            relief='raised',
            padx=20,
            pady=10,
            state='disabled'
        )
        self.resize_button.pack(side='left', padx=(0, 10))
        
        self.remove_bg_button = tk.Button(
            button_frame,
            text="Remove Background",
            command=self.remove_background,
            bg='#4B0082',
            fg='white',
            font=("Arial", 12),
            relief='raised',
            padx=20,
            pady=10,
            state='disabled'
        )
        self.remove_bg_button.pack(side='left', padx=(0, 10))
        
        self.save_button = tk.Button(
            button_frame,
            text="Save Image",
            command=self.save_image,
            bg='#4B0082',
            fg='white',
            font=("Arial", 12),
            relief='raised',
            padx=20,
            pady=10,
            state='disabled'
        )
        self.save_button.pack(side='left')
        
        # Progress bar
        self.progress = ttk.Progressbar(
            main_frame,
            mode='indeterminate',
            length=400
        )
        self.progress.pack(pady=(0, 20))
        
        # Image display frame
        image_frame = tk.Frame(main_frame, bg='#8A2BE2')
        image_frame.pack(fill='both', expand=True)
        
        # Original image
        original_frame = tk.Frame(image_frame, bg='#8A2BE2')
        original_frame.pack(side='left', fill='both', expand=True, padx=(0, 10))
        
        tk.Label(
            original_frame,
            text="Original Image",
            bg='#8A2BE2',
            fg='white',
            font=("Arial", 14, "bold")
        ).pack(pady=(0, 10))
        
        self.original_canvas = tk.Canvas(
            original_frame,
            bg='#4B0082',
            relief='sunken',
            bd=2
        )
        self.original_canvas.pack(fill='both', expand=True)
        
        # Processed image
        processed_frame = tk.Frame(image_frame, bg='#8A2BE2')
        processed_frame.pack(side='right', fill='both', expand=True, padx=(10, 0))
        
        tk.Label(
            processed_frame,
            text="Processed Image",
            bg='#8A2BE2',
            fg='white',
            font=("Arial", 14, "bold")
        ).pack(pady=(0, 10))
        
        self.processed_canvas = tk.Canvas(
            processed_frame,
            bg='#4B0082',
            relief='sunken',
            bd=2
        )
        self.processed_canvas.pack(fill='both', expand=True)
        
        # Status bar
        self.status_var = tk.StringVar(value="Ready")
        status_bar = tk.Label(
            main_frame,
            textvariable=self.status_var,
            bg='#4B0082',
            fg='white',
            font=("Arial", 10),
            relief='sunken',
            bd=1
        )
        status_bar.pack(fill='x', pady=(20, 0))
        
    def select_image(self):
        file_path = filedialog.askopenfilename(
            title="Select Image",
            filetypes=[
                ("Image files", "*.png *.jpg *.jpeg *.bmp *.gif *.tiff"),
                ("All files", "*.*")
            ]
        )
        
        if file_path:
            try:
                self.image_path = file_path
                self.original_image = Image.open(file_path)
                self.processed_image = self.original_image.copy()
                
                # Update file label
                filename = os.path.basename(file_path)
                self.file_label.config(text=f"Selected: {filename}")
                
                # Display original image
                self.display_image(self.original_image, self.original_canvas)
                
                # Display processed image
                self.display_image(self.processed_image, self.processed_canvas)
                
                # Enable buttons
                self.resize_button.config(state='normal')
                self.remove_bg_button.config(state='normal')
                self.save_button.config(state='normal')
                
                # Reset background removal flag
                self.background_removed = False
                
                self.status_var.set(f"Image loaded: {filename}")
                
            except Exception as e:
                messagebox.showerror("Error", f"Failed to load image: {str(e)}")
                self.status_var.set("Error loading image")
    
    def display_image(self, image, canvas):
        canvas.delete("all")
        
        if image:
            # Get canvas dimensions
            canvas_width = canvas.winfo_width()
            canvas_height = canvas.winfo_height()
            
            if canvas_width > 1 and canvas_height > 1:
                # Calculate scaling to fit canvas
                img_width, img_height = image.size
                scale_x = canvas_width / img_width
                scale_y = canvas_height / img_height
                scale = min(scale_x, scale_y, 1.0)  # Don't scale up
                
                # Resize image for display
                display_width = int(img_width * scale)
                display_height = int(img_height * scale)
                display_image = image.resize((display_width, display_height), Image.LANCZOS)
                
                # Convert to PhotoImage
                photo = ImageTk.PhotoImage(display_image)
                
                # Center image on canvas
                x = (canvas_width - display_width) // 2
                y = (canvas_height - display_height) // 2
                
                canvas.create_image(x, y, anchor='nw', image=photo)
                canvas.image = photo  # Keep reference
    
    def resize_image(self):
        if not self.processed_image:
            return
            
        try:
            width = int(self.width_var.get())
            height = int(self.height_var.get())
            
            if width <= 0 or height <= 0:
                messagebox.showerror("Error", "Width and height must be positive numbers")
                return
            
            # Resize image
            resized_image = self.processed_image.resize((width, height), Image.LANCZOS)
            self.processed_image = resized_image
            
            # Display resized image
            self.display_image(self.processed_image, self.processed_canvas)
            
            self.status_var.set(f"Image resized to {width}x{height}")
            
        except ValueError:
            messagebox.showerror("Error", "Please enter valid numbers for width and height")
        except Exception as e:
            messagebox.showerror("Error", f"Failed to resize image: {str(e)}")
    
    def remove_background(self):
        if not self.processed_image:
            return
            
        def remove_bg_thread():
            try:
                self.progress.start()
                self.status_var.set("Removing background... Please wait.")
                
                # Remove background
                input_array = self.processed_image.convert('RGBA')
                output_array = remove(input_array)
                
                # rembg.remove returns a PIL Image
                self.processed_image = output_array
                self.background_removed = True
                
                # Update GUI in main thread
                self.root.after(0, self.background_removal_complete)
                
            except Exception as e:
                import traceback
                traceback_str = traceback.format_exc()
                print(f"Background removal error: {traceback_str}")
                self.root.after(0, lambda e=e: self.background_removal_error(traceback_str))
        
        # Start background removal in separate thread
        thread = threading.Thread(target=remove_bg_thread)
        thread.daemon = True
        thread.start()
    
    def background_removal_complete(self):
        self.progress.stop()
        self.display_image(self.processed_image, self.processed_canvas)
        self.status_var.set("Background removed successfully")
    
    def background_removal_error(self, error_msg):
        self.progress.stop()
        messagebox.showerror("Error", f"Failed to remove background: {error_msg}")
        self.status_var.set("Background removal failed")
    
    def save_image(self):
        if not self.processed_image:
            return
            
        # Determine default filename
        if self.image_path:
            base_name = os.path.splitext(os.path.basename(self.image_path))[0]
            if self.background_removed:
                default_name = f"{base_name}_no_bg.png"
            else:
                default_name = f"{base_name}_resized.png"
        else:
            default_name = "processed_image.png"
        
        # Ask for save location
        file_path = filedialog.asksaveasfilename(
            title="Save Image",
            defaultextension=".png",
            filetypes=[
                ("PNG files", "*.png"),
                ("JPEG files", "*.jpg"),
                ("All files", "*.*")
            ],
            initialname=default_name
        )
        
        if file_path:
            try:
                # Save image
                if file_path.lower().endswith('.jpg') or file_path.lower().endswith('.jpeg'):
                    # Convert to RGB for JPEG
                    if self.processed_image.mode == 'RGBA':
                        rgb_image = Image.new('RGB', self.processed_image.size, (255, 255, 255))
                        rgb_image.paste(self.processed_image, mask=self.processed_image.split()[-1])
                        rgb_image.save(file_path, 'JPEG', quality=95)
                    else:
                        self.processed_image.convert('RGB').save(file_path, 'JPEG', quality=95)
                else:
                    self.processed_image.save(file_path)
                
                self.status_var.set(f"Image saved to: {os.path.basename(file_path)}")
                messagebox.showinfo("Success", "Image saved successfully!")
                
            except Exception as e:
                messagebox.showerror("Error", f"Failed to save image: {str(e)}")
                self.status_var.set("Error saving image")

def main():
    root = tk.Tk()
    app = ImageResizerApp(root)
    
    # Bind canvas resize events
    def on_canvas_resize(event):
        if app.original_image:
            app.display_image(app.original_image, app.original_canvas)
        if app.processed_image:
            app.display_image(app.processed_image, app.processed_canvas)
    
    app.original_canvas.bind('<Configure>', on_canvas_resize)
    app.processed_canvas.bind('<Configure>', on_canvas_resize)
    
    root.mainloop()

if __name__ == "__main__":
    main()

