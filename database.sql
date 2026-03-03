-- PlastiTrack Database Schema

-- 1. Profiles Table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  role TEXT DEFAULT 'contributor' CHECK (role IN ('contributor', 'admin', 'hub_officer')),
  hub_id UUID, -- For hub_officer or user's preferred hub
  reward_balance INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Turn on RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 2. Hubs Table
CREATE TABLE public.hubs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Hubs are public
ALTER TABLE public.hubs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Hubs are public viewable." ON public.hubs FOR SELECT USING (true);

-- 3. Plastic Entries Table (When a user drops off plastic at a hub)
CREATE TABLE public.plastic_entries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  hub_id UUID REFERENCES public.hubs(id) NOT NULL,
  plastic_type TEXT NOT NULL CHECK (plastic_type IN ('PET', 'HDPE', 'LDPE', 'PP', 'Caps', 'PVC', 'Mixed')),
  weight_kg DECIMAL(10,2) NOT NULL,
  receipt_code TEXT UNIQUE NOT NULL,
  points_awarded INTEGER NOT NULL,
  logged_by UUID REFERENCES public.profiles(id), -- Admin or hub officer who logged it
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.plastic_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own entries." ON public.plastic_entries FOR SELECT USING (auth.uid() = user_id);
-- Admins can view all (Needs admin policy, see below)

-- 4. Pickup Requests Table
CREATE TABLE public.pickup_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  address TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  approx_weight_kg DECIMAL(10,2),
  preferred_date DATE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'scheduled', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.pickup_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own requests." ON public.pickup_requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create requests." ON public.pickup_requests FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 5. Products Table (ReVamp Store)
CREATE TABLE public.products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price_naira DECIMAL(10,2) NOT NULL,
  points_price INTEGER,
  image_url TEXT,
  stock INTEGER DEFAULT 0,
  plastic_category_used TEXT,
  approx_weight_diverted DECIMAL(10,2),
  made_by TEXT DEFAULT 'Blessn Evea Signature',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Products are public viewable." ON public.products FOR SELECT USING (true);

-- Setup Admin bypass for RLS (Simplistic approach for demo)
-- This allows any 'admin' role to bypass policies
CREATE POLICY "Admins have full access to profiles" ON public.profiles USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);
CREATE POLICY "Admins have full access to entries" ON public.plastic_entries USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);
CREATE POLICY "Admins have full access to pickups" ON public.pickup_requests USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);
