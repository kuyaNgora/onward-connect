# Specification: Redux Toolkit JWT SSO with Session Cookies

**Task ID:** sso-redirect-auth
**Created:** 2025-01-08
**Status:** Ready for Planning
**Version:** 1.0

## 1. Problem Statement

- **The Problem:** Users currently need to log in separately to each Onward platform (connect.onward.id, TMS, and WMS), creating a fragmented user experience
- **Current Situation:** Each platform maintains its own authentication state, requiring users to remember multiple credentials and log in multiple times
- **Desired Outcome:** Single Sign-On (SSO) where users authenticate once at connect.onward.id and automatically gain access to TMS and WMS with their complete user profile

## 2. User Personas

### Primary User: Logistics Operations Staff
- **Who:** Operators, dispatchers, and warehouse managers who use both TMS and WMS daily
- **Goals:**
  - Quick access to all systems after one login
  - Seamless switching between platforms
  - No need to remember separate credentials
- **Pain points:**
  - Multiple login prompts slow down workflow
  - Remembering different passwords for each system
  - Time wasted logging in repeatedly throughout the day

### Secondary User: System Administrators
- **Who:** IT staff managing user access across platforms
- **Goals:**
  - Centralized authentication management
  - Easy user onboarding/offboarding
  - Consistent security policies
- **Pain points:**
  - Managing separate user accounts per system
  - Ensuring security compliance across platforms

## 3. Functional Requirements

### FR-1: Centralized Authentication with Session Persistence
**Description:** Authenticate users once at connect.onward.id and persist session data for use by target platforms

**User Story:**
> As a logistics operator, I want to log in once at connect.onward.id and automatically be logged in to both TMS and WMS so that I can work efficiently without repeated credentials.

**Acceptance Criteria:**
- [ ] Given a user successfully authenticates at connect.onward.id, when they select TMS or WMS, then their session is automatically available
- [ ] Given session expires, when user tries to access TMS/WMS, then they are redirected to login
- [ ] Given user logs out from connect.onward.id, when they access TMS/WMS, then their session is terminated
- [ ] Given user updates profile, when switching between platforms, then updated profile is reflected

**Priority:** Must Have

### FR-2: Cross-Domain Session Sharing via Cookies
**Description:** Store complete session data in cookies accessible across all Onward domains

**User Story:**
> As a system administrator, I want session data to be securely shared across domains so that users have consistent authentication across all platforms.

**Acceptance Criteria:**
- [ ] Given user authenticates, when session is created, then auth_session cookie contains complete session data
- [ ] Given cookie is set, when accessing different subdomain, then cookie is readable
- [ ] Given localhost development, when setting cookie, then domain is 'localhost'
- [ ] Given production environment, when setting cookie, then domain is '.onward.co.id'
- [ ] Given cookie contains session, when parsing, then structure matches Redux auth state exactly

**Priority:** Must Have

### FR-3: Dynamic Platform Selection and Redirect
**Description:** Allow users to select their desired platform and redirect with authentication context

**User Story:**
> As an operator, I want to see all available platforms after login and select where to go so that I can quickly access the system I need.

**Acceptance Criteria:**
- [ ] Given successful authentication, when on selection screen, then TMS and WMS options are displayed
- [ ] Given user selects TMS, when clicking, then they are redirected to the TMS URL with authentication preserved
- [ ] Given user selects WMS, when clicking, then they are redirected to the WMS URL with authentication preserved
- [ ] Given environment variable changes, when redirecting, then correct environment URLs are used
- [ ] Given redirect fails, when error occurs, then user remains on selection screen with error message

**Priority:** Must Have

### FR-4: Session Restoration on Target Platforms
**Description:** Target platforms must detect and restore session from cookie on initial load

**User Story:**
> As a user, I want to be automatically logged in when I visit TMS or WMS after authenticating at connect.onward.id so that I don't need to log in again.

**Acceptance Criteria:**
- [ ] Given auth_session cookie exists, when loading TMS/WMS, then session is automatically restored to Redux state
- [ ] Given no cookie exists, when loading TMS/WMS, then user is redirected to connect.onward.id
- [ ] Given malformed cookie, when parsing at TMS/WMS, then cookie is ignored and user is redirected to login
- [ ] Given session restored, when making API calls, then Bearer token is automatically included
- [ ] Given 401 error occurs, when API call fails, then user is redirected to login

**Priority:** Must Have

## 4. Non-Functional Requirements

### Performance
- Authentication state restoration must complete within 100ms
- Cookie operations must not block UI rendering
- Platform redirects should complete within 1 second
- Session expiry check must be efficient and not cause lag

### Security
- Session cookies must use Secure flag in production
- Cookies must have SameSite=Lax for CSRF protection
- JWT tokens must be validated before session restoration
- Session data must be URL-encoded to prevent parsing issues
- Cookie expiration must match JWT expiration

### Reliability
- Session persistence must have 99.9% success rate
- Fallback to manual login if cookie restoration fails
- Graceful degradation when cookies are disabled
- Automatic retry mechanism for failed redirects

### Maintainability
- Cookie handling logic must be centralized in utils
- Environment variables must be documented
- Clear separation between auth and platform logic
- TypeScript types must enforce session structure

## 5. Out of Scope

- ❌ OAuth2/OIDC implementation with third-party providers - Current use case is internal SSO only
- ❌ Multi-factor authentication - Can be added later but not in this phase
- ❌ Social media login integration - Not required for enterprise use case
- ❌ Session analytics/metrics tracking - Focus on functionality first
- ❌ Password management (forgot password, change password) - Already implemented elsewhere

## 6. Edge Cases & Error Handling

| Scenario | Expected Behavior |
|----------|-------------------|
| Cookie disabled in browser | Show message to enable cookies for full functionality |
| Cookie exceeds size limit | Store only essential data, fetch full profile via API |
| Domain mismatch in development | Automatically detect and use localhost |
| Session cookie tampered with | Clear cookie and redirect to login |
| Target platform offline | Show error message, allow user to try other platform |
| Multiple windows open to different platforms | Session synchronization across windows |
| User closes browser without logout | Cookie persists for configured duration |
| Production URL unreachable | Clear error with retry option |

| Error | User Message | System Action |
|-------|--------------|---------------|
| Invalid JWT in cookie | "Your session has expired. Please log in again." | Clear cookie, redirect to login |
| Missing environment variables | "Configuration error. Please contact administrator." | Log error, show maintenance page |
| Cross-origin cookie blocked | "SSO requires third-party cookies to be enabled." | Show enable instructions |
| Session parse error | "Authentication error occurred. Please log in again." | Clear cookie, redirect to login |
| Network error during redirect | "Unable to connect to the selected platform." | Stay on selection page, show retry |

## 7. Success Metrics

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Login to First Platform Access | < 1 second | Measure time from login to platform load |
| Switch Platform Time | < 2 seconds | Measure time between platform switches |
| SSO Success Rate | 99% | Track successful automatic logins |
| Session Restoration Time | < 100ms | Performance measurement in target platforms |
| User Satisfaction | 4.5/5 stars | User feedback surveys after implementation |

## 8. Open Questions

- [ ] What is the target JWT expiration time for the cookie?
- [ ] Should cookies be HttpOnly or accessible via JavaScript (required for session structure)?
- [ ] Is there a maximum cookie size we need to be aware of for the full user object?
- [ ] Do we need to implement refresh token rotation alongside this SSO?
- [ ] Are there specific compliance requirements for data storage in cookies?

## 9. Revision History
| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-01-08 | Initial specification |

## Next Steps
1. Review spec with development team
2. Confirm environment variable requirements
3. Resolve open questions about security policies
4. Run `/plan sso-redirect-auth` to create technical plan

*Specification created with SDD 4.0*