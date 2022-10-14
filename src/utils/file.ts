import fs from 'node:fs'
import path from 'node:path'

/**
 * 文件拷贝前可进行拦截处理
 *
 * @returns 如果返回 false 则默认拷贝行为不执行
 */
export type BeforeFileCopied = (filename: string, src: string, dest: string) => boolean

interface CopyDirConfig {
  beforeFileCopied: BeforeFileCopied
}

/**
 * 拷贝一个目录
 *   - 对于目录类型文件进行递归拷贝
 *   - 对于普通文件直接拷贝，支持拦截处理
 *
 * @param src - 目录源地址
 * @param dest - 拷贝目的地
 * @param config - 配置项
 */
export function copyDirOrFile(src: string, dest: string, config?: CopyDirConfig): void {
  const stats = fs.statSync(src)
  const name = path.basename(src)

  if (stats.isDirectory()) { // 递归拷贝目录
    // 跳过 node_modules 目录的处理
    if (name === 'node_modules') return

    fs.mkdirSync(dest, { recursive: true })
    for (const file of fs.readdirSync(src)) {
      copyDirOrFile(path.resolve(src, file), path.resolve(dest, file), config)
    }
  } else { // 拷贝文件
    const shouldNext = config?.beforeFileCopied(name, src, dest) ?? true

    if (shouldNext) fs.copyFileSync(src, dest)
  }
}
