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

## Portfolio Project
This is a demonstration project showcasing full-stack development skills. Provider data is fictional for demo purposes.