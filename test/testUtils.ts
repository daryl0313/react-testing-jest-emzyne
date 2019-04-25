import { ShallowWrapper } from "enzyme";


export const findByTestAttr = (wrapper: ShallowWrapper, val: string) => {
    return wrapper.find(`[data-test="${val}"]`);
}