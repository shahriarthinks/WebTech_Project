# Blood Connect – My Part (Sadib, Group 04)

My part: **Registration (Create Account)**, the **5 Admin pages** and **Forgot Password** –
HTML, the CSS for these pages, and their JavaScript.

## How to run in VS Code
1. Unzip `blood-connect.zip`.
2. In VS Code: **File > Open Folder...** and choose the `blood-connect` folder.
3. Install the **Live Server** extension (Extensions tab, search "Live Server" by Ritwick Dey, click Install).
   VS Code may also offer it by itself when the folder opens – click **Install**.
4. To see my pages:
   - **Registration:** right-click `login.html` > **Open with Live Server**, then click the **Create Account** tab.
   - **Admin:** right-click `admin.html` > **Open with Live Server**
     (or sign in on `login.html` as **Administrator**).
   - **Forgot Password:** click **Forgot Password?** on the Sign In tab, or open `forgot-password.html`.

   The page opens in your browser and refreshes every time you save a file.

No Live Server? Just double-click any `.html` file and it opens in the browser,
or press **F5** in VS Code and choose **"Open Blood Connect in Chrome"**.

## My pages
| File | What it is |
|------|------------|
| login.html – **Create Account** tab | Create new account (Figure 3). The page is shared: the Sign In tab is Sadiha's part. |
| forgot-password.html | Reset password |
| admin.html | Admin dashboard (Figure 4) |
| users.html | All users – search, Suspend / Activate |
| blood-stock.html | Blood stock levels, add units, expired units |
| requests.html | Blood requests – Approve / Reject |
| donations.html | Donation records – filter by blood group |

## My JavaScript files
| File | Used by | What it does |
|------|---------|--------------|
| `register.js` | login.html (Create Account tab) | Checks role, username (5-12 characters, starts with a letter), email, password strength (8+ characters, uppercase, lowercase, digit, special character) and that both passwords match. Errors show under each box. |
| `admin.js` | all 5 admin pages | Builds the cards and tables from the data, Approve / Reject requests (approving takes units out of stock), Suspend / Activate users, search users, add units to stock, filter donations, shows today's date, asks before Logout. |
| `forgot-password.js` | forgot-password.html | Checks the email and shows "A reset link has been sent". |

`register.js` uses `showError()`, `showSuccess()`, `clearErrors()` and `showTab()` from
`login.js` (Sadiha's file), so `login.js` is loaded first in `login.html`.

## CSS
All CSS is in **one file, `style.css`** (shared by the whole group). My parts are:
- **Section 2** – Login and Registration page (`body class="login-page"`): the Create Account
  part and Forgot Password.
- **Section 3** – Admin pages (`body class="dashboard-page"`).

## How the buttons work for now
- **Create Account** checks the form, shows "Account created ... Please sign in."
  and switches to the Sign In tab with the new username filled in.
- **Login** as Administrator opens the admin dashboard
  (any username with 3+ characters and any password with 8+ characters).
- **Send Reset Link** checks the email and shows a message.
- **Approve / Reject**, **Suspend / Activate**, **Search**, **Add Units** and **Filter**
  work on the admin pages.
- **Logout** asks "Are you sure?" and goes to the login page.

There is no back-end yet. All data is kept in arrays in `admin.js`, so changes are lost
when the page is refreshed. When the PHP part is ready, the forms will send to PHP files
(for example `register.php` with `method="post"`) and the data will come from the database.
