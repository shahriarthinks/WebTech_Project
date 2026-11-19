# Blood Connect – Web Pages (Group 04, CSC 3215)

## How to run in VS Code
1. Unzip `blood-connect.zip`.
2. In VS Code: **File > Open Folder...** and choose the `blood-connect` folder.
3. Install the **Live Server** extension (Extensions tab, search "Live Server" by Ritwick Dey, click Install).
4. Right-click `register.html` (or `login.html`) and choose **Open with Live Server**.
   The page opens in your browser and refreshes every time you save a file.

No Live Server? Just double-click any `.html` file and it opens in the browser.

## Pages
| File | What it is |
|------|------------|
| register.html | Create new account (Figure 3) |
| login.html | Sign in (Figure 2) |
| forgot-password.html | Reset password |
| admin.html | Admin dashboard (Figure 4) |
| users.html | All users |
| blood-stock.html | Blood stock and expired units |
| requests.html | Blood requests |
| donations.html | Donation records |

## CSS files
- `register.css` – used by register, login and forgot-password pages
- `admin.css` – used by all admin pages

## How the buttons work for now
- **Create Account** goes to the login page.
- **Login** opens the admin dashboard.
- **Send Reset Link** goes back to the login page.
- **Logout** goes to the login page.

There is no back-end yet. When the PHP part is ready, change each form's
`action` (for example to `register.php`) and `method` to `post`.
