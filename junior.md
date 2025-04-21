# Directory Structure: cdpApp-Frontend

## Statistics

- Total directories: 49
- Total files: 138

### File Extensions

- .tsx: 58 files
- .ttf: 18 files
- .ts: 12 files
- .png: 12 files
- .svg: 5 files
- .json: 3 files
- .mjs: 2 files
- .sh: 1 files
- .sqlite: 1 files
- .ico: 1 files
- .css: 1 files
- .txt: 1 files
- .md: 1 files

## Directory Structure

```
└── cdpApp-Frontend/
    ├── .husky/
    │   ├── _/
    │   │   ├── .gitignore
    │   │   ├── applypatch-msg
    │   │   ├── commit-msg
    │   │   ├── h
    │   │   ├── husky.sh
    │   │   ├── post-applypatch
    │   │   ├── post-checkout
    │   │   ├── post-commit
    │   │   ├── post-merge
    │   │   ├── post-rewrite
    │   │   ├── pre-applypatch
    │   │   ├── pre-auto-gc
    │   │   ├── pre-commit
    │   │   ├── pre-merge-commit
    │   │   ├── pre-push
    │   │   ├── pre-rebase
    │   │   └── prepare-commit-msg
    │   └── pre-commit
    ├── .qodo/
    │   └── history.sqlite
    ├── app/
    │   ├── api/
    │   │   └── proxy/
    │   │       ├── login/
    │   │       │   └── route.ts
    │   │       └── register/
    │   │           └── route.ts
    │   ├── api-test/
    │   │   └── page.tsx
    │   ├── api-test-advanced/
    │   │   └── page.tsx
    │   ├── api-test-server/
    │   │   └── page.tsx
    │   ├── Components/
    │   │   ├── Modals/
    │   │   │   └── EditAboutModal.tsx
    │   │   ├── ui/
    │   │   │   ├── button.tsx
    │   │   │   ├── card.tsx
    │   │   │   └── dropdown-menu.tsx
    │   │   ├── Footer1.tsx
    │   │   ├── Header1.tsx
    │   │   ├── Logo.tsx
    │   │   ├── Logo2.tsx
    │   │   ├── Logo3.tsx
    │   │   ├── Navbar.tsx
    │   │   ├── ResumeUpload2.tsx
    │   │   └── ResumeUpload3.tsx
    │   ├── Dashboard/
    │   │   ├── StudentInternships/
    │   │   │   └── page.tsx
    │   │   └── page.tsx
    │   ├── StudentProfile/
    │   │   ├── SetUpStudentProfile/
    │   │   │   ├── ResumeUpload/
    │   │   │   │   └── page.tsx
    │   │   │   ├── form.tsx
    │   │   │   ├── page.tsx
    │   │   │   └── SelectDropdown.tsx
    │   │   └── page.tsx
    │   ├── swagger-viewer/
    │   │   └── page.tsx
    │   ├── UsersAuthentication/
    │   │   ├── CompanyAuth/
    │   │   │   ├── CompanyLogin/
    │   │   │   │   ├── form.tsx
    │   │   │   │   └── page.tsx
    │   │   │   └── CompanySignUp/
    │   │   │       ├── form.tsx
    │   │   │       └── page.tsx
    │   │   ├── Components/
    │   │   │   ├── Button1.tsx
    │   │   │   ├── Button2.tsx
    │   │   │   ├── Button3.tsx
    │   │   │   ├── Button4.tsx
    │   │   │   ├── Button5.tsx
    │   │   │   ├── Button6.tsx
    │   │   │   ├── Button7.tsx
    │   │   │   ├── Label.tsx
    │   │   │   ├── Label2.tsx
    │   │   │   └── Label3.tsx
    │   │   └── StudentAuth/
    │   │       ├── BestDescribesPage/
    │   │       │   └── page.tsx
    │   │       ├── StudentAuthPage/
    │   │       │   ├── StudentLogin/
    │   │       │   │   ├── ForgotPassword/
    │   │       │   │   │   ├── NewPassword/
    │   │       │   │   │   │   ├── NewPasswordCreated/
    │   │       │   │   │   │   │   └── page.tsx
    │   │       │   │   │   │   ├── form.tsx
    │   │       │   │   │   │   └── page.tsx
    │   │       │   │   │   ├── form.tsx
    │   │       │   │   │   └── page.tsx
    │   │       │   │   ├── OTP/
    │   │       │   │   │   ├── SuccessfulVerification/
    │   │       │   │   │   │   └── page.tsx
    │   │       │   │   │   ├── UnsuccessfulVerfication/
    │   │       │   │   │   │   └── page.tsx
    │   │       │   │   │   └── page.tsx
    │   │       │   │   ├── form.tsx
    │   │       │   │   └── page.tsx
    │   │       │   ├── StudentRegister/
    │   │       │   │   ├── SuccessfulRegistration/
    │   │       │   │   │   └── page.tsx
    │   │       │   │   ├── form.tsx
    │   │       │   │   └── page.tsx
    │   │       │   └── page.tsx
    │   │       └── StudentAuthToggle/
    │   │           └── page.tsx
    │   ├── ViewStudentProfile/
    │   │   └── page.tsx
    │   ├── _app.tsx
    │   ├── favicon.ico
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    ├── contexts/
    │   └── AuthContext.tsx
    ├── lib/
    │   ├── services/
    │   │   ├── applicationService.ts
    │   │   ├── internshipService.ts
    │   │   ├── jobService.ts
    │   │   └── userService.ts
    │   ├── api-fetch.ts
    │   ├── api.ts
    │   └── utils.ts
    ├── man/
    ├── public/
    │   ├── Fonts/
    │   │   └── Poppins/
    │   │       ├── OFL.txt
    │   │       ├── Poppins-Black.ttf
    │   │       ├── Poppins-BlackItalic.ttf
    │   │       ├── Poppins-Bold.ttf
    │   │       ├── Poppins-BoldItalic.ttf
    │   │       ├── Poppins-ExtraBold.ttf
    │   │       ├── Poppins-ExtraBoldItalic.ttf
    │   │       ├── Poppins-ExtraLight.ttf
    │   │       ├── Poppins-ExtraLightItalic.ttf
    │   │       ├── Poppins-Italic.ttf
    │   │       ├── Poppins-Light.ttf
    │   │       ├── Poppins-LightItalic.ttf
    │   │       ├── Poppins-Medium.ttf
    │   │       ├── Poppins-MediumItalic.ttf
    │   │       ├── Poppins-Regular.ttf
    │   │       ├── Poppins-SemiBold.ttf
    │   │       ├── Poppins-SemiBoldItalic.ttf
    │   │       ├── Poppins-Thin.ttf
    │   │       └── Poppins-ThinItalic.ttf
    │   ├── Images/
    │   │   ├── Icons/
    │   │   │   ├── appleIcon.png
    │   │   │   ├── emailIcon.png
    │   │   │   ├── googleIcon.png
    │   │   │   ├── passwordIcon.png
    │   │   │   └── phoneIcon.png
    │   │   ├── googleLogo.png
    │   │   ├── Logo1.png
    │   │   ├── Logo2.png
    │   │   ├── Logo3.png
    │   │   ├── OnboardingBG.png
    │   │   ├── Portfolio.png
    │   │   └── StudentOnbording1.png
    │   ├── file.svg
    │   ├── globe.svg
    │   ├── next.svg
    │   ├── vercel.svg
    │   └── window.svg
    ├── .gitignore
    ├── .prettierrc
    ├── directory
    ├── eslint.config.mjs
    ├── LICENSE
    ├── next-env.d.ts
    ├── next.config.ts
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.mjs
    ├── README.md
    ├── structure
    ├── tailwind.config.ts
    └── tsconfig.json
```

