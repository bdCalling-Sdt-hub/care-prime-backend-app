import { Model } from 'mongoose'

export type IRule = {
  content: string
  type: 'privacy' | 'terms' | 'about' | 'disclaimer' | 'resources'
}

export type RuleModel = Model<IRule, Record<string, unknown>>
