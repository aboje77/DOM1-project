Shopping Cart Project
Overview

This project is a fully functional shopping cart where the items are already preselected. Users can interact with the cart directly from the cart screen. The cart includes dynamic functionality built with JavaScript to provide a seamless shopping experience.

Features

The following functionalities are implemented using JavaScript DOM events:

Adjust Quantity

Users can increase or decrease the quantity of each item using the + and - buttons.

The total price updates automatically based on the current quantity of each item.

Delete Items

Each item can be removed from the cart using a delete button.

Once deleted, the total price recalculates automatically.

Like Items

Users can click a heart-shaped button to "like" an item.

Clicking the heart changes its color to indicate a liked item.

Dynamic Total Price

The total price displayed at the bottom of the cart automatically updates in real-time when:

Quantities are adjusted

Items are deleted

Setup Instructions

Clone the Repository

git clone <repository-url>


Open the Project

Open index.html in your preferred web browser.

Apply the Provided CSS & HTML

Use the HTML and CSS files provided in the project for styling and layout.

JavaScript Implementation

Implement the necessary JavaScript to handle:

click events on + and - buttons

click events on delete buttons

click events on heart-shaped like buttons

Update the DOM dynamically to reflect quantity changes, deletions, likes, and total price adjustments.

Usage

Increase / Decrease Quantity: Click + to add, - to remove. Quantity will never go below 1.

Delete Item: Click the trash/delete icon to remove the item completely.

Like Item: Click the heart icon to like/unlike the item.

View Total Price: The total updates automatically whenever you make changes.

Technologies Used

HTML: Provides the structure of the cart screen.

CSS: Predefined styling for cart items, buttons, and layout.

JavaScript (DOM): Enables all interactive functionalities and dynamic updates.
