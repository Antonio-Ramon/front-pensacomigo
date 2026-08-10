Confirmation modal over a scrim — use for destructive actions (excluir publicação) or important confirmations. Controlled via `open`.

```jsx
<ConfirmDialog open={open} tone="danger"
  title="Excluir meditação?"
  message="Esta ação não pode ser desfeita."
  confirmLabel="Excluir" onConfirm={remove} onCancel={() => setOpen(false)} />
```
tone: danger (default) | accent. Closes on Esc, scrim click, or Cancelar.
