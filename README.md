# Learning Experience Community Platform

## Table of Contents
1. [Purpose and Usage](#purpose-and-usage)
2. [Features](#features)
3. [Installation](#installation)
   - [Local Development Setup](#local-development-setup)
   - [AWS Deployment](#aws-deployment)
4. [Dependencies](#dependencies)
5. [Quick Start](#quick-start)
6. [Contributing](#contributing)
7. [License](#license)

## Purpose and Usage
The Learning Experience Community Platform is designed to create an engaging environment for both content creators and learners. It allows users to:
- Create and manage learning paths
- Enroll in courses and track progress
- Rate and review learning content
- Build public profiles showcasing achievements
- Compete on leaderboards

## Features
### Content Author Role
- Create and manage learning paths
- Add learning items (videos, articles, etc.)
- Create quizzes and tests
- Manage content labels and tags

### Learner Role
- Search and browse learning paths
- Enroll in courses and track progress
- Complete quizzes and tests
- Build public profiles
- Rate and review content
- View leaderboards

## Installation

### Local Development Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/learning-platform.git
   cd learning-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:3000
   ```

### AWS Deployment
1. Install AWS CLI and configure your credentials:
   ```bash
   aws configure
   ```

2. Install the AWS CDK:
   ```bash
   npm install -g aws-cdk
   ```

3. Deploy the application:
   ```bash
   cdk deploy
   ```

4. Access your application at the provided CloudFront URL

## Dependencies
### Core Dependencies
- React 18+
- React Router DOM 6+
- Vite 4+
- Node.js 16+

### Development Dependencies
- TypeScript (optional)
- ESLint
- Prettier

## Quick Start
1. Install Node.js (v16 or higher)
2. Clone the repository
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser to `http://localhost:3000`

## Contributing
We welcome contributions! Please follow these steps:
1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeatureName`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeatureName`)
5. Open a pull request

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
