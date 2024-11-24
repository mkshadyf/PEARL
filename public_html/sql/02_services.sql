-- Create services table
create table services (
  id bigint generated by default as identity primary key,
  title text not null,
  description text not null,
  icon text not null,
  order integer not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up RLS policies
alter table services enable row level security;

create policy "Public read services"
  on services for select
  using (true);

create policy "Admin manage services"
  on services for all
  using (auth.role() = 'authenticated');

-- Create updated_at trigger
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_services_updated_at
  before update on services
  for each row
  execute function update_updated_at_column(); 