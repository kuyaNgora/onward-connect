# Technical Plan: Redux Toolkit JWT SSO with Session Cookies

**Task ID:** sso-redirect-auth
**Status:** Ready for Implementation
**Based on:** spec.md, feature-brief.md, research.md

## 1. System Architecture

### Overview
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   connect.onward.id   │    │   tms.onward.co.id   │    │  wms.onward.co.id   │
│  (Auth Provider)  │    │   (Target App)   │    │   (Target App)   │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ • Login Form     │    │ • Cookie Reader  │    │ • Cookie Reader  │
│ • Set Cookie     │◄──►│ • Session Restore│◄──►│ • Session Restore│
│ • Redirect Flow  │    │ • API Calls      │    │ • API Calls      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
           ▲                     ▲                     ▲
           │                     │                     │
           │                     │                     │
           └─────────────────────┼─────────────────────┘
                                 │
                    ┌────────────────┴───────────────┐
                    │   auth_session Cookie           │
                    │ (domain: .onward.co.id | localhost)│
                    └─────────────────────────────────┘
```

### Architecture Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Authentication Method | Redux Toolkit with Session Cookie | Leverages existing Redux structure, maintains state consistency |
| Cookie Strategy | JavaScript-accessible session cookie | Required to store complete user object matching Redux state |
| Domain Handling | Dynamic (localhost vs .onward.co.id) | Supports both development and production without code changes |
| Session Structure | Same as Redux auth state | Ensures seamless restoration and type safety |
| State Persistence | Cookie only (no localStorage) | Prevents issues with localStorage and synchronizes across domains |

## 2. Technology Stack

| Layer | Technology | Version | Rationale |
|-------|-------------|---------|-----------|
| State Management | Redux Toolkit | ^2.2.1 | Already configured, provides typesafe state management |
| React Hooks | ReactRedux | ^9.1.0 | Provides typed hooks (useSelector, useDispatch) |
| Type Safety | TypeScript | ^5.5.3 | Ensures type consistency across platforms |
| HTTP Client | RTK Query (built-in) | Uses existing | Already integrated with automatic token handling |
| Environment Config | Vite env variables | - | Standard for Vite-based apps, supports .env files |
| Encoding | encodeURI/decodeURI | Built-in | Safe for JSON cookie content |

### Dependencies (JSON)
```json
{
  "existing": {
    "@reduxjs/toolkit": "^2.2.1",
    "react-redux": "^9.1.0",
    "typescript": "^5.5.3"
  },
  "noAdditional": [
    "All required functionality available in existing stack"
  ]
}
```

## 3. Component Design

### 3.1 Auth Slice Enhancements
**Location:** `src/services/auth/slice.tsx`
**Purpose:** Manage authentication state and cookie persistence
**Responsibilities:**
- Store/retrieve session from cookies on relevant actions
- Handle selectedSystem for redirect flow
- Clear cookies on signout
**Dependencies:** None (pure Redux)
**Interfaces:**
```typescript
interface authState {
  authenticated: boolean;
  session: {
    access_token: string;
    user: User;
  } | null;
  selectedSystem: 'tms' | 'wms' | null;
}
```

### 3.2 Cookie Utilities
**Location:** `src/services/auth/cookieUtils.ts`
**Purpose:** Centralized cookie operations with domain detection
**Responsibilities:**
- Dynamic domain detection
- Cookie reading/writing with JSON encoding
- Session restoration utilities
**Dependencies:** None
**Interfaces:**
```typescript
export const getCookieDomain = (): string
export const getCookieSession = () => SessionData | null
export const restoreSessionFromCookie = (dispatch: Dispatch) => boolean
export const clearSessionCookie = (): void
```

### 3.3 Environment Configuration
**Location:** `src/config/env.ts`
**Purpose:** Centralize environment variable access
**Responsibilities:**
- Provide typed access to SSO URLs
- Default value handling
**Dependencies:** None
**Interfaces:**
```typescript
export const SSO_TARGETS = {
  TMS: string;
  WMS: string;
}
```

### 3.4 Session Restoration Component
**Location:** `src/components/SessionRestorer.tsx`
**Purpose:** Initialize app with session from cookie
**Responsibilities:**
- Attempt session restoration on mount
- Handle restoration failures
- Show loading state during restoration
**Dependencies:** Redux, Cookie Utils
**Interfaces:**
```typescript
interface SessionRestorerProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}
```

## 4. Data Model

### Cookie Session Structure
```typescript
interface SessionData {
  access_token: string;
  user: {
    id: string;
    company_id: string;
    name: string;
    email: string;
    phone?: string;
    avatar_url?: string;
    language?: string;
    role: string;
    usergroup?: {
      id: string;
      name: string;
      permissions: string[];
    };
    is_active: boolean;
    last_login_at?: string;
    company?: {
      id: string;
      name: string;
      type: '3PL' | 'Carrier';
      timezone?: string;
      currency?: string;
      language?: string;
      logo_url?: string;
      is_active: boolean;
      onboarding_completed: boolean;
    };
  };
}
```

### Environment Variables Type
```typescript
interface SSOEnvironment {
  VITE_SSO_TARGET_URL_TMS: string;
  VITE_SSO_TARGET_URL_WMS: string;
  VITE_API_URL: string;
}
```

## 5. API Contracts

### Existing Endpoints (No Changes)
| Method | Path | Description | Current Status |
|--------|------|-------------|----------------|
| POST | /auth/login | Authenticate user | ✅ Implemented |
| POST | /auth/logout | Invalidate session | ✅ Implemented |
| POST | /auth/refresh | Refresh token | ✅ Implemented |
| GET | /me | Get user profile | ✅ Implemented |

### No New Endpoints Required
- All SSO functionality handled via cookies
- No additional API endpoints needed

## 6. Security Considerations

### Authentication & Authorization
- **JWT Validation**: Verify token exists and is not expired before session restoration
- **Cookie Security**: Use Secure flag in production, HttpOnly disabled for JS access
- **Domain Restrictions**: Only set cookies for authorized domains
- **Session Expiration**: Cookie expiry matches JWT expiry (24 hours)

### Data Protection
- **Encoding**: Use encodeURIComponent for JSON content to prevent parsing issues
- **Sanitization**: Validate cookie data on read, ignore malformed content
- **Clear on Logout**: Ensure complete cookie clearing on signout

### Security Checklist
- [ ] Secure flag set in non-localhost environments
- [ ] SameSite=Lax for CSRF protection
- [ ] Cookie size monitoring (target < 4KB)
- [ ] JWT expiration validation on restore
- [ ] Clear sensitive data from memory on logout
- [ ] Rate limiting on auth endpoints (existing)

## 7. Performance Strategy

### Optimization Targets
- **Cookie Read/Write**: Complete in < 10ms
- **Session Restoration**: Complete in < 100ms
- **Platform Redirect**: Complete in < 1 second

### Caching Strategy
- **Cookie Access**: No caching needed (fast enough)
- **User Profile**: Cache in Redux after restoration
- **Environment Variables**: Read once on app start

### Scaling Approach
- **Stateless Design**: Each platform can operate independently
- **Cookie Storage**: Standard browser limits (no server storage needed)
- **Horizontal Scaling**: No state server dependencies

## 8. Implementation Phases

### Phase 1: Foundation
- [ ] Create cookie utilities with domain detection
- [ ] Update environment variable configuration
- [ ] Implement session restore functionality

### Phase 2: Auth Integration
- [ ] Update auth slice with cookie operations
- [ ] Add selectedSystem field back
- [ ] Implement cookie storage on signin
- [ ] Implement cookie clearing on signout

### Phase 3: Page Integration
- [ ] Update LoginPage to use environment variables
- [ ] Create SessionRestorer component
- [ ] Integrate SessionRestorer in target platforms
- [ ] Test cross-domain functionality

### Phase 4: Testing & Polish
- [ ] Add error handling for cookie operations
- [ ] Implement fallback behaviors
- [ ] Performance testing and optimization
- [ ] Documentation updates

## 9. Risk Assessment

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Cookie Size Limit | High | Medium | Monitor user object size, store only essential data |
| Cookie Blocking by Browser | Medium | Low | Fallback to manual login, clear messaging to users |
| Domain Configuration Issues | High | Low | Automatic detection with localhost fallback |
| Session Tampering | High | Low | Always validate JWT on restoration |
| Performance Impact | Low | Low | Cookie operations are fast, minimal overhead |

## 10. Open Questions

- Maximum allowable cookie size (to ensure User object fits)
- Session timeout policy (should it match JWT expiry?)
- Refresh token handling (implement alongside this SSO?)
- Logging strategy for SSO events
- Migration plan for existing users

## Next Steps
1. Review plan with development team
2. Confirm environment variable names and values
3. Run `/tasks sso-redirect-auth` to generate implementation tasks
4. Run `/implement sso-redirect-auth` to start building

*Technical Plan created with SDD 4.0*