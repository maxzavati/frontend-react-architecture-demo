# React Starter (AI Chat Example) with Authentication 🚀

A modern, scalable React application built with TypeScript and Vite, featuring authentication and a chat system. This project demonstrates clean architecture principles using the **MVVM (Model-View-ViewModel)** pattern for maintainable and testable code.

## 🏗️ Architecture Overview

This application follows the **MVVM (Model-View-ViewModel)** pattern, providing clear separation of concerns and enhanced testability:

### MVVM Implementation

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│      View       │───▶│   ViewModel     │───▶│      Model      │
│  (React JSX)    │    │ (Business Logic)│    │ (Data & State)  │
│                 │    │                 │    │                 │
│ - Presentation  │    │ - User Actions  │    │ - API Calls     │
│ - UI Components │    │ - State Mapping │    │ - Data Logic    │
│ - Event Binding │    │ - Side Effects  │    │ - Validation    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

**Example Implementation:**

- **Model** (`use-model.tsx`): Handles data fetching, API calls, and business logic
- **ViewModel** (`use-view-model.tsx`): Manages UI state, user interactions, and side effects
- **View** (`view.tsx`): Pure presentation layer with minimal logic

## 🏛️ Project Structure

```
src/
├── apis/                                 # Global API definitions
│   ├── auth/                             # Authentication APIs
│   └── user/                             # User management APIs
├── components/                           # Reusable UI components
│   └── ui/                               # Design system components
├── context/                              # React context providers
├── features/                             # Feature-based modules
│   ├── auth/                             # Authentication feature
│   └── chat/                             # Chat feature
│       ├── apis/                         # Chat APIs
│       ├── components/                   # Chat components (MVVM)
│       │   └── chat-window/
│       │       ├── use-model.tsx         # 📊 Model
│       │       ├── use-view-model.tsx    # 🎛️ ViewModel
│       │       └── view.tsx              # 🎨 View
│       ├── home/                         # Chat home components
│       ├── session/                      # Session management
│       ├── actions.ts                    # Zustand actions
│       ├── loaders.ts                    # Route loaders
│       └── store.ts                      # Feature state
├── guards/                               # Route protection
├── instances/                            # Configured instances
├── layouts/                              # Application layouts
├── routes/                               # Route components
├── styles/                               # Global styles
└── utils/                                # Utility functions
```

## 🛠️ Tech Stack

### Core Technologies

- **⚛️ React 19** - Latest React with modern features
- **🔷 TypeScript** - Type-safe JavaScript
- **⚡ Vite** - Next-generation build tool
- **🎨 CSS Modules** - Scoped styling

### State Management & Data Fetching

- **🐻 Zustand** - Lightweight state management
- **⚡ TanStack Query** - Powerful data synchronization
- **🌐 Axios** - HTTP client with interceptors

### UI & UX

- **🎯 Radix UI** - Accessible component primitives
- **📱 React Virtuoso** - Virtualized scrolling
- **🔥 React Hot Toast** - Notification system
- **📝 Markdown-it** - Markdown rendering

### Forms & Validation

- **📋 React Hook Form** - Performant forms
- **✅ Zod** - TypeScript-first schema validation
- **🔗 Hookform Resolvers** - Form validation integration

### Routing & Navigation

- **🧭 React Router DOM** - Client-side routing
- **🛡️ Route Guards** - Authentication protection

### Development Tools

- **📏 ESLint** - Code linting
- **🏗️ TypeScript ESLint** - TypeScript-specific rules
- **🔄 Vite Plugin SVGR** - SVG as React components

### Utilities

- **📅 Day.js** - Date manipulation
- **🍪 Universal Cookie** - Cookie management
- **🔐 JWT Decode** - JWT token handling
- **🪝 usehooks-ts** - TypeScript React hooks

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd react_starter_with_auth
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🔧 Configuration

### Path Aliases

The project uses path aliases for cleaner imports:

```typescript
// vite.config.ts
resolve: {
  alias: {
    '@': '/src',
  },
}
```

### TypeScript Configuration

- `tsconfig.json` - Base TypeScript configuration
- `tsconfig.app.json` - App-specific settings
- `tsconfig.node.json` - Node.js build settings

## 🏗️ MVVM Pattern Examples

### Chat Window Component Structure

```typescript
// Model Layer (use-model.tsx)
export function useChatWindowModel() {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['messages'],
    queryFn: getChatSessionMessages,
  });

  return { data, fetchNextPage, hasNextPage };
}

// ViewModel Layer (use-view-model.tsx)
export function useChatWindowViewModel() {
  const model = useChatWindowModel();
  const virtuoso = useRef<VirtuosoHandle>(null);

  const loadMore = async () => {
    const { data } = await model.fetchNextPage();
    // Handle UI updates and side effects
  };

  return { model, loadMore, virtuoso };
}

// View Layer (view.tsx)
export function ChatWindowView() {
  const { model, loadMore, virtuoso } = useChatWindowViewModel();

  return (
    <Virtuoso
      ref={virtuoso}
      data={model.data}
      endReached={loadMore}
      // Pure presentation logic
    />
  );
}
```

## 📁 Feature-Based Architecture

Each feature is self-contained with its own:

- **APIs** - Feature-specific endpoints and types
- **Components** - MVVM-structured components
- **State** - Local state management
- **Schemas** - Validation rules
- **Views** - Page-level components

## 🛡️ Authentication System

- JWT-based authentication
- Protected routes with guards
- Persistent session management
- Login/Register forms with validation

## 💬 Chat System

- Real-time messaging interface
- Virtualized message rendering
- Infinite scroll with pagination
- Session-based chat management

## 🎨 Styling Approach

- **CSS Modules** for component-scoped styles
- **Global styles** for base styling and reset
- **Modular architecture** for maintainable CSS

## 🧪 Best Practices

- **Separation of Concerns** - MVVM pattern implementation
- **Type Safety** - Comprehensive TypeScript usage
- **Component Composition** - Reusable UI components
- **Feature Modules** - Self-contained feature organization
- **Clean Code** - ESLint configuration and code standards

---

Built with ❤️ using modern React ecosystem and clean architecture principles.
