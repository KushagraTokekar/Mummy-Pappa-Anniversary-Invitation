-- ==============================================================================
-- SUPABASE SCHEMA: 25th Wedding Anniversary RSVP Table
-- ==============================================================================
-- Run this script in your Supabase Project Dashboard -> SQL Editor -> Run
-- This creates the table and sets secure Row-Level Security (RLS) policies.

CREATE TABLE IF NOT EXISTS public.rsvps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    guest_name TEXT NOT NULL,
    mobile_number TEXT,
    guest_count INTEGER NOT NULL DEFAULT 1 CHECK (guest_count >= 0),
    attendance TEXT NOT NULL CHECK (attendance IN ('yes', 'no', 'maybe')),
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

-- Allow anonymous visitors to submit RSVPs
CREATE POLICY "Allow public anonymous RSVP insertion"
    ON public.rsvps
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Allow only authenticated admins to view all RSVP responses
CREATE POLICY "Allow authenticated users to read RSVPs"
    ON public.rsvps
    FOR SELECT
    TO authenticated
    USING (true);

-- Helpful comments for the Supabase Table Inspector
COMMENT ON TABLE public.rsvps IS 'Guest responses for 25th Wedding Anniversary Silver Jubilee';
COMMENT ON COLUMN public.rsvps.guest_name IS 'Full name of the responding guest';
COMMENT ON COLUMN public.rsvps.mobile_number IS 'Contact mobile number of the guest';
COMMENT ON COLUMN public.rsvps.guest_count IS 'Total number of guests attending (including respondent)';
COMMENT ON COLUMN public.rsvps.attendance IS 'Whether the guest is attending: yes, no, or maybe';
COMMENT ON COLUMN public.rsvps.message IS 'Optional heartfelt message or blessings for the couple';
