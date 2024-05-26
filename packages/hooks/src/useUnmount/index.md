---
nav:
  path: /hooks
---

# useUnmount

组件卸载（unmount）时执行。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
useUnmount(fun: () => void);
```

### 参数

| 参数 | 说明                 | 类型         | 默认值 |
| ---- | -------------------- | ------------ | ------ |
| fn   | 组件卸载时执行的函数 | `() => void` | -      |
