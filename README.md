## QuantumPharm User Profile Management (Option B)
#### View & Test Program: https://quantum-pharma-six.vercel.app/
### Introduction
This project is a full-stack user profile management system built with Next.js, React, and TypeScript. It allows users to view and update their profile information—including name, email, and home address—through a modern web interface. The system demonstrates best practices in API design, form validation, error handling, and optimistic locking for concurrent updates.

### What does this program do?
Users can:
- View their current profile details
- Edit and update their name, email, and address
- Receive instant feedback on validation errors (e.g., invalid email, name rules)
- See warnings and success messages after updates

The backend API ensures data integrity by validating all updates and preventing accidental overwrites if multiple sessions try to update the profile at the same time. All interactions are handled through a single, easy-to-use web page.
 

## Tech Stack 
#### Backend & Frontend
- Next.js 176.1.6 (full-stack framework)
- React 19.2.4 (UI library)
- TypeScript 5.9.3 (type safety)

#### I chose Next.js to be the frontend and backend for:
- Simplicity
- Backend API Capabilities 
- Speed
- Modern 
- Type safe 
- Quantum pharma uses this modern framework 

## Data Flow of When a User Updates Their Profile
1. User fills out the profile settings form in the frontend and hits "Save Changes"
2. Frontend sends requests (GET to load, and PATCH to update) to the API route:
 /api/v1/users/me/profile
3. Backend API Route (route.ts) receives the GET/PATCH request, validates the data, checks to make sure the user is updating the most recent version of their profile, and updates the mockdata. 
4. Backend sends a response with the updated data, erros, or warnings to the frontend 
5. Frontend updates the UI to show errors, or warnings based on backend response. 
![Profile Update Flow](quantumpharmUML.png)

## Questions 

1. **What assumptions did you make?**
    - User is already authenticated (JWT token exists)
    - No need to implement actual login/signup
    - Only one user profile is managed (mock database), and multi-user support is not required for this exercise.
    - The mock database is in-memory and resets on server restart; persistent storage is not required for the demo.


2. **What tradeoffs did you choose not to make?**

    Even with limited time, I chose not to cut corners on important features. I kept comprehensive validation to check things like name length, email format, zip codes, and state codes instead of accepting any input. I made sure error messages tell users exactly which field has a problem instead of just saying "something went wrong." I included version control to prevent data from being overwritten when two people edit at the same time, rather than letting the last person's changes win and losing the first person's work. I also added clear success messages that say "New email saved" or "New address saved" instead of a generic "success" message, and I warn users when their email needs verification. Finally, I structured the API responses properly with status codes, request IDs for tracking problems, and organized data instead of just returning simple yes/no answers.

4. **What would you improve if this went to production?**

    If this went to production, I would first add real authentication by validating JWT tokens to make sure users can only update their own profiles. I'd replace the mock database with a real one like PostgreSQL and add proper error logging with tools like Sentry so we can track issues. For security, I'd add rate limiting to prevent spam, input sanitization to block malicious code (Cross-Site Scripting), and HTTPS with security headers. I'd also implement actual email verification, add caching with Redis for better performance, and create an audit trail to log who changed what and when. Finally, I'd write comprehensive tests and set up monitoring with tools like Datadog to catch problems before users report them.

6. **How would you detect and debug issues after release?**

    I would use error tracking tools like Sentry to automatically catch and report any crashes or bugs that happen in production, giving me stack traces and context about what went wrong. I'd set up monitoring dashboards with Datadog (or New Relic) to watch important metrics like API response times, error rates, and how many users are affected. The request IDs I already included in the API responses would help me trace a specific user's problem through all our logs. I'd also set up alerts that notify the team immediately when error rates spike or the API becomes slow. For debugging, I'd use structured logging to record what's happening at each step, and keep audit trails showing exactly what data changed and when.

7. **What would you avoid changing in the first 30 days on a real platform?**

    In the first 30 days, I would avoid changing the API contract structure (the format of requests and responses) because other teams or external partners might already be using it and breaking changes would cause their integrations to fail. I'd also avoid modifying the version control mechanism since users might have unsaved changes in progress. I wouldn't touch the core validation rules for critical fields like email format because changing them could either lock out legitimate users or accidentally allow bad data. Database schema changes would be risky too since migrating data takes time and errors could cause data loss. Instead, I'd focus on monitoring how users actually interact with the system, gathering feedback, fixing bugs, and adding new optional features that don't break existing functionality. After 30 days of real usage data, I'd have better insight into what truly needs to change versus what seemed like a good idea but isn't actually needed.
