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

## Demo
<div>
    <a href="https://www.loom.com/share/ad8dea3f2aed4a94aa1309d26b03f108">
      <p>Store Management Application Demo - Watch Video</p>
    </a>
    <a href="https://www.loom.com/share/ad8dea3f2aed4a94aa1309d26b03f108">
      <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/ad8dea3f2aed4a94aa1309d26b03f108-with-play.gif">
    </a>
  </div>

## Getting Started

Presentation with demo [here](https://docs.google.com/presentation/d/1Vc1hM2kyANVdmAZTuNA76hEWBr4ssqfux1Mdr82QCc0/edit?usp=sharing)

The app is hosted on Vercel [here](https://inventory-management-frontend-liart.vercel.app/) 👀.
The Backend Repository is [here](https://github.com/refinedblessing/inventory-management).

If you are not seeing any data on the homepage, please be patient, initial loading takes a while.

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
