-- Seed Data for Kalyana South Indian Wedding Planner

INSERT INTO service_categories (id, name, description, display_order) VALUES
('decoration', 'Stage & Mandapam Decoration', 'Authentic traditional flower & brass setups', 1),
('food', 'Catering & Banana Leaf Feast', 'Royal traditional Sadhya and fusion buffets', 2),
('photography', 'Cinematic Photography & Film', 'High-definition 4K photography and drone coverage', 3),
('makeup', 'Bridal Makeup & Hair Styling', 'Traditional Kanchipuram drape & HD airbrush makeup', 4),
('purohit', 'Vedic Purohit Services', 'Auspicious Muhurtham rites & Samagri management', 5),
('security', 'VIP Security & Bouncers', 'Professional uniformed crowd and parking management', 6),
('welcome_girls', 'Traditional Welcome Hostesses', 'Silk saree hostesses with floral Aarathi plates', 7),
('dancers', 'Cultural Performances & Troupe', 'Live Chenda Melam, Dollu Kunitha & Bharatanatyam', 8)
ON CONFLICT DO NOTHING;

INSERT INTO services (id, category, name, description, price, unit, image_url, popular) VALUES
('dec-saptapadi-mandapam', 'decoration', 'Saptapadi Royal Brass Mandapam', 'Grand traditional brass mandapam decorated with fresh jasmine & lotus.', 150000.00, 'setup', 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80', true),
('dec-chepparam', 'decoration', 'Traditional Chepparam Mandapam Backdrop', 'Authentic temple architectural backdrop with brass lamps and golden drapes.', 85000.00, 'setup', 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=800&q=80', false),
('dec-nadaswaram', 'decoration', 'Live Nadaswaram & Thavil Artists', 'Traditional auspicious live Nadaswaram ensemble.', 35000.00, 'per event', 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&w=800&q=80', true)
ON CONFLICT DO NOTHING;

INSERT INTO wedding_packages (id, name, tagline, tier, base_price, guest_capacity, description, is_popular) VALUES
('pkg-silver', 'Silver Heritage Package', 'Intimate Elegance', 'silver', 350000.00, 300, 'Ideal for 300 guests including essential mandapam and feast.', false),
('pkg-gold', 'Gold Royalty Package', 'Our Most Popular Choice', 'gold', 650000.00, 600, 'Comprehensive luxury setup for 600 guests.', true),
('pkg-diamond', 'Diamond Sovereign Package', 'Opulent Grandeur', 'diamond', 1200000.00, 1000, 'Unmatched luxury for up to 1000 guests.', false),
('pkg-royal', 'Royal Samrat Bespoke', 'Regal Palace Level', 'royal', 2200000.00, 1500, 'Bespoke palace-level celebration with infinite customization.', false)
ON CONFLICT DO NOTHING;
