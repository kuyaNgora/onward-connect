/**
 * TMS Onward - Entity Type Definitions
 *
 * Type definitions for TMS domain entities based on backend Go entities.
 * Reference: backend/entity/*.go
 */

// ============================================================================
// User & Authentication
// ============================================================================

export interface User {
  id: string;
  company_id: string;
  name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  language?: string;
  role: string;
  usergroup?: UserGroup;
  is_active: boolean;
  last_login_at?: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
  is_deleted: boolean;
  company?: Company;
}

export interface UserGroup {
  id: string;
  name: string;
  permissions: string[];
}

export interface Company {
  id: string;
  name: string;
  type: CompanyType;
  timezone?: string;
  currency?: string;
  language?: string;
  logo_url?: string;
  is_active: boolean;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}

export type CompanyType = "3PL" | "Carrier";
