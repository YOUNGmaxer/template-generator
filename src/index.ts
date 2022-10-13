#!/usr/bin/env node

import prompts from 'prompts'

async function init (): Promise<void> {
  const response = await prompts([
    {
      name: 'age',
      type: 'number',
      message: 'How old are you'
    }
  ])

  console.log(response)
}

init().catch(e => {
  console.error(e)
})
