-- Dynamic content tables for Explore, Why Choose Us, and Process Steps

-- Explore items (problems/solutions)
create table if not exists public.explore_items (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('problem','solution')),
  description text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists explore_items_type_idx on public.explore_items(type);
create index if not exists explore_items_sort_idx on public.explore_items(sort_order);

-- Why Choose Us cards
create table if not exists public.why_choose_us (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  icon text not null check (icon in ('building','store','settings','lightbulb')),
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists why_choose_us_sort_idx on public.why_choose_us(sort_order);

-- Process steps
create table if not exists public.process_steps (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  icon text,
  href text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists process_steps_sort_idx on public.process_steps(sort_order);

-- Services under each process step
create table if not exists public.process_step_services (
  id uuid primary key default gen_random_uuid(),
  step_id uuid not null references public.process_steps(id) on delete cascade,
  name text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists pss_step_idx on public.process_step_services(step_id);
create index if not exists pss_sort_idx on public.process_step_services(sort_order);

-- Triggers to update updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

do $$ begin
  if not exists (
    select 1 from pg_trigger where tgname = 'trg_explore_items_set_updated_at'
  ) then
    create trigger trg_explore_items_set_updated_at
    before update on public.explore_items
    for each row execute function public.set_updated_at();
  end if;

  if not exists (
    select 1 from pg_trigger where tgname = 'trg_why_choose_us_set_updated_at'
  ) then
    create trigger trg_why_choose_us_set_updated_at
    before update on public.why_choose_us
    for each row execute function public.set_updated_at();
  end if;

  if not exists (
    select 1 from pg_trigger where tgname = 'trg_process_steps_set_updated_at'
  ) then
    create trigger trg_process_steps_set_updated_at
    before update on public.process_steps
    for each row execute function public.set_updated_at();
  end if;

  if not exists (
    select 1 from pg_trigger where tgname = 'trg_pss_set_updated_at'
  ) then
    create trigger trg_pss_set_updated_at
    before update on public.process_step_services
    for each row execute function public.set_updated_at();
  end if;
end $$;

-- Note: Remember to add RLS policies to restrict writes to admins.
