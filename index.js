#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const {argv} = process
const filePath = __dirname
const currentPath = process.cwd()

// cli parse
argv.shift()
argv.shift()

const type = argv[0]
const name = argv[1]

if (type === 'component' || type === 'c') {
  if (!/^[A-Z]/.test(String(name))) {
    console.log('组件开头请使用大写英文字母!')
    process.exit(1)
  }
  createComponent(name)
} else if (type === 'module' || type === 'm') {
  if (!/^[a-z]/.test(String(name))) {
    console.log('组件开头请使用小写英文字母!')
    process.exit(1)
  }
  createModule(name)
} else if (type === 'help' || type === 'h') {
  console.log('  Usage:')
  console.log('   node index.js [component(c)|module(m)] Name')
  console.log('   node index.js help')
  console.log('')
  console.log('   example:')
  console.log(chalk.blue.bold('   node index c newComponet'))
  console.log(chalk.blue.bold('   node index m newModule'))
  console.log(chalk.blue.bold('   node index h'))
} else {
  console.log('暂不支持该功能!')
  process.exit(1)
}

function createComponent() {
  rendTpl(
    path.join(currentPath, '/src/component/'),
    path.join(filePath, './tpl/component/')
  )
}
function createModule() {
  console.log(name)
}

// 生成结构
function rendTpl(targetPath, sourcePath) {
  const targeFullDirectory = path.join(targetPath, name)

  if (fs.existsSync(targeFullDirectory)) {
    console.log('组件或模块已存在')
    process.exit(1)
  }
  // 新建目录
  fs.mkdirSync(targeFullDirectory)
  // 读取模板文件
  const files = fs.readdirSync(sourcePath)

  // 新建文件
  files.forEach(filename => {
    const sourceFullname = path.join(sourcePath, filename)
    const targetFullname = path.join(
      targetPath,
      name,
      filename.replace('.tpl', '').replace('componentName', name)
    )
    const tpl = fs.readFileSync(sourceFullname).toString()
    const compiledData = renderString(tpl, {componentName: name})
    fs.writeFileSync(targetFullname, compiledData)
  })
  console.log(chalk.green(`新建${String(name)}成功!`))
}

// 模板引擎
function renderString(template, data) {
  const reg = /\{\{(\w+)\}\}/ // 模板字符串正则
  if (reg.test(template)) {
    // 判断模板里是否有模板字符串
    const regName = reg.exec(template)[1] // 查找当前模板里第一个模板字符串的字段
    const newTemplate = template.replace(reg, data[regName]) // 将第一个模板字符串渲染
    return renderString(newTemplate, data) // 递归的渲染并返回渲染后的结构
  }
  return template // 如果模板没有模板字符串直接返回
}
