import { pgTable, serial, timestamp, varchar, text, integer, pgEnum, boolean } from 'drizzle-orm/pg-core';
import { InferInsertModel, InferSelectModel, relations } from 'drizzle-orm';
import { users } from './auth-schema';

export const socialsEnum = pgEnum('socials', ['twitter', 'instagram', 'facebook', 'linkedin', 'github', 'website']);

export const page = pgTable('page', {
    id: serial('id').primaryKey(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    name: text('name').notNull(),
    bio: text('bio').notNull(),
    avatar: text('avatar').notNull(),
    pageSlug: text('page_slug').notNull().unique(),
    userId: text('user_id').notNull().references(() => users.id),
});

export const pageRelations = relations(page, ({ many, one }) => ({
    socials: many(socialLink),
    projects: many(project),
    githubCalendar: one(githubCalendar),
    user: one(users, {
        fields: [page.userId],
        references: [users.id],
    }),
}));

export const socialLink = pgTable('social_link', {
    id: serial('id').primaryKey(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    type: varchar('type').notNull(),
    link: varchar('link').notNull(),
    pageId: integer('page_id').notNull().references(() => page.id, { onDelete: 'cascade' }),
});

export const socialLinkRelations = relations(socialLink, ({ one }) => ({
    page: one(page, {
        fields: [socialLink.pageId],
        references: [page.id],
    }),
}));

export const project = pgTable('project', {
    id: serial('id').primaryKey(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    name: varchar('name').notNull(),
    url: varchar('url').notNull(),
    oneLiner: varchar('one_liner').notNull(),
    mrr: varchar('mrr').notNull(),
    pageId: integer('page_id').notNull().references(() => page.id, { onDelete: 'cascade' }),
});

export const projectRelations = relations(project, ({ one }) => ({
    page: one(page, {
        fields: [project.pageId],
        references: [page.id],
    }),
}));

export const githubCalendar = pgTable('github_calendar', {
    id: serial('id').primaryKey(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    username: varchar('username').notNull(),
    theme: varchar('theme').notNull().default('github'),
    show: boolean('show').notNull().default(false),
    pageId: integer('page_id').notNull().references(() => page.id, { onDelete: 'cascade' }),
});

export const githubCalendarRelations = relations(githubCalendar, ({ one }) => ({
    page: one(page, {
        fields: [githubCalendar.pageId],
        references: [page.id],
    }),
}));

export const feedback = pgTable('feedback', {
    id: serial('id').primaryKey(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    type: varchar('type').notNull(),
    title: varchar('title').notNull(),
    message: varchar('message').notNull(),
    userId: varchar('user_id').notNull().references(() => users.id),
});

export const feedbackRelations = relations(feedback, ({ one }) => ({
    user: one(users, {
        fields: [feedback.userId],
        references: [users.id],
    }),
}));

export type SelectPage = InferSelectModel<typeof page>;
export type SelectProject = InferSelectModel<typeof project>;
export type SelectSocial = InferSelectModel<typeof socialLink>;
export type SelectGithubCalendar = InferSelectModel<typeof githubCalendar>;
export type SelectFeedback = InferSelectModel<typeof feedback>;

export type InsertPage = InferInsertModel<typeof page>;
export type InsertProject = InferInsertModel<typeof project>;
export type InsertSocial = InferInsertModel<typeof socialLink>;
export type InsertGithubCalendar = InferInsertModel<typeof githubCalendar>;
export type InsertFeedback = InferInsertModel<typeof feedback>;