# Implementation Tasks: Redux Toolkit JWT SSO with Session Cookies

**Task ID:** sso-redirect-auth
**Created:** 2025-01-08
**Status:** Ready for Implementation

## Summary

| Metric | Value |
|--------|-------|
| Total Tasks | 19 |
| Estimated Effort | 96 hours (12 days) |
| Phases | 4 |

## Phase 1: Foundation

**Goal:** Create core utilities and configuration for SSO functionality

### Task 1.1: Create Cookie Utilities Module
**Description:** Implement centralized cookie operations with domain detection and JSON encoding/decoding

**Acceptance Criteria:**
- [ ] Create `src/services/auth/cookieUtils.ts` file
- [ ] Implement `getCookieDomain()` function that detects localhost vs production
- [ ] Implement `getCookieSession()` function to read and parse auth_session cookie
- [ ] Implement `setCookieSession()` function to store session as JSON
- [ ] Implement `clearSessionCookie()` function to remove auth_session
- [ ] Implement `restoreSessionFromCookie()` function for Redux state restoration
- [ ] Add TypeScript types for SessionData interface
- [ ] Add error handling for malformed cookies

**Effort:** 6 hours
**Priority:** High
**Dependencies:** None

### Task 1.2: Configure Environment Variables
**Description:** Set up environment configuration for SSO target URLs and cookie settings

**Acceptance Criteria:**
- [ ] Update `.env.example` with SSO environment variables
- [ ] Create `src/config/env.ts` module
- [ ] Define SSO_TARGETS constant with TMS and WMS URLs
- [ ] Add type definitions for SSO environment variables
- [ ] Add fallback values for missing environment variables
- [ ] Validate required environment variables on app start

**Effort:** 4 hours
**Priority:** High
**Dependencies:** Task 1.1 (for type references)

### Task 1.3: Create Type Definitions for Session Data
**Description:** Define TypeScript interfaces that match Redux auth state structure

**Acceptance Criteria:**
- [ ] Define SessionData interface matching Redux session structure
- [ ] Export all types from central location
- [ ] Add JSDoc comments for type documentation
- [ ] Validate types match current User interface
- [ ] Include company and usergroup nested types

**Effort:** 2 hours
**Priority:** High
**Dependencies:** Task 1.1

## Phase 2: Auth Integration

**Goal:** Update Redux auth slice to integrate with cookie storage

### Task 2.1: Add selectedSystem Field Back to Auth Slice
**Description:** Return selectedSystem field for redirect flow functionality

**Acceptance Criteria:**
- [ ] Add selectedSystem field to authState interface
- [ ] Add setSelectedSystem action reducer
- [ ] Update initialState to include selectedSystem: null
- [ ] Export setSelectedSystem action

**Effort:** 2 hours
**Priority:** High
**Dependencies:** None

### Task 2.2: Implement Cookie Storage on Signin
**Description:** Store session data in cookie when user authenticates

**Acceptance Criteria:**
- [ ] Modify signin reducer to store session in auth_session cookie
- [ ] Use setCookieSession utility from cookieUtils
- [ ] Ensure JSON encoding of session data
- [ ] Verify cookie domain detection works correctly
- [ ] Test with both localhost and production domains

**Effort:** 4 hours
**Priority:** High
**Dependencies:** Task 1.1, Task 2.1

### Task 2.3: Implement Cookie Storage on Session Update
**Description:** Update cookie when session data changes

**Acceptance Criteria:**
- [ ] Modify session reducer to update cookie
- [ ] Handle null session data case
- [ ] Ensure cookie is updated with same settings
- [ ] Test session persistence across actions

**Effort:** 3 hours
**Priority:** High
**Dependencies:** Task 2.2

### Task 2.4: Implement Cookie Clearing on Signout
**Description:** Remove session cookie when user logs out

**Acceptance Criteria:**
- [ ] Modify signout reducer to clear session cookie
- [ ] Use clearSessionCookie utility
- [ ] Ensure selectedSystem is also cleared
- [ ] Validate cookie is completely removed
- [ ] Test across different domains

**Effort:** 2 hours
**Priority:** High
**Dependencies:** Task 1.1, Task 2.1

## Phase 3: Page Integration

**Goal:** Integrate SSO functionality with UI components and pages

### Task 3.1: Update LoginPage to Use Environment Variables
**Description:** Replace hardcoded URLs with environment configuration

**Acceptance Criteria:**
- [ ] Import SSO_TARGETS from env config
- [ ] Update handleSystemSelect to use SSO_TARGETS
- [ ] Remove hardcoded TMS and WMS URLs
- [ ] Add error handling for missing URLs
- [ ] Test redirect functionality works correctly

**Effort:** 3 hours
**Priority:** Medium
**Dependencies:** Task 1.2

### Task 3.2: Create SessionRestorer Component
**Description:** Build component to restore session from cookie on app initialization

**Acceptance Criteria:**
- [ ] Create `src/components/SessionRestorer.tsx`
- [ ] Implement automatic session restoration on mount
- [ ] Show loading state during restoration
- [ ] Handle restoration errors gracefully
- [ ] Add fallback UI for failed restoration
- [ ] Implement retry mechanism for failed attempts

**Effort:** 6 hours
**Priority:** High
**Dependencies:** Task 1.1, Task 1.3

### Task 3.3: Integrate SessionRestorer in Connect App
**Description:** Add SessionRestorer to main App component for session auto-restore

**Acceptance Criteria:**
- [ ] Wrap App component with SessionRestorer
- [ ] Ensure restoration happens before protected routes
- [ ] Test user remains logged in after page refresh
- [ ] Verify loading state is properly shown
- [ ] Confirm proper redirect logic works

**Effort:** 2 hours
**Priority:** High
**Dependencies:** Task 3.2

### Task 3.4: Update LoginPage to Use New Auth Services
**Description:** Connect LoginPage with updated Redux auth slice and cookie operations

**Acceptance Criteria:**
- [ ] Import and use new auth slice actions
- [ ] Ensure dispatch calls use correct action types
- [ ] Verify selectedSystem is properly set
- [ ] Test complete login flow with cookie storage
- [ ] Confirm redirect works after selection

**Effort:** 4 hours
**Priority:** High
**Dependencies:** Task 2.2, Task 3.1

### Task 3.5: Integrate SessionRestorer in Target Platforms (TMS)
**Description:** Add session restoration component to TMS platform

**Acceptance Criteria:**
- [ ] Copy SessionRestorer component to TMS
- [ ] Integrate with TMS Redux store
- [ ] Test automatic login from cookie
- [ ] Verify user data is correctly populated
- [ ] Confirm API calls include Bearer token

**Effort:** 6 hours
**Priority:** Medium
**Dependencies:** Task 3.2

### Task 3.6: Integrate SessionRestorer in Target Platforms (WMS)
**Description:** Add session restoration component to WMS platform

**Acceptance Criteria:**
- [ ] Copy SessionRestorer component to WMS
- [ ] Integrate with WMS Redux store
- [ ] Test automatic login from cookie
- [ ] Verify user data is correctly populated
- [ ] Confirm API calls include Bearer token

**Effort:** 6 hours
**Priority:** Medium
**Dependencies:** Task 3.2

## Phase 4: Testing & Polish

**Goal:** Ensure robustness, handle edge cases, and optimize performance

### Task 4.1: Implement Error Handling for Cookie Operations
**Description:** Add comprehensive error handling and fallback behaviors

**Acceptance Criteria:**
- [ ] Add try-catch blocks for all cookie operations
- [ ] Handle cookie disabled browser scenario
- [ ] Show appropriate error messages to users
- [ ] Implement fallback to manual login
- [ ] Log errors appropriately for debugging

**Effort:** 4 hours
**Priority:** Medium
**Dependencies:** All previous tasks

### Task 4.2: Add Cookie Size Monitoring
**Description:** Monitor cookie size and handle large user objects

**Acceptance Criteria:**
- [ ] Implement cookie size checking before setting
- [ ] Add warning if size exceeds 3KB
- [ ] Handle cookie size limit errors gracefully
- [ ] Document expected size limits
- [ ] Consider additional data fetching if needed

**Effort:** 3 hours
**Priority**: Low
**Dependencies**: Task 1.1

### Task 4.3: Implement Session Validation on Restore
**Description:** Validate JWT and session data before restoring

**Acceptance Criteria:**
- [ ] Add JWT decoding and expiration check
- [ ] Validate required user fields exist
- [ ] Reject malformed or expired sessions
- [ ] Clear invalid cookies automatically
- [ ] Log validation failures

**Effort:** 5 hours
**Priority**: High
**Dependencies**: Task 3.2

### Task 4.4: Performance Testing and Optimization
**Description**: Ensure session restoration meets performance targets

**Acceptance Criteria:**
- [ ] Measure cookie read/write performance
- [ ] Optimize restoration to complete in <100ms
- [ ] Add lazy loading for non-critical data
- [ ] Implement performance monitoring
- [ ] Document best practices

**Effort:** 4 hours
**Priority**: Medium
**Dependencies**: All previous tasks

### Task 4.5: Add Cross-Domain Testing Documentation
**Description:** Document testing procedures for SSO functionality

**Acceptance Criteria:**
- [ ] Create testing guide for localhost development
- [ ] Document production testing scenarios
- [ ] Include troubleshooting steps
- [ ] Add cookie inspection tips
- [ ] Document expected cookie values

**Effort:** 3 hours
**Priority**: Low
**Dependencies**: All previous tasks

### Task 4.6: Update API Documentation and Code Comments
**Description**: Ensure code is well-documented for future maintenance

**Acceptance Criteria:**
- [ ] Add JSDoc comments to all public functions
- [ ] Update API documentation
- [ ] Document cookie structure
- [ ] Add usage examples
- [ ] Review code clarity

**Effort:** 3 hours
**Priority**: Low
**Dependencies**: All previous tasks

## Quick Reference Checklist

- [ ] Task 1.1: Create Cookie Utilities Module
- [ ] Task 1.2: Configure Environment Variables
- [ ] Task 1.3: Create Type Definitions for Session Data
- [ ] Task 2.1: Add selectedSystem Field Back to Auth Slice
- [ ] Task 2.2: Implement Cookie Storage on Signin
- [ ] Task 2.3: Implement Cookie Storage on Session Update
- [ ] Task 2.4: Implement Cookie Clearing on Signout
- [ ] Task 3.1: Update LoginPage to Use Environment Variables
- [ ] Task 3.2: Create SessionRestorer Component
- [ ] Task 3.3: Integrate SessionRestorer in Connect App
- [ ] Task 3.4: Update LoginPage to Use New Auth Services
- [ ] Task 3.5: Integrate SessionRestorer in Target Platforms (TMS)
- [ ] Task 3.6: Integrate SessionRestorer in Target Platforms (WMS)
- [ ] Task 4.1: Implement Error Handling for Cookie Operations
- [ ] Task 4.2: Add Cookie Size Monitoring
- [ ] Task 4.3: Implement Session Validation on Restore
- [ ] Task 4.4: Performance Testing and Optimization
- [ ] Task 4.5: Add Cross-Domain Testing Documentation
- [ ] Task 4.6: Update API Documentation and Code Comments

## Next Steps

1. Review task breakdown with development team
2. Review task breakdown with development team
3. Run `/implement sso-redirect-auth` to start execution

---

*Tasks created with SDD 4.0*