# Project Cleanup Guide

This document outlines files and folders that should be removed to clean up the project structure.

## Deprecated Folders to Remove

### 1. Legacy Frontend Application

```bash
rm -rf alert-front/
```

**Reason:** The frontend has been fully merged into the root `app/` directory. The `alert-front/front-alert/` folder is redundant.

**Files affected:**
- `alert-front/front-alert/components/`
- `alert-front/front-alert/hooks/`
- `alert-front/front-alert/lib/`
- `alert-front/front-alert/app/`
- `alert-front/front-alert/package.json` (separate package)

### 2. Legacy Dashboard

```bash
rm -rf app/dashboard/
```

**Reason:** Dashboard functionality has been moved to `app/admin/`. The `/app/dashboard/` folder is deprecated.

**Migration notes:**
- `dashboard/layout.tsx` → `admin/layout.tsx`
- `dashboard/page.tsx` → `admin/page.tsx`
- `dashboard/alerts/page.tsx` → `admin/alerts/page.tsx`
- `dashboard/settings/page.tsx` → `admin/settings/page.tsx`
- `dashboard/subscription/page.tsx` → `admin/subscription/page.tsx`

## Files to Review & Clean

### 1. Duplicate Styles

The project has multiple CSS files. Consolidate to one:

```bash
# Current:
app/globals.css
components/theme-provider.tsx
styles/globals.css (if exists)

# Keep: app/globals.css
# Remove: styles/ folder if it exists
```

### 2. Duplicate Hooks

```bash
# Current:
hooks/use-mobile.ts
hooks/use-toast.ts
components/ui/use-mobile.tsx  (duplicate)
components/ui/use-toast.ts    (duplicate)

# Action: Remove hooks/ folder and use components/ui/ versions
rm -rf hooks/
```

### 3. Unused Configuration Files

```bash
# Review and remove if not needed:
rm -f README_OLD.md        # Old documentation
rm -f INTEGRATION.md       # Replaced by INTEGRATION_GUIDE.md

# Keep: INTEGRATION_GUIDE.md, DEVELOPER_GUIDE.md (new comprehensive guides)
```

## Code Cleanup Checklist

### Remove Unused Imports

```bash
# Run ESLint with fix to remove unused imports
npm run lint -- --fix
```

### Fix Import Statements

Use absolute imports (`@/`) instead of relative imports:

```typescript
// ❌ Before
import { Button } from "../../../components/ui/button";

// ✅ After
import { Button } from "@/components/ui/button";
```

### Remove Unused Dependencies

Check `package.json` for unused packages:

```bash
# Check what packages are actually imported
grep -r "import.*from" app/ lib/ components/ --include="*.tsx" --include="*.ts"

# Remove unused packages from package.json
npm uninstall <package-name>
```

## Directory Structure After Cleanup

```
Alert/
├── app/                    # ✅ Main Next.js app
│   ├── api/               # API routes
│   ├── auth/              # Auth pages
│   ├── admin/             # Protected admin area
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   └── globals.css        # Global styles
│
├── components/            # ✅ Reusable components
│   ├── ui/               # Shadcn UI components
│   └── theme-provider.tsx # Theme configuration
│
├── lib/                   # ✅ Utilities & services
│   ├── actions/          # Server actions
│   ├── auth.ts
│   ├── db.ts
│   ├── email.ts
│   └── utils.ts
│
├── database/              # ✅ Database schema
│   └── schema.ts
│
├── public/                # ✅ Static assets
│
├── .env.local            # ✅ Environment variables (not in git)
├── .gitignore            # ✅ Updated with proper excludes
├── package.json          # ✅ Single package file
├── tsconfig.json         # ✅ TypeScript config
├── eslint.config.mjs     # ✅ Linting config
├── next.config.ts        # ✅ Next.js config
├── drizzle.config.ts     # ✅ Database config
│
└── docs/                 # ✅ Documentation
    ├── README.md         # Main README (comprehensive)
    ├── DEVELOPER_GUIDE.md # Developer setup
    ├── INTEGRATION_GUIDE.md # Integration details
    ├── API.md            # API documentation
    └── ARCHITECTURE.md   # System architecture
```

## Cleanup Script

Create and run this cleanup script:

```bash
#!/bin/bash
# cleanup.sh

echo "🧹 Starting project cleanup..."

# Remove legacy folders
echo "Removing legacy frontend folder..."
rm -rf alert-front/

echo "Removing legacy dashboard folder..."
rm -rf app/dashboard/

echo "Removing duplicate styles folder..."
rm -rf styles/

echo "Removing deprecated hooks..."
rm -rf hooks/

echo "Removing old documentation..."
rm -f README_OLD.md
rm -f INTEGRATION.md

echo "✅ Cleanup complete!"
echo ""
echo "Next steps:"
echo "1. Run: npm run lint -- --fix"
echo "2. Review and commit changes"
echo "3. Update package.json if needed"
echo "4. Run: npm install (to update lock file)"
```

Run it:
```bash
chmod +x cleanup.sh
./cleanup.sh
```

## After Cleanup

### Update Imports

If you removed the `hooks/` folder, update imports:

```bash
# Find and replace hook imports
grep -r "from '@/hooks/" app/ lib/ components/ --include="*.tsx" --include="*.ts"

# Replace with:
# from '@/components/ui/use-mobile'
# from '@/components/ui/use-toast'
```

### Update package.json

Remove unused dependencies identified:

```bash
# Check for unused packages
npm ls --unused

# Remove if safe
npm uninstall <unused-package>
```

### Verify Everything Works

```bash
# Type check
npx tsc --noEmit

# Lint
npm run lint

# Build
npm run build

# Dev server
npm run dev
```

## Git Cleanup

After making changes, clean up version control:

```bash
# Commit cleanup
git add .
git commit -m "chore: remove legacy code and consolidate structure"

# Remove old branches
git branch -d legacy-frontend
git branch -d legacy-dashboard
```

## What NOT to Delete

Make sure you keep:

- ✅ `app/` - Main application
- ✅ `components/` - Reusable components
- ✅ `lib/` - Business logic
- ✅ `database/` - Database schema
- ✅ `public/` - Static assets
- ✅ Configuration files (eslint, tsconfig, next.config, etc.)
- ✅ `middleware.ts` - Route protection
- ✅ `.env.local` - Environment variables
- ✅ Documentation files (README, DEVELOPER_GUIDE, INTEGRATION_GUIDE)

---

## Troubleshooting Cleanup

### If build fails after cleanup

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### If imports are broken

```bash
# Find broken imports
npm run lint

# Check for relative imports that should be absolute
grep -r "from '\.\." app/ lib/ components/
```

### If styles are missing

```bash
# Verify styles are imported in root layout
# app/layout.tsx should have:
import "./globals.css"
```

---

## Performance Impact

Removing legacy code:

- ✅ **Faster builds** - Less code to compile
- ✅ **Smaller bundle** - Unused code not included
- ✅ **Clearer structure** - Easier to navigate
- ✅ **Reduced confusion** - No deprecated folders
- ✅ **Easier maintenance** - Less technical debt

---

## Questions?

Refer to:
- [Project Structure](#directory-structure-after-cleanup)
- [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) - Development workflow
- [README.md](./README.md) - Project overview
