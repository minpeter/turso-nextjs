CREATE TABLE `post` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text,
	`content` text,
	`likes` integer DEFAULT 0,
	`userId` text NOT NULL
);
