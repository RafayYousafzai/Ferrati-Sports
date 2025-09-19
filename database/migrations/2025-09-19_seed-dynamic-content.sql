-- Seed Explore Items if table is empty
do $$
begin
  if (select count(*) from public.explore_items) = 0 then
    insert into public.explore_items (type, description, sort_order) values
    ('problem', 'Dealing with inconsistent stitching, poor fabric quality, color mismatches.', 0),
    ('problem', 'Frequent delays causing frustrated clients, and lost sales.', 1),
    ('problem', 'Compromising your designs due to restrictive fabric options, high MOQs, and inflexible production.', 2),
    ('problem', 'Manufacturers leaving you in the dark without timely updates, causing uncertainty and operational headaches.', 3),
    ('problem', 'Unclear pricing structures, sudden hidden charges, and unreliable refund policies.', 4),
    ('solution', '85% fewer returns, significantly reducing operational costs and protecting your brand reputation.', 0),
    ('solution', 'Up to 60% faster production turnaround compared to typical industry timelines, positioning your products ahead of competitors.', 1),
    ('solution', '30% improvement in customer satisfaction ratings, achieved through reliable quality, consistent delivery, and dedicated service.', 2),
    ('solution', 'Offering flexible designs, low MOQs, and rapid prototyping for maximum creativity.', 3);
  end if;
end $$;

-- Seed Why Choose Us if table is empty
do $$
begin
  if (select count(*) from public.why_choose_us) = 0 then
    insert into public.why_choose_us (title, description, icon, sort_order) values
    ('Customized Solutions', 'Every piece is crafted specifically to match your brand''s unique style, fabric choice, and fit.', 'building', 0),
    ('Fast Turnaround Time', 'From samples in 7-10 days to bulk orders in 3-4 weeks, we meet deadlines so you can meet your customers'' demands.', 'store', 1),
    ('Comprehensive Support', 'Our in-house design team, pattern makers, and packaging experts are here to ensure your brand vision comes to life.', 'settings', 2),
    ('Innovative Design', 'We push the boundaries of traditional manufacturing with cutting-edge techniques and sustainable practices.', 'lightbulb', 3);
  end if;
end $$;

-- Seed Process Steps and Services if table is empty
do $$
declare
  step_id uuid;
begin
  if (select count(*) from public.process_steps) = 0 then
    -- 1 Free Consultation
    insert into public.process_steps (title, icon, href, sort_order)
    values ('Free Consultation', 'consultation', '/process/consultation', 0)
    returning id into step_id;
    insert into public.process_step_services (step_id, name, sort_order) values
      (step_id, 'Start with a no-cost consultation via Zoom, phone, or at our office', 0),
      (step_id, 'Free mockup service to visualize your designs', 1),
      (step_id, 'Professional design consultation', 2),
      (step_id, 'Expert material guidance', 3);

    -- 2 Design & Development
    insert into public.process_steps (title, icon, href, sort_order)
    values ('Design & Development', 'design', '/process/design-development', 1)
    returning id into step_id;
    insert into public.process_step_services (step_id, name, sort_order) values
      (step_id, 'Custom design creation with our expert designers', 0),
      (step_id, '16+ modern printing techniques', 1),
      (step_id, 'Pattern grading for perfect sizing', 2),
      (step_id, 'Technology-driven creative process', 3);

    -- 3 Material Selection
    insert into public.process_steps (title, icon, href, sort_order)
    values ('Material Selection', 'fabric', '/process/material-selection', 2)
    returning id into step_id;
    insert into public.process_step_services (step_id, name, sort_order) values
      (step_id, 'Choose from 15+ high-quality fabric types', 0),
      (step_id, 'Eco-friendly and sustainable options', 1),
      (step_id, 'Premium quality sourcing', 2);

    -- 4 Production
    insert into public.process_steps (title, icon, href, sort_order)
    values ('Production', 'production', '/process/production', 3)
    returning id into step_id;
    insert into public.process_step_services (step_id, name, sort_order) values
      (step_id, 'Manufacturing in our 4000 sq meter factory', 0),
      (step_id, '15 machines & 3 production lines', 1),
      (step_id, '20+ skilled experts', 2),
      (step_id, '2.5 tons daily production capacity', 3);

    -- 5 Quality Control
    insert into public.process_steps (title, icon, href, sort_order)
    values ('Quality Control', 'quality', '/process/quality-control', 4)
    returning id into step_id;
    insert into public.process_step_services (step_id, name, sort_order) values
      (step_id, 'Multi-stage inspection at every step', 0),
      (step_id, 'Strict quality assurance protocols', 1),
      (step_id, 'Compliance with global standards', 2);

    -- 6 Logistics & Delivery
    insert into public.process_steps (title, icon, href, sort_order)
    values ('Logistics & Delivery', 'delivery', '/process/logistics-delivery', 5)
    returning id into step_id;
    insert into public.process_step_services (step_id, name, sort_order) values
      (step_id, 'Worldwide shipping services', 0),
      (step_id, 'CIF, C&F, and Door-to-Door delivery options', 1),
      (step_id, 'Secure and reliable packaging', 2);
  end if;
end $$;
