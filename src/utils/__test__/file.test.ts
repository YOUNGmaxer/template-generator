import { describe, it } from '@jest/globals'
import { copyDirOrFile } from '../file'

describe('file', () => {
  it('copyDirOrFile', () => {
    copyDirOrFile(
      '/Users/azeryang/Mine/Projects/template-generator/template/base',
      '/Users/azeryang/Mine/Projects/template-generator/out/template/base'
    )
  })
})
