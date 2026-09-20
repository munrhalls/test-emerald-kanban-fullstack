-- Milestone 2 wave 1: seed one demo board so the app has something to
-- render as soon as the UI lands. Idempotent: skips seeding if a board
-- named 'Emerald Demo Board' already exists.

do $$
declare
  demo_board_id uuid;
  col_todo uuid;
  col_doing uuid;
  col_done uuid;
begin
  select id into demo_board_id
  from public.boards
  where name = 'Emerald Demo Board'
  limit 1;

  if demo_board_id is null then
    insert into public.boards (name)
    values ('Emerald Demo Board')
    returning id into demo_board_id;

    insert into public.columns (board_id, name, position)
    values
      (demo_board_id, 'To Do', 0),
      (demo_board_id, 'In Progress', 1),
      (demo_board_id, 'Done', 2);

    select id into col_todo from public.columns
      where board_id = demo_board_id and name = 'To Do';
    select id into col_doing from public.columns
      where board_id = demo_board_id and name = 'In Progress';
    select id into col_done from public.columns
      where board_id = demo_board_id and name = 'Done';

    insert into public.cards (column_id, title, description, position)
    values
      (col_todo, 'Sketch board layout', 'Wireframe the columns and card chrome', 0),
      (col_todo, 'Pick accent palette', 'Emerald on abyss with gild highlights', 1),
      (col_doing, 'Wire up Supabase schema', 'Boards, columns, cards with cascade delete', 0),
      (col_doing, 'Build CRUD data layer', 'One lib module per entity', 1),
      (col_done, 'Ship tracer bullet', 'Milestone 1 live DB-to-UI round trip', 0);
  end if;
end $$;
