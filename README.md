    TaskMaster
A dark-themed personal task manager built to practice DOM Manipulation and State Management in vanilla JavaScript.

    Features
1.Contextual Empty States: Unique messages for "All," "To Do," and "Done" categories.

2.Persistent Storage: Uses localStorage to keep your tasks safe after a page refresh.

3.Clean UI: Indigo-Slate dark theme optimized for eye comfort.

4.Interactive Flow: Tasks automatically move between categories when toggled.

    How to Run
a.Download the index.html, style.css, and script.js files into the same folder.

b.Open index.html in any modern web browser.

c.Start conquering your tasks!

    Lessons Learnt
1. State-First Rendering
Instead of manually adding or removing HTML elements whenever a button is clicked, I learned to update the State
(the JavaScript array) first, and then let a single render function handle the UI. This approach prevents the UI and data from
getting out of sync.

3. Managing Event Bubbling
I discovered that clicking a "Delete" button inside a clickable list item triggers both actions. Using e.stopPropagation()
taught me how to control the flow of events in the DOM tree so that deleting a task doesn't accidentally mark it as completed.

5. User Experience Through Context
By implementing specific messages for different empty categories (like "No Achievement Yet" for the Done tab),
I learned that small text changes can significantly improve how "alive" an app feels. It guides the user on what to do next
rather than leaving them with a blank screen.
