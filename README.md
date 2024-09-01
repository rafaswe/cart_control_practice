## Material Purchase

This repository contains the implementation of the interview assignment for APEX DMIT LTD. The project was built using **Next.js** (v14.0.4) along with **React** (v18) and **TypeScript**. The primary purpose of this assignment is to implement a login system, validate user input, and allow users to manage material purchases through a modal interface.

## Table of Contents

- [Project Setup](#project-setup)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)

## Project Setup

To get started with the project, follow these steps:

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rafaswe/cart_control_practice.git
   ```

2. Install the dependencies::

   ```bash
    npm install
    # or
    yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. Open your browser and visit http://localhost:3000 to view the application.

### Features

- **User Authentication**: Implemented a login system using the provided API endpoint. The user's email and token are stored in Redux after successful authentication.
- **Form Validation**: Email and password fields are validated according to standard practices.
- **Material Purchase Management**:
  - Modal for adding material purchases.
  - Validation for required fields, numeric input, and specific formatting rules.
  - Ability to add and remove rows dynamically in the modal.
- **Responsive Design**: Ensured compatibility across different screen sizes and browsers.
- **State Management**: Utilized Redux Toolkit for managing global state, including authentication and material purchases.
- **API Integration**: Connected with the provided endpoints for login and material purchase operations.

### Technologies Used

- **Next.js (v14.0.4)** - Framework for server-rendered React applications.
- **React (v18)** - JavaScript library for building user interfaces.
- **TypeScript** - Superset of JavaScript providing static type definitions.
- **Tailwind CSS** - Utility-first CSS framework for styling.
- **React Hook Form** - Form management and validation.
- **Zod** - Schema validation for form data.
- **Redux Toolkit** - State management with slices and reducers.
- **React Datepicker** - Datepicker component for selecting dates.
- **Moment.js** - Date manipulation library.

### Folder Structure

```plaintext
├── components         # Project's components used throughout the application
├── hooks              # Custom hooks
├── app                # Next.js pages
│   ├── pages          # Pages
│   └── layouts        # Page relatedLayout
├── public             # Static assets (images, etc.)
└── store              # Redux setup with slices and reducers
```

### API Endpoints

1. **Login Endpoint**
   - URL: https://devapi.propsoft.ai/api/interview/login
   - Method: POST
   - Description: Authenticates the user and returns an email and token.
2. **Material Purchase Endpoint**
   - URL: https://devapi.propsoft.ai/api/auth/interview/material-purchase
   - Method: POST
   - Description: Submits a list of material purchases.

### Usage

**Login**

- Use the credentials provided in the assignment to log in.
- On successful login, your email will be displayed, and you can proceed to add material purchases.

**Adding Material Purchases**

- Click on the "Material Purchase" button to open the modal.
- Fill in the required fields: Store, Runner's Name, Amount, Card No, and Transaction Date.
- Use the "Add Row" button to add additional purchases.
- Save the data, which will be displayed on the dashboard as per the design.

**Future Improvements**

- Add unit and integration tests.
- Enhance error handling and display more descriptive messages.
- Implement better UI/UX for mobile devices.

**Contributing** <br/>
Contributions are welcome! Please fork the repository and create a pull request with your changes.
