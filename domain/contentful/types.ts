import * as Contentful from 'contentful'

export interface TypeAssignmentFields {
  client: Contentful.EntryFields.Symbol
  roles?: Contentful.EntryFields.Text
  startDate: Contentful.EntryFields.Date
  endDate?: Contentful.EntryFields.Date
  description?: Contentful.EntryFields.Text
  techniques?: Contentful.EntryFields.Text
}

export type TypeAssignment = Contentful.Entry<TypeAssignmentFields>

export interface TypeContactFields {
  name: Contentful.EntryFields.Symbol
  header: Contentful.EntryFields.Symbol
  visitingAddress?: Contentful.EntryFields.Text
  image?: Contentful.Asset
  summaryHeader?: Contentful.EntryFields.Symbol
}

export type TypeContact = Contentful.Entry<TypeContactFields>

export interface TypeCvFields {
  name: Contentful.EntryFields.Symbol
  title?: Contentful.EntryFields.Symbol
  introduction?: Contentful.EntryFields.Text
  languages?: Contentful.EntryFields.Text
  techniques?: Contentful.EntryFields.Text
  methods?: Contentful.EntryFields.Text
  assignments?: Contentful.Entry<TypeAssignmentFields>[]
  roleSkills?: Contentful.Entry<TypeSkillFields>[]
  techniqueSkills?: Contentful.Entry<TypeSkillFields>[]
  methodSkills?: Contentful.Entry<TypeSkillFields>[]
  education?: Contentful.EntryFields.Text
  courses?: Contentful.EntryFields.Text
}

export type TypeCv = Contentful.Entry<TypeCvFields>

export interface TypeFellowFields {
  name: Contentful.EntryFields.Symbol
  description: Contentful.EntryFields.Text
  phone?: Contentful.EntryFields.Symbol
  services?: Contentful.Entry<TypeServiceFields>[]
  image?: Contentful.Asset
}

export type TypeFellow = Contentful.Entry<TypeFellowFields>

export interface TypePageFields {
  name: Contentful.EntryFields.Symbol
  header: Contentful.EntryFields.Symbol
  content?: Contentful.EntryFields.Text
  image?: Contentful.Asset
}

export type TypePage = Contentful.Entry<TypePageFields>

export interface TypePostFields {
  image?: Contentful.Asset
  title: Contentful.EntryFields.Symbol
  description: Contentful.EntryFields.Symbol
  sticky: Contentful.EntryFields.Boolean
  postContent: Contentful.EntryFields.Text
}

export type TypePost = Contentful.Entry<TypePostFields>

export interface TypeServiceFields {
  name:
    | 'blog'
    | 'github'
    | 'instagram'
    | 'key'
    | 'linkedin'
    | 'slideshare'
    | 'stack-overflow'
    | 'twitter'
  url: Contentful.EntryFields.Symbol
}

export type TypeService = Contentful.Entry<TypeServiceFields>

export interface TypeSkillFields {
  name?: Contentful.EntryFields.Symbol
  weight: Contentful.EntryFields.Integer
}

export type TypeSkill = Contentful.Entry<TypeSkillFields>

export interface TypeSocialIconFields {
  name: Contentful.EntryFields.Symbol
  icon: Contentful.Asset
  link: Contentful.EntryFields.Symbol
}

export type TypeSocialIcon = Contentful.Entry<TypeSocialIconFields>
