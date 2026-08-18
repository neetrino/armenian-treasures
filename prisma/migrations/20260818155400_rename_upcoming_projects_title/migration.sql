UPDATE "HomeContent"
SET sections = jsonb_set(sections, '{upcomingProjects,title}', '"ACTIVE FUNDRAISINGS"', false)
WHERE sections IS NOT NULL
  AND sections -> 'upcomingProjects' ->> 'title' IN (
    'WHAT WE ARE BUILDING',
    'What We Are Building'
  );
