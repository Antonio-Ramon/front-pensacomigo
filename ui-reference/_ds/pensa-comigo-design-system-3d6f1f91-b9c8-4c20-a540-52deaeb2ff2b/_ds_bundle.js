/* @ds-bundle: {"format":4,"namespace":"PensaComigoDesignSystem_3d6f1f","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Chip","sourcePath":"components/core/Chip.jsx"},{"name":"ConfirmDialog","sourcePath":"components/core/ConfirmDialog.jsx"},{"name":"EmptyState","sourcePath":"components/core/EmptyState.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"SectionHeading","sourcePath":"components/core/SectionHeading.jsx"},{"name":"Select","sourcePath":"components/core/Select.jsx"},{"name":"Skeleton","sourcePath":"components/core/Skeleton.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Textarea","sourcePath":"components/core/Textarea.jsx"},{"name":"ThemeSwitcher","sourcePath":"components/core/ThemeSwitcher.jsx"},{"name":"ApplyList","sourcePath":"components/editorial/ApplyList.jsx"},{"name":"AuthorBox","sourcePath":"components/editorial/AuthorBox.jsx"},{"name":"Comment","sourcePath":"components/editorial/Comment.jsx"},{"name":"MetaLine","sourcePath":"components/editorial/MetaLine.jsx"},{"name":"MoodChips","sourcePath":"components/editorial/MoodChips.jsx"},{"name":"NewsletterCTA","sourcePath":"components/editorial/NewsletterCTA.jsx"},{"name":"Pager","sourcePath":"components/editorial/Pager.jsx"},{"name":"PostImage","sourcePath":"components/editorial/PostImage.jsx"},{"name":"PostRow","sourcePath":"components/editorial/PostRow.jsx"},{"name":"Prose","sourcePath":"components/editorial/Prose.jsx"},{"name":"Reactions","sourcePath":"components/editorial/Reactions.jsx"},{"name":"StageCard","sourcePath":"components/editorial/StageCard.jsx"},{"name":"StudyNote","sourcePath":"components/editorial/StudyNote.jsx"},{"name":"TocRail","sourcePath":"components/editorial/TocRail.jsx"},{"name":"VerseBlock","sourcePath":"components/editorial/VerseBlock.jsx"},{"name":"VerseTerminal","sourcePath":"components/editorial/VerseTerminal.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"e71346a6a889","components/core/Badge.jsx":"e0ecaf53f467","components/core/Button.jsx":"28a37ab24e0f","components/core/Card.jsx":"47862c76d737","components/core/Chip.jsx":"92be09455264","components/core/ConfirmDialog.jsx":"e7676465561a","components/core/EmptyState.jsx":"031b1b98a914","components/core/Eyebrow.jsx":"605cd1b68564","components/core/IconButton.jsx":"2a7e101e60b9","components/core/Input.jsx":"88050dbfaa91","components/core/SectionHeading.jsx":"8be589e6aa84","components/core/Select.jsx":"a588e5768c46","components/core/Skeleton.jsx":"0dce6404611e","components/core/Tag.jsx":"4c6adb1b2740","components/core/Textarea.jsx":"01e33da90c7b","components/core/ThemeSwitcher.jsx":"8fdadf29bade","components/editorial/ApplyList.jsx":"d8af587e1959","components/editorial/AuthorBox.jsx":"3d1576bf26a4","components/editorial/Comment.jsx":"d2afdada8a15","components/editorial/MetaLine.jsx":"316cc0014299","components/editorial/MoodChips.jsx":"54c5481c0e09","components/editorial/NewsletterCTA.jsx":"8e89fd71a878","components/editorial/Pager.jsx":"7643266bd1f9","components/editorial/PostImage.jsx":"94a550114131","components/editorial/PostRow.jsx":"d5cf0735a23b","components/editorial/Prose.jsx":"2f0f63a3fa65","components/editorial/Reactions.jsx":"8c619c99d61e","components/editorial/StageCard.jsx":"797955b3512a","components/editorial/StudyNote.jsx":"d3bb5b37a199","components/editorial/TocRail.jsx":"272c06617ac3","components/editorial/VerseBlock.jsx":"2b6bc8ad22f8","components/editorial/VerseTerminal.jsx":"ab12e5b99e43"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.PensaComigoDesignSystem_3d6f1f = window.PensaComigoDesignSystem_3d6f1f || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Initials avatar in accent — square, like everything else. */
function Avatar({
  name = '',
  initials,
  size = 30,
  style,
  ...rest
}) {
  const ini = initials || name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      width: size,
      height: size,
      display: 'grid',
      placeItems: 'center',
      flex: 'none',
      background: 'var(--accent)',
      color: 'var(--on-primary)',
      fontFamily: 'var(--font-mono)',
      fontSize: Math.round(size * 0.35),
      ...style
    }
  }, rest), ini);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Status badge — muted, mono, for editorial states (published / draft / scheduled). */
function Badge({
  children,
  tone = 'neutral',
  style,
  ...rest
}) {
  const tones = {
    neutral: {
      color: 'var(--soft)',
      background: 'var(--bg-alt)'
    },
    published: {
      color: 'var(--success)',
      background: 'var(--success-soft)'
    },
    draft: {
      color: 'var(--warning)',
      background: 'var(--warning-soft)'
    },
    danger: {
      color: 'var(--danger)',
      background: 'var(--danger-soft)'
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10.5,
      letterSpacing: '0.06em',
      padding: '4px 9px',
      borderRadius: 'var(--radius-xs)',
      ...tones[tone],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Pill action button. solid = primary fill · ghost = hairline outline · quiet = text only · accent = terracotta fill. */
function Button({
  variant = 'solid',
  size = 'md',
  disabled,
  children,
  style,
  ...rest
}) {
  const [h, setH] = React.useState(false);
  const sizes = {
    sm: {
      fontSize: 'var(--fs-ui-sm)',
      padding: '8px 16px'
    },
    md: {
      fontSize: 'var(--fs-ui)',
      padding: '12px 22px'
    },
    lg: {
      fontSize: 'var(--fs-ui)',
      padding: '14px 28px'
    }
  };
  const variants = {
    solid: {
      background: 'var(--primary)',
      color: 'var(--on-primary)',
      borderColor: 'transparent',
      filter: h && !disabled ? 'brightness(1.12)' : 'none'
    },
    accent: {
      background: 'var(--accent)',
      color: 'var(--on-primary)',
      borderColor: 'transparent',
      filter: h && !disabled ? 'brightness(1.08)' : 'none'
    },
    ghost: {
      background: 'transparent',
      color: h && !disabled ? 'var(--primary)' : 'var(--ink)',
      borderColor: h && !disabled ? 'var(--primary)' : 'var(--line)'
    },
    quiet: {
      background: 'transparent',
      color: h && !disabled ? 'var(--ink)' : 'var(--soft)',
      borderColor: 'transparent'
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    disabled: disabled,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      fontFamily: 'var(--font-ui)',
      fontWeight: 'var(--w-medium)',
      lineHeight: 1,
      whiteSpace: 'nowrap',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--sp-2)',
      borderRadius: 'var(--radius-pill)',
      border: '1px solid transparent',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      transition: 'filter var(--dur-fast) var(--ease), color var(--dur) var(--ease), border-color var(--dur) var(--ease)',
      ...sizes[size],
      ...variants[variant],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Surface panel: hairline border, 10px radius, no shadow by default. `tone="dashed"` for opt-in blocks. */
function Card({
  children,
  tone = 'solid',
  padding = 24,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: tone === 'dashed' ? 'transparent' : 'var(--surface)',
      border: '1px ' + (tone === 'dashed' ? 'dashed' : 'solid') + ' var(--line)',
      borderRadius: 'var(--radius-md)',
      padding,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Chip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Selectable mono pill — mood filters, tag filters. Pressed state fills with primary. */
function Chip({
  children,
  pressed = false,
  onClick,
  style,
  ...rest
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-pressed": pressed,
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12.5,
      cursor: 'pointer',
      padding: '9px 16px',
      borderRadius: 'var(--radius-pill)',
      transition: 'all var(--dur-fast) var(--ease)',
      background: pressed ? 'var(--primary)' : 'transparent',
      color: pressed ? 'var(--on-primary)' : h ? 'var(--ink)' : 'var(--soft)',
      border: '1px solid ' + (pressed ? 'var(--primary)' : h ? 'var(--soft)' : 'var(--line)'),
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Chip.jsx", error: String((e && e.message) || e) }); }

// components/core/ConfirmDialog.jsx
try { (() => {
/** Modal confirmation. Destructive actions use tone="danger". */
function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  tone = 'default',
  onConfirm,
  onCancel
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    onClick: onCancel,
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,.42)',
      display: 'grid',
      placeItems: 'center',
      padding: 24,
      zIndex: 90
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      background: 'var(--surface)',
      border: '1px solid var(--line)',
      borderRadius: 'var(--radius-md)',
      padding: 28,
      maxWidth: 420,
      width: '100%',
      boxShadow: 'var(--shadow-md)'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--w-medium)',
      fontSize: 21,
      margin: 0,
      color: 'var(--ink)'
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14.5,
      color: 'var(--soft)',
      lineHeight: 1.6,
      margin: '10px 0 0'
    }
  }, message), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      justifyContent: 'flex-end',
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "ghost",
    size: "sm",
    onClick: onCancel
  }, cancelLabel), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: tone === 'danger' ? 'accent' : 'solid',
    size: "sm",
    onClick: onConfirm
  }, confirmLabel))));
}
Object.assign(__ds_scope, { ConfirmDialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ConfirmDialog.jsx", error: String((e && e.message) || e) }); }

// components/core/EmptyState.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Empty state: mono line, serif sentence, optional action. Never illustrated. */
function EmptyState({
  label = 'vazio',
  title,
  action,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      border: '1px dashed var(--line)',
      borderRadius: 'var(--radius-md)',
      padding: '44px 28px',
      textAlign: 'center',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.12em',
      color: 'var(--faint)',
      margin: 0
    }
  }, label), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--w-light)',
      fontSize: 21,
      color: 'var(--ink)',
      margin: '10px 0 0',
      lineHeight: 1.4
    }
  }, title), action && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20
    }
  }, action));
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Lowercase mono eyebrow that opens every section. Wrap emphasis in <b> for accent color. */
function Eyebrow({
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("p", _extends({
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'lowercase',
      color: 'var(--faint)',
      margin: 0,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Square utility button. `icon` is a Lucide icon name rendered via <i data-lucide>. */
function IconButton({
  icon,
  label,
  variant = 'ghost',
  size = 26,
  style,
  ...rest
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": label,
    title: label,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      width: size,
      height: size,
      display: 'inline-grid',
      placeItems: 'center',
      cursor: 'pointer',
      borderRadius: 'var(--radius-sm)',
      background: variant === 'outline' ? 'var(--surface)' : 'transparent',
      border: '1px solid ' + (variant === 'outline' ? h ? 'var(--soft)' : 'var(--line)' : 'transparent'),
      color: h ? 'var(--ink)' : 'var(--soft)',
      transition: 'color var(--dur) var(--ease), border-color var(--dur) var(--ease)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    style: {
      width: 16,
      height: 16
    }
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Pill text input. Set `shape="box"` for form fields inside panels. */
function Input({
  label,
  hint,
  shape = 'pill',
  wrapStyle,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      ...wrapStyle
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-mono)',
      fontSize: 10.5,
      letterSpacing: '0.1em',
      color: 'var(--faint)',
      marginBottom: 8
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    style: {
      width: '100%',
      background: 'var(--bg)',
      border: '1px solid var(--line)',
      color: 'var(--ink)',
      fontFamily: 'var(--font-ui)',
      fontSize: 14,
      padding: shape === 'pill' ? '11px 18px' : '10px 12px',
      borderRadius: shape === 'pill' ? 'var(--radius-pill)' : 'var(--radius-sm)',
      outline: 'none',
      ...style
    }
  }, rest)), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--faint)',
      marginTop: 6
    }
  }, hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionHeading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Eyebrow + serif heading + optional supporting line. The standard opener for any section. */
function SectionHeading({
  eyebrow,
  title,
  hint,
  as: H = 'h2',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      ...style
    }
  }, rest), eyebrow && /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, null, eyebrow), /*#__PURE__*/React.createElement(H, {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--w-body)',
      fontSize: 'var(--fs-h2)',
      letterSpacing: 'var(--tracking-display)',
      lineHeight: 1.15,
      color: 'var(--ink)',
      margin: '12px 0 0'
    }
  }, title), hint && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14.5,
      color: 'var(--soft)',
      margin: '8px 0 0',
      maxWidth: '46ch'
    }
  }, hint));
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/core/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Native select in system chrome. Options accept strings or {value,label}. */
function Select({
  label,
  options = [],
  wrapStyle,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      ...wrapStyle
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-mono)',
      fontSize: 10.5,
      letterSpacing: '0.1em',
      color: 'var(--faint)',
      marginBottom: 8
    }
  }, label), /*#__PURE__*/React.createElement("select", _extends({
    style: {
      width: '100%',
      background: 'var(--surface)',
      border: '1px solid var(--line)',
      color: 'var(--ink)',
      fontFamily: 'var(--font-ui)',
      fontSize: 14,
      padding: '10px 12px',
      borderRadius: 'var(--radius-sm)',
      outline: 'none',
      cursor: 'pointer',
      ...style
    }
  }, rest), options.map(o => {
    const v = typeof o === 'string' ? o : o.value;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, typeof o === 'string' ? o : o.label);
  })));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Select.jsx", error: String((e && e.message) || e) }); }

// components/core/Skeleton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Loading placeholder — a quiet sunken block, no shimmer. */
function Skeleton({
  width = '100%',
  height = 14,
  radius = 'var(--radius-xs)',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'block',
      width,
      height,
      background: 'var(--bg-alt)',
      borderRadius: radius,
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Skeleton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Skeleton.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Mono metadata tag — small, rectangular, hairline. Used for scripture refs and topics. */
function Tag({
  children,
  tone = 'neutral',
  style,
  ...rest
}) {
  const tones = {
    neutral: {
      color: 'var(--faint)',
      borderColor: 'var(--line)'
    },
    accent: {
      color: 'var(--accent)',
      borderColor: 'var(--accent)'
    },
    primary: {
      color: 'var(--primary)',
      borderColor: 'var(--primary)'
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      letterSpacing: '0.06em',
      border: '1px solid',
      borderRadius: 'var(--radius-xs)',
      padding: '2px 7px',
      whiteSpace: 'nowrap',
      ...tones[tone],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/core/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Multi-line field. Same hairline language as Input, boxed corners. */
function Textarea({
  label,
  rows = 4,
  wrapStyle,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      ...wrapStyle
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-mono)',
      fontSize: 10.5,
      letterSpacing: '0.1em',
      color: 'var(--faint)',
      marginBottom: 8
    }
  }, label), /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows,
    style: {
      width: '100%',
      background: 'var(--bg)',
      border: '1px solid var(--line)',
      color: 'var(--ink)',
      fontFamily: 'var(--font-ui)',
      fontSize: 14,
      lineHeight: 1.6,
      padding: '12px 14px',
      borderRadius: 'var(--radius-sm)',
      outline: 'none',
      resize: 'vertical',
      ...style
    }
  }, rest)));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/core/ThemeSwitcher.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** papel / tinta / terra switch. Writes data-theme on <html> and remembers the choice. */
function ThemeSwitcher({
  themes = ['papel', 'tinta', 'terra'],
  storageKey = 'pc-theme',
  style,
  ...rest
}) {
  const [theme, setTheme] = React.useState(() => typeof document !== 'undefined' && document.documentElement.dataset.theme || themes[0]);
  React.useEffect(() => {
    let saved = null;
    try {
      saved = localStorage.getItem(storageKey);
    } catch (e) {}
    if (saved && themes.includes(saved)) setTheme(saved);
  }, []);
  React.useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(storageKey, theme);
    } catch (e) {}
  }, [theme]);
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "group",
    "aria-label": "Tema visual",
    style: {
      display: 'flex',
      gap: 4,
      alignItems: 'center',
      ...style
    }
  }, rest), themes.map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    type: "button",
    "aria-pressed": t === theme,
    onClick: () => setTheme(t),
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10.5,
      letterSpacing: '0.06em',
      border: 'none',
      cursor: 'pointer',
      padding: '5px 8px',
      borderRadius: 'var(--radius-sm)',
      background: t === theme ? 'var(--bg-alt)' : 'transparent',
      color: t === theme ? 'var(--ink)' : 'var(--faint)',
      transition: 'all var(--dur-fast) var(--ease)'
    }
  }, t)));
}
Object.assign(__ds_scope, { ThemeSwitcher });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ThemeSwitcher.jsx", error: String((e && e.message) || e) }); }

// components/editorial/ApplyList.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** "Para esta semana" — the checklist that closes every meditation. Checked items strike through. */
function ApplyList({
  label = 'aplicação',
  title = 'Para esta semana',
  items = [],
  style,
  ...rest
}) {
  const [done, setDone] = React.useState(() => new Set());
  const toggle = i => setDone(prev => {
    const n = new Set(prev);
    n.has(i) ? n.delete(i) : n.add(i);
    return n;
  });
  return /*#__PURE__*/React.createElement("section", _extends({
    style: {
      border: '1px solid var(--line)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      maxWidth: 'var(--measure)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg-alt)',
      padding: '14px 20px',
      borderBottom: '1px solid var(--line)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      letterSpacing: '0.12em',
      color: 'var(--accent)'
    }
  }, label), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 20,
      fontWeight: 'var(--w-medium)',
      margin: '4px 0 0',
      color: 'var(--ink)'
    }
  }, title)), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      background: 'var(--surface)'
    }
  }, items.map((t, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      borderBottom: i === items.length - 1 ? 'none' : '1px solid var(--line)'
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      padding: '15px 20px',
      cursor: 'pointer',
      fontSize: 14.5,
      lineHeight: 1.5,
      color: 'var(--ink)'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: done.has(i),
    onChange: () => toggle(i),
    style: {
      appearance: 'none',
      width: 16,
      height: 16,
      flex: 'none',
      marginTop: 3,
      cursor: 'pointer',
      border: '1.5px solid ' + (done.has(i) ? 'var(--primary)' : 'var(--line)'),
      background: done.has(i) ? 'var(--primary)' : 'transparent',
      borderRadius: 'var(--radius-xs)',
      transition: 'all var(--dur-fast) var(--ease)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: done.has(i) ? 'var(--faint)' : 'var(--ink)',
      textDecoration: done.has(i) ? 'line-through' : 'none'
    }
  }, t))))));
}
Object.assign(__ds_scope, { ApplyList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/ApplyList.jsx", error: String((e && e.message) || e) }); }

// components/editorial/AuthorBox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Author bio panel that closes an article. */
function AuthorBox({
  name,
  initials,
  bio,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      gap: 16,
      alignItems: 'flex-start',
      padding: 24,
      background: 'var(--surface)',
      border: '1px solid var(--line)',
      borderRadius: 'var(--radius-md)',
      maxWidth: 'var(--measure)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    name: name,
    initials: initials,
    size: 44
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 18,
      fontWeight: 'var(--w-medium)',
      margin: 0,
      color: 'var(--ink)'
    }
  }, name), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--soft)',
      margin: '5px 0 0',
      lineHeight: 1.55
    }
  }, bio)));
}
Object.assign(__ds_scope, { AuthorBox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/AuthorBox.jsx", error: String((e && e.message) || e) }); }

// components/editorial/Comment.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Reader comment. Replies nest once, marked by a hairline rail. */
function Comment({
  author,
  date,
  children,
  replies = [],
  depth = 0,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      paddingLeft: depth ? 20 : 0,
      borderLeft: depth ? '1px solid var(--line)' : 'none',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    name: author,
    size: 30
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'baseline',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      fontWeight: 'var(--w-medium)',
      color: 'var(--ink)'
    }
  }, author), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--faint)'
    }
  }, date)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--w-light)',
      fontSize: 16,
      lineHeight: 1.6,
      color: 'var(--ink)',
      marginTop: 6
    }
  }, children))), replies.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      marginLeft: 42,
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, replies.map((r, i) => /*#__PURE__*/React.createElement(Comment, {
    key: i,
    author: r.author,
    date: r.date,
    depth: depth + 1
  }, r.body))));
}
Object.assign(__ds_scope, { Comment });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/Comment.jsx", error: String((e && e.message) || e) }); }

// components/editorial/MetaLine.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Mono byline meta: date · read time · tags. The single meta treatment in the system. */
function MetaLine({
  date,
  readTime,
  items = [],
  style,
  ...rest
}) {
  const parts = [date, readTime && /*#__PURE__*/React.createElement("b", {
    key: "rt",
    style: {
      color: 'var(--soft)',
      fontWeight: 400
    }
  }, readTime), ...items].filter(Boolean);
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--faint)',
      ...style
    }
  }, rest), parts.map((p, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 && ' · ', p)));
}
Object.assign(__ds_scope, { MetaLine });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/MetaLine.jsx", error: String((e && e.message) || e) }); }

// components/editorial/MoodChips.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** "Como você chega hoje?" — the entry filter. Selecting a chip is also deselecting the others. */
function MoodChips({
  options = [],
  value = null,
  onChange,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "group",
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8,
      ...style
    }
  }, rest), options.map(o => {
    const key = typeof o === 'string' ? o : o.value;
    const label = typeof o === 'string' ? o : o.label;
    return /*#__PURE__*/React.createElement(__ds_scope.Chip, {
      key: key,
      pressed: key === value,
      onClick: () => onChange && onChange(key === value ? null : key)
    }, label);
  }));
}
Object.assign(__ds_scope, { MoodChips });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/MoodChips.jsx", error: String((e && e.message) || e) }); }

// components/editorial/NewsletterCTA.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Inline subscribe block. tone="dashed" for the in-article version, "solid" for standalone pages. */
function NewsletterCTA({
  title = 'Recebe a próxima às 6h?',
  description,
  cta = 'Assinar',
  placeholder = 'seu@email.com',
  tone = 'dashed',
  onSubscribe,
  style,
  ...rest
}) {
  const [email, setEmail] = React.useState('');
  const [msg, setMsg] = React.useState('');
  const submit = () => {
    const ok = email.includes('@');
    setMsg(ok ? '✓ pronto — confira sua caixa de entrada.' : '⚠ informe um e-mail válido.');
    if (ok && onSubscribe) onSubscribe(email);
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      maxWidth: 'var(--measure)',
      border: '1px ' + (tone === 'dashed' ? 'dashed' : 'solid') + ' var(--line)',
      background: tone === 'dashed' ? 'transparent' : 'var(--surface)',
      borderRadius: 'var(--radius-md)',
      padding: 24,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 20,
      fontWeight: 'var(--w-medium)',
      margin: 0,
      color: 'var(--ink)'
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--soft)',
      margin: '6px 0 0'
    }
  }, description), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 18,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "email",
    value: email,
    onChange: e => setEmail(e.target.value),
    placeholder: placeholder,
    "aria-label": "Seu e-mail",
    style: {
      flex: 1,
      minWidth: 180,
      background: 'var(--bg)',
      border: '1px solid var(--line)',
      borderRadius: 'var(--radius-pill)',
      padding: '11px 18px',
      color: 'var(--ink)',
      fontFamily: 'var(--font-ui)',
      fontSize: 14,
      outline: 'none'
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    onClick: submit
  }, cta)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11.5,
      color: 'var(--accent)',
      margin: '12px 0 0',
      minHeight: 16
    }
  }, msg));
}
Object.assign(__ds_scope, { NewsletterCTA });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/NewsletterCTA.jsx", error: String((e && e.message) || e) }); }

// components/editorial/Pager.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Previous / next article pager, split by a hairline. */
function Pager({
  prev,
  next,
  style,
  ...rest
}) {
  const Side = ({
    item,
    align,
    kicker
  }) => item ? /*#__PURE__*/React.createElement("a", {
    href: item.href || '#',
    style: {
      maxWidth: '46%',
      textAlign: align,
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10.5,
      color: 'var(--faint)',
      display: 'block',
      marginBottom: 5
    }
  }, kicker), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 16.5,
      color: 'var(--ink)'
    }
  }, item.title)) : /*#__PURE__*/React.createElement("span", null);
  return /*#__PURE__*/React.createElement("nav", _extends({
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 16,
      paddingTop: 26,
      borderTop: '1px solid var(--line)',
      flexWrap: 'wrap',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(Side, {
    item: prev,
    align: "left",
    kicker: "\u2190 anterior"
  }), /*#__PURE__*/React.createElement(Side, {
    item: next,
    align: "right",
    kicker: "pr\xF3xima \u2192"
  }));
}
Object.assign(__ds_scope, { Pager });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/Pager.jsx", error: String((e && e.message) || e) }); }

// components/editorial/PostImage.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Real photograph chosen by the author — cover or mid-post figure.
 * With no `src`, renders the striped drop placeholder with a mono label.
 * Square corners, hairline border, mono caption below.
 */
function PostImage({
  src,
  alt = '',
  caption,
  label = 'imagem escolhida pelo autor',
  height = 200,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("figure", _extends({
    style: {
      margin: 0,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--line)',
      overflow: 'hidden',
      height,
      background: 'repeating-linear-gradient(45deg, var(--bg-alt) 0 10px, transparent 10px 22px)',
      display: 'grid',
      placeItems: 'center'
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10.5,
      letterSpacing: '0.08em',
      color: 'var(--faint)',
      background: 'var(--bg)',
      border: '1px solid var(--line)',
      padding: '4px 10px'
    }
  }, label)), caption && /*#__PURE__*/React.createElement("figcaption", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10.5,
      color: 'var(--faint)',
      marginTop: 10,
      letterSpacing: '0.04em'
    }
  }, caption));
}
Object.assign(__ds_scope, { PostImage });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/PostImage.jsx", error: String((e && e.message) || e) }); }

// components/editorial/PostRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * The list unit of the whole site: date · cover thumb · title/dek/tags · arrow.
 * `image` is the author-chosen cover; without one, a striped placeholder renders.
 * There is no card grid in this system — archives are rows separated by hairlines.
 */
function PostRow({
  href = '#',
  date,
  title,
  dek,
  tags = [],
  image,
  imageAlt = '',
  style,
  ...rest
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: 'grid',
      gridTemplateColumns: '86px 96px 1fr 30px',
      gap: 20,
      alignItems: 'start',
      padding: '20px 6px',
      borderBottom: '1px solid var(--line)',
      textDecoration: 'none',
      background: h ? 'var(--bg-alt)' : 'transparent',
      transition: 'background var(--dur) var(--ease)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--faint)',
      whiteSpace: 'nowrap',
      paddingTop: 4
    }
  }, date), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 96,
      height: 68,
      overflow: 'hidden',
      display: 'grid',
      placeItems: 'center',
      border: '1px solid ' + (h ? 'var(--soft)' : 'var(--line)'),
      transition: 'border-color var(--dur) var(--ease)',
      background: 'repeating-linear-gradient(45deg, var(--bg-alt) 0 8px, transparent 8px 17px)'
    }
  }, image ? /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: imageAlt,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 9,
      color: 'var(--faint)'
    }
  }, "capa")), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--w-medium)',
      fontSize: 20,
      letterSpacing: '-0.012em',
      lineHeight: 1.25,
      margin: 0,
      color: 'var(--ink)'
    }
  }, title), dek && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--soft)',
      margin: '5px 0 0',
      lineHeight: 1.55,
      maxWidth: '58ch'
    }
  }, dek), tags.length > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: 9,
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap'
    }
  }, tags.map(t => /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    key: t
  }, t)))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      justifySelf: 'end',
      paddingTop: 4,
      color: h ? 'var(--accent)' : 'var(--faint)',
      opacity: h ? 1 : 0.55,
      transform: h ? 'translateX(4px)' : 'translateX(-8px)',
      transition: 'transform 220ms var(--ease), opacity var(--dur), color var(--dur)'
    }
  }, "\u2192"));
}
Object.assign(__ds_scope, { PostRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/PostRow.jsx", error: String((e && e.message) || e) }); }

// components/editorial/Prose.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * The reading column. Serif 300 at 18.5px/1.78, drop cap on the first paragraph,
 * and styling for the h2 / mark / verse / aside / figure markup an article body contains.
 * In-post images: <figure><img src="…"><figcaption>…</figcaption></figure>.
 * Pass `html` for stored article HTML, or children for composed content.
 */
const CSS = `
.pc-prose{max-width:var(--measure);font-family:var(--font-display);font-size:var(--fs-prose);line-height:var(--lh-prose);font-weight:var(--w-light);color:var(--ink)}
.pc-prose p{margin:0 0 24px}
.pc-prose>p:first-of-type::first-letter{float:left;font-size:3.15em;line-height:.86;font-weight:400;padding:6px 12px 0 0;color:var(--primary)}
.pc-prose h2{font-size:1.36em;font-weight:500;margin:44px 0 16px;letter-spacing:-.015em;line-height:1.25;scroll-margin-top:80px}
.pc-prose strong{font-weight:600}
.pc-prose em{font-style:italic}
.pc-prose a{color:var(--primary);text-decoration:underline;text-underline-offset:3px}
.pc-prose a:hover{color:var(--accent)}
.pc-prose mark{background:var(--mark);color:inherit;padding:1px 2px}
.pc-prose .verse{margin:32px 0;background:var(--surface);border:1px solid var(--line);border-radius:var(--radius-md);padding:22px 24px}
.pc-prose .verse .r{font-family:var(--font-mono);font-size:10.5px;color:var(--accent);letter-spacing:.08em;margin-bottom:12px}
.pc-prose .verse .r::before{content:"> ";color:var(--faint)}
.pc-prose .verse q{font-size:1.06em;line-height:1.5;quotes:none;display:block}
.pc-prose .aside{margin:32px 0;border-left:2px solid var(--accent);padding:2px 0 2px 20px;font-family:var(--font-ui);font-size:.79em;line-height:1.65;color:var(--soft)}
.pc-prose .aside b{font-family:var(--font-mono);font-size:.86em;letter-spacing:.08em;color:var(--accent);display:block;margin-bottom:6px;font-weight:500}
.pc-prose figure{margin:32px 0}
.pc-prose figure img{display:block;width:100%;border:1px solid var(--line)}
.pc-prose figure .ph{height:220px;border:1px solid var(--line);background:repeating-linear-gradient(45deg,var(--bg-alt) 0 10px,transparent 10px 22px);display:grid;place-items:center;font-family:var(--font-mono);font-size:10.5px;letter-spacing:.08em;color:var(--faint)}
.pc-prose figcaption{font-family:var(--font-mono);font-size:10.5px;color:var(--faint);margin-top:10px;letter-spacing:.04em}
`;
function Prose({
  html,
  children,
  fontSize,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, CSS), /*#__PURE__*/React.createElement("div", _extends({
    className: "pc-prose",
    style: {
      fontSize,
      ...style
    }
  }, html ? {
    dangerouslySetInnerHTML: {
      __html: html
    }
  } : {}, rest), html ? undefined : children));
}
Object.assign(__ds_scope, { Prose });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/Prose.jsx", error: String((e && e.message) || e) }); }

// components/editorial/Reactions.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Sentence-shaped reactions ("Isso me ajudou 128") — never emoji, never a like icon. */
function Reactions({
  options = [],
  style,
  ...rest
}) {
  const [on, setOn] = React.useState(() => new Set());
  const toggle = i => setOn(prev => {
    const n = new Set(prev);
    n.has(i) ? n.delete(i) : n.add(i);
    return n;
  });
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap',
      ...style
    }
  }, rest), options.map((o, i) => {
    const active = on.has(i);
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      "aria-pressed": active,
      onClick: () => toggle(i),
      style: {
        fontFamily: 'var(--font-ui)',
        fontSize: 13,
        cursor: 'pointer',
        padding: '8px 15px',
        display: 'flex',
        gap: 8,
        alignItems: 'center',
        borderRadius: 'var(--radius-pill)',
        background: active ? 'var(--primary-soft)' : 'var(--surface)',
        border: '1px solid ' + (active ? 'var(--primary)' : 'var(--line)'),
        color: active ? 'var(--primary)' : 'var(--soft)',
        transition: 'all var(--dur-fast) var(--ease)'
      }
    }, o.label, /*#__PURE__*/React.createElement("b", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        fontWeight: 400,
        color: active ? 'var(--primary)' : 'var(--faint)'
      }
    }, (o.count || 0) + (active ? 1 : 0)));
  }));
}
Object.assign(__ds_scope, { Reactions });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/Reactions.jsx", error: String((e && e.message) || e) }); }

// components/editorial/StageCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** One step of the reading trail. Four sit in a hairline grid, no gaps — a single ruled block. */
function StageCard({
  href = '#',
  number,
  title,
  description,
  refs = [],
  cta = 'abrir etapa →',
  style,
  ...rest
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: 'block',
      background: h ? 'var(--bg-alt)' : 'var(--surface)',
      padding: '22px 20px 24px',
      textDecoration: 'none',
      transition: 'background var(--dur) var(--ease)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--accent)',
      letterSpacing: '0.08em'
    }
  }, number), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--w-medium)',
      fontSize: 19,
      margin: '6px 0',
      color: 'var(--ink)'
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: 'var(--soft)',
      lineHeight: 1.5,
      minHeight: 40,
      margin: 0
    }
  }, description), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: '16px 0 0',
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 7
    }
  }, refs.map(r => /*#__PURE__*/React.createElement("li", {
    key: r,
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11.5,
      color: 'var(--soft)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--faint)'
    }
  }, "> "), r))), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      marginTop: 16,
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--primary)'
    }
  }, cta));
}
Object.assign(__ds_scope, { StageCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/StageCard.jsx", error: String((e && e.message) || e) }); }

// components/editorial/StudyNote.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Study aside: accent rule, mono kicker, smaller sans text. For philology and context notes. */
function StudyNote({
  label = 'nota de estudo',
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("aside", _extends({
    style: {
      margin: '32px 0',
      borderLeft: '2px solid var(--accent)',
      padding: '2px 0 2px 20px',
      fontFamily: 'var(--font-ui)',
      fontSize: 14.5,
      lineHeight: 1.65,
      color: 'var(--soft)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("b", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.08em',
      color: 'var(--accent)',
      marginBottom: 6,
      fontWeight: 500
    }
  }, label), children);
}
Object.assign(__ds_scope, { StudyNote });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/StudyNote.jsx", error: String((e && e.message) || e) }); }

// components/editorial/TocRail.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Sticky article rail: section index plus reading tools (text size, save, copy link). */
function TocRail({
  label = 'NESTE TEXTO',
  sections = [],
  activeId,
  onSelect,
  tools,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("aside", _extends({
    style: {
      position: 'sticky',
      top: 86,
      paddingTop: 38,
      width: 'var(--rail)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      letterSpacing: '0.12em',
      color: 'var(--faint)',
      marginBottom: 12
    }
  }, label), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: '0 0 28px',
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      borderLeft: '1px solid var(--line)'
    }
  }, sections.map(s => {
    const on = s.id === activeId;
    return /*#__PURE__*/React.createElement("li", {
      key: s.id
    }, /*#__PURE__*/React.createElement("a", {
      href: '#' + s.id,
      onClick: e => {
        if (onSelect) {
          e.preventDefault();
          onSelect(s.id);
        }
      },
      style: {
        display: 'block',
        fontSize: 12.5,
        lineHeight: 1.35,
        padding: '5px 0 5px 14px',
        marginLeft: -1,
        textDecoration: 'none',
        borderLeft: '1.5px solid ' + (on ? 'var(--accent)' : 'transparent'),
        color: on ? 'var(--ink)' : 'var(--faint)'
      }
    }, s.label));
  })), tools && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      paddingTop: 20,
      borderTop: '1px solid var(--line)'
    }
  }, tools));
}
Object.assign(__ds_scope, { TocRail });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/TocRail.jsx", error: String((e && e.message) || e) }); }

// components/editorial/VerseBlock.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Scripture pulled out of the prose: mono ref with a › marker, serif quote on a surface panel. */
function VerseBlock({
  reference,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("figure", _extends({
    style: {
      margin: '32px 0',
      background: 'var(--surface)',
      border: '1px solid var(--line)',
      borderRadius: 'var(--radius-md)',
      padding: '22px 24px',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("figcaption", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10.5,
      color: 'var(--accent)',
      letterSpacing: '0.08em',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--faint)'
    }
  }, "> "), reference), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--w-light)',
      fontSize: 19.5,
      lineHeight: 1.5,
      color: 'var(--ink)',
      margin: 0
    }
  }, children));
}
Object.assign(__ds_scope, { VerseBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/VerseBlock.jsx", error: String((e && e.message) || e) }); }

// components/editorial/VerseTerminal.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Terminal-framed verse — the signature "the faith that makes you think" device. Use once per page. */
function VerseTerminal({
  slug,
  command,
  children,
  cite,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: 'var(--surface)',
      border: '1px solid var(--line)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '9px 14px',
      borderBottom: '1px solid var(--line)',
      background: 'var(--bg-alt)'
    }
  }, [0, 1, 2].map(i => /*#__PURE__*/React.createElement("i", {
    key: i,
    style: {
      width: 8,
      height: 8,
      background: 'var(--line)'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--faint)',
      marginLeft: 6
    }
  }, slug)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '26px 24px 24px'
    }
  }, command && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--accent)',
      margin: '0 0 14px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--faint)'
    }
  }, "\u203A "), command), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--w-light)',
      fontSize: 'clamp(19px,2.4vw,24px)',
      lineHeight: 1.45,
      color: 'var(--ink)',
      margin: 0
    }
  }, children), cite && /*#__PURE__*/React.createElement("cite", {
    style: {
      display: 'block',
      marginTop: 14,
      fontFamily: 'var(--font-mono)',
      fontSize: 11.5,
      color: 'var(--soft)',
      fontStyle: 'normal'
    }
  }, cite)));
}
Object.assign(__ds_scope, { VerseTerminal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/VerseTerminal.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.ConfirmDialog = __ds_scope.ConfirmDialog;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Skeleton = __ds_scope.Skeleton;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.ThemeSwitcher = __ds_scope.ThemeSwitcher;

__ds_ns.ApplyList = __ds_scope.ApplyList;

__ds_ns.AuthorBox = __ds_scope.AuthorBox;

__ds_ns.Comment = __ds_scope.Comment;

__ds_ns.MetaLine = __ds_scope.MetaLine;

__ds_ns.MoodChips = __ds_scope.MoodChips;

__ds_ns.NewsletterCTA = __ds_scope.NewsletterCTA;

__ds_ns.Pager = __ds_scope.Pager;

__ds_ns.PostImage = __ds_scope.PostImage;

__ds_ns.PostRow = __ds_scope.PostRow;

__ds_ns.Prose = __ds_scope.Prose;

__ds_ns.Reactions = __ds_scope.Reactions;

__ds_ns.StageCard = __ds_scope.StageCard;

__ds_ns.StudyNote = __ds_scope.StudyNote;

__ds_ns.TocRail = __ds_scope.TocRail;

__ds_ns.VerseBlock = __ds_scope.VerseBlock;

__ds_ns.VerseTerminal = __ds_scope.VerseTerminal;

})();
