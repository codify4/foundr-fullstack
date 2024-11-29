import { pgTable, serial, timestamp, varchar, text, integer, pgEnum } from 'drizzle-orm/pg-core';
import { InferInsertModel, InferSelectModel, relations } from 'drizzle-orm';
import { users } from './auth-schema';

export const socialsEnum = pgEnum('socials', ['twitter', 'instagram', 'facebook', 'linkedin', 'github', 'website']);

export const page = pgTable('page', {
    id: serial('id').primaryKey(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    name: text('name').notNull(),
    bio: text('bio').notNull(),
    pageSlug: text('page_slug').notNull().unique(),
    userId: text('user_id').notNull().references(() => users.id),
});

export const pageRelations = relations(page, ({ many, one }) => ({
    socials: many(socialLink),
    projects: many(project),
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

export type SelectPage = InferSelectModel<typeof page>;
export type SelectProject = InferSelectModel<typeof project>;
export type SelectSocial = InferSelectModel<typeof socialLink>;

export type InsertPage = InferInsertModel<typeof page>;
export type InsertProject = InferInsertModel<typeof project>;
export type InsertSocial = InferInsertModel<typeof socialLink>;