CREATE TABLE `changes` (
	`id` integer PRIMARY KEY NOT NULL,
	`room` text NOT NULL,
	`author` text NOT NULL,
	`label` text NOT NULL,
	`created` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_changes_room` ON `changes` (`room`,`id`);--> statement-breakpoint
CREATE TABLE `entries` (
	`id` text PRIMARY KEY NOT NULL,
	`room` text NOT NULL,
	`author` text NOT NULL,
	`kind` text NOT NULL,
	`body` text NOT NULL,
	`created` text NOT NULL,
	`updated` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_entries_room_kind` ON `entries` (`room`,`kind`);--> statement-breakpoint
CREATE TABLE `members` (
	`token_hash` text PRIMARY KEY NOT NULL,
	`room` text NOT NULL,
	`author` text NOT NULL,
	`partner_token` text
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`room` text NOT NULL,
	`key` text NOT NULL,
	`value` text NOT NULL,
	PRIMARY KEY(`room`, `key`)
);
