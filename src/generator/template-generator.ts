import path from 'node:path'
import fs from 'node:fs'
import { TemplatePart } from './type'
import { BeforeFileCopied, copyDirOrFile } from '@/utils/file'

const templateRootPath = path.resolve(__dirname, globalThis.__DEV__ ? '../../template' : '../template')

function buildSourcePath(part: TemplatePart): string {
  return path.resolve(templateRootPath, part)
}

const beforeFileCopied: BeforeFileCopied = (filename, src, dest) => {
  if (filename.startsWith('_')) {
    dest = path.resolve(path.dirname(dest), filename.replace(/^_/, '.'))
  }

  fs.copyFileSync(src, dest)
  return false
}

/**
 * 生成项目模板
 * 将指定目录下的文件拷贝到目标目录下:
 *   - 针对目录类型进行递归拷贝
 *   - 针对 _filename 文件重命名为 .filename
 *
 * @param part - 生成的模板组成部分
 * @param dest - 生成模板的目标路径
 */
export function generateTemplate(part: TemplatePart, dest: string): void {
  const src = buildSourcePath(part)

  // 将模板拷贝到目标目录
  copyDirOrFile(src, dest, { beforeFileCopied })

  // TODO 加工处理
}
