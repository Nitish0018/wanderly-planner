/**
 * Centralized error handling utilities
 * Maps database errors to safe, user-friendly messages
 */

export function getSafeErrorMessage(error: unknown, fallbackMessage = "An unexpected error occurred"): string {
  if (!error) return fallbackMessage;
  
  const errorMessage = error instanceof Error ? error.message : String(error);
  
  // Map common Supabase/database errors to safe messages
  const errorMappings: Record<string, string> = {
    // Auth errors
    "Invalid login credentials": "Invalid email or password",
    "Email not confirmed": "Please verify your email address",
    "User already registered": "An account with this email already exists",
    "Password should be at least 6 characters": "Password must be at least 6 characters",
    "Signup requires a valid password": "Please enter a valid password",
    
    // RLS/Permission errors
    "new row violates row-level security policy": "You don't have permission to perform this action",
    "violates row-level security policy": "You don't have permission to perform this action",
    
    // Constraint errors
    "duplicate key value violates unique constraint": "This item already exists",
    "violates foreign key constraint": "This action cannot be completed due to related data",
    "violates not-null constraint": "Please fill in all required fields",
    "violates check constraint": "Please check your input values",
    
    // Network errors
    "Failed to fetch": "Unable to connect. Please check your internet connection",
    "NetworkError": "Unable to connect. Please check your internet connection",
    "TypeError: Failed to fetch": "Unable to connect. Please check your internet connection",
  };
  
  // Check for matching error patterns
  for (const [pattern, safeMessage] of Object.entries(errorMappings)) {
    if (errorMessage.toLowerCase().includes(pattern.toLowerCase())) {
      return safeMessage;
    }
  }
  
  // For unrecognized errors, return a generic message
  // This prevents leaking database schema details
  return fallbackMessage;
}

export function getAuthErrorMessage(error: unknown): string {
  return getSafeErrorMessage(error, "Unable to sign in. Please try again.");
}

export function getReminderErrorMessage(error: unknown, action: "fetch" | "add" | "update" | "delete"): string {
  const actionMessages = {
    fetch: "Unable to load reminders",
    add: "Unable to save reminder",
    update: "Unable to update reminder",
    delete: "Unable to delete reminder",
  };
  return getSafeErrorMessage(error, actionMessages[action]);
}
