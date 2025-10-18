# Mai Health - Layer-Based Build

## Layer 1: Authentication + Basic Models
- [X] Rails Setup
  - [X] Create Rails API app
  - [X] Add bcrypt, rack-cors
  - [X] Create User model
  - [X] Signup/login endpoints
  - [X] Test with Postman
- [X] Next.js Setup
  - [X] Create Next.js app
  - [] Install Tailwind + shadcn
  - [X] Login/signup pages
  - [X] Connect to Rails
  - [X] Auth working end-to-end
- [X] Provider Models
  - [X] Create Provider, Availability models
  - [X] Seed 5 providers
  - [X] GET /providers endpoint
  - [X] Browse providers page

**Layer 1 Goal:** User can sign up, log in, see 5 providers

## Layer 2: Appointment Booking System

### Backend:
- [ ] Appointment model to track bookings
- [ ] SlotGeneratorService that:
  - [ ] Generates 30-minute time slots
  - [ ] Covers next 14 days
  - [ ] Checks provider availability
  - [ ] Excludes past times
  - [ ] Filters out booked slots
- [ ] Slots endpoint returns slots grouped by date

### Frontend:
- [ ] Provider detail page with complete profile
- [ ] Date selector (left sidebar) showing available dates
- [ ] Time slot picker displaying 30-min slots
- [ ] Visual feedback - selected slots highlighted in Ruby red
- [ ] Booking preview showing appointment details
- [ ] Responsive design that works on mobile

**Layer 2 Goal:** User can book appointments with providers
