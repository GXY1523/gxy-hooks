# gxy-hooks

React Hooks

## ⛰️ 能力支持

### 1. 可靠的代码健壮

使用 Typescript 构建，提供完善的类型定义文件

### 2. 完善的文档能力

支持文档记录，支持 demo 演示

### 3. 完整的测试用例

配套完整的测试用例，可提升项目健壮性

## 🌟 设计目的

1. xyHooks 库可实现功能复用。可以将某些功能逻辑抽象成可以复用的 Hooks，从而在不同的组件中共享相同的逻辑。帮助开发者减少相同代码块的编写工作，减少代码量，简化组件逻辑，可提高代码的可复用性。
2. xyHooks 库可提高代码的可维护性。将特定的功能逻辑封装在 Hooks 中，使得代码结构更加清晰并且更易于管理，代码的可读性增强。

## ⚒️ 技术选型

### 包管理工具 -- pnpm

选择`pnpm`作为包管理工具，主要原因有：

1. `pnpm`安装速度更快，高效磁盘空间；
2. `pnpm`的`lock`文件适用于多个单一子功能的模块，且能保证每个模块的依赖不耦合；
3. 打包产物清晰，打包后产物确保全部为静态站点资源；

### 构建工具 -- webpack & gulp

1. 最终产物为多个基础子功能模块的耦合，选择`gulp`这种流程式的构建工具，能够更清晰的表达构建流程；
2. 选择常用的`webpack`作为构建产物的声明式接入方式；

### 静态文件打包工具 -- dumi

就目前前端社区而言，`dumi`是当之无愧的为组件研发而生的静态站点解决方案；

### 测试工具 -- jest

`jest`功能全面，继承了开发者所需要的断言、测试覆盖率、JSDom 等所有的测试工具，能够很好地支撑原子化集合的工具函数；

## 其他

### 生成`CHANGELOG`

参考[conventional-changelog-cli](https://www.npmjs.com/package/conventional-changelog-cli)，全局安装`conventional-changelog-cli`：

```bash
npm install -g conventional-changelog-cli
pnpm run changelog
```

## 📧 联系

- **GitHub**: <https://github.com/GXY1523/gxy-hooks>

</br>
