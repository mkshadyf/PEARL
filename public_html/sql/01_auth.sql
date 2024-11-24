-- Enable RLS
alter table auth.users enable row level security;

-- Create admin_users table
create table admin_users (
  id uuid references auth.users not null primary key,
  email text not null unique,
  role text not null check (role in ('admin', 'editor')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up RLS policies
alter table admin_users enable row level security;

create policy "Admin users can view all admin users"
  on admin_users for select
  using (auth.role() = 'authenticated');

create policy "Admin users can insert admin users"
  on admin_users for insert
  with check (auth.role() = 'authenticated');

create policy "Admin users can update admin users"
  on admin_users for update
  using (auth.role() = 'authenticated');

create policy "Admin users can delete admin users"
  on admin_users for delete
  using (auth.role() = 'authenticated'); 