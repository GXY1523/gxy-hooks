---
nav:
  path: /hooks
---

# useTitle

用于设置页面标题。

## 代码演示

### 基础用法

<code hideActions='["CSB"]' src="./demo/demo1.tsx" />

## API

```typescript
useTitle(title: string, option?: Option);
```

### Params

| 参数  | 说明     | 类型     | 默认值 |
| ----- | -------- | -------- | ------ |
| title | 页面标题 | `string` | -      |

### Option

| 参数                 | 说明                               | 类型      | 默认值  |
| -------------------- | ---------------------------------- | --------- | ------- |
| restorePreviousTitle | 组件卸载时，是否恢复上一个页面标题 | `boolean` | `false` |
