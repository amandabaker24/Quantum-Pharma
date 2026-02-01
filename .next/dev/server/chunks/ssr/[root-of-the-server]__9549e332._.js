module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/quantumpharm/app/profile/settings/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProfileSettingsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quantumpharm/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quantumpharm/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
function ProfileSettingsPage() {
    const [profile, setProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipCode: ''
    });
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [successMessage, setSuccessMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [warningMessage, setWarningMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    // Fetch profile on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchProfile();
    }, []);
    const fetchProfile = async ()=>{
        try {
            const response = await fetch('/api/v1/users/me/profile');
            const data = await response.json();
            setProfile(data.data);
            setFormData({
                name: data.data.name,
                email: data.data.email,
                street: data.data.street || '',
                city: data.data.city || '',
                state: data.data.state || '',
                zipCode: data.data.zipCode || ''
            });
        } catch (error) {
            console.error('Failed to fetch profile:', error);
        }
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setIsLoading(true);
        setErrors({});
        setSuccessMessage('');
        setWarningMessage('');
        // This sends an HTTP request with the current version number to the backend in 
        // route.ts line 67
        try {
            const response = await fetch('/api/v1/users/me/profile', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'If-Match': profile?.version ? profile.version.toString() : '1'
                },
                body: JSON.stringify(formData)
            });
            // This line waits for the backends response to be converted into JSON into JS
            // This allows frontend to easily access the response's protperites like error messages
            // or updated profile data
            const data = await response.json();
            // This codeblock displays validation errors to the user if there is any 
            if (!response.ok) {
                // Handle errors
                if (data.error?.fields) {
                    const fieldErrors = {};
                    for (const [field, error] of Object.entries(data.error.fields)){
                        fieldErrors[field] = error.message;
                    }
                    setErrors(fieldErrors);
                } else {
                    alert(`Error: ${data.error?.message || 'Update failed'}`);
                }
            } else {
                // Success!
                // This causes the page to re-render and display the updated profile info
                setProfile(data.data);
                // Show success message from API if provided
                if (data.meta?.successMessage) {
                    setSuccessMessage(data.meta.successMessage);
                } else {
                    setSuccessMessage('');
                }
                // Show warnings if any
                if (data.meta?.warnings && data.meta.warnings.length > 0) {
                    setWarningMessage(data.meta.warnings[0].message);
                } else {
                    setWarningMessage('');
                }
            }
        } catch (error) {
            alert('Network error. Please try again.');
        } finally{
            setIsLoading(false);
        }
    };
    return(// UI styling & Input fields 
    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            maxWidth: '600px',
            margin: '0 auto',
            padding: '40px 20px'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                style: {
                    fontSize: '24px',
                    fontWeight: 'bold',
                    marginBottom: '24px'
                },
                children: "Profile Settings"
            }, void 0, false, {
                fileName: "[project]/quantumpharm/app/profile/settings/page.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this),
            successMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: '12px',
                    backgroundColor: '#10b981',
                    color: 'white',
                    borderRadius: '6px',
                    marginBottom: '20px'
                },
                children: successMessage
            }, void 0, false, {
                fileName: "[project]/quantumpharm/app/profile/settings/page.tsx",
                lineNumber: 116,
                columnNumber: 9
            }, this),
            warningMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: '12px',
                    backgroundColor: '#f59e0b',
                    color: 'white',
                    borderRadius: '6px',
                    marginBottom: '20px'
                },
                children: warningMessage
            }, void 0, false, {
                fileName: "[project]/quantumpharm/app/profile/settings/page.tsx",
                lineNumber: 129,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: '20px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "name",
                                style: {
                                    display: 'block',
                                    marginBottom: '8px',
                                    fontWeight: '500'
                                },
                                children: "Name"
                            }, void 0, false, {
                                fileName: "[project]/quantumpharm/app/profile/settings/page.tsx",
                                lineNumber: 143,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                id: "name",
                                name: "name",
                                type: "text",
                                value: formData.name,
                                onChange: (e)=>setFormData({
                                        ...formData,
                                        name: e.target.value
                                    }),
                                style: {
                                    width: '100%',
                                    padding: '10px',
                                    border: errors.name ? '2px solid #ef4444' : '1px solid #d1d5db',
                                    borderRadius: '6px',
                                    fontSize: '16px'
                                }
                            }, void 0, false, {
                                fileName: "[project]/quantumpharm/app/profile/settings/page.tsx",
                                lineNumber: 149,
                                columnNumber: 11
                            }, this),
                            errors.name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    color: '#ef4444',
                                    fontSize: '14px',
                                    marginTop: '4px'
                                },
                                children: errors.name
                            }, void 0, false, {
                                fileName: "[project]/quantumpharm/app/profile/settings/page.tsx",
                                lineNumber: 164,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quantumpharm/app/profile/settings/page.tsx",
                        lineNumber: 142,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: '20px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "email",
                                style: {
                                    display: 'block',
                                    marginBottom: '8px',
                                    fontWeight: '500'
                                },
                                children: "Email"
                            }, void 0, false, {
                                fileName: "[project]/quantumpharm/app/profile/settings/page.tsx",
                                lineNumber: 172,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                id: "email",
                                name: "email",
                                type: "email",
                                value: formData.email,
                                onChange: (e)=>setFormData({
                                        ...formData,
                                        email: e.target.value
                                    }),
                                style: {
                                    width: '100%',
                                    padding: '10px',
                                    border: errors.email ? '2px solid #ef4444' : '1px solid #d1d5db',
                                    borderRadius: '6px',
                                    fontSize: '16px'
                                }
                            }, void 0, false, {
                                fileName: "[project]/quantumpharm/app/profile/settings/page.tsx",
                                lineNumber: 178,
                                columnNumber: 11
                            }, this),
                            errors.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    color: '#ef4444',
                                    fontSize: '14px',
                                    marginTop: '4px'
                                },
                                children: errors.email
                            }, void 0, false, {
                                fileName: "[project]/quantumpharm/app/profile/settings/page.tsx",
                                lineNumber: 193,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quantumpharm/app/profile/settings/page.tsx",
                        lineNumber: 171,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: '24px',
                            paddingTop: '24px',
                            borderTop: '1px solid #e5e7eb'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            style: {
                                fontSize: '18px',
                                fontWeight: '600',
                                marginBottom: '16px'
                            },
                            children: "Home Address"
                        }, void 0, false, {
                            fileName: "[project]/quantumpharm/app/profile/settings/page.tsx",
                            lineNumber: 201,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/quantumpharm/app/profile/settings/page.tsx",
                        lineNumber: 200,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: '20px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "street",
                                style: {
                                    display: 'block',
                                    marginBottom: '8px',
                                    fontWeight: '500'
                                },
                                children: "Street Address"
                            }, void 0, false, {
                                fileName: "[project]/quantumpharm/app/profile/settings/page.tsx",
                                lineNumber: 206,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                id: "street",
                                name: "street",
                                type: "text",
                                value: formData.street,
                                onChange: (e)=>setFormData({
                                        ...formData,
                                        street: e.target.value
                                    }),
                                style: {
                                    width: '100%',
                                    padding: '10px',
                                    border: errors.street ? '2px solid #ef4444' : '1px solid #d1d5db',
                                    borderRadius: '6px',
                                    fontSize: '16px'
                                }
                            }, void 0, false, {
                                fileName: "[project]/quantumpharm/app/profile/settings/page.tsx",
                                lineNumber: 209,
                                columnNumber: 11
                            }, this),
                            errors.street && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    color: '#ef4444',
                                    fontSize: '14px',
                                    marginTop: '4px'
                                },
                                children: errors.street
                            }, void 0, false, {
                                fileName: "[project]/quantumpharm/app/profile/settings/page.tsx",
                                lineNumber: 224,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quantumpharm/app/profile/settings/page.tsx",
                        lineNumber: 205,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: '20px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "city",
                                style: {
                                    display: 'block',
                                    marginBottom: '8px',
                                    fontWeight: '500'
                                },
                                children: "City"
                            }, void 0, false, {
                                fileName: "[project]/quantumpharm/app/profile/settings/page.tsx",
                                lineNumber: 232,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                id: "city",
                                name: "city",
                                type: "text",
                                value: formData.city,
                                onChange: (e)=>setFormData({
                                        ...formData,
                                        city: e.target.value
                                    }),
                                style: {
                                    width: '100%',
                                    padding: '10px',
                                    border: errors.city ? '2px solid #ef4444' : '1px solid #d1d5db',
                                    borderRadius: '6px',
                                    fontSize: '16px'
                                }
                            }, void 0, false, {
                                fileName: "[project]/quantumpharm/app/profile/settings/page.tsx",
                                lineNumber: 235,
                                columnNumber: 11
                            }, this),
                            errors.city && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    color: '#ef4444',
                                    fontSize: '14px',
                                    marginTop: '4px'
                                },
                                children: errors.city
                            }, void 0, false, {
                                fileName: "[project]/quantumpharm/app/profile/settings/page.tsx",
                                lineNumber: 250,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quantumpharm/app/profile/settings/page.tsx",
                        lineNumber: 231,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            gap: '16px',
                            marginBottom: '20px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: '1'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "state",
                                        style: {
                                            display: 'block',
                                            marginBottom: '8px',
                                            fontWeight: '500'
                                        },
                                        children: "State"
                                    }, void 0, false, {
                                        fileName: "[project]/quantumpharm/app/profile/settings/page.tsx",
                                        lineNumber: 260,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "state",
                                        name: "state",
                                        type: "text",
                                        placeholder: "CA",
                                        maxLength: 2,
                                        value: formData.state,
                                        onChange: (e)=>setFormData({
                                                ...formData,
                                                state: e.target.value.toUpperCase()
                                            }),
                                        style: {
                                            width: '100%',
                                            padding: '10px',
                                            border: errors.state ? '2px solid #ef4444' : '1px solid #d1d5db',
                                            borderRadius: '6px',
                                            fontSize: '16px'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/quantumpharm/app/profile/settings/page.tsx",
                                        lineNumber: 263,
                                        columnNumber: 13
                                    }, this),
                                    errors.state && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            color: '#ef4444',
                                            fontSize: '14px',
                                            marginTop: '4px'
                                        },
                                        children: errors.state
                                    }, void 0, false, {
                                        fileName: "[project]/quantumpharm/app/profile/settings/page.tsx",
                                        lineNumber: 280,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quantumpharm/app/profile/settings/page.tsx",
                                lineNumber: 259,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: '1'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "zipCode",
                                        style: {
                                            display: 'block',
                                            marginBottom: '8px',
                                            fontWeight: '500'
                                        },
                                        children: "Zip Code"
                                    }, void 0, false, {
                                        fileName: "[project]/quantumpharm/app/profile/settings/page.tsx",
                                        lineNumber: 288,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "zipCode",
                                        name: "zipCode",
                                        type: "text",
                                        placeholder: "12345",
                                        value: formData.zipCode,
                                        onChange: (e)=>setFormData({
                                                ...formData,
                                                zipCode: e.target.value
                                            }),
                                        style: {
                                            width: '100%',
                                            padding: '10px',
                                            border: errors.zipCode ? '2px solid #ef4444' : '1px solid #d1d5db',
                                            borderRadius: '6px',
                                            fontSize: '16px'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/quantumpharm/app/profile/settings/page.tsx",
                                        lineNumber: 291,
                                        columnNumber: 13
                                    }, this),
                                    errors.zipCode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            color: '#ef4444',
                                            fontSize: '14px',
                                            marginTop: '4px'
                                        },
                                        children: errors.zipCode
                                    }, void 0, false, {
                                        fileName: "[project]/quantumpharm/app/profile/settings/page.tsx",
                                        lineNumber: 307,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quantumpharm/app/profile/settings/page.tsx",
                                lineNumber: 287,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quantumpharm/app/profile/settings/page.tsx",
                        lineNumber: 257,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            gap: '12px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: isLoading,
                                style: {
                                    padding: '10px 24px',
                                    backgroundColor: isLoading ? '#9ca3af' : '#3b82f6',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    fontSize: '16px',
                                    fontWeight: '500',
                                    cursor: isLoading ? 'not-allowed' : 'pointer'
                                },
                                children: isLoading ? 'Saving...' : 'Save Changes'
                            }, void 0, false, {
                                fileName: "[project]/quantumpharm/app/profile/settings/page.tsx",
                                lineNumber: 316,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quantumpharm$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setFormData({
                                        name: '',
                                        email: '',
                                        street: '',
                                        city: '',
                                        state: '',
                                        zipCode: ''
                                    }),
                                style: {
                                    padding: '10px 24px',
                                    backgroundColor: 'white',
                                    color: '#374151',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '6px',
                                    fontSize: '16px',
                                    fontWeight: '500',
                                    cursor: 'pointer'
                                },
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/quantumpharm/app/profile/settings/page.tsx",
                                lineNumber: 333,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quantumpharm/app/profile/settings/page.tsx",
                        lineNumber: 315,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quantumpharm/app/profile/settings/page.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quantumpharm/app/profile/settings/page.tsx",
        lineNumber: 109,
        columnNumber: 5
    }, this));
}
}),
"[project]/quantumpharm/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/quantumpharm/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/quantumpharm/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/quantumpharm/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/quantumpharm/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__9549e332._.js.map