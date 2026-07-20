# Playwright Collaboration Guidelines

## Repository Structure

Each collaborator should maintain their work in a separate branch and organize assignments as shown below.

### 1. Create a Separate Branch

Create a dedicated branch using the following naming convention:

```text
<employee>_branch
```

**Example:**

```text
srujan_branch
```

---

### 2. Create an Employee Folder

Inside your branch, create a folder with the following naming convention:

```text
<employee>_playwright
```

**Example:**

```text
srujan_playwright
```

---

### 3. Organize Assignments by Day

Inside your employee folder, create a folder for each day's assignments.

**Example Directory Structure:**

```text
main
│
└── srujan_branch
    │
    └── srujan_playwright
        │
        └── Day1
            ├── first_assignment.js
            ├── second_assignment.js
            └── notes.md
```

As you progress, continue adding folders such as:

```text
Day2
Day3
Day4
...
```

Place all files related to that day's tasks inside the corresponding folder.

---

### 4. Write Meaningful Commit Messages

Use clear and descriptive commit messages that explain the changes you made.

**Good Examples**

```bash
git commit -m "Add Day1 JavaScript assignment"
git commit -m "Implement array practice programs for Day2"
git commit -m "Fix login page locator in Playwright"
git commit -m "Complete Day5 async/await exercises"
```

**Avoid**

```bash
git commit -m "update"
git commit -m "changes"
git commit -m "test"
git commit -m "abc"
```

---

## Summary

- Create a separate branch for each collaborator (`<employee>_branch`).
- Create an employee folder (`<employee>_playwright`).
- Organize assignments inside `Day1`, `Day2`, `Day3`, etc.
- Write meaningful and descriptive commit messages.
