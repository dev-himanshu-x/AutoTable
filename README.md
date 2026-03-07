# 📊 Dynamic JSON Table

A sleek, modern web app that lets you **paste any JSON API URL** and instantly view the data in a sortable, paginated table — with full control over which columns to display.

Built with **React 19**, **TanStack Start**, **Ant Design 6**, and **Tailwind CSS v4**.

---

## ✨ Features

- **Instant API loading** — Enter any public JSON API endpoint and hit **Load** to fetch and display data
- **Smart data extraction** — Automatically finds arrays of objects in any JSON structure, no matter how deeply nested (e.g., extracting from wrapper objects)
- **Column picker** — Choose exactly which fields appear via an interactive multi-select modal
- **Edit columns on the fly** — Re-open the column picker anytime to add, remove, or reorder fields
- **Rich cell rendering** — URLs become clickable links; arrays, objects, and nulls are formatted cleanly
- **Pagination** — Configurable page sizes (5 / 10 / 20 / 50) with total count indicators
- **Dark / Light theme** — Toggle between themes with one click; preference is persisted in `localStorage`
- **Polished UI** — Reimagined with a card-based layout, floating header, gradients, and subtle shadows
- **Fully responsive** — Works great on desktop, tablet, and mobile

---

## 🛠️ Tech Stack

| Layer        | Technology                                                    |
| ------------ | ------------------------------------------------------------- |
| Framework    | [TanStack Start](https://tanstack.com/start) (file-based SSR) |
| UI Library   | [React 19](https://react.dev/)                                |
| Components   | [Ant Design 6](https://ant.design/)                           |
| Styling      | [Tailwind CSS v4](https://tailwindcss.com/)                   |
| HTTP Client  | [Axios](https://axios-http.com/)                              |
| Build Tool   | [Vite 7](https://vite.dev/)                                   |
| Language     | TypeScript 5                                                  |
| Testing      | Vitest + React Testing Library                                |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9 (or any compatible package manager)

### Installation

```bash
# Clone the repo
git clone https://github.com/<your-username>/Dynamic-table.git
cd Dynamic-table

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

The app will start at **http://localhost:3000**.

### Production Build

```bash
npm run build
npm run preview
```

### Run Tests

```bash
npm test
```

---

## 📖 Usage

1. **Enter a URL** — Paste any public JSON API endpoint into the input field
   *(Example: `https://api.postalpincode.in/pincode/273164` or `https://jsonplaceholder.typicode.com/users`)*
2. **Load** — Click the **Load** button to fetch the data
3. **Pick columns** — A modal appears listing all available fields; select the ones you want to display
4. **Browse the table** — Sort, paginate, and scroll through your data
5. **Edit columns** — Click **Edit columns** anytime to change visible fields
6. **Toggle theme** — Use the ☀️ / 🌙 buttons in the header to switch between light and dark mode

---

## 📁 Project Structure

```
Dynamic-table/
├── src/
│   ├── components/          # Reusable React components (ready for future refactors)
│   ├── config/              # Configuration files
│   ├── hooks/               # Custom React hooks
│   ├── routes/
│   │   ├── __root.tsx       # Root layout — HTML shell, theme script, global styles
│   │   └── index.tsx        # Main page — URL input, table, column picker modal
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions
│   ├── router.tsx           # TanStack Router configuration
│   ├── routeTree.gen.ts     # Auto-generated route tree
│   ├── App.css              # Tailwind imports & custom utilities
│   └── styles.css           # Base typography & body styles
├── vite.config.ts           # Vite + TanStack Start + Tailwind plugin config
├── tsconfig.json            # TypeScript configuration
├── package.json
└── README.md
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
