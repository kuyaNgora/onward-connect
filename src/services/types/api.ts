/**
 * TMS Onward - API Type Definitions
 *
 * Type definitions for API requests, responses, and error handling.
 */

// ============================================================================
// API Error & Response Types
// ============================================================================

export interface ApiError {
  status?: number;
  data?: {
    message?: string;
    errors?: {
      id?: string;
      [key: string]: string | string[] | unknown;
    };
    error?: string;
  };
  message?: string;
}

export interface ApiErrorResponse {
  status: number;
  data: {
    message?: string;
    errors?: Record<string, string | string[]>;
    error?: string;
  };
}

export interface ApiResponse<T = unknown> {
  success?: boolean;
  message?: string;
  data?: T;
  meta?: Record<string, unknown>;
}

export interface PaginationMeta {
  page?: number;
  limit?: number;
  total?: number;
  total_pages?: number;
  has_next?: boolean;
  has_prev?: boolean;
  [key: string]: unknown;
}

export interface PaginatedResponse<T = unknown> extends ApiResponse<T[]> {
  data: T[];
  meta: PaginationMeta;
}

export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    ("status" in error || "data" in error)
  );
}

export function isApiResponse<T>(
  response: unknown,
): response is ApiResponse<T> {
  return (
    typeof response === "object" &&
    response !== null &&
    ("success" in response || "message" in response || "data" in response)
  );
}

export function isPaginatedResponse<T>(
  response: unknown,
): response is PaginatedResponse<T> {
  return (
    isApiResponse<T[]>(response) &&
    Array.isArray(response.data) &&
    response.meta !== undefined &&
    typeof response.meta === "object" &&
    response.meta !== null
  );
}

// ============================================================================
// Waypoint History (for timeline display)
// ============================================================================

export interface WaypointHistory {
  waypoint_id: string;
  location_name: string;
  address: string;
  type: string; // pickup or delivery
  status: string;
  old_status?: string;
  notes?: string;
  changed_at: string;
}

// ============================================================================
// Waypoint Images (POD & Failed Evidence)
// ============================================================================

export interface WaypointImageInfo {
  waypoint_image_id: string;
  type: "pod" | "failed";
  note?: string;
  photos?: string[];
  signature_url?: string;
  received_by?: string; // Name of person who received the delivery
  submitted_at: string;
}
