import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props: any = {}, state: any = null) => {
  const wrapper = shallow(<App {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
}

const findByTestAttr = (wrapper: ShallowWrapper, val: string): ShallowWrapper => {
  return wrapper.find(`[data-test='${val}']`)
}

test('renders without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app');
  expect(appComponent.length).toBe(1);
});
test('renders increment button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'increment-button');
  expect(button.length).toBe(1);
});
test('renders decrement button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'decrement-button');
  expect(button.length).toBe(1);
});
test('renders counter display', () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.length).toBe(1);
});
test('counter starts at 0', () => {
  const wrapper = setup();
  const intialCounterState = wrapper.state('counter');
  expect(intialCounterState).toBe(0);
});
test('clicking increment button increments counter display', () => {
  const counter = 7;

  const wrapper = setup(null, { counter });
  findByTestAttr(wrapper, 'increment-button').simulate('click');
  wrapper.update();

  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter + 1);
});
test('clicking decrement button decrements counter display', () => {
  const counter = 7;

  const wrapper = setup(null, { counter });
  findByTestAttr(wrapper, 'decrement-button').simulate('click');
  wrapper.update();

  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter - 1);
});

test('clicking decrement button when counter is = 0 displays error and state doesn\'t change', () => {
  const counter = 0;

  const wrapper = setup(null, { counter });
  findByTestAttr(wrapper, 'decrement-button').simulate('click');
  wrapper.update();

  const errorMessage = findByTestAttr(wrapper, 'error-message');
  expect(errorMessage.text()).toContain("Counter cannot be less than 0.");

  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter);
});
test('clicking increment button when errorMsg is displayed should increments counter display and remove error message', () => {
  const counter = 0;

  const wrapper = setup(null, { counter, errorMsg: 'error message' });
  findByTestAttr(wrapper, 'increment-button').simulate('click');
  wrapper.update();

  const errorMessage = findByTestAttr(wrapper, 'error-message');
  expect(errorMessage.length).toBe(0);

  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter + 1);
});
