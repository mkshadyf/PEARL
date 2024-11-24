-- Create storage buckets
insert into storage.buckets (id, name)
values 
  ('projects', 'projects'),
  ('partners', 'partners'),
  ('services', 'services');

-- Set up storage policies for projects
create policy "Public read project images"
  on storage.objects for select
  using (bucket_id = 'projects');

create policy "Admin manage project images"
  on storage.objects for insert
  with check (bucket_id = 'projects' and auth.role() = 'authenticated');

-- Set up storage policies for partners
create policy "Public read partner logos"
  on storage.objects for select
  using (bucket_id = 'partners');

create policy "Admin manage partner logos"
  on storage.objects for insert
  with check (bucket_id = 'partners' and auth.role() = 'authenticated');

-- Set up storage policies for services
create policy "Public read service icons"
  on storage.objects for select
  using (bucket_id = 'services');

create policy "Admin manage service icons"
  on storage.objects for insert
  with check (bucket_id = 'services' and auth.role() = 'authenticated'); 