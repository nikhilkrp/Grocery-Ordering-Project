# Grocery App – Backend  

This is the backend service for the **Grocery App**, built with **Node.js**, **Express**, and **MongoDB**. It provides secure APIs for user authentication, product management, cart, and order handling.  

---

## ⚙️ Tech Stack  
- **Node.js + Express.js**  
- **MongoDB (Mongoose)**  
- **JWT Authentication**  
- **Multer + Cloudinary** (file upload & storage)  
- **Nodemon** (development)  
- **CORS**  

---

## 🚀 Features  

- User & Seller authentication (Register/Login/Logout)  
- JWT-based protected routes  
- Product management with image upload (Multer + Cloudinary)  
- Cart management  
- Order creation & tracking  
- Address management  

---

## 📂 Project Structure  

server/
┣ controllers/
┃ ┣ userController.js
┃ ┣ sellerController.js
┃ ┣ productController.js
┃ ┣ cartController.js
┃ ┣ orderController.js
┃ ┗ addressController.js
┣ middleware/
┃ ┣ authUser.js
┃ ┣ authSeller.js
┃ ┗ multer.js
┣ models/
┃ ┣ User.model.js
┃ ┣ Seller.model.js
┃ ┣ Product.model.js
┃ ┗ Order.model.js
┣ routes/
┃ ┣ userRoutes.js
┃ ┣ sellerRoutes.js
┃ ┣ productRoutes.js
┃ ┣ cartRoutes.js
┃ ┣ orderRoutes.js
┃ ┗ addressRoutes.js
┣ config/
┃ ┗ db.js
┣ server.js
┗ package.json

## 📌 API Routes  

### 🔹 User  
- `POST /api/user/register` → Register new user  
- `POST /api/user/login` → Login  
- `POST /api/user/logout` → Logout  

### 🔹 Seller  
- `POST /api/seller/register` → Register seller  
- `POST /api/seller/login` → Login seller  

### 🔹 Product  
- `POST /api/product/add` → Add new product  
- `POST /api/product/list` → List products  
- `POST /api/product/id` → Get product by ID  
- `POST /api/product/stock` → Update stock  

### 🔹 Cart  
- `POST /api/cart/add` → Add to cart  
- `POST /api/cart/remove` → Remove from cart  

### 🔹 Order  
- `POST /api/order/create` → Create new order  
- `POST /api/order/list` → Get user orders  

### 🔹 Address  
- `POST /api/address/add` → Add address  
- `POST /api/address/list` → List addresses  