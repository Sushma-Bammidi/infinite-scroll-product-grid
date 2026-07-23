# 🚀 Infinite Scroll Product Grid

A modern, responsive product grid built with **React + Vite** that implements **infinite scrolling** using the **IntersectionObserver API**. Products are fetched from the DummyJSON API and loaded seamlessly as users scroll.

> **Assignment Objective:** Implement infinite scrolling without using any third-party infinite scroll libraries while ensuring smooth UX, correct pagination, and graceful fallback support.

---

## 🌐 Live Demo

**Vercel:** https://infinite-scroll-product-grid-amber.vercel.app

---

## 📂 GitHub Repository

**Repository:** https://github.com/Sushma-Bammidi/infinite-scroll-product-grid

---

# ✨ Features

- ✅ Infinite scrolling using **IntersectionObserver**
- ✅ No scroll event listeners
- ✅ Automatic pagination
- ✅ Prevents duplicate API requests
- ✅ Smooth content loading
- ✅ Responsive product grid
- ✅ Loading indicator
- ✅ Error handling
- ✅ End-of-list indicator
- ✅ Manual **Load More** fallback when `IntersectionObserver` isn't supported
- ✅ Product Details Modal

---

# 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| React | UI Development |
| Vite | Build Tool |
| JavaScript (ES6+) | Application Logic |
| CSS3 | Styling |
| IntersectionObserver API | Infinite Scroll |
| DummyJSON API | Product Data |

---

# 📦 API

Products are fetched from:

```
https://dummyjson.com/products
```

Pagination parameters:

| Parameter | Description |
|-----------|-------------|
| limit | Number of products per request |
| skip | Number of products already loaded |

Example:

```
Page 1
limit=20
skip=0

Page 2
limit=20
skip=20

Page 3
limit=20
skip=40
```

---

# 🏗 Project Structure

```
src
│
├── components
│   ├── ProductCard.jsx
│   ├── ProductGrid.jsx
│   ├── Loader.jsx
│   ├── LoadMoreButton.jsx
│   └── EndMessage.jsx
│
├── hooks
│   └── useInfiniteScroll.js
│
├── services
│   └── api.js
│
├── data
│   └── products.js
│
├── App.jsx
├── App.css
├── main.jsx
└── vite.config.js
```

---

# ⚙️ Application Flow

```
Application Starts
        │
        ▼
Fetch First 20 Products
        │
        ▼
Render Product Grid
        │
        ▼
Observe Bottom Sentinel
        │
        ▼
User Scrolls
        │
        ▼
IntersectionObserver Triggered
        │
        ▼
Is Request Already Running?
       │
 ┌─────┴─────┐
 │           │
Yes         No
 │           │
Ignore   Fetch Next Page
             │
             ▼
Append Products
             │
             ▼
More Products?
      │
 ┌────┴────┐
 │         │
Yes       No
 │         │
Observe   Show
Again     "You've Reached the End"
```

---

# 📋 Assignment Requirements

| Requirement | Status |
|-------------|--------|
| IntersectionObserver | ✅ |
| No Scroll Event Listeners | ✅ |
| Correct Pagination | ✅ |
| Duplicate Fetch Prevention | ✅ |
| Smooth Scroll Experience | ✅ |
| End of Products State | ✅ |
| Manual Load More Fallback | ✅ |
| No Infinite Scroll Library | ✅ |

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/Sushma-Bammidi/infinite-scroll-product-grid.git
```

## Navigate

```bash
cd infinite-scroll-product-grid
```

## Install Dependencies

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

---

# 📦 Production Build

```bash
npm run build
```

Preview Production Build

```bash
npm run preview
```

---

# 📸 Screenshots

## Home Page

![Home](screenshots/home.png)

---

## Infinite Scroll Loading

![Loading](screenshots/loading.png)

---

## Product Details

![Modal](screenshots/modal.png)

---

## End of Products

![End](screenshots/end.png)

---

## Manual Load More Fallback

![Fallback](screenshots/load-more.png)

---

# 💡 Future Improvements

- Product Search
- Category Filters
- Sorting Options
- Skeleton Loading
- Image Lazy Loading
- Unit Testing
- Accessibility Improvements
- Performance Optimization

---

# 👩‍💻 Author

**Sushma Bammidi**

GitHub: https://github.com/Sushma-Bammidi
