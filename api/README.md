# Harmony Health API

Medical appointment coordination platform backend.

**🌐 Live Demo:** https://harmony-health-client.vercel.app

## Overview
Full-stack appointment booking system enabling patients to discover healthcare providers and schedule appointments.

## Tech Stack
- Ruby on Rails 7.2 (API mode)
- PostgreSQL
- JWT authentication
- Service-oriented architecture

## Key Features
- User authentication (patients & providers)
- Dynamic appointment slot generation
- Conflict detection and validation
- RESTful API design

## Architecture Highlights
- `SlotGeneratorService` - Generates available time slots based on provider availability
- Time overlap detection prevents double-booking
- Status-aware appointment queries

## Setup
```bash
bundle install
rails db:create db:migrate db:seed
rails server
```

## API Endpoints
- `POST /auth/signup` - User registration
- `POST /auth/login` - User authentication
- `GET /providers` - List all providers
- `GET /providers/:id/available_slots` - Get available appointment slots
- `POST /appointments` - Book appointment
- `GET /appointments` - List user's appointments

## Email Notifications
Uses Resend API for transactional emails:
- Booking confirmations
- Cancellation notices  
- 24-hour appointment reminders

## Configuration

### Environment Variables
Set the following in your production environment:
```bash
# Required
OPENAI_API_KEY=sk-your-openai-api-key-here
RESEND_API_KEY=re_your_api_key_here

# Optional
RESEND_FROM_EMAIL="Your App <noreply@yourdomain.com>"  # Defaults to onboarding@resend.dev
```

**Setting up OpenAI:**
1. Get your API key from [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. The app uses `gpt-4o-mini` for cost-effective symptom analysis
3. Estimated cost: ~$0.0002 per symptom analysis

**Setting up Resend (Email):**
1. Get your API key from [resend.com/api-keys](https://resend.com/api-keys)
2. Add and verify your domain at [resend.com/domains](https://resend.com/domains)
3. For testing, you can use Resend's default: `onboarding@resend.dev`

**For local development:**
1. Copy `.env.example` to `.env`
2. Add your API keys
3. Run `bundle install`

## Portfolio Project
This is a demonstration project showcasing full-stack development skills. Provider data is fictional for demo purposes.