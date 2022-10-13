import { describe, it } from '@jest/globals'
import { generateTemplate } from '../template-generator'
import { TemplatePart } from '../type'

describe('template-generator', () => {
  it('generateTemplate', () => {
    generateTemplate(TemplatePart.Base, '/Users/azeryang/Mine/Projects/template-generator/out/template/generator/base')
  })
})
