import "@testing-library/jest-dom";
import React from "react";
import { TextEncoder, TextDecoder } from "util";

// Polyfill TextEncoder/TextDecoder for jsdom
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock framer-motion to avoid dynamic import issues
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) =>
      React.createElement("div", props, children),
    span: ({ children, ...props }) =>
      React.createElement("span", props, children),
    button: ({ children, ...props }) =>
      React.createElement("button", props, children),
  },
  AnimatePresence: ({ children }) => children,
  useAnimation: () => ({
    start: jest.fn(),
    stop: jest.fn(),
  }),
  useMotionValue: () => ({ get: () => 0, set: jest.fn() }),
  useTransform: () => ({ get: () => 0 }),
  domAnimation: {},
  LazyMotion: ({ children }) => children,
  m: {
    div: ({ children, ...props }) =>
      React.createElement("div", props, children),
    span: ({ children, ...props }) =>
      React.createElement("span", props, children),
  },
}));

// Mock @heroui/ripple to avoid dynamic import issues
jest.mock("@heroui/ripple", () => ({
  Ripple: () => null,
  useRipple: () => ({
    ripples: [],
    onClear: jest.fn(),
    onClick: jest.fn(),
    onRipplePressHandler: jest.fn(),
  }),
}));

// Mock @heroui/button to avoid ripple handler issues
jest.mock("@heroui/button", () => ({
  Button: React.forwardRef(({ children, onClick, isLoading, ...props }, ref) =>
    React.createElement(
      "button",
      {
        ...props,
        ref,
        onClick,
        disabled: isLoading,
        "aria-busy": isLoading,
      },
      isLoading ? "Loading..." : children
    )
  ),
}));

// Mock @heroui/input to provide simple input elements
// Filter out HeroUI-specific props that aren't valid DOM attributes
jest.mock("@heroui/input", () => ({
  Input: React.forwardRef(
    (
      {
        label,
        value,
        onChange,
        startContent,
        classNames,
        isRequired,
        variant,
        radius,
        size,
        fullWidth,
        ...props
      },
      ref
    ) =>
      React.createElement("div", null, [
        React.createElement("label", { key: "label", htmlFor: label }, label),
        React.createElement("input", {
          key: "input",
          ref,
          id: label,
          "aria-label": label,
          value,
          onChange,
          ...props,
        }),
      ])
  ),
  Textarea: React.forwardRef(
    (
      {
        label,
        value,
        onChange,
        startContent,
        placeholder,
        classNames,
        isRequired,
        variant,
        radius,
        size,
        fullWidth,
        ...props
      },
      ref
    ) =>
      React.createElement("div", null, [
        React.createElement("label", { key: "label", htmlFor: label }, label),
        React.createElement("textarea", {
          key: "textarea",
          ref,
          id: label,
          "aria-label": label,
          value,
          onChange,
          placeholder,
          ...props,
        }),
      ])
  ),
}));

// Mock @heroui/toast to avoid TextEncoder issues
jest.mock("@heroui/toast", () => ({
  addToast: jest.fn(),
  ToastProvider: ({ children }) => children,
}));
