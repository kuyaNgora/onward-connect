# SessionRestorer Integration Guide

This guide explains how to integrate the `SessionRestorer` component into TMS and WMS platforms to enable SSO functionality.

## Files to Copy

Copy the following files from the Connect platform to the target platforms:

### 1. Core Components
```
src/
├── components/
│   ├── SessionRestorer.tsx
│   └── ProtectedRoute.tsx
├── services/auth/
│   ├── cookieUtils.ts
│   ├── types.ts
│   └── slice.tsx (modified version)
├── config/
│   └── env.ts
└── hooks/
    ├── useAuth.ts (if exists)
    └── redux.ts (or equivalent)
```

### 2. Redux Store Integration

Update the Redux store configuration to include the auth slice:

```typescript
// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../services/auth/slice';

export const store = configureStore({
  reducer: {
    // ... existing reducers
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

## Integration Steps

### For TMS Platform

1. **Update Environment Variables** (.env file):
```env
VITE_SSO_TARGET_URL_CONNECT=http://localhost:3000
VITE_SSO_TARGET_URL_WMS=http://localhost:3002
```

2. **Modify App.tsx**:
```typescript
import SessionRestorer from './components/SessionRestorer';

function App() {
  return (
    <SessionRestorer>
      {/* Your existing App content */}
    </SessionRestorer>
  );
}
```

3. **Update Login Redirect Logic**:
- Modify any existing login logic to check for existing session
- If session exists, skip login and redirect directly to dashboard
- Add logout functionality that clears the session

### For WMS Platform

1. **Update Environment Variables** (.env file):
```env
VITE_SSO_TARGET_URL_CONNECT=http://localhost:3000
VITE_SSO_TARGET_URL_TMS=http://localhost:3001
```

2. **Follow same integration steps as TMS**

## Important Considerations

1. **Cookie Domain**: Ensure all platforms use the same cookie domain (.onward.co.id in production, localhost in development)

2. **API Endpoint**: The auth API endpoint should point to the same authentication service across all platforms

3. **Session Validation**: Each platform should validate the JWT token on API requests

4. **Logout**: When user logs out from any platform, clear the session cookie to logout from all platforms

## Example Protected Route Usage

```typescript
import ProtectedRoute from './components/ProtectedRoute';

function Dashboard() {
  return (
    <ProtectedRoute>
      <div>Your dashboard content</div>
    </ProtectedRoute>
  );
}
```

## Testing

1. Test login flow from Connect → TMS
2. Test login flow from Connect → WMS
3. Test that user remains logged in after page refresh
4. Test logout functionality
5. Test session expiration handling