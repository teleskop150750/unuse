// @vitest-environment happy-dom

import { renderHook as renderReactHook } from '@testing-library/react';
import { unSignal } from 'unuse-reactivity';
import { expect, it } from 'vitest';
import { unResolve } from '.';
import { describeReact } from '../_testUtils/react';

describeReact('unResolve', () => {
  it('should resolve to a React Ref', () => {
    const mySignal = unSignal(0);

    const hook = renderReactHook(() =>
      unResolve(mySignal, { framework: 'react' })
    );

    const actual = hook.result.current;
    expect(actual).toBeDefined();
    expect(actual).toBeTypeOf('object');
  });

  it('should update the React Ref on change', () => {
    const mySignal = unSignal(0);

    const hook = renderReactHook(() =>
      unResolve(mySignal, { framework: 'react' })
    );

    const actual = hook.result.current;
    expect(actual[0]).toBe(0);

    mySignal.set(42);
    expect(actual[0]).toBe(42);
  });

  it('should update back the original signal on change', () => {
    const mySignal = unSignal(0);

    const hook = renderReactHook(() =>
      unResolve(mySignal, { framework: 'react' })
    );

    const actual = hook.result.current;

    actual[1](100);
    expect(mySignal.get()).toBe(100);

    actual[1](() => 200);
    expect(mySignal.get()).toBe(200);
  });

  it('should resolve to a React Memo when readonly is true', () => {
    const mySignal = unSignal(0);

    const hook = renderReactHook(() =>
      unResolve(mySignal, { framework: 'react', readonly: true })
    );

    const actual = hook.result.current;
    expect(actual).toBeTypeOf('number');
    expect(actual).toBe(0);
  });
});
