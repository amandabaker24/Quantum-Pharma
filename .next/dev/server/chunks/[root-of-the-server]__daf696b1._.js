module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/quantumpharm/app/api/v1/users/me/profile/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "PATCH",
    ()=>PATCH
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quantumpharm/node_modules/next/server.js [app-route] (ecmascript)");
;
/**
 * API Contract for User Profile Updates
 * 
 * There are two API endpoints, GET and PATCH
 * Please note that none of these APIs require authentication, 
 * but would need to be added in production for security. 
 * 
 * GET /api/v1/users/me/profile
 * - Returns current user profile
 * 
 * PATCH /api/v1/users/me/profile
 * - Updates user profile fields
 * - Requires If-Match header with version number (for optimistic locking)
 * - Only allows updating: name, email, Home address
 * - Protected fields (id, role, etc.) cannot be updated
 */ // Mock database 
let mockUser = {
    id: 'usr_123',
    name: 'John Doe',
    email: 'john@example.com',
    emailVerified: true,
    street: '123 Main St',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94102',
    version: 1,
    updatedAt: new Date().toISOString()
};
async function GET(request) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        data: mockUser,
        meta: {
            requestId: generateRequestId(),
            timestamp: new Date().toISOString()
        }
    });
}
async function PATCH(request) {
    try {
        // 1. Check If-Match header for version control
        // This line reads the value of the "If- Match" header from incoming Http request (frontend) 
        const ifMatch = request.headers.get('if-match');
        // If the frotend does not send an "If-Match" value then it goes into this code block
        if (!ifMatch) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: {
                    code: 'MISSING_IF_MATCH',
                    message: 'If-Match header is required for version control',
                    requestId: generateRequestId(),
                    timestamp: new Date().toISOString()
                }
            }, {
                status: 400
            });
        }
        const requestedVersion = parseInt(ifMatch, 10);
        // 2. Check for version conflict (optimistic locking)
        // It stops updates if the profile has changed since the client last loaded it,
        // ensuring data consistency and preventing lost updates.
        if (requestedVersion !== mockUser.version) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: {
                    code: 'VERSION_CONFLICT',
                    message: 'Profile was updated by another session. Please refresh and try again.',
                    requestId: generateRequestId(),
                    timestamp: new Date().toISOString(),
                    details: {
                        currentVersion: mockUser.version,
                        attemptedVersion: requestedVersion
                    }
                }
            }, {
                status: 409
            });
        }
        // 3. Parse and validate request body
        // These next two lines gets the updated profile fields sent by client,
        // so backend can validate and process them
        const body = await request.json();
        const { name, email, bio, street, city, state, zipCode } = body;
        // Basic validation to see if the user is entering correct values in input fields
        const errors = {};
        if (name !== undefined) {
            const trimmedName = name.trim();
            if (typeof name !== 'string' || trimmedName.length < 2 || /[^a-zA-Z\s]/.test(trimmedName) || // name contains any non-letter, non-space
            /\s{2,}/.test(trimmedName) || // consecutive spaces
            /^\s|\s$/.test(name) // leading or trailing space (shouldn't happen after trim, but extra check)
            ) {
                errors.name = {
                    code: 'INVALID_NAME',
                    message: 'Name must be at least 2 characters, contain only letters, and have only single spaces between words'
                };
            }
        }
        if (email !== undefined) {
            if (typeof email !== 'string' || !email.includes('@')) {
                errors.email = {
                    code: 'INVALID_FORMAT',
                    message: 'Email must be a valid email address'
                };
            }
        }
        if (bio !== undefined && typeof bio === 'string' && bio.length > 500) {
            errors.bio = {
                code: 'TOO_LONG',
                message: 'Bio must not exceed 500 characters'
            };
        }
        if (zipCode !== undefined && typeof zipCode === 'string') {
            const zipPattern = /^\d{5}(-\d{4})?$/;
            if (!zipPattern.test(zipCode)) {
                errors.zipCode = {
                    code: 'INVALID_FORMAT',
                    message: 'Zip code must be in format 12345 or 12345-6789'
                };
            }
        }
        if (state !== undefined && typeof state === 'string' && state.length !== 2) {
            errors.state = {
                code: 'INVALID_FORMAT',
                message: 'State must be a 2-letter code (e.g., CA, NY)'
            };
        }
        // Return validation errors
        if (Object.keys(errors).length > 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: {
                    code: 'VALIDATION_FAILED',
                    message: 'Invalid profile data',
                    requestId: generateRequestId(),
                    timestamp: new Date().toISOString(),
                    fields: errors
                }
            }, {
                status: 422
            });
        }
        // 4. Update profile
        const updates = {};
        if (name !== undefined) updates.name = name.trim();
        if (email !== undefined) updates.email = email.trim().toLowerCase();
        if (bio !== undefined) updates.bio = bio.trim();
        if (street !== undefined) updates.street = street.trim();
        if (city !== undefined) updates.city = city.trim();
        if (state !== undefined) updates.state = state.trim().toUpperCase();
        if (zipCode !== undefined) updates.zipCode = zipCode.trim();
        // Check what changed
        const nameChanged = name !== undefined && name.trim() !== mockUser.name;
        const emailChanged = email !== undefined && email.trim().toLowerCase() !== mockUser.email;
        const addressChanged = street !== undefined && street.trim() !== mockUser.street || city !== undefined && city.trim() !== mockUser.city || state !== undefined && state.trim().toUpperCase() !== mockUser.state || zipCode !== undefined && zipCode.trim() !== mockUser.zipCode;
        mockUser = {
            ...mockUser,
            ...updates,
            emailVerified: emailChanged ? false : mockUser.emailVerified,
            version: mockUser.version + 1,
            updatedAt: new Date().toISOString()
        };
        // 5. Build warnings and success message
        const warnings = [];
        let successMessage = null;
        if (emailChanged) {
            warnings.push({
                code: 'EMAIL_VERIFICATION_REQUIRED',
                message: 'Check your email to verify your new address'
            });
            successMessage = 'New email saved';
        } else if (nameChanged) {
            successMessage = 'New name saved';
        } else if (addressChanged) {
            successMessage = 'New address saved';
        }
        // 6. Return success response
        return __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            data: mockUser,
            meta: {
                requestId: generateRequestId(),
                timestamp: new Date().toISOString(),
                warnings: warnings.length > 0 ? warnings : undefined,
                successMessage: successMessage
            }
        });
    } catch (error) {
        // Handle unexpected errors
        return __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: {
                code: 'INTERNAL_SERVER_ERROR',
                message: 'An unexpected error occurred',
                requestId: generateRequestId(),
                timestamp: new Date().toISOString()
            }
        }, {
            status: 500
        });
    }
}
/**
 * Generate unique request ID for tracing
 * It combines the current timestamp and a random string to help trace,
 *  debug, and identify individual requests in logs or error messages. 
 * This makes it easier to track and troubleshoot specific API calls.
 */ function generateRequestId() {
    return `req_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__daf696b1._.js.map