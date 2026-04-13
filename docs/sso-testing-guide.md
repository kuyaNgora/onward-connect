# SSO Testing Guide

This guide provides testing scenarios and troubleshooting steps for the SSO implementation.

## Testing Scenarios

### 1. Basic Login Flow (Localhost)
1. Navigate to `http://localhost:5173/login` (Connect)
2. Enter valid credentials
3. Verify successful login shows system selection
4. Select TMS or WMS system
5. Verify redirect to target app:
   - TMS: `http://localhost:5175/login` → should auto-login
   - WMS: `http://localhost:5174/login` → should auto-login
6. Check that auth_session cookie is set with domain `localhost`

### 2. Session Persistence
1. Complete login flow (step 1 above)
2. Keep the browser tab open
3. Refresh the page (F5)
4. Verify user remains logged in
5. Check that loading state is shown during restoration

### 3. Cross-Domain Testing (Production)
1. Deploy to production environment
2. Login at `https://connect.onward.co.id`
3. Select TMS system → redirects to `https://tms.onward.co.id/login` (auto-login)
4. Select WMS system → redirects to `https://wms.onward.co.id/login` (auto-login)
5. Check that auth_session cookie is set with domain `.onward.co.id`
6. Open the other app in new tab → verify user is already logged in

### 3.1 Local Port Testing (Current Dev Setup)
| App | URL | Port |
|-----|-----|------|
| Connect | http://localhost:5173 | 5173 |
| WMS | http://localhost:5174 | 5174 |
| TMS | http://localhost:5175 | 5175 |

**Testing flow:**
1. Login at Connect (localhost:5173)
2. Select TMS → redirects to localhost:5175 with auto-login
3. Or select WMS → redirects to localhost:5174 with auto-login
4. Cookie is shared because domain is `localhost` (same across all ports)

### 4. Session Expiration
1. Manually set an expired JWT token in cookie
2. Refresh the page
3. Verify session is cleared
4. Verify user is redirected to login page

### 5. Error Scenarios

#### 5.1 Cookies Disabled
1. Disable cookies in browser settings
2. Attempt to login
3. Verify error message: "Cookies are required for authentication"

#### 5.2 Invalid Session Cookie
1. Set malformed JSON in auth_session cookie
2. Refresh page
3. Verify cookie is cleared
4. Verify user sees login page

#### 5.3 Large Session Data
1. Monitor cookie size during testing
2. Warning logged if >3KB
3. Error shown if >4KB

## Cookie Inspection

### Chrome DevTools
1. Open DevTools (F12)
2. Go to Application tab
3. Storage → Cookies → Select domain
4. Look for `auth_session` cookie

### Expected Cookie Values
- **Name**: auth_session
- **Domain**: localhost (dev) or .onward.co.id (prod)
- **Path**: /
- **Max-Age**: 86400 (24 hours)
- **SameSite**: Lax
- **Secure**: Yes (production only)

## Troubleshooting

### Session Not Persisting
1. Check if cookies are enabled
2. Verify cookie domain settings
3. Check for `localhost` vs `127.0.0.1` mismatch
4. Verify browser isn't blocking third-party cookies

### Cross-Domain Issues
1. Ensure all sites use HTTPS (production)
2. Verify cookie domain is `.onward.co.id`
3. Check SameSite policy is set to Lax
4. Ensure API endpoints are on same domain or have CORS

### Performance Issues
1. Monitor session restoration time (<100ms target)
2. Check for large session data (>3KB warning)
3. Verify component lazy loading is working

### Debug Tips
1. Enable console logging for auth operations
2. Use Redux DevTools to track state changes
3. Monitor Network tab for API calls
4. Check localStorage for fallback data

## Automated Testing

### Unit Tests
```javascript
// Test cookie utilities
import { getCookieSession, setCookieSession, validateSession } from '@/services/auth/cookieUtils';

describe('Cookie Utils', () => {
  test('should store and retrieve session data', () => {
    const mockSession = { access_token: 'token123', user: { id: 1, email: 'test@example.com' } };
    setCookieSession(mockSession);
    const retrieved = getCookieSession();
    expect(retrieved).toEqual(mockSession);
  });

  test('should validate session structure', () => {
    // Test valid session
    expect(validateSession({ access_token: 'token', user: { id: 1, email: 'test' } }).isValid).toBe(true);

    // Test invalid session
    expect(validateSession({ user: { id: 1 } }).isValid).toBe(false);
  });
});
```

### E2E Tests (Cypress example)
```javascript
describe('SSO Flow', () => {
  it('should login and redirect to TMS', () => {
    cy.visit('/login');
    cy.get('[data-testid="email"]').type('test@example.com');
    cy.get('[data-testid="password"]').type('password123');
    cy.get('[data-testid="login-button"]').click();

    // Should see system selection
    cy.get('[data-testid="system-tms"]').click();

    // Should redirect to TMS
    cy.url().should('include', 'tms.onward.co.id');
  });

  it('should persist session across refresh', () => {
    // Login first
    cy.login();

    // Refresh
    cy.reload();

    // Should still be logged in
    cy.get('[data-testid="user-menu"]').should('be.visible');
  });
});
```

## Performance Monitoring

### Key Metrics
- Session restoration time: < 100ms
- Cookie read/write time: < 10ms
- Login to redirect time: < 2s
- Page load with session restoration: < 500ms

### Monitoring Code
```javascript
// Add performance monitoring
console.time('session-restore');
const session = restoreSessionFromCookie();
console.timeEnd('session-restore');

// Log cookie size
const size = checkSessionSize(session);
console.log(`Session size: ${size.sizeKB}KB`);
```