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

export const images = pgTable("image", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    url: varchar("url", { length: 1024 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
    pageId: integer('page_id').notNull().references(() => page.id, { onDelete: 'cascade' }),
});

export const imagesRelations = relations(images, ({ one }) => ({
    page: one(page, {
        fields: [images.pageId],
        references: [page.id],
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
    oneLiner: varchar('one_liner').notNull(),
    url: varchar('url').notNull(),
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
export type SelectImage = InferSelectModel<typeof images>;

export type InsertPage = InferInsertModel<typeof page>;
export type InsertProject = InferInsertModel<typeof project>;
export type InsertSocial = InferInsertModel<typeof socialLink>;
export type InsertImage = InferInsertModel<typeof images>;