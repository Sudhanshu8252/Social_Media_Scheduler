## Key Changes

The **Edit Post** feature was carefully added by modifying and enhancing existing components. Here's how it was achieved:

### 1. **In the `PostList` Component**

#### New Prop Added: `onEdit`

-   The `PostList` component now accepts a new prop called `onEdit`.
-   This function gets triggered when a user clicks the **Edit** button on any post.

#### New Edit Button UI

-   Inside the post card, next to the Delete button, an **Edit button** was added.
-   It uses a Font Awesome edit icon and is styled with the class `edit-post-button`.

#### Event Handler Wiring

-   When the Edit button is clicked, it calls the `onEdit` function and passes the current `post` object.

    Purpose: This sends the full post data to the parent component (likely `App.jsx`) for use in the form.

---

### 2. **In the Main App Component (or Parent of PostList)**

#### State for `postBeingEdited`

-   A new state variable (e.g., `postBeingEdited`) was introduced using `useState`.
-   This holds the post object that is currently being edited.
-   If no post is selected, this remains `null`.

#### `handleEdit(post)` Function

-   A new function was created that sets `postBeingEdited` to the post passed in from `PostList`.
-   This is passed as the `onEdit` prop to the `PostList`.

#### Reusing the Same Form Component

-   The post creation form (usually `PostForm`) is updated to receive the `postBeingEdited` prop.
-   If this prop has a value, the form switches to **Edit mode** and pre-fills with the post’s data.

---

### 3. **In the Form Component (`PostForm` or Similar)**

#### Accepting an Existing Post as Prop

-   The form now receives the selected post (`postBeingEdited`) via props.
-   The input fields (title, content, image, platforms, and date) are pre-filled using this data.

#### Logic to Handle Edit vs Create

-   When the form is submitted:

    -   If `postBeingEdited` is `null`, the form behaves as a **new post creator**.
    -   If it contains data, the form instead updates the matching post in the existing list.

#### `useEffect` to Sync Form State

-   A `useEffect` hook listens for changes to the `postBeingEdited` prop.
-   Whenever this changes, it updates the internal form state accordingly.

---

### 4. **In the Post Submission Logic**

#### Post Update Logic

-   Instead of simply pushing a new post to the list:

    -   If in edit mode, the app **finds the matching post by ID** and updates its data.

-   This ensures no duplicate post is created and the original one is modified in place.

#### Form Reset After Edit

-   After a successful edit, the `postBeingEdited` state is reset to `null`.
-   This clears the form for fresh use.
