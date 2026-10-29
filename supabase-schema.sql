create table if not exists public.flux_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.flux_profiles enable row level security;

create policy "owners can read their flux profile"
on public.flux_profiles for select to authenticated
using ((select auth.uid()) = user_id);

create policy "owners can insert their flux profile"
on public.flux_profiles for insert to authenticated
with check ((select auth.uid()) = user_id);

create policy "owners can update their flux profile"
on public.flux_profiles for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "owners can delete their flux profile"
on public.flux_profiles for delete to authenticated
using ((select auth.uid()) = user_id);
