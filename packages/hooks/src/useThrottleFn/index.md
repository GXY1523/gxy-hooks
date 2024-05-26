---
nav:
  path: /hooks
---

# useThrottleFn

用于处理函数节流。

## 代码演示

### 基础用法

<code hideActions='["CSB"]' src="./demo/demo1.tsx" />

## API

```typescript
const {
  run,
  cancel,
  flush
} = useThrottleFn(
  fun: (...args: any[]) => any,
  option?: Option
);
```

### Params

| 参数   | 说明           | 类型                      | 默认值 |
| ------ | -------------- | ------------------------- | ------ |
| fun    | 需要节流的函数 | `(...args: any[]) => any` | -      |
| option | 配置节流的行为 | `Option`                  | -      |

### Option

| 参数     | 说明                     | 类型      | 默认值 |
| -------- | ------------------------ | --------- | ------ |
| wait     | 等待时间，单位为毫秒     | `number`  | `1000` |
| leading  | 是否在延迟开始前调用函数 | `boolean` | `true` |
| trailing | 是否在延迟开始后调用函数 | `boolean` | `true` |

### Result

| 参数   | 说明                               | 类型                      |
| ------ | ---------------------------------- | ------------------------- |
| run    | 触发执行 fn，函数参数将会传递给 fn | `(...args: any[]) => any` |
| cancel | 取消当前节流                       | `() => void`              |
| flush  | 当前节流立即调用                   | `() => void`              |
