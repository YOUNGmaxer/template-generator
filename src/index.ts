#!/usr/bin/env node

import './utils/env'
import prompts from 'prompts'
import { generateTemplate, TemplatePart } from './generator'

async function init(): Promise<void> {
  const response = await prompts([
    {
      name: 'projectName',
      type: 'text',
      message: 'Project name:',
      initial: 'azer-project',
      format: (inputName: string) => inputName.trim()
    }
  ])

  const { projectName } = response

  generateTemplate(TemplatePart.Base, projectName)

  console.log(response)
}

init().catch(e => {
  console.error(e)
})
