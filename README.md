# FinTech App Demo - Comprehensive README

## 📱 Overview

**FinTech App Demo** is a modern React Native mobile application that demonstrates a comprehensive digital banking interface. Built with the latest React Native 0.80.2, this project showcases essential fintech features including account management, debit card visualization, transaction handling, and modern UI components.

The application features a sophisticated bottom sheet navigation system and implements best practices for financial app development, making it an excellent reference for building scalable fintech solutions.

## 🚀 Features

### Core Functionality
- **Multi-Account Management**: Support for multiple bank accounts with real-time balance display
- **Interactive Debit Cards**: Visual card interface with carousel navigation and card details
- **Account Operations**: Create new accounts, freeze/unfreeze cards, and manage spending limits
- **Real-Time Data**: Fetches account information from backend API with live updates
- **Bottom Sheet Interface**: Modern bottom sheet UI for enhanced user experience

### User Interface
- **Tab-Based Navigation**: Five main sections - Home, Debit Card, Payments, Credit, and Profile
- **Responsive Design**: Optimized for both iOS and Android platforms
- **Modern UI Components**: Clean, fintech-focused design with custom color scheme
- **SVG Icons**: Scalable vector graphics for crisp display on all screen densities

### Security & Architecture
- **TypeScript Integration**: Full type safety throughout the application
- **API-First Design**: RESTful API integration with proper error handling
- **Modular Architecture**: Well-organized component structure for maintainability


## 📋 Prerequisites

Before running this project, ensure you have completed the React Native environment setup:

- **Node.js**: Version 18 or higher
- **React Native CLI**: Latest version
- **Android Studio**: For Android development
- **Xcode**: For iOS development (macOS only)
- **CocoaPods**: For iOS dependencies

## 🛠️ Installation

### 1. Clone the Repository
git clone https://github.com/akshayb03/fintech-app-demo.git
cd fintech-app-demo

### 2. Install Dependencies
npm install


## 🚀 Running the Application

### Start Metro Server
npm start

### Run on Android or Ios
npm run ios
npm run android


## 🔧 Key Dependencies

### Core Framework
- **react-native**: 0.80.2 - Core React Native framework
- **react**: 19.1.0 - React library
- **typescript**: 5.0.4 - TypeScript support

### Navigation & UI
- **@react-navigation/native**: 7.1.17 - Navigation framework
- **@react-navigation/bottom-tabs**: 7.4.5 - Tab navigation
- **@gorhom/bottom-sheet**: 5.1.8 - Bottom sheet component
- **react-native-reanimated**: 3.19.0 - Animation library
- **react-native-gesture-handler**: 2.27.2 - Gesture handling

### Additional Components
- **react-native-svg**: 15.12.1 - SVG support
- **react-native-reanimated-carousel**: 4.0.2 - Card carousel
- **react-native-vector-icons**: 10.3.0 - Icon library
- **axios**: 1.11.0 - HTTP client

## 🌐 API Integration

### Backend Endpoints
// Fetch all accounts
GET /accounts

// Update card status
PATCH /accounts/{name}/active

// Create new account
POST /accounts



