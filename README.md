# Silicon Hub

## Project Overview

Welcome to **Silicon Hub**, a platform designed to connect and empower users through digital resources. This web application is built with modern web technologies and features:

- **Hero Section**: Highlights the platform's purpose and key features  
- **Service Section**: Displays a curated list of services with relevant data  
- **Skill Section**: Offers learning resources and platforms for skill development  
- **AI Assistant**: Provides personalized suggestions to enhance user experience  
- **Responsive Design**: Ensures compatibility across all devices

## Project Structure

```
~~~
CFC25_HACKATHON/
├── public/
│   └── index.html
│
├── src/
│   ├── assets/               # (Optional) Static files like images, fonts
│
│   ├── components/           # All reusable UI components
│   │   ├── AIAssistant.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── Navbar.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── ServiceSection.tsx
│   │   ├── ServiceSubmissionForm.tsx
│   │   ├── SkillSection.tsx
│   │   └── ui/               # Custom UI primitives or wrapped components
│   │       ├── aspect-ratio.tsx
│   │       ├── breadcrumb.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── menubar.tsx
│   │       ├── navigation-menu.tsx
│   │       ├── radio-group.tsx
│   │       ├── scroll-area.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── sidebar.tsx
│   │       └── switch.tsx
│
│   ├── pages/                # Page-level components or routes
│   │   └── Index.tsx
│
│   ├── styles/               # Centralized styling
│   │   ├── App.css
│   │   └── index.css
│
│   └── index.tsx             # App entry point
│
├── .eslintrc.js              # ESLint config (consider renaming)
├── package.json
├── README.md

~~~

```

## Installation

### Prerequisites

- **Node.js** (v16 or higher)  
- **npm** or **yarn**  
- **Git**

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/silicon-hub.git
   cd silicon-hub
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and visit: [http://localhost:3000](http://localhost:3000)

## Key Dependencies

- **React** – UI framework  
- **Tailwind CSS** – Styling system  
- **Lucide Icons** – Icon library  
- **TypeScript** – Type safety  
- **ESLint** – Code quality and linting

## Deployment

1. Build for production:

   ```bash
   npm run build
   # or
   yarn build
   ```

2. Serve the production build:

   ```bash
   npm run start
   # or
   yarn start
   ```

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository  
2. Create a feature branch  
3. Submit a pull request

## License

Proprietary license. Contact **The Scripts** for permission to use or modify this project.

## Copyright

© 2025 **The Scripts**. All rights reserved.
