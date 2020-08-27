import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { renderHook, act } from "@testing-library/react-hooks";
import enzyme, { shallow, ShallowWrapper } from "enzyme";

import useMemoState from "./useMemoState";
import App from "./App";

enzyme.configure({ adapter: new Adapter() });

describe("Testing useMemoState usage", () => {
  describe("Testing first render", () => {
    it("Should be called without errors", () => {
      const { result } = renderHook(() => useMemoState());
      const err = result.error;

      expect(err).toBeUndefined();
    });
  });

  describe("Testing values and types on first call", () => {
    it("Should use default value", () => {
      const { result } = renderHook(() => useMemoState());
      const [state, setter] = result.current;

      expect(state).toBeUndefined();
      expect(typeof setter).toBe("function");
    });

    it("should be able to use generic type", () => {
      const { result } = renderHook(() => useMemoState<string>("test string"));
      const [state, setter] = result.current;

      expect(typeof state).toBe("string");
      expect(typeof setter).toBe("function");
    });
  });

  it("Should update value", () => {
    const { result } = renderHook(() => useMemoState<string>("test string"));

    const [, setter] = result.current;

    act(() => {
      setter("changed test string");
    });

    const [value] = result.current;

    expect(value).toBe("changed test string");
  });

  describe("Test memoizing state in functional React component", () => {
    let mockFn: jest.Mock;
    let wrapper: ShallowWrapper;

    beforeEach(() => {
      mockFn = jest.fn();
      wrapper = shallow(<App exampleFunction={mockFn} />);
    });

    it("Shoudn't update state", () => {
      const testOneButton = wrapper.find(".testOne");
      const ammountOfExpectedReRenders = 1;

      act(() => {
        testOneButton.simulate("click");
        testOneButton.simulate("click");
        testOneButton.simulate("click");
      });

      expect(mockFn).toHaveBeenCalledTimes(ammountOfExpectedReRenders);
    });

    it("Should update state once", () => {
      const testTwoButton = wrapper.find(".testTwo");
      const ammountOfExpectedReRenders = 2;

      act(() => {
        testTwoButton.simulate("click");
        testTwoButton.simulate("click");
        testTwoButton.simulate("click");
      });

      expect(mockFn).toHaveBeenCalledTimes(ammountOfExpectedReRenders);
    });
  });
});
