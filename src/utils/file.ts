interface CopyDirConfig {
  beforeFileCopied: (filename: string, src: string, dest: string) => boolean
}

/**
 * 拷贝一个目录
 *   - 对于目录类型文件进行递归拷贝
 *   - 对于普通文件直接拷贝，支持拦截处理
 *
 * @param src - 目录源地址
 * @param dest - 拷贝目的地
 */
export function copyDir(src: string, dest: string, config: CopyDirConfig): void {

}
