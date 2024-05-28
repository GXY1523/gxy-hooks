---
nav:
  path: /hooks
---

# useDefault

当 state 为 null 或 undefined 时返回默认值。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
const [user, setUser] = useDefault(defaultUser:T, initialUser:T | (() => T));
```

### Params

| 参数        | 说明                            | 类型               | 默认值 |
| ----------- | ------------------------------- | ------------------ | ------ |
| defaultUser | 当值为 undefined 时返回的默认值 | `T`                | -      |
| initialUser | 初始值                          | `T   \| (() => T)` | -      |

### Result

| 参数     | 说明                                        | 类型      |
| -------- | ------------------------------------------- | --------- |
| value    | 如果 value 为 undefined,则返回 defaultValue | `T`       |
| setValue | 用于更新 value 的函数。接受新的值作为参数。 | `() => T` |
