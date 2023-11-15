# Inventory Management Application Frontend (Next.js)

## Overview

This is the frontend component of an Inventory Management web application built using Next.js. It provides a user-friendly interface for managing inventory items, categories, suppliers, stores, and more.

## Features

- Item creation and management.
- Categories & Supplier creation management.
- Create & update Store inventory items(Purchase orders are used to restock store).
- Search and filter functionality.
- Inventory threshold visibility & with red markers for items at threshold
- Purchase order management, including creation, Admin approval and Staff delivery
- User Signup and Login
- User Role management & Store assignment

## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). The Backend API code can be found on [here](https://github.com/refinedblessing/inventory-management)

The app is hosted on Vercel [here](https://inventory-management-frontend-liart.vercel.app/) 👀, and is currently deployed using GitHub webhooks, A Slide show with a demo will be live [here](https://docs.google.com/presentation/d/1Vc1hM2kyANVdmAZTuNA76hEWBr4ssqfux1Mdr82QCc0/edit?usp=sharing)
If you are not seeing any data on the homepage, please be patient, initial loading takes a while because the app is hosted on Azure Free Tier.

**PLEASE REMEMBER YOUR USERNAME AND PASSWORD SO YOU CAN LOG IN AND VIEW THE OTHER PAGES**

To get a local copy of the project up and running, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your system.
- A Backend API repository see [here](https://github.com/refinedblessing/inventory-management)
- Package manager, such as [npm](https://www.npmjs.com/)

### Installation

- Clone the repository:

```bash
git clone https://github.com/refinedblessing/inventory-management-frontend.git
```

- Change into the project directory

```bash
cd inventory-management-frontend
```

- Install the dependencies

```bash
npm install
```

- Start the development server:

```bash
npm run dev
```

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

\*\* Include your own .env file and set the API URL when testing locally.

\*\* [Backend API](https://inventory-master.azurewebsites.net/api) gets turned off to avoid incurring costs 😅
