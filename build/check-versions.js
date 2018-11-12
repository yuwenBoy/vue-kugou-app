'use strict'
/**
 * 该模块用于build构建打包时，检测node、npm版本
 * 1、进行npm、弄得版本检查（版本不相对时，会出现无法打包，某些文件无法正常编译运行的情况）
 */
// chalk插件，作用时改变命令行中的字体颜色的字
const chalk = require('chalk')
// npm版本号的检查
const semver = require('semver')
const packageConfig = require('../package.json')
// shelljs插件，作用用来执行unix系统命令
const shell = require('shelljs')

// 脚本通过child_process模块新建子进程，从而执行 unix系统命令
// 这段代码实际就是把cmd这个参数传递的值转化成前后没有空格的字符串，也就是版本号
function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim()
}

// 检查node版本信息
// 一、使用semver二插件把版本信息转化成规定格式，也就是' =v1.2.3' - > '1.2.3'这种功能
// 二、这是规定的package.json中engines选项的node版本信息 "node":">= 4.0.0"
const versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version), // 当前node版本信息
    versionRequirement: packageConfig.engines.node // package.json里面所要求的node版本信息
  }
]

if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm
  })
}

module.exports = function () {
  const warnings = []

  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i]

    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()

    for (let i = 0; i < warnings.length; i++) {
      const warning = warnings[i]
      console.log('  ' + warning)
    }

    console.log()
    process.exit(1) // 用来退出当前进程，它可以接受一个数值参数，如果参数大于0，表示执行失败，等于0表示执行成功。
  }
}
