---
nav:
  path: /hooks
---

# useThrottle

用来处理节流值。

## 代码演示

### 基础用法

<code hideActions='["CSB"]' src="./demo/demo1.tsx" />

## API

```typescript
const throttledValue = useThrottle(
  value: any,
  option?: Option
);
```

### Params

| 参数   | 说明           | 类型     | 默认值 |
| ------ | -------------- | -------- | ------ |
| value  | 需要节流的值   | `any`    | -      |
| option | 配置节流的行为 | `Option` | -      |

### Option

| 参数     | 说明                     | 类型      | 默认值 |
| -------- | ------------------------ | --------- | ------ |
| wait     | 等待时间，单位为毫秒     | `number`  | `1000` |
| leading  | 是否在延迟开始前调用函数 | `boolean` | `true` |
| trailing | 是否在延迟开始后调用函数 | `boolean` | `true` |
