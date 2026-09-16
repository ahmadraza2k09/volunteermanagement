Design a complete, modern, professional web based volunteer management system called **VolunTrack**.

VolunTrack is a simple platform for schools, NGOs, universities, community organizations, and event organizers to register volunteers, manage volunteer profiles, create events, assign volunteers to specific roles, track volunteer hours, and monitor overall volunteer activity.

The design should feel like a real modern SaaS dashboard. Keep it clean, minimal, organized, professional, and easy to use. Avoid unnecessary complexity.

## Brand Identity

Product name: **VolunTrack**

Tagline: **Manage Volunteers. Build Impact.**

Create a simple, professional **single vector logo** for VolunTrack.

Logo concept:
A minimal combination of a person/volunteer symbol and a checkmark or connected nodes, representing volunteering, teamwork, contribution, and tracking. The logo should be recognizable even at small sizes.

The logo must work in:

* Full logo with icon + wordmark
* Icon only
* Light background
* Dark background

Use a modern geometric sans serif wordmark.

Suggested visual style:

* Dark charcoal as the primary brand color
* White backgrounds
* One professional accent color for buttons, links, active states, and important statistics
* Soft gray backgrounds for dashboard sections
* Rounded cards
* Subtle borders
* Minimal shadows
* Clean spacing
* Professional typography

Use a consistent design system throughout the entire application.

## Main Navigation

Create a left sidebar navigation containing:

* Dashboard
* Volunteers
* Events
* Assignments
* Volunteer Hours
* Reports
* Settings

At the bottom of the sidebar:

* Admin profile
* Admin name
* Organization name
* Logout

Include a responsive design for desktop and tablet.

## 1. Login Page

Create a clean admin login page.

Include:

* VolunTrack logo
* Welcome back heading
* Email field
* Password field
* Remember me checkbox
* Forgot password link
* Login button

Keep the page minimal with a professional SaaS appearance.

## 2. Dashboard

Create the main admin dashboard.

Top section:

* Page title: Dashboard
* Short welcome message
* Date selector
* Add Volunteer button
* Create Event button

Create statistic cards:

* Total Volunteers
* Active Volunteers
* Upcoming Events
* Total Volunteer Hours

Example data:
Total Volunteers: 42
Active Volunteers: 27
Upcoming Events: 8
Volunteer Hours: 186

Below the statistics, include:

### Volunteer Activity Chart

A simple line or bar chart showing volunteer activity over the last 6 months.

### Upcoming Events

Show event cards or a table containing:

* Event name
* Date
* Location
* Volunteers assigned
* Status

### Recent Volunteer Activity

Show recent actions such as:

* New volunteer registered
* Volunteer assigned to an event
* Volunteer completed an assignment
* Volunteer hours added

## 3. Volunteers Page

Create a complete volunteer management page.

Header:

* Volunteers
* Total volunteer count
* Add Volunteer button

Include a search bar and filters:

* Search by name
* Filter by skill
* Filter by availability
* Filter by status
* Filter by assigned role

Create a professional table with:

* Volunteer
* Email
* Phone
* Skills
* Availability
* Current Role
* Status
* Total Hours
* Actions

Status options:

* Available
* Assigned
* Active
* Completed

Add pagination.

Actions:

* View
* Edit
* Assign
* Delete

## 4. Add Volunteer Page / Modal

Create a form for registering a new volunteer.

Fields:

* Full Name
* Email
* Phone Number
* Profile Photo
* Skills
* Preferred Role
* Availability
* Address
* Emergency Contact
* Short Bio

Availability options:

* Weekdays
* Weekends
* Morning
* Afternoon
* Evening

Preferred roles:

* Event Coordinator
* Graphic Designer
* Social Media
* Registration Desk
* Photographer
* Content Writer
* General Volunteer

Buttons:

* Cancel
* Register Volunteer

Show clear form validation states.

## 5. Volunteer Profile Page

Create a detailed volunteer profile.

Top section:

* Profile photo
* Full name
* Current status
* Contact information
* Edit Profile button
* Assign to Event button

Show summary cards:

* Total Events
* Completed Assignments
* Total Volunteer Hours
* Current Role

Below, create tabs:

### Overview

Show:

* Skills
* Availability
* Preferred role
* Bio

### Events

Show all events the volunteer has participated in.

### Hours

Show volunteer hours history.

### Activity

Show recent activity.

## 6. Events Page

Create an event management page.

Header:

* Events
* Create Event button

Include search and filters:

* Search event
* Upcoming
* Ongoing
* Completed

Event table/card information:

* Event name
* Date
* Location
* Required volunteers
* Assigned volunteers
* Status
* Actions

Statuses:

* Upcoming
* Ongoing
* Completed
* Cancelled

## 7. Create Event Page

Create a simple event creation form.

Fields:

* Event Name
* Event Description
* Date
* Start Time
* End Time
* Location
* Required Volunteers
* Required Skills
* Event Organizer
* Additional Notes

Button:

* Create Event

After creating an event, allow the admin to assign volunteers.

## 8. Event Details Page

Show:

* Event name
* Event description
* Date
* Time
* Location
* Organizer
* Number of required volunteers
* Number of assigned volunteers
* Event status

Create an assigned volunteer table:

* Volunteer
* Assigned Role
* Attendance
* Hours
* Status
* Actions

Include:
**Assign Volunteer** button.

## 9. Volunteer Assignment System

Create an assignment interface where an admin can select:

* Event
* Volunteer
* Role
* Assignment date
* Expected hours
* Notes

Roles:

* Event Coordinator
* Registration Desk
* Photographer
* Graphic Designer
* Social Media
* Content Writer
* General Volunteer

Show a confirmation before assigning.

After assignment, display a success notification.

## 10. Assignments Page

Create a dedicated assignment management page.

Table:

* Volunteer
* Event
* Role
* Date
* Expected Hours
* Actual Hours
* Status
* Actions

Statuses:

* Assigned
* In Progress
* Completed
* Cancelled

Include:

* Search
* Filters
* Sort
* Edit assignment
* Mark as completed

## 11. Volunteer Hours Page

Create a volunteer hours tracking system.

Dashboard statistics:

* Total Volunteer Hours
* This Month
* Average Hours per Volunteer
* Top Active Volunteers

Create a table:

* Volunteer
* Event
* Date
* Role
* Hours
* Verification Status

Allow admin to add or edit hours.

Include:
**Add Hours** button.

Add Hours form:

* Volunteer
* Event
* Date
* Role
* Hours
* Notes

Verification status:

* Pending
* Verified

## 12. Reports Page

Create a simple reporting dashboard.

Include:

### Volunteer Statistics

* Total volunteers
* Active volunteers
* New volunteers
* Volunteers by role

### Event Statistics

* Total events
* Completed events
* Upcoming events
* Average volunteers per event

### Impact Statistics

* Total volunteer hours
* Total assignments
* Active volunteers
* Completed assignments

Use clean charts and graphs.

Include buttons:

* Export CSV
* Generate Report

## 13. Settings Page

Create simple settings sections:

### Organization

* Organization Name
* Logo
* Email
* Phone
* Address

### Admin Profile

* Name
* Email
* Profile photo

### System Preferences

* Notifications
* Email notifications
* Default volunteer status

### Security

* Change password
* Logout from all devices

## 14. Notifications

Create a notification dropdown in the top navigation.

Example notifications:

"New volunteer registered"

"Ahmad has been assigned to Youth Workshop"

"Volunteer hours submitted for verification"

"Event registration is almost full"

Include unread notification indicators.

## 15. Search

Create a global search interface that can search:

* Volunteers
* Events
* Assignments

Show categorized search results.

## 16. Empty States

Design professional empty states for:

* No volunteers
* No events
* No assignments
* No volunteer hours
* No notifications

Use simple illustrations or icons, not large decorative graphics.

Example:

"No volunteers yet"

"Add your first volunteer to start managing your team."

Button:
"Add Volunteer"

## 17. Confirmation and Feedback States

Design:

* Success notification
* Error notification
* Delete confirmation modal
* Assignment confirmation modal
* Form validation
* Loading state
* Saving state
* Empty state

## 18. Responsive Design

Create responsive versions for:

* Desktop
* Tablet

The sidebar should collapse on smaller screens.

Tables should transform into cards or horizontally scroll when necessary.

Forms should remain easy to use on smaller screens.

## UI/UX Requirements

Prioritize usability over decoration.

Use:

* Clear visual hierarchy
* Consistent spacing
* Accessible contrast
* Large readable typography
* Clear button labels
* Consistent icons
* Consistent border radius
* Simple data visualization
* Professional tables
* Minimal animations
* Clear hover and active states

Do not make the interface look like a generic template.

Make it feel like a real product that an NGO, school, university, or organization could actually use.

## Design System

Create reusable components for:

* Buttons
* Inputs
* Dropdowns
* Search bars
* Cards
* Tables
* Status badges
* Tabs
* Modals
* Alerts
* Tooltips
* Navigation
* Pagination
* Charts
* Profile components

Maintain consistent components throughout the entire design.

## Important

Do not overcrowd the dashboard.

Keep the system simple enough that a first time admin can understand it immediately.

The final Figma design should contain a complete clickable prototype flow:

Login → Dashboard → Volunteers → Volunteer Profile → Events → Event Details → Assign Volunteer → Assignments → Volunteer Hours → Reports → Settings.

Use realistic sample data throughout the prototype so the interface looks like a functioning system rather than an empty template.

Overall design direction:

**Modern + Minimal + Professional + Human + Trustworthy + Easy to use**

VolunTrack should visually communicate **people, teamwork, organization, contribution, and measurable impact** without using excessive illustrations or decorative elements.
