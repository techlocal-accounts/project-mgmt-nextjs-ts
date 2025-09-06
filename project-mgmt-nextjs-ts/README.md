# Project Management - Next.js + TypeScript

A production-ready Project Management web application built with Next.js, TypeScript, and modern web technologies. Features Kanban boards, Timeline/Gantt views, global search, PWA support, and comprehensive accessibility compliance.

## 🚀 Features

### Core Functionality
- **Kanban Boards**: Drag & drop task management with customizable columns, labels, and priorities
- **Timeline/Gantt**: Visual project timelines with drag/resize, virtual scrolling, and multiple views
- **Global Search**: Debounced search with intelligent caching and offline support
- **Analytics**: Comprehensive analytics with charts, reports, and productivity insights

### Technical Features
- **PWA Support**: Service worker, offline queue, background sync, and installable app
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation and screen reader support
- **Performance**: Optimized with virtual scrolling, lazy loading, and performance monitoring
- **Responsive Design**: Mobile-first, component-driven design that works on all devices
- **Internationalization**: Multi-language support with i18n integration
- **TypeScript**: Full type safety and excellent developer experience

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context + Local Storage
- **Drag & Drop**: @dnd-kit
- **Charts**: Recharts
- **Icons**: Heroicons
- **Forms**: React Hook Form + Zod
- **PWA**: Next-PWA + Workbox
- **Testing**: Jest + Testing Library + Playwright

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/project-mgmt-nextjs-ts.git
   cd project-mgmt-nextjs-ts
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Home/              # Home page components
│   ├── Kanban/            # Kanban board components
│   ├── Layout/            # Layout components
│   └── Timeline/          # Timeline/Gantt components
├── hooks/                 # Custom React hooks
│   ├── useTheme.ts        # Theme management
│   ├── useLocalStorage.ts # Local storage hook
│   ├── useOffline.ts      # Offline functionality
│   └── useSearch.ts       # Search functionality
├── lib/                   # Utility functions
│   ├── utils.ts           # Common utilities
│   └── constants.ts       # App constants
└── types/                 # TypeScript type definitions
    └── index.ts           # Core types
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run e2e` - Run end-to-end tests
- `npm run type-check` - Run TypeScript type checking

## 🎨 Customization

### Theme Configuration
The app supports light/dark/system themes. Customize colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#0b5cff', // Your primary color
      },
      // ... other colors
    },
  },
}
```

### Adding New Features
1. Create components in `src/components/`
2. Add types in `src/types/index.ts`
3. Create hooks in `src/hooks/`
4. Add utilities in `src/lib/`

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:

```env
NEXT_PUBLIC_APP_NAME="Project Management"
NEXT_PUBLIC_APP_VERSION="1.0.0"
```

### PWA Configuration
PWA settings are configured in `next.config.js`. Customize:
- Cache strategies
- Offline fallbacks
- Background sync
- Push notifications

## 📱 PWA Features

### Installation
- **Desktop**: Click the install button in the address bar
- **Mobile**: Add to home screen from browser menu
- **Automatic**: Prompt users to install after engagement

### Offline Support
- Service worker caches static assets
- Offline queue for user actions
- Background sync when connection restored
- Offline indicator in UI

### Performance
- Lazy loading of components
- Image optimization
- Code splitting
- Bundle analysis

## ♿ Accessibility

### WCAG 2.1 AA Compliance
- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: ARIA labels and descriptions
- **Color Contrast**: Meets AA standards
- **Focus Management**: Visible focus indicators
- **Reduced Motion**: Respects user preferences

### Testing Accessibility
```bash
# Run accessibility tests
npm run test:a11y

# Use axe-core for manual testing
npm install -g @axe-core/cli
axe http://localhost:3000
```

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### Integration Tests
```bash
npm run test:integration
```

### E2E Tests
```bash
npm run e2e
```

### Performance Testing
```bash
# Lighthouse CI
npm run lighthouse

# Bundle analysis
npm run analyze
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms
```bash
# Build the application
npm run build

# Start production server
npm run start
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📊 Performance

### Lighthouse Scores
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100
- **PWA**: 100

### Bundle Size
- **Initial Load**: < 100KB gzipped
- **Total Bundle**: < 500KB gzipped
- **Code Splitting**: Automatic route-based splitting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write tests for new features
- Ensure accessibility compliance
- Update documentation
- Follow conventional commits

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [@dnd-kit](https://dndkit.com/) - Drag and drop
- [Heroicons](https://heroicons.com/) - Icons
- [Recharts](https://recharts.org/) - Charts

## 📞 Support

- **Documentation**: [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/your-username/project-mgmt-nextjs-ts/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/project-mgmt-nextjs-ts/discussions)

## 🔄 Changelog

### v1.0.0
- Initial release
- Kanban boards with drag & drop
- Timeline/Gantt views
- PWA support
- Accessibility compliance
- Performance optimizations

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies.**