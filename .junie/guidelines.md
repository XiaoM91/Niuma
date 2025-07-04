# Niuma Development Guidelines

## Project Overview
Niuma (牛马) is a React-based Progressive Web Application (PWA) for real-time salary visualization down to millisecond precision. The application displays earnings in real-time as they accumulate based on annual salary input.

## Build/Configuration Instructions

### Prerequisites
- Node.js (version compatible with React 18.2.0+)
- npm or yarn package manager

### Initial Setup
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
   Note: If you encounter peer dependency conflicts, use:
   ```bash
   npm install --legacy-peer-deps
   ```

### Available Scripts
- `npm start` - Runs the development server on http://localhost:3000
- `npm run build` - Creates optimized production build in `build/` directory
- `npm test` - Runs the test suite in interactive watch mode
- `npm run eject` - Ejects from Create React App (irreversible)

### Build Configuration
- **Framework**: Create React App (CRA) with React Scripts 5.0.1
- **Build Tool**: Webpack (configured via CRA)
- **Transpilation**: Babel with React presets
- **Linting**: ESLint with react-app configuration
- **TypeScript**: Supported (TypeScript-related packages present)

### Production Deployment
The `build/` directory contains the production-ready application:
- `index.html` - Main HTML file with Chinese language support
- `static/` - Contains CSS and JavaScript bundles
- `manifest.json` - PWA configuration for standalone app experience

## Testing Information

### Testing Framework
- **Primary**: Jest (configured via React Scripts)
- **React Testing**: @testing-library/react
- **DOM Testing**: @testing-library/dom
- **Assertions**: @testing-library/jest-dom

### Running Tests
```bash
# Run all tests in watch mode
npm test

# Run tests once without watch mode
npm test -- --watchAll=false

# Run tests with verbose output
npm test -- --watchAll=false --verbose
```

### Test File Structure
- Test files should be named `*.test.js` or `*.spec.js`
- Place test files alongside the components they test in the `src/` directory
- Use descriptive `describe` blocks and `test` names

### Example Test Implementation
```javascript
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ComponentName from './ComponentName';

describe('ComponentName', () => {
  test('renders component with expected content', () => {
    render(<ComponentName />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

### Adding New Tests
1. Create test file alongside component: `ComponentName.test.js`
2. Import necessary testing utilities
3. Write descriptive test cases covering:
   - Component rendering
   - Props handling
   - User interactions
   - Edge cases
4. Run tests to ensure they pass before committing

## Development Information

### Code Style Guidelines
- **Language**: JavaScript (ES6+) with JSX, TypeScript support available
- **Component Style**: Functional components with React Hooks
- **Naming Convention**: 
  - Components: PascalCase (e.g., `SalaryCalculator`)
  - Files: PascalCase for components, camelCase for utilities
  - CSS Classes: kebab-case (e.g., `salary-calculator`)

### Project Structure
```
src/
├── components/          # Reusable UI components
├── *.js                # Component files
├── *.test.js           # Test files
└── *.css               # Component styles
```

### State Management
- Use React Hooks (`useState`, `useEffect`) for component state
- For real-time updates, use `setInterval` with proper cleanup in `useEffect`
- Consider performance implications of frequent state updates

### Internationalization
- Primary language: Chinese (Simplified)
- HTML lang attribute set to `zh-CN`
- Use Chinese text for user-facing content
- Consider localization for broader market reach

### Performance Considerations
- Real-time calculations should be optimized for frequent updates
- Use `useEffect` cleanup functions to prevent memory leaks
- Consider debouncing or throttling for high-frequency updates
- PWA configuration enables offline functionality

### Browser Support
- Modern browsers supporting ES6+
- Mobile-responsive design (viewport meta tag configured)
- PWA features for mobile app-like experience

### Debugging Tips
- Use React Developer Tools browser extension
- Console logging for real-time calculation debugging
- Test calculations with different salary values
- Verify timer cleanup to prevent memory leaks

### Dependencies Management
- Keep dependencies updated regularly
- Use `--legacy-peer-deps` flag if encountering peer dependency conflicts
- Monitor for security vulnerabilities with `npm audit`
- Consider bundle size impact when adding new dependencies

### Git Workflow
- This project uses Junie workflow integration
- Follow conventional commit messages
- Test changes before committing
- Ensure build passes before merging

## Security Notes
- Current setup has some npm audit warnings - address these in production
- Sanitize any user inputs if adding form functionality
- Consider Content Security Policy (CSP) headers for production deployment