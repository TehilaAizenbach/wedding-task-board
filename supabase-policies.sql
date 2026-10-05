-- Run this in Supabase Dashboard -> SQL Editor
-- Allows the public (anon) key used by this app to fully manage the tasks board.
-- This app has no login system, so access control is "anyone with the link can use the board".

alter table public.tasks enable row level security;

create policy "Public can read tasks"
  on public.tasks for select
  to anon
  using (true);

create policy "Public can create tasks"
  on public.tasks for insert
  to anon
  with check (true);

create policy "Public can update tasks"
  on public.tasks for update
  to anon
  using (true)
  with check (true);

create policy "Public can delete tasks"
  on public.tasks for delete
  to anon
  using (true);
