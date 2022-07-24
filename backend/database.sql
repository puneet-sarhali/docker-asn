CREATE TABLE IF NOT EXISTS Notes (
    id SERIAL PRIMARY KEY,
    title varchar(255),
    note_body varchar(4000),
    last_modified timestampTz
);

INSERT INTO notes (title, note_body, last_modified)
VALUES ('note1', 'this is note made by puneet', now());
