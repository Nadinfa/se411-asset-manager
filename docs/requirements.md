# AssetTrack — Requirements Specification

## 1. Project Scope
AssetTrack is a Part 1 SE411 React frontend application for managing one type of company asset: **computer assets**. Data is stored in memory as a JavaScript collection of objects. No database or backend is used in Part 1.

## 2. Asset Fields
Each computer asset contains seven fields:

1. Asset ID
2. Computer Name
3. Brand
4. Model
5. Status
6. Assigned To
7. Purchase Date

## 3. Functional Requirements

- **FR1 — Navigation:** The user can navigate through Home, Assets, Add Asset, and About using the menu.
- **FR2 — Display assets:** The user can view all computer assets in a table.
- **FR3 — Add asset:** The user can add a new computer asset through a form.
- **FR4 — Update asset:** The user can open an existing asset and update its information.
- **FR5 — Delete asset:** The user can delete an existing asset after a confirmation prompt.
- **FR6 — Search assets:** The user can search the list using asset ID, name, brand, model, or assignee.
- **FR7 — Filter assets:** The user can filter assets by status.
- **FR8 — Validation:** Required fields must be completed and each Asset ID must be unique.
- **FR9 — About page:** The About page displays team member names and student IDs.

## 4. CRUD User Stories

- As a user, I want to add a computer so that a newly purchased device can be registered.
- As a user, I want to view all computers so that I can see the current inventory.
- As a user, I want to edit a computer so that its status, assignment, or details stay accurate.
- As a user, I want to delete a computer so that retired or incorrect records can be removed.

## 5. Page Outline

- `/` — Home dashboard
- `/assets` — Asset list
- `/assets/add` — Add asset form
- `/assets/edit/:id` — Edit asset form
- `/about` — Team information

## 6. Non-Functional Requirements

- The interface should be simple and easy to understand.
- The layout should adapt to desktop, tablet, and smaller screens.
- Validation messages should clearly explain input problems.
- Components should be separated so that the code is easier to maintain.
- The application should be runnable using standard Vite commands.

## 7. AI Assistance
AI assistance was used to help propose requirements, CRUD user stories, page structure, visual design, React implementation, documentation, and tests. Team members should review and understand all generated material before submission and demonstration.
