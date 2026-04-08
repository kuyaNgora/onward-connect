# Research: Redux Toolkit JWT Authentication with Cross-Platform SSO Redirect

**Task ID:** sso-redirect-auth
**Date:** 2025-01-08
**Status:** Complete
**Last Updated:** 2025-01-08 - Added analysis of new Redux configuration

---

## Executive Summary

Based on the codebase analysis, the project has a solid foundation for SSO implementation with Redux Toolkit already configured and a cross-domain cookie strategy partially implemented. The current implementation uses JWT tokens stored in cookies that can be shared across subdomains, but has some domain configuration issues that need to be addressed.

The main challenge is implementing proper SSO flow where users authenticate at `connect.onward.id` and gain automatic access to `tms.onward.co.id` and `wms.onward.co.id`. The recommended approach is to implement an OAuth2 Authorization Code Flow with PKCE for security, while using JWT tokens with proper cross-domain cookie configuration for SSO.

---

## Codebase Analysis

### Existing Patterns

#### Redux Store Configuration
**Location:** `src/services/store.tsx`
- Uses Redux Toolkit with `configureStore`
- Includes RTK Query APIs
- Redux Persist configured for state persistence
- Properly typed with TypeScript

#### Enhanced Auth Slice Implementation
**Location:** `src/services/auth/slice.tsx`

**Updated State Structure:**
```typescript
interface authState {
  authenticated: boolean;
  session: {
    access_token: string;
    user: User; // Complete user object with full details
  } | null;
  selectedSystem: 'tms' | 'wms' | null; // Will be added
}
```

**User Type (from src/services/types.ts):**
```typescript
interface User {
  id: string;
  company_id: string;
  name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  language?: string;
  role: string;
  usergroup?: UserGroup; // includes permissions[]
  is_active: boolean;
  last_login_at?: string;
  company?: Company;
  // ... timestamps and other fields
}
```

#### RTK Query API Configuration
**Location:** `src/services/auth/api.tsx`
- Login, register, logout, token refresh endpoints
- Uses baseQuery with automatic token injection
- Error handling for 401/403 responses

#### Complete Login Flow
**Location:** `src/pages/auth/LoginPage.tsx`
Two-step authentication flow maintained:
1. **Login Form**: Email/password authentication using authApi
2. **System Selection**: TMS or WMS selection UI with redirect

**Current State Management:**
- Uses new authService hooks (`useAuth`)
- RTK Query for API calls
- Redux persist for session persistence

### Reusable Components
- Redux hooks: `useAppDispatch`, `useAppSelector`
- Auth components: LoginPage with two-step flow
- UI patterns: Loading states, form validation, animations

### Conventions to Follow
- Redux Toolkit with createSlice for state management
- TypeScript for type safety
- Tailwind CSS for styling
- Component-based architecture
- Environment-specific configurations

### Issues Identified
1. **Missing Cookie Storage in New Auth Services**:
   - New auth slice doesn't include cookie storage logic
   - Need to add session storage in auth_session cookie
   - Need to restore session from cookie on page load

2. **Missing selectedSystem Field**:
   - New auth slice removed selectedSystem but it's needed for redirect flow
   - LoginPage.tsx references old Redux structure

3. **Environment Variables Configuration**:
   - Currently hardcoded URLs in LoginPage.tsx
   - Need VITE_SSO_TARGET_URL_TMS and VITE_SSO_TARGET_URL_WMS
   - Need dynamic cookie domain detection (localhost vs .onward.co.id)

4. **Session Restoration on Target Platforms**:
   - No utility for reading session from cookie on TMS/WMS
   - Need to implement session restore from cookie

---

## External Solutions

### Option 1: OAuth2 Authorization Code Flow with PKCE
**Overview**: Industry standard for secure authentication between domains

**Pros**:
- Highest security level with PKCE
- No token exposure in browser URL
- Supports refresh tokens
- Widely adopted standard
- Prevents authorization code interception

**Cons**:
- More complex implementation
- Requires backend changes for PKCE verifier
- Additional round trips for token exchange

**Implementation complexity**: High
**Team familiarity**: Low

**Fit for our use case**: High - Provides secure SSO across domains

### Option 2: JWT with Cross-Domain Cookies via Shared Parent Domain
**Overview**: Store JWT in cookies accessible by all subdomains under `.onward.co.id`

**Pros**:
- Simpler to implement
- Automatic token sharing
- No additional auth flows needed
- Better UX with instant redirects

**Cons**:
- Requires domain restructuring
- CSRF vulnerability risks
- Limited to same parent domain
- Cannot work across different TLDs

**Implementation complexity**: Medium
**Team familiarity**: Medium

**Fit for our use case**: Medium - Requires significant domain changes

### Option 3: Centralized Auth with Token Exchange
**Overview**: Keep auth at `connect.onward.id`, implement token endpoint for SSO

**Pros**:
- Maintains current domain structure
- Secure token exchange
- Flexible implementation
- Works across any domains

**Cons**:
- Still requires API implementation
- Network requests for SSO
- Slightly slower UX

**Implementation complexity**: High
**Team familiarity**: Low

**Fit for our use case**: High - Works with existing domain structure

### Option 4: Third-Party SSO Solution
**Overview**: Use services like Auth0, Firebase Auth, Okta

**Pros**:
- Battle-tested security
- Reduced development time
- Built-in SSO features
- Compliance ready

**Cons**:
- Additional cost
- Vendor lock-in
- Less control
- Data privacy considerations

**Implementation complexity**: Low
**Team familiarity**: Medium (depending on provider)

**Fit for our use case**: Medium - Quick solution but at cost

---

## Comparison Matrix

| Criteria | Option 1 (OAuth2 + PKCE) | Option 2 (Shared Cookies) | Option 3 (Token Exchange) | Option 4 (Third-Party) |
|----------|-------------------------|----------------------------|----------------------------|------------------------|
| Security | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Complexity | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐ |
| Implementation Time | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| Maintenance | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| UX Speed | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| Flexibility | ⭐⭐⭐⭐ | ⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

---

## Recommendations

### Primary Recommendation: Session Cookie with Dynamic Domain

Based on the new Redux configuration and existing login flow, I recommend:

1. **Store complete session in cookie matching Redux state structure**
   - Cookie name: `auth_session`
   - Content: JSON matching session structure (access_token + full user object)
   - Domain: Dynamic detection - `localhost` for dev, `.onward.co.id` for prod

2. **Update auth slice to include cookie operations**
   - Add cookie storage on signin
   - Add cookie clearing on signout
   - Return selectedSystem field for redirect flow

3. **Use environment variables for target URLs**
   - VITE_SSO_TARGET_URL_TMS
   - VITE_SSO_TARGET_URL_WMS
   - Dynamic selection based on environment

4. **Implement session restoration utility**
   - Function to read auth_session cookie
   - Function to restore Redux state from cookie
   - Use on app initialization in target platforms

**Rationale**:
- Cookie structure matches Redux state exactly
- No need to pass data in redirect URL
- Target platforms get complete user data immediately
- Works with existing two-step login flow

---

## Technical Implementation Details

### Recommended Implementation Steps

1. **Update Auth Slice**
   - Add selectedSystem field back
   - Implement cookie storage on signin/session actions
   - Implement cookie clearing on signout
   - Use URL encoding for JSON session data

2. **Create Cookie Utilities**
   - getCookieSession() - Read and parse auth_session cookie
   - restoreSessionFromCookie() - Restore Redux state from cookie
   - getCookieDomain() - Dynamic domain detection

3. **Configure Environment Variables**
   - Add to .env.example: VITE_SSO_TARGET_URL_TMS, VITE_SSO_TARGET_URL_WMS
   - Update LoginPage to use env vars instead of hardcoded URLs

4. **Update LoginPage Integration**
   - Import and use new auth services
   - Update handleSystemSelect to use environment variables
   - Remove hardcoded redirect URLs

5. **Implement Session Restoration**
   - Add initialization in App.tsx or store setup
   - Support automatic login from cookie on target platforms

### Cookie Structure
```typescript
// auth_session cookie content
{
  "access_token": "jwt-token",
  "user": {
    "id": "string",
    "company_id": "string",
    "name": "string",
    "email": "string",
    "phone": "string?",
    "avatar_url": "string?",
    "language": "string?",
    "role": "string",
    "usergroup": UserGroup?,
    "is_active": boolean,
    "company": Company?
  }
}
```

---

## Open Questions

- What are the specific target URLs for development vs production?
- Should the cookie be HttpOnly or accessible via JavaScript (current plan uses JS)?
- Do we need to implement refresh token logic alongside this cookie approach?
- Are there any specific security policies we need to comply with?
- Should we implement session timeout handling on target platforms?

---

## Next Steps

1. Discuss recommendations with stakeholders
2. Decide on approach (token exchange vs domain restructuring)
3. Proceed to `/specify` to define requirements
4. Address domain configuration issue before implementation

---

*Research completed with SDD 2.0*