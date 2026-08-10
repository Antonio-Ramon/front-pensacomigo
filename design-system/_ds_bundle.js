/* @ds-bundle: {"format":4,"namespace":"PensaComigoDesignSystem_3d6f1f","components":[{"name":"Comment","sourcePath":"components/blog/Comment.jsx"},{"name":"LinkPreview","sourcePath":"components/blog/LinkPreview.jsx"},{"name":"MetaLine","sourcePath":"components/blog/MetaLine.jsx"},{"name":"PostCard","sourcePath":"components/blog/PostCard.jsx"},{"name":"TagFilter","sourcePath":"components/blog/TagFilter.jsx"},{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"ConfirmDialog","sourcePath":"components/core/ConfirmDialog.jsx"},{"name":"EmptyState","sourcePath":"components/core/EmptyState.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"SectionHeading","sourcePath":"components/core/SectionHeading.jsx"},{"name":"Select","sourcePath":"components/core/Select.jsx"},{"name":"Skeleton","sourcePath":"components/core/Skeleton.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Textarea","sourcePath":"components/core/Textarea.jsx"}],"sourceHashes":{"components/blog/Comment.jsx":"e9d27a457dff","components/blog/LinkPreview.jsx":"66bc2cc442d4","components/blog/MetaLine.jsx":"03b805f642e5","components/blog/PostCard.jsx":"186174eeb159","components/blog/TagFilter.jsx":"2a823fcbd569","components/core/Avatar.jsx":"d429759a9ba7","components/core/Badge.jsx":"08590f933604","components/core/Button.jsx":"86a07ae7fe9b","components/core/Card.jsx":"73068728cec1","components/core/ConfirmDialog.jsx":"e038e9019d2d","components/core/EmptyState.jsx":"6a4e427845ea","components/core/IconButton.jsx":"38b3020511a5","components/core/Input.jsx":"a43b72b1a0b9","components/core/SectionHeading.jsx":"5f04e422832b","components/core/Select.jsx":"eb0f12e23ee3","components/core/Skeleton.jsx":"d9364546547b","components/core/Tag.jsx":"8e9f7624eec5","components/core/Textarea.jsx":"85187dffa1d4","ui_kits/admin-editor/BlockEditor.jsx":"0912dc764f57","ui_kits/admin-editor/PostEditorScreen.jsx":"a987f13670fb","ui_kits/admin-editor/PostsListScreen.jsx":"b68cd328e9f6","ui_kits/admin-editor/data.js":"896cf9338591","ui_kits/public-site/Chrome.jsx":"d7acac2f4fba","ui_kits/public-site/HomeScreen.jsx":"3b24f4992375","ui_kits/public-site/PostScreen.jsx":"eb656c7ad187","ui_kits/public-site/data.js":"e2375f1fb488"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.PensaComigoDesignSystem_3d6f1f = window.PensaComigoDesignSystem_3d6f1f || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/blog/LinkPreview.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Horizontal external-link preview card: thumbnail, title, description, source domain. */
function LinkPreview({
  url,
  title,
  description,
  image,
  domain,
  style,
  ...rest
}) {
  const [h, setH] = React.useState(false);
  const host = domain || (url ? url.replace(/^https?:\/\//, '').split('/')[0] : '');
  return /*#__PURE__*/React.createElement("a", _extends({
    href: url,
    target: "_blank",
    rel: "noreferrer",
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: 'flex',
      textDecoration: 'none',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-hair)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      boxShadow: h ? 'var(--shadow-md)' : 'var(--shadow-xs)',
      transition: 'box-shadow var(--dur) var(--ease)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 160,
      flexShrink: 0,
      background: 'var(--surface-wash)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, image ? /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : /*#__PURE__*/React.createElement("i", {
    "data-lucide": "link",
    style: {
      width: 22,
      height: 22,
      color: 'var(--accent-500)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--sp-4) var(--sp-5)',
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-ui-xs)',
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      color: 'var(--text-faint)',
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "link",
    style: {
      width: 12,
      height: 12
    }
  }), host), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '1.15rem',
      fontWeight: 'var(--w-semibold)',
      color: 'var(--text-strong)',
      lineHeight: 1.25
    }
  }, title), description && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-body-sm)',
      color: 'var(--text-muted)',
      lineHeight: 1.5,
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    }
  }, description)));
}
Object.assign(__ds_scope, { LinkPreview });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/blog/LinkPreview.jsx", error: String((e && e.message) || e) }); }

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Round avatar. Falls back to an initial on the accent wash when no `src`. */
function Avatar({
  src,
  name = '',
  size = 40,
  style,
  ...rest
}) {
  const initial = name.trim().charAt(0).toUpperCase() || '·';
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      width: size,
      height: size,
      borderRadius: '50%',
      flexShrink: 0,
      overflow: 'hidden',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--accent-100)',
      color: 'var(--accent-700)',
      fontFamily: 'var(--font-ui)',
      fontWeight: 'var(--w-semibold)',
      fontSize: size * 0.42,
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initial);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/blog/Comment.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** One comment: avatar, name, relative time, body, Reply link. Nest one level via `reply`. */
function Comment({
  name,
  avatar,
  time,
  children,
  onReply,
  reply = false,
  replies = [],
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--sp-3)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    name: name,
    src: avatar,
    size: reply ? 32 : 38
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 'var(--sp-3)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontWeight: 'var(--w-semibold)',
      fontSize: 'var(--fs-ui-sm)',
      color: 'var(--text-strong)'
    }
  }, name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-ui-xs)',
      color: 'var(--text-faint)'
    }
  }, time)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-body-sm)',
      lineHeight: 1.6,
      color: 'var(--text-body)',
      margin: '4px 0 6px'
    }
  }, children), !reply && onReply && /*#__PURE__*/React.createElement("button", {
    onClick: onReply,
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-ui-xs)',
      fontWeight: 'var(--w-medium)',
      color: 'var(--accent-600)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "reply",
    style: {
      width: 13,
      height: 13
    }
  }), "Responder"))), replies.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 50,
      marginTop: 'var(--sp-4)',
      paddingLeft: 'var(--sp-4)',
      borderLeft: '1px solid var(--border-hair)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--sp-4)'
    }
  }, replies.map((r, i) => /*#__PURE__*/React.createElement(Comment, _extends({
    key: i
  }, r, {
    reply: true
  })))));
}
Object.assign(__ds_scope, { Comment });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/blog/Comment.jsx", error: String((e && e.message) || e) }); }

// components/blog/MetaLine.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Meta line: author avatar + name + separator + date, and optional read-time. */
function MetaLine({
  author,
  avatar,
  date,
  readTime,
  size = 'md',
  style,
  ...rest
}) {
  const fs = size === 'sm' ? 'var(--fs-ui-xs)' : 'var(--fs-ui-sm)';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--sp-3)',
      fontFamily: 'var(--font-ui)',
      fontSize: fs,
      color: 'var(--text-muted)',
      ...style
    }
  }, rest), author && /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    name: author,
    src: avatar,
    size: size === 'sm' ? 26 : 32
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, author && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-body)',
      fontWeight: 'var(--w-medium)'
    }
  }, author), author && date && /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.5
    }
  }, "\xB7"), date && /*#__PURE__*/React.createElement("span", null, date), readTime && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.5
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, readTime))));
}
Object.assign(__ds_scope, { MetaLine });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/blog/MetaLine.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Small status badge. Tones: draft (neutral), published (success), warning, danger. */
function Badge({
  tone = 'draft',
  children,
  style,
  ...rest
}) {
  const tones = {
    draft: {
      background: 'var(--surface-sunken)',
      color: 'var(--text-muted)',
      border: '1px solid var(--border-hair)'
    },
    published: {
      background: 'var(--success-100)',
      color: 'var(--success-600)'
    },
    warning: {
      background: 'var(--warning-100)',
      color: 'var(--warning-600)'
    },
    danger: {
      background: 'var(--danger-100)',
      color: 'var(--danger-600)'
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: 'var(--font-ui)',
      fontWeight: 'var(--w-medium)',
      fontSize: 'var(--fs-ui-xs)',
      letterSpacing: '0.02em',
      padding: '3px 10px',
      borderRadius: 'var(--radius-pill)',
      lineHeight: 1.3,
      ...tones[tone],
      ...style
    }
  }, rest), tone === 'published' && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'var(--success-600)'
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Action button. Variants: primary (teal), warm (terracotta), secondary (outline), ghost. */
function Button({
  variant = 'primary',
  size = 'md',
  disabled,
  children,
  style,
  ...rest
}) {
  const base = {
    fontFamily: 'var(--font-ui)',
    fontWeight: 'var(--w-semibold)',
    borderRadius: 'var(--radius-md)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--sp-2)',
    border: '1px solid transparent',
    transition: 'background var(--dur) var(--ease), color var(--dur) var(--ease), border-color var(--dur) var(--ease), transform var(--dur-fast) var(--ease)',
    lineHeight: 1,
    whiteSpace: 'nowrap',
    opacity: disabled ? 0.5 : 1
  };
  const sizes = {
    sm: {
      fontSize: 'var(--fs-ui-sm)',
      padding: '8px 14px'
    },
    md: {
      fontSize: 'var(--fs-ui)',
      padding: '11px 20px'
    },
    lg: {
      fontSize: 'var(--fs-ui)',
      padding: '14px 26px'
    }
  };
  const variants = {
    primary: {
      background: 'var(--accent-600)',
      color: 'var(--text-on-accent)'
    },
    warm: {
      background: 'var(--warm-600)',
      color: 'var(--text-on-accent)'
    },
    secondary: {
      background: 'var(--surface-card)',
      color: 'var(--text-strong)',
      borderColor: 'var(--border-strong)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-body)'
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    disabled: disabled,
    style: {
      ...base,
      ...sizes[size],
      ...variants[variant],
      ...style
    },
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = 'scale(0.98)';
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = 'scale(1)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'scale(1)';
      if (variant === 'primary') e.currentTarget.style.background = 'var(--accent-600)';
      if (variant === 'warm') e.currentTarget.style.background = 'var(--warm-600)';
      if (variant === 'ghost') e.currentTarget.style.background = 'transparent';
      if (variant === 'secondary') e.currentTarget.style.background = 'var(--surface-card)';
    },
    onMouseEnter: e => {
      if (disabled) return;
      if (variant === 'primary') e.currentTarget.style.background = 'var(--accent-700)';
      if (variant === 'warm') e.currentTarget.style.background = 'var(--warm-700)';
      if (variant === 'ghost') e.currentTarget.style.background = 'var(--surface-sunken)';
      if (variant === 'secondary') e.currentTarget.style.background = 'var(--surface-sunken)';
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Generic white surface card. `pad` toggles inner padding; `hover` enables lift on hover. */
function Card({
  pad = true,
  hover = false,
  children,
  style,
  ...rest
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => hover && setH(true),
    onMouseLeave: () => hover && setH(false),
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-hair)',
      borderRadius: 'var(--radius-lg)',
      padding: pad ? 'var(--sp-6)' : 0,
      boxShadow: h ? 'var(--shadow-md)' : 'var(--shadow-sm)',
      transition: 'box-shadow var(--dur) var(--ease), transform var(--dur) var(--ease)',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/ConfirmDialog.jsx
try { (() => {
/** Confirmation dialog centered over a scrim. tone="danger" for destructive actions. */
function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  tone = 'danger',
  onConfirm,
  onCancel
}) {
  React.useEffect(() => {
    if (!open) return;
    if (window.lucide) window.lucide.createIcons();
    const h = e => {
      if (e.key === 'Escape') onCancel && onCancel();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [open, onCancel]);
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onCancel,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--sp-5)',
      background: 'rgba(22,21,15,0.42)',
      backdropFilter: 'blur(2px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation(),
    style: {
      width: '100%',
      maxWidth: 420,
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-hair)',
      boxShadow: 'var(--shadow-lg)',
      padding: 'var(--sp-6)',
      animation: 'pc-dialog-in 180ms cubic-bezier(0.4,0,0.2,1)'
    }
  }, /*#__PURE__*/React.createElement("style", null, `@keyframes pc-dialog-in{from{opacity:0;transform:translateY(8px) scale(0.98)}to{opacity:1;transform:none}}`), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--sp-4)',
      marginBottom: 'var(--sp-4)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 42,
      height: 42,
      borderRadius: '50%',
      flexShrink: 0,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: tone === 'danger' ? 'var(--danger-100)' : 'var(--accent-100)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": tone === 'danger' ? 'trash-2' : 'help-circle',
    style: {
      width: 20,
      height: 20,
      color: tone === 'danger' ? 'var(--danger-600)' : 'var(--accent-600)'
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-h3)',
      fontWeight: 600,
      color: 'var(--text-strong)',
      margin: '0 0 6px'
    }
  }, title), message && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-body-sm)',
      lineHeight: 1.6,
      color: 'var(--text-muted)',
      margin: 0
    }
  }, message))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 'var(--sp-3)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "secondary",
    onClick: onCancel
  }, cancelLabel), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: tone === 'danger' ? 'primary' : 'primary',
    onClick: onConfirm,
    style: tone === 'danger' ? {
      background: 'var(--danger-600)'
    } : undefined
  }, confirmLabel))));
}
Object.assign(__ds_scope, { ConfirmDialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ConfirmDialog.jsx", error: String((e && e.message) || e) }); }

// components/core/EmptyState.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Empty-state block: quiet Lucide glyph, serif message, optional action. */
function EmptyState({
  icon = 'feather',
  title,
  message,
  action,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      textAlign: 'center',
      padding: 'var(--sp-9) var(--sp-5)',
      maxWidth: 420,
      margin: '0 auto',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      borderRadius: '50%',
      background: 'var(--surface-wash)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 'var(--sp-4)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    style: {
      width: 24,
      height: 24,
      color: 'var(--accent-500)'
    }
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-h3)',
      fontWeight: 'var(--w-semibold)',
      color: 'var(--text-strong)',
      margin: '0 0 var(--sp-2)'
    }
  }, title), message && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-body-sm)',
      color: 'var(--text-muted)',
      lineHeight: 1.6,
      margin: '0 0 var(--sp-5)'
    }
  }, message), action);
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Icon-only button (Lucide glyph via `icon` name). For search, share, actions. */
function IconButton({
  icon,
  size = 'md',
  label,
  variant = 'ghost',
  style,
  ...rest
}) {
  const dim = size === 'sm' ? 32 : size === 'lg' ? 44 : 38;
  const variants = {
    ghost: {
      background: 'transparent',
      border: '1px solid transparent',
      color: 'var(--text-muted)'
    },
    outline: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-hair)',
      color: 'var(--text-body)'
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": label,
    title: label,
    style: {
      width: dim,
      height: dim,
      borderRadius: 'var(--radius-md)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'background var(--dur) var(--ease), color var(--dur) var(--ease)',
      ...variants[variant],
      ...style
    },
    onMouseEnter: e => {
      e.currentTarget.style.background = 'var(--surface-sunken)';
      e.currentTarget.style.color = 'var(--accent-600)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = variant === 'outline' ? 'var(--surface-card)' : 'transparent';
      e.currentTarget.style.color = variant === 'outline' ? 'var(--text-body)' : 'var(--text-muted)';
    }
  }, rest), /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    style: {
      width: size === 'sm' ? 16 : 19,
      height: size === 'sm' ? 16 : 19
    }
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Text input with warm hairline border + accent focus ring. Pass `label` to render a field label. */
function Input({
  label,
  id,
  style,
  wrapStyle,
  ...rest
}) {
  const [f, setF] = React.useState(false);
  const input = /*#__PURE__*/React.createElement("input", _extends({
    id: id,
    onFocus: () => setF(true),
    onBlur: () => setF(false),
    style: {
      width: '100%',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-ui)',
      color: 'var(--text-strong)',
      background: 'var(--surface-card)',
      border: `1px solid ${f ? 'var(--accent-500)' : 'var(--border-strong)'}`,
      borderRadius: 'var(--radius-md)',
      padding: '11px 14px',
      outline: 'none',
      boxShadow: f ? 'var(--ring)' : 'none',
      transition: 'border-color var(--dur) var(--ease), box-shadow var(--dur) var(--ease)',
      boxSizing: 'border-box',
      ...style
    }
  }, rest));
  if (!label) return input;
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      display: 'block',
      ...wrapStyle
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-ui-sm)',
      fontWeight: 'var(--w-medium)',
      color: 'var(--text-body)',
      marginBottom: 'var(--sp-2)'
    }
  }, label), input);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionHeading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Section heading: optional CAPS overline + serif display title, editorial rhythm. */
function SectionHeading({
  overline,
  title,
  align = 'left',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      textAlign: align,
      ...style
    }
  }, rest), overline && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-ui-xs)',
      fontWeight: 'var(--w-semibold)',
      letterSpacing: 'var(--tracking-overline)',
      textTransform: 'uppercase',
      color: 'var(--warm)',
      marginBottom: 'var(--sp-3)'
    }
  }, overline), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-h2)',
      fontWeight: 'var(--w-semibold)',
      letterSpacing: 'var(--tracking-heading)',
      lineHeight: 'var(--lh-heading)',
      color: 'var(--text-strong)',
      margin: 0
    }
  }, title));
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/core/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Native select styled to match inputs, with a Lucide chevron. */
function Select({
  label,
  id,
  options = [],
  style,
  wrapStyle,
  ...rest
}) {
  const el = /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: id,
    style: {
      width: '100%',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-ui)',
      color: 'var(--text-strong)',
      background: 'var(--surface-card)',
      appearance: 'none',
      border: '1px solid var(--border-strong)',
      borderRadius: 'var(--radius-md)',
      padding: '11px 38px 11px 14px',
      outline: 'none',
      cursor: 'pointer',
      boxSizing: 'border-box',
      ...style
    }
  }, rest), options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value ?? o,
    value: o.value ?? o
  }, o.label ?? o))), /*#__PURE__*/React.createElement("i", {
    "data-lucide": "chevron-down",
    style: {
      position: 'absolute',
      right: 12,
      top: '50%',
      transform: 'translateY(-50%)',
      width: 17,
      height: 17,
      color: 'var(--text-muted)',
      pointerEvents: 'none'
    }
  }));
  if (!label) return el;
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      display: 'block',
      ...wrapStyle
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-ui-sm)',
      fontWeight: 'var(--w-medium)',
      color: 'var(--text-body)',
      marginBottom: 'var(--sp-2)'
    }
  }, label), el);
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Select.jsx", error: String((e && e.message) || e) }); }

// components/core/Skeleton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Loading skeleton block. Shape: line | title | thumb | circle. Animated shimmer. */
function Skeleton({
  shape = 'line',
  width,
  height,
  style,
  ...rest
}) {
  const presets = {
    line: {
      width: width || '100%',
      height: height || 14,
      borderRadius: 'var(--radius-sm)'
    },
    title: {
      width: width || '70%',
      height: height || 28,
      borderRadius: 'var(--radius-sm)'
    },
    thumb: {
      width: width || '100%',
      aspectRatio: '16 / 9',
      height,
      borderRadius: 'var(--radius-md)'
    },
    circle: {
      width: width || 40,
      height: height || 40,
      borderRadius: '50%'
    }
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: 'linear-gradient(90deg,var(--paper-1) 25%,var(--surface-wash) 37%,var(--paper-1) 63%)',
      backgroundSize: '400% 100%',
      animation: 'pc-shimmer 1.4s ease infinite',
      ...presets[shape],
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("style", null, `@keyframes pc-shimmer{0%{background-position:100% 0}100%{background-position:-100% 0}}`));
}
Object.assign(__ds_scope, { Skeleton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Skeleton.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Fully-rounded pill tag. `active` fills the tone color. `tone`: warm (default) | teal. `onRemove` shows an × (chip). */
function Tag({
  children,
  active,
  tone = 'warm',
  size = 'md',
  onClick,
  onRemove,
  style,
  ...rest
}) {
  const pad = size === 'sm' ? '3px 10px' : '5px 14px';
  const fs = size === 'sm' ? 'var(--fs-ui-xs)' : 'var(--fs-ui-sm)';
  const tones = {
    warm: {
      bg: 'var(--warm-100)',
      text: 'var(--warm-700)',
      activeBg: 'var(--warm-600)'
    },
    teal: {
      bg: 'var(--accent-100)',
      text: 'var(--accent-700)',
      activeBg: 'var(--accent-600)'
    }
  };
  const c = tones[tone] || tones.warm;
  return /*#__PURE__*/React.createElement("span", _extends({
    onClick: onClick,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--sp-2)',
      fontFamily: 'var(--font-ui)',
      fontWeight: 'var(--w-medium)',
      fontSize: fs,
      padding: pad,
      borderRadius: 'var(--radius-pill)',
      lineHeight: 1.2,
      background: active ? c.activeBg : c.bg,
      color: active ? 'var(--tag-active-text)' : c.text,
      cursor: onClick ? 'pointer' : 'default',
      transition: 'background var(--dur) var(--ease), color var(--dur) var(--ease)',
      userSelect: 'none',
      ...style
    }
  }, rest), children, onRemove && /*#__PURE__*/React.createElement("i", {
    "data-lucide": "x",
    onClick: e => {
      e.stopPropagation();
      onRemove();
    },
    style: {
      width: 13,
      height: 13,
      cursor: 'pointer',
      opacity: 0.7
    }
  }));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/blog/PostCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Post card. layout="card" = 16:9 thumb stacked; layout="row" = editorial list row (small thumb left, large title). */
function PostCard({
  title,
  excerpt,
  image,
  author,
  date,
  readTime,
  tags = [],
  layout = 'card',
  onClick,
  style,
  ...rest
}) {
  const [h, setH] = React.useState(false);
  const hover = {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false)
  };
  if (layout === 'row') {
    return /*#__PURE__*/React.createElement("article", _extends({
      onClick: onClick
    }, hover, {
      style: {
        display: 'grid',
        gridTemplateColumns: '160px minmax(0,1fr)',
        gap: 'var(--sp-5)',
        alignItems: 'start',
        cursor: onClick ? 'pointer' : 'default',
        ...style
      }
    }, rest), /*#__PURE__*/React.createElement("div", {
      style: {
        aspectRatio: '4 / 3',
        background: 'var(--surface-wash)',
        border: '1px solid var(--border-hair)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden'
      }
    }, image && /*#__PURE__*/React.createElement("img", {
      src: image,
      alt: "",
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: '58ch'
      }
    }, /*#__PURE__*/React.createElement("h3", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--fs-h2)',
        fontWeight: 'var(--w-semibold)',
        letterSpacing: 'var(--tracking-heading)',
        lineHeight: 1.2,
        margin: '0 0 var(--sp-3)',
        color: h ? 'var(--accent-700)' : 'var(--text-strong)',
        transition: 'color var(--dur) var(--ease)'
      }
    }, title), excerpt && /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--fs-body)',
        lineHeight: 1.6,
        color: 'var(--text-muted)',
        margin: '0 0 var(--sp-4)',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      }
    }, excerpt), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 'var(--sp-4)'
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.MetaLine, {
      author: author,
      date: date,
      readTime: readTime,
      size: "sm"
    }), tags.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--sp-2)'
      }
    }, tags.map(t => /*#__PURE__*/React.createElement(__ds_scope.Tag, {
      key: t,
      size: "sm"
    }, t))))));
  }
  return /*#__PURE__*/React.createElement("article", _extends({
    onClick: onClick
  }, hover, {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-hair)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      cursor: onClick ? 'pointer' : 'default',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: h ? 'var(--shadow-md)' : 'var(--shadow-sm)',
      transition: 'box-shadow var(--dur) var(--ease)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '16 / 9',
      background: 'var(--surface-wash)',
      overflow: 'hidden'
    }
  }, image && /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--sp-5)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--sp-3)',
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '1.5rem',
      fontWeight: 'var(--w-semibold)',
      letterSpacing: 'var(--tracking-heading)',
      lineHeight: 1.2,
      margin: 0,
      color: h ? 'var(--accent-700)' : 'var(--text-strong)',
      transition: 'color var(--dur) var(--ease)'
    }
  }, title), excerpt && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-body-sm)',
      lineHeight: 1.6,
      color: 'var(--text-muted)',
      margin: 0,
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    }
  }, excerpt), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      paddingTop: 'var(--sp-2)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.MetaLine, {
    author: author,
    date: date,
    readTime: readTime,
    size: "sm",
    style: {
      marginBottom: 'var(--sp-3)'
    }
  }), tags.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--sp-2)'
    }
  }, tags.map(t => /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    key: t,
    size: "sm"
  }, t))))));
}
Object.assign(__ds_scope, { PostCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/blog/PostCard.jsx", error: String((e && e.message) || e) }); }

// components/blog/TagFilter.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Horizontal pill filter. Controlled via `active` + `onChange`. Includes a "Todas" reset. */
function TagFilter({
  tags = [],
  active,
  onChange,
  allLabel = 'Todas',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--sp-2)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    active: !active,
    onClick: () => onChange && onChange(null)
  }, allLabel), tags.map(t => /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    key: t,
    active: active === t,
    onClick: () => onChange && onChange(t)
  }, t)));
}
Object.assign(__ds_scope, { TagFilter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/blog/TagFilter.jsx", error: String((e && e.message) || e) }); }

// components/core/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Multiline text field, same styling as Input. */
function Textarea({
  label,
  id,
  rows = 4,
  style,
  wrapStyle,
  ...rest
}) {
  const [f, setF] = React.useState(false);
  const ta = /*#__PURE__*/React.createElement("textarea", _extends({
    id: id,
    rows: rows,
    onFocus: () => setF(true),
    onBlur: () => setF(false),
    style: {
      width: '100%',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-ui)',
      color: 'var(--text-strong)',
      background: 'var(--surface-card)',
      resize: 'vertical',
      border: `1px solid ${f ? 'var(--accent-500)' : 'var(--border-strong)'}`,
      borderRadius: 'var(--radius-md)',
      padding: '11px 14px',
      outline: 'none',
      lineHeight: 1.6,
      boxShadow: f ? 'var(--ring)' : 'none',
      transition: 'border-color var(--dur) var(--ease), box-shadow var(--dur) var(--ease)',
      boxSizing: 'border-box',
      ...style
    }
  }, rest));
  if (!label) return ta;
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      display: 'block',
      ...wrapStyle
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-ui-sm)',
      fontWeight: 'var(--w-medium)',
      color: 'var(--text-body)',
      marginBottom: 'var(--sp-2)'
    }
  }, label), ta);
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Textarea.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin-editor/BlockEditor.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Block editor: reorderable list of text/image/link blocks, hover drag handle,
// action menu, + inserter with a 3-type picker, and a floating text toolbar.

function BlockToolbar() {
  const tools = [{
    icon: 'bold'
  }, {
    icon: 'italic'
  }, {
    icon: 'underline'
  }, {
    sep: true
  }, {
    icon: 'link'
  }, {
    icon: 'quote'
  }, {
    icon: 'list'
  }, {
    icon: 'list-ordered'
  }, {
    icon: 'code'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 2,
      background: 'var(--ink-900)',
      borderRadius: 'var(--radius-md)',
      padding: '4px 6px',
      boxShadow: 'var(--shadow-lg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      padding: '2px 8px 2px 4px',
      borderRight: '1px solid rgba(255,255,255,0.15)',
      marginRight: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 13,
      color: '#f0ece5'
    }
  }, "Par\xE1grafo"), /*#__PURE__*/React.createElement("i", {
    "data-lucide": "chevron-down",
    style: {
      width: 13,
      height: 13,
      color: '#c9c2b6'
    }
  })), tools.map((t, i) => t.sep ? /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: 1,
      height: 18,
      background: 'rgba(255,255,255,0.15)',
      margin: '0 3px'
    }
  }) : /*#__PURE__*/React.createElement("button", {
    key: i,
    style: {
      width: 28,
      height: 28,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'transparent',
      border: 'none',
      borderRadius: 6,
      cursor: 'pointer',
      color: '#e8e3da'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent'
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": t.icon,
    style: {
      width: 15,
      height: 15
    }
  }))));
}
function BlockShell({
  children,
  active,
  onActivate,
  onRemove,
  onDup,
  dragProps
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick: onActivate,
    style: {
      position: 'relative',
      borderRadius: 'var(--radius-md)',
      padding: 'var(--sp-3) var(--sp-4)',
      border: `1px solid ${active ? 'var(--accent-500)' : 'transparent'}`,
      background: active ? 'var(--surface-card)' : 'transparent',
      transition: 'border-color var(--dur) var(--ease)'
    }
  }, /*#__PURE__*/React.createElement("div", _extends({}, dragProps, {
    style: {
      position: 'absolute',
      left: -30,
      top: 10,
      opacity: hover ? 1 : 0,
      cursor: 'grab',
      transition: 'opacity var(--dur) var(--ease)',
      color: 'var(--text-faint)'
    }
  }), /*#__PURE__*/React.createElement("i", {
    "data-lucide": "grip-vertical",
    style: {
      width: 18,
      height: 18
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 8,
      top: 8,
      opacity: hover ? 1 : 0,
      display: 'flex',
      gap: 2,
      transition: 'opacity var(--dur) var(--ease)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onDup();
    },
    title: "Duplicar",
    style: {
      width: 28,
      height: 28,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-hair)',
      borderRadius: 6,
      cursor: 'pointer',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "copy",
    style: {
      width: 14,
      height: 14
    }
  })), /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onRemove();
    },
    title: "Remover",
    style: {
      width: 28,
      height: 28,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-hair)',
      borderRadius: 6,
      cursor: 'pointer',
      color: 'var(--danger-600)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "trash-2",
    style: {
      width: 14,
      height: 14
    }
  }))), children);
}
function Inserter({
  onInsert
}) {
  const [open, setOpen] = React.useState(false);
  const types = [{
    t: 'text',
    icon: 'type',
    label: 'Texto'
  }, {
    t: 'image',
    icon: 'image',
    label: 'Imagem'
  }, {
    t: 'link',
    icon: 'link',
    label: 'Link'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    onMouseEnter: e => e.currentTarget.querySelector('.line').style.opacity = 1,
    onMouseLeave: e => {
      e.currentTarget.querySelector('.line').style.opacity = 0;
      setOpen(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "line",
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      height: 1,
      background: 'var(--accent-200,var(--border-strong))',
      opacity: 0,
      transition: 'opacity var(--dur) var(--ease)'
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(!open),
    style: {
      position: 'relative',
      zIndex: 2,
      width: 26,
      height: 26,
      borderRadius: '50%',
      background: 'var(--accent-600)',
      border: 'none',
      color: 'var(--text-on-accent)',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "plus",
    style: {
      width: 15,
      height: 15
    }
  })), open && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 30,
      zIndex: 5,
      display: 'flex',
      gap: 4,
      background: 'var(--surface-card)',
      border: '1px solid var(--border-hair)',
      borderRadius: 'var(--radius-md)',
      padding: 6,
      boxShadow: 'var(--shadow-lg)'
    }
  }, types.map(x => /*#__PURE__*/React.createElement("button", {
    key: x.t,
    onClick: () => {
      onInsert(x.t);
      setOpen(false);
    },
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 4,
      width: 72,
      padding: '10px 6px',
      background: 'transparent',
      border: '1px solid transparent',
      borderRadius: 'var(--radius-sm)',
      cursor: 'pointer',
      fontFamily: 'var(--font-ui)',
      fontSize: 12,
      color: 'var(--text-body)'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'var(--surface-sunken)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent'
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": x.icon,
    style: {
      width: 18,
      height: 18,
      color: 'var(--accent-600)'
    }
  }), x.label))));
}
function BlockEditor() {
  const NS = window.PensaComigoDesignSystem_3d6f1f;
  const {
    LinkPreview
  } = NS;
  const [blocks, setBlocks] = React.useState(window.INITIAL_BLOCKS);
  const [active, setActive] = React.useState('b1');
  React.useEffect(() => {
    if (window.lucide) lucide.createIcons();
  });
  const insertAt = (i, type) => {
    const nb = {
      id: 'b' + Date.now(),
      type,
      ...(type === 'text' ? {
        html: ''
      } : type === 'image' ? {
        alt: ''
      } : {
        url: '',
        title: '',
        description: '',
        domain: ''
      })
    };
    const copy = [...blocks];
    copy.splice(i, 0, nb);
    setBlocks(copy);
    setActive(nb.id);
  };
  const remove = id => setBlocks(blocks.filter(b => b.id !== id));
  const dup = id => {
    const i = blocks.findIndex(b => b.id === id);
    const c = [...blocks];
    c.splice(i + 1, 0, {
      ...blocks[i],
      id: 'b' + Date.now()
    });
    setBlocks(c);
  };
  const renderBody = b => {
    if (b.type === 'text') return /*#__PURE__*/React.createElement("div", null, active === b.id && /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 'var(--sp-3)'
      }
    }, /*#__PURE__*/React.createElement(BlockToolbar, null)), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--fs-body)',
        lineHeight: 'var(--lh-body)',
        color: b.html ? 'var(--text-body)' : 'var(--text-faint)',
        margin: 0
      }
    }, b.html || 'Escreva o texto…'));
    if (b.type === 'image') return /*#__PURE__*/React.createElement("div", {
      style: {
        border: '2px dashed var(--border-strong)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--sp-6)',
        textAlign: 'center',
        background: 'var(--surface-wash)'
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": "upload-cloud",
      style: {
        width: 26,
        height: 26,
        color: 'var(--accent-500)'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-ui)',
        fontSize: 'var(--fs-ui-sm)',
        color: 'var(--text-muted)',
        marginTop: 8
      }
    }, "Arraste uma imagem ou ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--accent-600)',
        fontWeight: 600
      }
    }, "procure no dispositivo")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-ui)',
        fontSize: 'var(--fs-ui-xs)',
        color: 'var(--text-faint)',
        marginTop: 6
      }
    }, "Depois: crop, zoom e texto alternativo (alt)"));
    return /*#__PURE__*/React.createElement(LinkPreview, {
      url: b.url,
      title: b.title || 'Cole uma URL para buscar o preview',
      description: b.description,
      domain: b.domain
    });
  };
  return /*#__PURE__*/React.createElement("div", null, blocks.map((b, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: b.id
  }, /*#__PURE__*/React.createElement(Inserter, {
    onInsert: t => insertAt(i, t)
  }), /*#__PURE__*/React.createElement(BlockShell, {
    active: active === b.id,
    onActivate: () => setActive(b.id),
    onRemove: () => remove(b.id),
    onDup: () => dup(b.id),
    dragProps: {}
  }, renderBody(b)))), /*#__PURE__*/React.createElement(Inserter, {
    onInsert: t => insertAt(blocks.length, t)
  }));
}
Object.assign(window, {
  BlockEditor
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin-editor/BlockEditor.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin-editor/PostEditorScreen.jsx
try { (() => {
// Two-column post editor screen with metadata sidebar.
function PostEditorScreen({
  onExit
}) {
  const NS = window.PensaComigoDesignSystem_3d6f1f;
  const {
    Button,
    Input,
    Textarea,
    Select,
    Tag,
    Avatar
  } = NS;
  const [tags, setTags] = React.useState(['Fé', 'Silêncio']);
  const [title, setTitle] = React.useState('O silêncio também é uma resposta');
  React.useEffect(() => {
    if (window.lucide) lucide.createIcons();
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      background: 'var(--bg-page)'
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 30,
      background: 'var(--surface-card)',
      borderBottom: '1px solid var(--border-hair)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: '0 auto',
      padding: '0 var(--gutter)',
      height: 64,
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--sp-4)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onExit,
    style: {
      width: 36,
      height: 36,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "x",
    style: {
      width: 20,
      height: 20
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontWeight: 600,
      fontSize: 'var(--fs-ui)',
      color: 'var(--text-strong)'
    }
  }, "Editar medita\xE7\xE3o"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 8,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-ui-xs)',
      color: 'var(--text-faint)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'var(--warning-600)'
    }
  }), "Rascunho salvo"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      gap: 'var(--sp-3)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: onExit
  }, "Cancelar"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary"
  }, "Publicar")))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: '0 auto',
      padding: 'var(--sp-7) var(--gutter)',
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) 340px',
      gap: 'var(--sp-8)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      paddingLeft: 30
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: title,
    onChange: e => setTitle(e.target.value),
    placeholder: "T\xEDtulo da medita\xE7\xE3o",
    style: {
      width: '100%',
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-h1)',
      fontWeight: 700,
      letterSpacing: 'var(--tracking-display)',
      color: 'var(--text-strong)',
      marginBottom: 'var(--sp-6)',
      boxSizing: 'border-box'
    }
  }), /*#__PURE__*/React.createElement(BlockEditor, null)), /*#__PURE__*/React.createElement("aside", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--sp-5)',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-hair)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--sp-5)',
      position: 'sticky',
      top: 88
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Slug",
    defaultValue: "o-silencio-tambem-e-uma-resposta"
  }), /*#__PURE__*/React.createElement(Textarea, {
    label: "Resumo",
    rows: 3,
    defaultValue: "A gente aprende a orar pedindo. Mas e quando a \xFAnica ora\xE7\xE3o poss\xEDvel \xE9 ficar quieto?"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-ui-sm)',
      fontWeight: 500,
      color: 'var(--text-body)',
      marginBottom: 'var(--sp-2)'
    }
  }, "Tags"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 6,
      marginBottom: 8
    }
  }, tags.map(t => /*#__PURE__*/React.createElement(Tag, {
    key: t,
    size: "sm",
    onRemove: () => setTags(tags.filter(x => x !== t))
  }, t))), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Adicionar tag\u2026"
  })), /*#__PURE__*/React.createElement(Input, {
    label: "Data",
    type: "text",
    defaultValue: "12/07/2026"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-ui-sm)',
      fontWeight: 500,
      color: 'var(--text-body)',
      marginBottom: 'var(--sp-2)'
    }
  }, "Imagem de capa"), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '2px dashed var(--border-strong)',
      borderRadius: 'var(--radius-md)',
      padding: 'var(--sp-5)',
      textAlign: 'center',
      background: 'var(--surface-wash)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "image",
    style: {
      width: 22,
      height: 22,
      color: 'var(--accent-500)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-ui-xs)',
      color: 'var(--text-muted)',
      marginTop: 6
    }
  }, "Arraste ou ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent-600)',
      fontWeight: 600
    }
  }, "envie uma imagem")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-ui-sm)',
      fontWeight: 500,
      color: 'var(--text-body)',
      marginBottom: 'var(--sp-2)'
    }
  }, "Autor"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--sp-3)',
      border: '1px solid var(--border-strong)',
      borderRadius: 'var(--radius-md)',
      padding: '8px 12px'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Antonio",
    size: 30
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-ui-sm)',
      color: 'var(--text-strong)'
    }
  }, "Antonio"), /*#__PURE__*/React.createElement("i", {
    "data-lucide": "chevron-down",
    style: {
      width: 16,
      height: 16,
      color: 'var(--text-muted)',
      marginLeft: 'auto'
    }
  }))))));
}
Object.assign(window, {
  PostEditorScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin-editor/PostEditorScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin-editor/PostsListScreen.jsx
try { (() => {
// Admin posts list — table-ish list with status, meta counters, actions.
function PostsListScreen({
  onEdit
}) {
  const NS = window.PensaComigoDesignSystem_3d6f1f;
  const {
    Button,
    Badge,
    IconButton,
    ConfirmDialog
  } = NS;
  React.useEffect(() => {
    if (window.lucide) lucide.createIcons();
  });
  const [posts, setPosts] = React.useState(window.ADMIN_POSTS);
  const [toDelete, setToDelete] = React.useState(null);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      background: 'var(--bg-page)'
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      background: 'var(--surface-card)',
      borderBottom: '1px solid var(--border-hair)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1080,
      margin: '0 auto',
      padding: '0 var(--gutter)',
      height: 64,
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 20,
      fontWeight: 700,
      letterSpacing: '-0.02em',
      color: 'var(--text-strong)'
    }
  }, "Pensa ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--warm-600)'
    }
  }, "comigo"), " \xB7 Admin"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => onEdit()
  }, "Nova medita\xE7\xE3o")))), /*#__PURE__*/React.createElement("main", {
    style: {
      maxWidth: 1080,
      margin: '0 auto',
      padding: 'var(--sp-7) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-h2)',
      fontWeight: 600,
      letterSpacing: 'var(--tracking-heading)',
      color: 'var(--text-strong)',
      margin: '0 0 var(--sp-5)'
    }
  }, "Medita\xE7\xF5es"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-hair)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 120px 120px 90px 90px 80px',
      gap: 'var(--sp-4)',
      padding: 'var(--sp-3) var(--sp-5)',
      borderBottom: '1px solid var(--border-hair)',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-ui-xs)',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--text-faint)',
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("span", null, "T\xEDtulo"), /*#__PURE__*/React.createElement("span", null, "Status"), /*#__PURE__*/React.createElement("span", null, "Data"), /*#__PURE__*/React.createElement("span", null, "Views"), /*#__PURE__*/React.createElement("span", null, "Curtidas"), /*#__PURE__*/React.createElement("span", null)), posts.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: p.id,
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 120px 120px 90px 90px 80px',
      gap: 'var(--sp-4)',
      padding: 'var(--sp-4) var(--sp-5)',
      alignItems: 'center',
      borderBottom: i < posts.length - 1 ? '1px solid var(--border-hair)' : 'none'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'var(--surface-wash)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent'
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 16,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, p.title), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Badge, {
    tone: p.status === 'published' ? 'published' : 'draft'
  }, p.status === 'published' ? 'Publicado' : 'Rascunho')), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-ui-sm)',
      color: 'var(--text-muted)'
    }
  }, p.date), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-ui-sm)',
      color: 'var(--text-muted)'
    }
  }, p.views.toLocaleString('pt-BR')), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-ui-sm)',
      color: 'var(--text-muted)'
    }
  }, p.likes), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "pencil",
    label: "Editar",
    size: "sm",
    onClick: () => onEdit(p)
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "trash-2",
    label: "Excluir",
    size: "sm",
    onClick: () => setToDelete(p)
  })))))), /*#__PURE__*/React.createElement(ConfirmDialog, {
    open: !!toDelete,
    tone: "danger",
    title: "Excluir medita\xE7\xE3o?",
    message: toDelete ? `“${toDelete.title}” será removida permanentemente. Esta ação não pode ser desfeita.` : '',
    confirmLabel: "Excluir",
    cancelLabel: "Cancelar",
    onCancel: () => setToDelete(null),
    onConfirm: () => {
      setPosts(posts.filter(x => x.id !== toDelete.id));
      setToDelete(null);
    }
  }));
}
Object.assign(window, {
  PostsListScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin-editor/PostsListScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin-editor/data.js
try { (() => {
// Admin post-list + block-editor data.
const ADMIN_POSTS = [{
  id: 1,
  title: 'O silêncio também é uma resposta',
  status: 'published',
  date: '12 jul 2026',
  views: 2417,
  likes: 214
}, {
  id: 2,
  title: 'A dúvida não é o oposto da fé',
  status: 'published',
  date: '05 jul 2026',
  views: 1809,
  likes: 176
}, {
  id: 3,
  title: 'Graça para quem chega tarde',
  status: 'draft',
  date: '—',
  views: 0,
  likes: 0
}, {
  id: 4,
  title: 'Orar quando não há palavras',
  status: 'published',
  date: '20 jun 2026',
  views: 3102,
  likes: 288
}];
const INITIAL_BLOCKS = [{
  id: 'b1',
  type: 'text',
  html: 'A gente aprende a orar pedindo. Desde cedo nos ensinam a lista: agradecer, confessar, pedir. Mas há um tipo de oração que ninguém ensina — a que acontece quando não sobra nenhuma palavra.'
}, {
  id: 'b2',
  type: 'image',
  alt: 'Uma janela ao amanhecer'
}, {
  id: 'b3',
  type: 'text',
  html: 'Elias, depois do fogo e do vento, encontra Deus num "cicio tranquilo e suave". Não no espetáculo — no sussurro.'
}, {
  id: 'b4',
  type: 'link',
  url: 'https://youtube.com',
  title: 'A oração contemplativa — uma introdução',
  description: 'Um ensaio em vídeo sobre a tradição do silêncio.',
  domain: 'youtube.com'
}];
Object.assign(window, {
  ADMIN_POSTS,
  INITIAL_BLOCKS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin-editor/data.js", error: String((e && e.message) || e) }); }

// ui_kits/public-site/Chrome.jsx
try { (() => {
// Shared chrome for the public site: sticky header + footer.
function SiteHeader({
  onNav,
  active,
  dark,
  onToggleTheme
}) {
  const {
    IconButton
  } = window.PensaComigoDesignSystem_3d6f1f;
  const nav = ['Início', 'Meditações', 'Tags', 'Sobre'];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 20,
      background: 'var(--header-bg)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid var(--border-hair)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto',
      padding: '0 var(--gutter)',
      height: 72,
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--sp-6)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => onNav('home'),
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 24,
      fontWeight: 700,
      letterSpacing: '-0.02em',
      color: 'var(--text-strong)',
      cursor: 'pointer',
      textDecoration: 'none',
      flexShrink: 0
    }
  }, "Pensa ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--warm-600)'
    }
  }, "comigo")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 'var(--sp-5)',
      margin: '0 auto',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-ui)'
    }
  }, nav.map(n => /*#__PURE__*/React.createElement("a", {
    key: n,
    onClick: () => onNav(n === 'Início' ? 'home' : 'home'),
    style: {
      color: 'var(--text-body)',
      textDecoration: 'none',
      cursor: 'pointer',
      fontWeight: 500,
      paddingBottom: 2,
      borderBottom: '2px solid transparent'
    },
    onMouseEnter: e => e.currentTarget.style.color = 'var(--accent-600)',
    onMouseLeave: e => e.currentTarget.style.color = 'var(--text-body)'
  }, n))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--sp-2)'
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "search",
    label: "Buscar",
    variant: "ghost"
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: dark ? 'sun' : 'moon',
    label: dark ? 'Tema claro' : 'Tema escuro',
    variant: "ghost",
    onClick: onToggleTheme
  }))));
}
function NewsletterSection() {
  const {
    Button,
    Input
  } = window.PensaComigoDesignSystem_3d6f1f;
  const [email, setEmail] = React.useState('');
  const [sent, setSent] = React.useState(false);
  React.useEffect(() => {
    if (window.lucide) lucide.createIcons();
  });
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-wash)',
      borderTop: '1px solid var(--border-hair)',
      borderBottom: '1px solid var(--border-hair)',
      marginTop: 'var(--sp-10)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 640,
      margin: '0 auto',
      padding: 'var(--sp-9) var(--gutter)',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-ui-xs)',
      fontWeight: 600,
      letterSpacing: 'var(--tracking-overline)',
      textTransform: 'uppercase',
      color: 'var(--warm)',
      marginBottom: 'var(--sp-3)'
    }
  }, "Newsletter"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-h2)',
      fontWeight: 600,
      letterSpacing: 'var(--tracking-heading)',
      color: 'var(--text-strong)',
      margin: '0 0 var(--sp-3)'
    }
  }, "Receba uma medita\xE7\xE3o nova por semana"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-lede)',
      lineHeight: 'var(--lh-lede)',
      color: 'var(--text-muted)',
      margin: '0 0 var(--sp-5)'
    }
  }, "Sem pressa, sem ru\xEDdo. S\xF3 reflex\xE3o que vale o seu tempo."), sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-ui)',
      color: 'var(--success-600)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "check-circle",
    style: {
      width: 18,
      height: 18
    }
  }), " Inscri\xE7\xE3o confirmada. Bem-vindo(a)!") : /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      if (email.trim()) setSent(true);
    },
    style: {
      display: 'flex',
      gap: 'var(--sp-3)',
      maxWidth: 440,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    type: "email",
    required: true,
    placeholder: "seu@email.com",
    value: email,
    onChange: e => setEmail(e.target.value),
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    type: "submit"
  }, "Inscrever"))));
}
function SiteFooter() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      borderTop: '1px solid var(--border-hair)',
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto',
      padding: 'var(--sp-8) var(--gutter)',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 'var(--sp-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 320
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 22,
      fontWeight: 700,
      color: 'var(--text-strong)'
    }
  }, "Pensa ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--warm-600)'
    }
  }, "comigo")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontStyle: 'italic',
      color: 'var(--text-muted)',
      marginTop: 8
    }
  }, "\"A f\xE9 que te obriga a pensar.\"")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-ui-sm)',
      color: 'var(--text-muted)',
      display: 'flex',
      gap: 'var(--sp-7)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text-body)'
    }
  }, "Navegar"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: 'var(--text-muted)'
    }
  }, "Medita\xE7\xF5es"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: 'var(--text-muted)'
    }
  }, "Tags"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: 'var(--text-muted)'
    }
  }, "Sobre")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text-body)'
    }
  }, "Newsletter"), /*#__PURE__*/React.createElement("span", {
    style: {
      maxWidth: 200,
      lineHeight: 1.5
    }
  }, "Uma medita\xE7\xE3o nova por semana. Sem pressa, sem ru\xEDdo.")))));
}
Object.assign(window, {
  SiteHeader,
  SiteFooter,
  NewsletterSection
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/public-site/Chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/public-site/HomeScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Home screen: featured hero + tag filter + single-column editorial list.
function HomeScreen({
  onOpen
}) {
  const NS = window.PensaComigoDesignSystem_3d6f1f;
  const {
    PostCard,
    TagFilter,
    Button,
    MetaLine,
    SectionHeading,
    EmptyState
  } = NS;
  const [active, setActive] = React.useState(null);
  const posts = window.PC_POSTS;
  const featured = posts[0];
  const rest = posts.slice(1).filter(p => !active || p.tags.includes(active));
  return /*#__PURE__*/React.createElement("main", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto',
      padding: 'var(--sp-8) var(--gutter) 0'
    }
  }, /*#__PURE__*/React.createElement("section", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.05fr 0.95fr',
      gap: 'var(--sp-7)',
      alignItems: 'center',
      marginBottom: 'var(--sp-9)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '4 / 3',
      borderRadius: 'var(--radius-lg)',
      background: 'var(--surface-wash)',
      border: '1px solid var(--border-hair)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 12,
      color: 'var(--text-faint)'
    }
  }, "imagem de capa 4:3")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-display)',
      fontWeight: 700,
      letterSpacing: 'var(--tracking-display)',
      lineHeight: 'var(--lh-display)',
      color: 'var(--text-strong)',
      margin: '0 0 var(--sp-4)'
    }
  }, featured.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-lede)',
      lineHeight: 'var(--lh-lede)',
      color: 'var(--text-body)',
      margin: '0 0 var(--sp-5)'
    }
  }, featured.excerpt), /*#__PURE__*/React.createElement(MetaLine, {
    author: featured.author,
    date: featured.date,
    readTime: featured.readTime,
    style: {
      marginBottom: 'var(--sp-5)'
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => onOpen(featured)
  }, "Ler a medita\xE7\xE3o"))), /*#__PURE__*/React.createElement(SectionHeading, {
    overline: "Medita\xE7\xF5es",
    title: "\xDAltimas reflex\xF5es",
    style: {
      marginBottom: 'var(--sp-5)'
    }
  }), /*#__PURE__*/React.createElement(TagFilter, {
    tags: window.PC_TAGS,
    active: active,
    onChange: setActive,
    style: {
      marginBottom: 'var(--sp-7)'
    }
  }), rest.length === 0 ? /*#__PURE__*/React.createElement(EmptyState, {
    icon: "search-x",
    title: "Nenhuma medita\xE7\xE3o com essa marca",
    message: "Tente outra marca ou volte para todas as reflex\xF5es.",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: () => setActive(null)
    }, "Ver todas")
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, rest.map((p, i) => /*#__PURE__*/React.createElement(PostCard, _extends({
    key: p.id
  }, p, {
    layout: "row",
    onClick: () => onOpen(p),
    style: {
      padding: 'var(--sp-6) 0',
      borderTop: i === 0 ? 'none' : '1px solid var(--border-hair)'
    }
  })))));
}
Object.assign(window, {
  HomeScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/public-site/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/public-site/PostScreen.jsx
try { (() => {
// Post page: reading-first layout — progress bar, slim sidebar, continuity footer.
function ReadingProgress() {
  const [pct, setPct] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? Math.min(100, h.scrollTop / max * 100) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: 2,
      zIndex: 40,
      background: 'transparent',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: pct + '%',
      background: 'var(--accent-600)',
      transition: 'width 90ms linear'
    }
  }));
}
function PostScreen({
  post,
  onBack,
  onOpen
}) {
  const NS = window.PensaComigoDesignSystem_3d6f1f;
  const {
    Tag,
    MetaLine,
    Avatar,
    Card,
    LinkPreview,
    Comment,
    Button,
    Textarea,
    Input,
    IconButton
  } = NS;
  const [likes, setLikes] = React.useState(214);
  const [liked, setLiked] = React.useState(false);
  const p = post || window.PC_POSTS[0];
  const related = window.PC_POSTS.filter(x => x.id !== p.id).slice(0, 2);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ReadingProgress, null), /*#__PURE__*/React.createElement("main", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto',
      padding: 'var(--sp-7) var(--gutter) 0'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-ui-sm)',
      color: 'var(--text-muted)',
      marginBottom: 'var(--sp-5)',
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "arrow-left",
    style: {
      width: 16,
      height: 16
    }
  }), " Voltar"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) 240px',
      gap: 'var(--sp-8)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("article", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-h1)',
      fontWeight: 700,
      letterSpacing: 'var(--tracking-display)',
      lineHeight: 'var(--lh-heading)',
      color: 'var(--text-strong)',
      margin: '0 0 var(--sp-4)'
    }
  }, p.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-lede)',
      lineHeight: 'var(--lh-lede)',
      color: 'var(--text-body)',
      margin: '0 0 var(--sp-5)',
      maxWidth: 'var(--measure)'
    }
  }, p.excerpt), /*#__PURE__*/React.createElement(MetaLine, {
    author: p.author,
    date: p.date,
    readTime: p.readTime,
    style: {
      marginBottom: 'var(--sp-6)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '16 / 9',
      borderRadius: 'var(--radius-lg)',
      background: 'var(--surface-wash)',
      border: '1px solid var(--border-hair)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 'var(--sp-7)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 12,
      color: 'var(--text-faint)'
    }
  }, "imagem de capa 16:9")), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--measure)',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-body)',
      lineHeight: 'var(--lh-body)',
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 var(--sp-5)'
    }
  }, "A gente aprende a orar pedindo. Desde cedo nos ensinam a lista: agradecer, confessar, pedir. Mas h\xE1 um tipo de ora\xE7\xE3o que ningu\xE9m ensina \u2014 a que acontece quando n\xE3o sobra nenhuma palavra."), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-h3)',
      fontWeight: 600,
      letterSpacing: 'var(--tracking-heading)',
      color: 'var(--text-strong)',
      margin: 'var(--sp-6) 0 var(--sp-3)'
    }
  }, "Quando o pedido acaba"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 var(--sp-5)'
    }
  }, "Elias, depois do fogo e do vento, encontra Deus num \"cicio tranquilo e suave\". N\xE3o no espet\xE1culo \u2014 no sussurro. Pensa comigo: e se boa parte da nossa ansiedade espiritual venha de esperar o trov\xE3o quando Deus escolheu o sil\xEAncio?"), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 'var(--sp-6) 0',
      paddingLeft: 'var(--sp-5)',
      borderLeft: '3px solid var(--warm-500)',
      fontStyle: 'italic',
      fontSize: '1.35rem',
      lineHeight: 1.5,
      color: 'var(--text-strong)'
    }
  }, "\"O sil\xEAncio n\xE3o \xE9 a aus\xEAncia de Deus. \xC0s vezes \xE9 a forma mais alta da sua presen\xE7a.\""), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 var(--sp-5)'
    }
  }, "N\xE3o estou defendendo a mudez espiritual, nem dizendo que pedir seja menor. Estou dizendo que o sil\xEAncio tem uma gram\xE1tica pr\xF3pria, e que aprender essa gram\xE1tica talvez seja parte do amadurecer da f\xE9."), /*#__PURE__*/React.createElement(LinkPreview, {
    url: "https://youtube.com",
    domain: "youtube.com",
    style: {
      margin: 'var(--sp-6) 0'
    },
    title: "A ora\xE7\xE3o contemplativa \u2014 uma introdu\xE7\xE3o",
    description: "Um ensaio em v\xEDdeo sobre a tradi\xE7\xE3o do sil\xEAncio na espiritualidade crist\xE3."
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 var(--sp-5)'
    }
  }, "Ent\xE3o, da pr\xF3xima vez que faltarem as palavras, tente n\xE3o preencher o vazio. Fica. Escuta. Talvez a resposta j\xE1 esteja ali \u2014 s\xF3 que sem som.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 'var(--sp-4)',
      marginTop: 'var(--sp-7)',
      paddingTop: 'var(--sp-5)',
      borderTop: '1px solid var(--border-hair)',
      maxWidth: 'var(--measure)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setLiked(!liked);
      setLikes(likes + (liked ? -1 : 1));
    },
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      background: liked ? 'var(--warm-100)' : 'transparent',
      border: '1px solid var(--border-strong)',
      borderRadius: 'var(--radius-pill)',
      padding: '8px 16px',
      cursor: 'pointer',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-ui-sm)',
      color: liked ? 'var(--warm-700)' : 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "heart",
    style: {
      width: 16,
      height: 16,
      fill: liked ? 'var(--warm-600)' : 'none'
    }
  }), liked ? likes : 'Isso me tocou'), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-ui-sm)',
      color: 'var(--text-muted)'
    }
  }, "Em ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--warm-700)'
    }
  }, p.tags.join(', ')))), /*#__PURE__*/React.createElement("section", {
    style: {
      marginTop: 'var(--sp-8)',
      maxWidth: 'var(--measure)'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-h3)',
      fontWeight: 600,
      color: 'var(--text-strong)',
      margin: '0 0 var(--sp-5)'
    }
  }, "2 coment\xE1rios"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--sp-6)'
    }
  }, /*#__PURE__*/React.createElement(Comment, {
    name: "Maria Clara",
    time: "h\xE1 2 dias",
    onReply: () => {},
    replies: [{
      name: 'Antonio',
      time: 'há 1 dia',
      children: 'Obrigado por ler com atenção, Maria. Esse "ficar" é mesmo o mais difícil.'
    }]
  }, "Isso me tocou. Passei a semana tentando entender por que a quietude me assustava tanto."), /*#__PURE__*/React.createElement(Comment, {
    name: "Rafael",
    time: "h\xE1 3 dias",
    onReply: () => {}
  }, "Nunca tinha pensado no epis\xF3dio de Elias assim. Vou reler com calma.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--sp-7)'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-ui)',
      fontWeight: 600,
      color: 'var(--text-strong)',
      margin: '0 0 var(--sp-3)'
    }
  }, "Deixe um coment\xE1rio"), /*#__PURE__*/React.createElement(Textarea, {
    placeholder: "Escreva seu coment\xE1rio\u2026",
    rows: 3,
    style: {
      marginBottom: 'var(--sp-3)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--sp-3)',
      marginBottom: 'var(--sp-3)'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Seu nome",
    style: {
      flex: 1
    }
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "primary"
  }, "Comentar")))), /*#__PURE__*/React.createElement("aside", {
    style: {
      position: 'sticky',
      top: 92,
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--sp-5)'
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(Avatar, {
    name: p.author,
    size: 48,
    style: {
      marginBottom: 'var(--sp-3)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, p.author), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-ui-sm)',
      color: 'var(--text-muted)',
      marginBottom: 'var(--sp-3)'
    }
  }, "Autor \xB7 Pensa comigo"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-body-sm)',
      lineHeight: 1.6,
      color: 'var(--text-muted)',
      margin: 0
    }
  }, "Escreve medita\xE7\xF5es que preferem perguntas a respostas f\xE1ceis.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-ui-xs)',
      fontWeight: 600,
      letterSpacing: 'var(--tracking-overline)',
      textTransform: 'uppercase',
      color: 'var(--text-faint)',
      marginBottom: 'var(--sp-3)'
    }
  }, "Compartilhar"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--sp-2)'
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "link",
    label: "Copiar link",
    variant: "ghost"
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "mail",
    label: "Enviar por e-mail",
    variant: "ghost"
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "share-2",
    label: "Compartilhar",
    variant: "ghost"
  }))))), /*#__PURE__*/React.createElement("section", {
    style: {
      marginTop: 'var(--sp-10)',
      paddingTop: 'var(--sp-7)',
      borderTop: '1px solid var(--border-hair)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-ui-xs)',
      fontWeight: 600,
      letterSpacing: 'var(--tracking-overline)',
      textTransform: 'uppercase',
      color: 'var(--warm)',
      marginBottom: 'var(--sp-3)'
    }
  }, "Continue pensando"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-h2)',
      fontWeight: 600,
      letterSpacing: 'var(--tracking-heading)',
      color: 'var(--text-strong)',
      margin: '0 0 var(--sp-6)'
    }
  }, "Outras medita\xE7\xF5es"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, minmax(0,1fr))',
      gap: 'var(--sp-6)'
    }
  }, related.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.id,
    onClick: () => onOpen && onOpen(r),
    style: {
      display: 'flex',
      gap: 'var(--sp-4)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 96,
      height: 96,
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-wash)',
      border: '1px solid var(--border-hair)',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-h3)',
      fontWeight: 600,
      color: 'var(--text-strong)',
      lineHeight: 1.25,
      marginBottom: 6
    }
  }, r.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-body-sm)',
      lineHeight: 1.55,
      color: 'var(--text-muted)',
      margin: '0 0 8px'
    }
  }, r.excerpt), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-ui-xs)',
      color: 'var(--text-faint)'
    }
  }, r.date, " \xB7 ", r.readTime))))))));
}
Object.assign(window, {
  PostScreen,
  ReadingProgress
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/public-site/PostScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/public-site/data.js
try { (() => {
// Public data + placeholder image helper for the public-site kit.
function ph(seed, w = 800, h = 450) {
  // deterministic warm placeholder block (no external image needed)
  return null; // components fall back to accent-wash block when image is null
}
const PC_POSTS = [{
  id: 1,
  title: 'O silêncio também é uma resposta',
  tags: ['Fé', 'Silêncio'],
  author: 'Antonio',
  date: '12 jul 2026',
  readTime: '8 min',
  excerpt: 'A gente aprende a orar pedindo. Mas e quando a única oração possível é ficar quieto? Pensa comigo sobre o peso — e o alívio — do silêncio.'
}, {
  id: 2,
  title: 'A dúvida não é o oposto da fé',
  tags: ['Dúvida', 'Graça'],
  author: 'Jéssica',
  date: '05 jul 2026',
  readTime: '6 min',
  excerpt: 'Passei anos achando que duvidar era falhar. Talvez a dúvida seja só a fé fazendo perguntas honestas — e recusando respostas fáceis.'
}, {
  id: 3,
  title: 'Graça para quem chega tarde',
  tags: ['Graça'],
  author: 'Antonio',
  date: '28 jun 2026',
  readTime: '5 min',
  excerpt: 'A parábola dos trabalhadores da vinha me incomoda. E é justamente por isso que ela tem tanto a me ensinar sobre justiça e generosidade.'
}, {
  id: 4,
  title: 'Orar quando não há palavras',
  tags: ['Oração', 'Silêncio'],
  author: 'Jéssica',
  date: '20 jun 2026',
  readTime: '7 min',
  excerpt: 'Há dias em que a oração é só um suspiro. Descobri que Deus lê suspiros — e que isso basta.'
}, {
  id: 5,
  title: 'O que a impaciência me ensinou',
  tags: ['Fé'],
  author: 'Antonio',
  date: '14 jun 2026',
  readTime: '4 min',
  excerpt: 'Esperar nunca foi meu forte. Mas a espera tem uma pedagogia própria, lenta e teimosa, que só entendi olhando pra trás.'
}, {
  id: 6,
  title: 'Comunidade não é plateia',
  tags: ['Graça', 'Dúvida'],
  author: 'Jéssica',
  date: '07 jun 2026',
  readTime: '6 min',
  excerpt: 'É fácil confundir presença com pertencimento. Pensa comigo sobre a diferença entre assistir a uma fé e vivê-la junto.'
}];
const PC_TAGS = ['Fé', 'Graça', 'Dúvida', 'Silêncio', 'Oração'];
Object.assign(window, {
  PC_POSTS,
  PC_TAGS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/public-site/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Comment = __ds_scope.Comment;

__ds_ns.LinkPreview = __ds_scope.LinkPreview;

__ds_ns.MetaLine = __ds_scope.MetaLine;

__ds_ns.PostCard = __ds_scope.PostCard;

__ds_ns.TagFilter = __ds_scope.TagFilter;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.ConfirmDialog = __ds_scope.ConfirmDialog;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Skeleton = __ds_scope.Skeleton;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Textarea = __ds_scope.Textarea;

})();
