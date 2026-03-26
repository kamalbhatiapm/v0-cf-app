-- Update signal types from old values to new ACT/WATCH values
-- Map: breaking/rising -> ACT, emerging/stable/declining -> WATCH

UPDATE current_week_themes
SET signal_type = CASE 
  WHEN signal_type IN ('breaking', 'rising') THEN 'ACT'
  WHEN signal_type IN ('emerging', 'stable', 'declining') THEN 'WATCH'
  ELSE signal_type
END
WHERE signal_type IN ('breaking', 'rising', 'emerging', 'stable', 'declining');

UPDATE themes
SET signal_type = CASE 
  WHEN signal_type IN ('breaking', 'rising') THEN 'ACT'
  WHEN signal_type IN ('emerging', 'stable', 'declining') THEN 'WATCH'
  ELSE signal_type
END
WHERE signal_type IN ('breaking', 'rising', 'emerging', 'stable', 'declining');
